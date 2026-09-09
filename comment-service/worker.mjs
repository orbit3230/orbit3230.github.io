const FIELDS = 'id, name, body, created_at';
const validPost = value => typeof value === 'string' && value.startsWith('/') && !value.startsWith('//') && value.length <= 1024 && !/[?#\u0000-\u001f]/.test(value);
const publicComment = row => ({ id: row.id, name: row.name, body: row.body, created_at: row.created_at });

async function writerKey(ip, salt) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', encoder.encode(salt), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const result = await crypto.subtle.sign('HMAC', key, encoder.encode(new Date().toISOString().slice(0, 10) + ':' + ip));
  return Array.from(new Uint8Array(result), byte => byte.toString(16).padStart(2, '0')).join('');
}

async function boundedJSON(request) {
  if (!request.headers.get('Content-Type')?.toLowerCase().startsWith('application/json')) throw Error('content-type');
  if (Number(request.headers.get('Content-Length')) > 16000) throw Error('size');
  const reader = request.body?.getReader();
  if (!reader) throw Error('body');
  const chunks = []; let length = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > 16000) { await reader.cancel(); throw Error('size'); }
    chunks.push(value);
  }
  const bytes = new Uint8Array(length); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  return JSON.parse(new TextDecoder().decode(bytes));
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin');
    const allowed = (env.ALLOWED_ORIGINS || '').split(',').map(value => value.trim()).filter(Boolean);
    const headers = { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'Vary': 'Origin', 'X-Content-Type-Options': 'nosniff' };
    const reply = (data, status = 200) => new Response(JSON.stringify(data), { status, headers });
    if (!origin || !allowed.includes(origin)) return reply({ error: '허용되지 않은 요청입니다.' }, 403);
    headers['Access-Control-Allow-Origin'] = origin;
    const url = new URL(request.url);
    if (url.pathname !== '/comments') return reply({ error: '주소를 확인해 주세요.' }, 404);
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: { ...headers, 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400' } });
    }
    if (!['GET', 'POST'].includes(request.method)) return reply({ error: '지원하지 않는 요청입니다.' }, 405);
    if (!env.DB || !env.RATE_SALT || env.RATE_SALT.length < 32) return reply({ error: '댓글 저장 서비스 연결을 준비 중입니다.' }, 503);
    try {
      if (request.method === 'GET') {
        const post = url.searchParams.get('post');
        const rawCursor = url.searchParams.get('before');
        const before = rawCursor === null ? Number.MAX_SAFE_INTEGER : Number(rawCursor);
        if (!validPost(post) || !Number.isSafeInteger(before) || before < 1) return reply({ error: '글 주소나 페이지를 확인해 주세요.' }, 400);
        const result = await env.DB.prepare(`SELECT ${FIELDS} FROM comments WHERE post = ? AND id < ? ORDER BY id DESC LIMIT 21`).bind(post, before).all();
        const rows = result.results.slice(0, 20);
        return reply({ comments: rows.map(publicComment), next_cursor: result.results.length > 20 ? rows.at(-1).id : null });
      }
      let data;
      try { data = await boundedJSON(request); } catch { return reply({ error: '댓글 요청의 형식이나 크기를 확인해 주세요.' }, 400); }
      if (!data || typeof data !== 'object' || Array.isArray(data)) return reply({ error: '댓글 요청을 확인해 주세요.' }, 400);
      const { post, request_id } = data;
      const name = typeof data.name === 'string' ? data.name.trim() || '익명' : '익명';
      const body = typeof data.body === 'string' ? data.body.trim() : '';
      if (!validPost(post) || name.length > 40 || !body || body.length > 2000 || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(request_id || '') || data.website) {
        return reply({ error: '이름은 40자, 댓글은 1~2,000자로 입력해 주세요.' }, 400);
      }
      const ip = request.headers.get('CF-Connecting-IP');
      if (!ip) return reply({ error: '요청을 확인할 수 없습니다. 잠시 후 다시 시도해 주세요.' }, 400);
      const key = await writerKey(ip, env.RATE_SALT);
      const prior = await env.DB.prepare(`SELECT ${FIELDS}, post FROM comments WHERE request_id = ?`).bind(request_id).first();
      if (prior) {
        if (prior.post !== post || prior.name !== name || prior.body !== body) return reply({ error: '작성 요청이 변경되었습니다. 새로 작성해 주세요.' }, 409);
        return reply({ comment: publicComment(prior) });
      }
      const now = Date.now();
      // The rate check and insert are one atomic SQLite statement, including concurrent requests.
      const saved = await env.DB.prepare(`INSERT INTO comments (request_id, post, name, body, created_at, created_ms, writer_key)
        SELECT ?, ?, ?, ?, ?, ?, ?
        WHERE (SELECT COUNT(*) FROM comments WHERE writer_key = ? AND created_ms > ?) < 10
          AND NOT EXISTS (SELECT 1 FROM comments WHERE writer_key = ? AND created_ms > ?)
        ON CONFLICT(request_id) DO NOTHING RETURNING ${FIELDS}`)
        .bind(request_id, post, name, body, new Date(now).toISOString(), now, key, key, now - 3600000, key, now - 30000).first();
      if (saved) return reply({ comment: publicComment(saved) }, 201);
      const concurrent = await env.DB.prepare(`SELECT ${FIELDS}, post FROM comments WHERE request_id = ?`).bind(request_id).first();
      if (concurrent && concurrent.post === post && concurrent.name === name && concurrent.body === body) return reply({ comment: publicComment(concurrent) });
      headers['Retry-After'] = '30';
      return reply({ error: '연속 작성은 30초 간격, 같은 네트워크에서 시간당 10개까지 가능합니다. 잠시 후 다시 시도해 주세요.' }, 429);
    } catch {
      return reply({ error: '댓글 저장 서비스에 연결하지 못했습니다. 입력 내용은 유지됩니다. 잠시 후 다시 시도해 주세요.' }, 503);
    }
  },
  async scheduled(event, env) {
    // Retain public comments; discard old daily abuse-prevention identifiers.
    await env.DB.prepare('UPDATE comments SET writer_key = NULL WHERE writer_key IS NOT NULL AND created_ms < ?').bind(Date.now() - 172800000).run();
  }
};
