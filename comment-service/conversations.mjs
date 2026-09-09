import { writerKey, boundedJSON } from './helpers.mjs';
const hex = bytes => [...new Uint8Array(bytes)].map(b => b.toString(16).padStart(2, '0')).join('');
const bytes = text => Uint8Array.from(text.match(/../g), pair => parseInt(pair, 16));
const encode = text => new TextEncoder().encode(text);
const digest = async text => hex(await crypto.subtle.digest('SHA-256', encode(text)));
const validPost = p => typeof p === 'string' && p.startsWith('/') && !p.startsWith('//') && p.length <= 1024 && !/[\\?#\u0000-\u0020]/.test(p);
const validId = id => Number.isSafeInteger(id) && id > 0;
const publicRow = r => ({ id: r.id, post: r.post, name: r.deleted ? '삭제된 댓글' : r.name, body: r.deleted ? '삭제된 댓글입니다.' : r.body, created_at: r.created_at, updated_at: r.updated_at, root_id: r.root_id, reply_to: r.reply_to, reply_to_name: r.target_deleted ? '삭제된 댓글' : r.target_name, deleted: Boolean(r.deleted), revision: r.revision, password_salt: r.password_salt, manageable: Boolean(r.password_hash) && !r.deleted, reply_count: r.reply_count || 0 });
class Problem extends Error { constructor(status, message) { super(message); this.status = status; } }
const fail = (status, message) => { throw new Problem(status, message); };
const cursor = (raw, fallback) => { const n = raw === null ? fallback : Number(raw); if (!Number.isSafeInteger(n) || n < 0) fail(400, '페이지 주소를 확인해 주세요.'); return n; };
async function pepperKey(env) { return crypto.subtle.importKey('raw', encode(env.PASSWORD_PEPPER), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']); }
const proofValid = data => /^[a-f0-9]{32}$/.test(data.password_salt || '') && /^[a-f0-9]{64}$/.test(data.password_key || '');
async function makeHash(data, env) { return hex(await crypto.subtle.sign('HMAC', await pepperKey(env), encode(data.password_salt + ':' + data.password_key))); }
async function verifyPassword(row, data, env) {
  if (!row.password_hash) fail(403, '이 댓글은 비밀번호 기능 도입 전에 작성되어 작성자 확인이 불가능합니다.');
  if (!/^[a-f0-9]{64}$/.test(data.password_key || '') || !await crypto.subtle.verify('HMAC', await pepperKey(env), bytes(row.password_hash), encode(row.password_salt + ':' + data.password_key))) fail(403, '비밀번호가 일치하지 않습니다.');
}
async function limit(env, key, maximum, seconds) {
  const bucket = Math.floor(Date.now() / (seconds * 1000));
  const row = await env.DB.prepare('INSERT INTO request_limits(key,count,expires_ms) VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET count = count + 1 WHERE count < ? RETURNING count').bind(key + ':' + bucket, (bucket + 1) * seconds * 1000, maximum).first();
  if (!row) fail(429, '요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.');
}
async function rowById(env, id) { return env.DB.prepare('SELECT c.*, t.name AS target_name, t.deleted AS target_deleted FROM comments c LEFT JOIN comments t ON t.id = c.reply_to WHERE c.id = ?').bind(id).first(); }
async function listComments(url, env) {
  const post = url.searchParams.get('post');
  if (!validPost(post)) fail(400, '글 주소를 확인해 주세요.');
  const thread = url.searchParams.get('thread');
  const focus = url.searchParams.get('focus');
  if (thread) {
    const id = Number(thread); if (!validId(id)) fail(400, '대화 주소를 확인해 주세요.');
    const after = cursor(url.searchParams.get('after'), 0);
    const rows = (await env.DB.prepare('SELECT c.*, t.name AS target_name, t.deleted AS target_deleted FROM comments c LEFT JOIN comments t ON t.id = c.reply_to WHERE c.post = ? AND c.root_id = ? AND c.id > ? ORDER BY c.id LIMIT 21').bind(post, id, after).all()).results;
    return { comments: rows.slice(0,20).map(publicRow), next_cursor: rows.length > 20 ? rows[19].id : null };
  }
  if (focus) {
    const id = Number(focus); if (!validId(id)) fail(400, '댓글 주소를 확인해 주세요.');
    const target = await rowById(env, id);
    if (!target || target.post !== post) fail(404, '댓글을 찾을 수 없습니다.');
    const root = target.root_id ? await rowById(env, target.root_id) : target;
    return { comments: [publicRow(root)], next_cursor: null, focus_id: id };
  }
  const before = cursor(url.searchParams.get('before'), Number.MAX_SAFE_INTEGER);
  const rows = (await env.DB.prepare('SELECT c.*, (SELECT COUNT(*) FROM comments r WHERE r.root_id = c.id) AS reply_count FROM comments c WHERE c.post = ? AND c.root_id IS NULL AND c.id < ? AND (c.deleted = 0 OR EXISTS (SELECT 1 FROM comments r WHERE r.root_id = c.id AND r.deleted = 0)) ORDER BY c.id DESC LIMIT 21').bind(post,before).all()).results;
  return { comments: rows.slice(0,20).map(publicRow), next_cursor: rows.length > 20 ? rows[19].id : null };
}
async function createComment(data, env, ipKey) {
  const post = data.post, name = typeof data.name === 'string' ? data.name.trim() || '익명' : '익명';
  const body = typeof data.body === 'string' ? data.body.trim() : '';
  const replyTo = data.reply_to == null ? null : data.reply_to;
  if (!validPost(post) || name.length > 40 || !body || body.length > 2000 || data.website || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(data.request_id || '') || (replyTo !== null && !validId(replyTo))) fail(400, '이름은 40자, 댓글은 1~2,000자로 입력해 주세요.');
  if (!proofValid(data) || !/^[a-f0-9]{64}$/.test(data.notify_token || '')) fail(400, '비밀번호 기능이 업데이트되었습니다. 작성 내용을 복사한 뒤 페이지를 새로고침해 주세요.');
  await limit(env, 'create:' + ipKey, 12, 60);
  const prior = await env.DB.prepare('SELECT * FROM comments WHERE request_id = ?').bind(data.request_id).first();
  const sameRequest = async row => {
    if (row.post !== post || row.name !== name || row.body !== body || row.reply_to !== replyTo || row.deleted || row.password_salt !== data.password_salt || row.notify_hash !== await digest(data.notify_token)) fail(409, '작성 요청이 변경되었습니다. 다시 작성해 주세요.');
    await verifyPassword(row, data, env); return { comment: publicRow(row) };
  };
  if (prior) return sameRequest(prior);
  let rootId = null;
  if (replyTo !== null) {
    const target = await rowById(env, replyTo);
    if (!target || target.post !== post || target.deleted) fail(409, '답글을 달 댓글이 삭제되었거나 이 글에 속하지 않습니다.');
    rootId = target.root_id || target.id;
  }
  const now = Date.now();
  const hash = await makeHash(data, env), notify = await digest(data.notify_token);
  const row = await env.DB.prepare(`INSERT INTO comments(request_id,post,name,body,created_at,created_ms,writer_key,root_id,reply_to,password_salt,password_hash,notify_hash)
    SELECT ?,?,?,?,?,?,?,?,?,?,?,?
    WHERE (SELECT COUNT(*) FROM comments WHERE writer_key = ? AND created_ms > ?) < 10
      AND NOT EXISTS(SELECT 1 FROM comments WHERE writer_key = ? AND created_ms > ?)
      AND (? IS NULL OR EXISTS(SELECT 1 FROM comments WHERE id = ? AND post = ? AND deleted = 0))
    ON CONFLICT(request_id) DO NOTHING RETURNING *`).bind(data.request_id,post,name,body,new Date(now).toISOString(),now,ipKey,rootId,replyTo,data.password_salt,hash,notify,ipKey,now-3600000,ipKey,now-30000,replyTo,replyTo,post).first();
  if (row) return { comment: publicRow(await rowById(env,row.id)) };
  const duplicate = await env.DB.prepare('SELECT * FROM comments WHERE request_id = ?').bind(data.request_id).first();
  if (duplicate) return sameRequest(duplicate);
  fail(429, '연속 작성은 30초 간격, 같은 네트워크에서 시간당 10개까지 가능합니다. 답글 대상이 삭제되었다면 새로고침해 주세요.');
}
async function mutate(id, action, data, env, ipKey) {
  await limit(env, 'password:' + ipKey, 20, 900);
  const row = await rowById(env,id); if (!row) fail(404, '댓글을 찾을 수 없습니다.');
  await verifyPassword(row,data,env);
  if (action === 'delete' && row.deleted) return { comment: publicRow(row) };
  if (row.deleted) fail(409, '이미 삭제된 댓글입니다.');
  if (action === 'edit' && (typeof data.body !== 'string' || !data.body.trim() || data.body.trim().length > 2000)) fail(400, '댓글은 1~2,000자로 입력해 주세요.');
  if (action === 'edit' && row.body === data.body.trim()) return { comment: publicRow(row) };
  if (data.revision !== row.revision) fail(409, '다른 화면에서 변경된 댓글입니다. 새로고침 후 다시 시도해 주세요.');
  const updated = action === 'edit'
    ? await env.DB.prepare('UPDATE comments SET body = ?, updated_at = ?, revision = revision + 1 WHERE id = ? AND revision = ? AND deleted = 0 RETURNING *').bind(data.body.trim(),new Date().toISOString(),id,row.revision).first()
    : await env.DB.prepare("UPDATE comments SET body = '삭제된 댓글입니다.', name = '삭제된 댓글', deleted = 1, updated_at = ?, revision = revision + 1 WHERE id = ? AND revision = ? AND deleted = 0 RETURNING *").bind(new Date().toISOString(),id,row.revision).first();
  if (!updated) fail(409,'댓글이 변경되었습니다. 새로고침 후 다시 시도해 주세요.');
  return { comment: publicRow(await rowById(env,id)) };
}
async function notifications(data, env, ipKey) {
  await limit(env,'inbox:' + ipKey,30,60);
  if (!Array.isArray(data.receipts) || data.receipts.length > 200 || data.receipts.some(r => !validId(r.id) || !/^[a-f0-9]{64}$/.test(r.token || ''))) fail(400,'알림 연결 정보를 확인해 주세요.');
  const byId = new Map(data.receipts.map(r => [r.id,r.token]));
  const rows = (await env.DB.prepare('SELECT id,notify_hash FROM comments WHERE id IN (SELECT value FROM json_each(?))').bind(JSON.stringify([...byId.keys()])).all()).results;
  const ids = [];
  for (const row of rows) if (row.notify_hash && row.notify_hash === await digest(byId.get(row.id))) ids.push(row.id);
  if (!ids.length) return { notifications: [], next_cursor: null, unread: 0, latest_id: 0 };
  const after = cursor(data.seen == null ? null : String(data.seen),0);
  const before = cursor(data.before == null ? null : String(data.before),Number.MAX_SAFE_INTEGER);
  const json = JSON.stringify(ids);
  const condition = 'deleted = 0 AND reply_to IN (SELECT value FROM json_each(?)) AND id NOT IN (SELECT value FROM json_each(?))';
  const items = (await env.DB.prepare(`SELECT * FROM comments WHERE ${condition} AND id < ? ORDER BY id DESC LIMIT 21`).bind(json,json,before).all()).results;
  const info = await env.DB.prepare(`SELECT COALESCE(MAX(id),0) AS latest_id, COUNT(CASE WHEN id > ? THEN 1 END) AS unread FROM comments WHERE ${condition}`).bind(after,json,json).first();
  return { notifications: items.slice(0,20).map(publicRow), next_cursor: items.length > 20 ? items[19].id : null, ...info };
}
export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin');
    const allowed = (env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim());
    const headers = { 'Content-Type':'application/json; charset=utf-8', 'Cache-Control':'no-store', Vary:'Origin', 'X-Content-Type-Options':'nosniff' };
    const reply = (data,status=200) => new Response(JSON.stringify(data),{status,headers});
    if (!origin || !allowed.includes(origin)) return reply({error:'허용되지 않은 요청입니다.'},403);
    headers['Access-Control-Allow-Origin'] = origin;
    const url = new URL(request.url), mutation = url.pathname.match(/^\/comments\/([1-9]\d*)\/(edit|delete)$/);
    if (!['/comments','/activity','/notifications'].includes(url.pathname) && !mutation) return reply({error:'주소를 확인해 주세요.'},404);
    if (request.method === 'OPTIONS') return new Response(null,{status:204,headers:{...headers,'Access-Control-Allow-Methods':'GET, POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type','Access-Control-Max-Age':'86400'}});
    if (!env.DB || !env.RATE_SALT) return reply({error:'댓글 저장 서비스 연결을 준비 중입니다.'},503);
    try {
      if (request.method === 'GET' && url.pathname === '/comments') return reply(await listComments(url,env));
      if (request.method === 'GET' && url.pathname === '/activity') {
        const before = cursor(url.searchParams.get('before'),Number.MAX_SAFE_INTEGER);
        const rows = (await env.DB.prepare('SELECT a.*, c.root_id, c.created_at FROM post_activity a JOIN comments c ON c.id = a.last_comment_id WHERE a.last_comment_id < ? ORDER BY a.last_comment_id DESC LIMIT 6').bind(before).all()).results;
        return reply({ posts: rows.slice(0,5), next_cursor: rows.length > 5 ? rows[4].last_comment_id : null });
      }
      if (request.method !== 'POST' || url.pathname === '/activity') fail(405,'지원하지 않는 요청입니다.');
      const ip = request.headers.get('CF-Connecting-IP'); if (!ip) fail(400,'요청 출처를 확인할 수 없습니다.');
      const ipKey = await writerKey(ip,env.RATE_SALT);
      let data; try { data = await boundedJSON(request,url.pathname === '/notifications' ? 64000 : 16000); } catch { fail(400,'요청 형식이나 크기를 확인해 주세요.'); }
      if (!data || typeof data !== 'object' || Array.isArray(data)) fail(400,'요청 내용을 확인해 주세요.');
      if (url.pathname === '/notifications') return reply(await notifications(data,env,ipKey));
      if (!env.PASSWORD_PEPPER || env.PASSWORD_PEPPER.length < 32) fail(503,'비밀번호 기능을 준비 중입니다. 잠시 후 다시 시도해 주세요.');
      if (mutation) { const id=Number(mutation[1]); if (!validId(id)) fail(400,'댓글 주소를 확인해 주세요.'); return reply(await mutate(id,mutation[2],data,env,ipKey)); }
      return reply(await createComment(data,env,ipKey),201);
    } catch (error) {
      if (error.status === 429) headers['Retry-After'] = '60';
      return reply({error:error instanceof Problem ? error.message : '댓글 서비스에 연결하지 못했습니다. 입력 내용은 유지됩니다. 다시 시도해 주세요.'},error.status || 503);
    }
  },
  async scheduled(event,env) {
    await env.DB.prepare('UPDATE comments SET writer_key = NULL WHERE writer_key IS NOT NULL AND created_ms < ?').bind(Date.now()-172800000).run();
    await env.DB.prepare('DELETE FROM request_limits WHERE expires_ms < ?').bind(Date.now()).run();
  }
};
