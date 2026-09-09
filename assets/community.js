(() => {
  'use strict';
  const media = document.querySelector('[data-media]');
  if (media) {
    const form = media.querySelector('form');
    const input = media.querySelector('input');
    const label = media.querySelector('label');
    const description = media.querySelector('[data-media-description]');
    const status = media.querySelector('[data-media-status], #media-status');
    const frame = media.querySelector('[data-media-frame]');
    const original = media.querySelector('[data-media-original]');
    const stop = media.querySelector('[data-media-stop]');
    const buttons = [...media.querySelectorAll('[data-media-mode]')];
    const storageKey = 'orbit-media-links-v1';
    let state = { mode: 'video', video: media.dataset.video || '', music: media.dataset.music || '' };
    try {
      const saved = JSON.parse(sessionStorage.getItem(storageKey));
      if (saved && ['video','music'].includes(saved.mode)) {
        state = { mode: saved.mode, video: typeof saved.video === 'string' ? saved.video : state.video, music: typeof saved.music === 'string' ? saved.music : state.music };
      }
    } catch { /* Storage is optional. */ }
    const save = () => { try { sessionStorage.setItem(storageKey, JSON.stringify(state)); } catch {} };
    function endPlayback(message) {
      frame.replaceChildren(); frame.hidden = true; stop.hidden = true;
      if (message) status.textContent = message;
    }
    function select(mode) {
      state[state.mode] = input.value.trim();
      endPlayback(); original.hidden = true;
      state.mode = mode; input.value = state[mode]; input.setCustomValidity('');
      buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.mediaMode === mode)));
      label.textContent = mode === 'music' ? '음악 또는 재생목록 링크' : '영상 링크';
      input.placeholder = mode === 'music' ? 'https://music.youtube.com/watch?v=…' : 'https://www.youtube.com/watch?v=…';
      description.textContent = mode === 'music' ? 'YouTube Music의 공개 곡·재생목록을 YouTube 플레이어로 재생합니다.' : '보고 싶은 영상이나 재생목록의 공유 링크를 붙여 넣으세요.';
      status.textContent = '링크를 불러온 뒤 플레이어의 재생 버튼을 눌러 주세요.';
      save();
    }
    function parseLink(value) {
      const url = new URL(value);
      const hosts = ['youtube.com','www.youtube.com','m.youtube.com','music.youtube.com','youtu.be','www.youtube-nocookie.com'];
      if (!['https:','http:'].includes(url.protocol) || !hosts.includes(url.hostname) || url.username || url.password || url.port) throw Error('YouTube 또는 YouTube Music의 공유 링크를 입력해 주세요.');
      const pieces = url.pathname.split('/').filter(Boolean);
      let video = '';
      if (url.hostname === 'youtu.be') video = pieces[0] || '';
      else if (url.pathname === '/watch') video = url.searchParams.get('v') || '';
      else if (['shorts','live','embed'].includes(pieces[0]) && pieces[1] !== 'videoseries') video = pieces[1] || '';
      const playlist = url.searchParams.get('list') || '';
      if (video && !/^[a-zA-Z0-9_-]{11}$/.test(video)) throw Error('영상 주소가 올바르지 않습니다. 공유 링크를 다시 복사해 주세요.');
      if (playlist && !/^[a-zA-Z0-9_-]{10,128}$/.test(playlist)) throw Error('재생목록 주소가 올바르지 않습니다.');
      if (!video && !playlist) throw Error('개별 영상·곡 또는 재생목록 링크를 입력해 주세요.');
      if (!video && !['/playlist','/embed/videoseries'].includes(url.pathname)) throw Error('재생목록의 공유 링크를 입력해 주세요.');
      const embed = new URL(`https://www.youtube-nocookie.com/embed/${video || 'videoseries'}`);
      embed.searchParams.set('playsinline','1'); embed.searchParams.set('autoplay','0');
      if (playlist) { embed.searchParams.set('listType','playlist'); embed.searchParams.set('list',playlist); }
      const rawTime = url.searchParams.get('t') || url.searchParams.get('start') || '';
      if (/^\d+$/.test(rawTime)) embed.searchParams.set('start', String(Math.min(Number(rawTime), 86400)));
      else {
        const match = rawTime.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/);
        if (rawTime && match) embed.searchParams.set('start', String(Math.min((Number(match[1]) || 0)*3600+(Number(match[2]) || 0)*60+(Number(match[3]) || 0),86400)));
      }
      const source = new URL(`https://${state.mode === 'music' ? 'music.youtube.com' : 'www.youtube.com'}/${video ? 'watch' : 'playlist'}`);
      if (video) source.searchParams.set('v',video);
      if (playlist) source.searchParams.set('list',playlist);
      return { embed, source };
    }
    input.value = state[state.mode];
    select(state.mode);
    media.open = matchMedia('(min-width: 1201px)').matches;
    buttons.forEach(button => button.addEventListener('click', () => { if (button.dataset.mediaMode !== state.mode) select(button.dataset.mediaMode); }));
    input.addEventListener('input', () => input.setCustomValidity(''));
    form.addEventListener('submit', event => {
      event.preventDefault();
      try {
        const {embed,source} = parseLink(input.value.trim());
        endPlayback();
        const player = document.createElement('iframe');
        player.title = state.mode === 'music' ? 'YouTube 음악 재생 플레이어' : 'YouTube 영상 재생 플레이어';
        player.src = embed.href;
        player.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        player.allowFullscreen = true;
        player.referrerPolicy = 'strict-origin-when-cross-origin';
        frame.append(player); frame.hidden = false; stop.hidden = false;
        original.href = source.href; original.hidden = false;
        original.textContent = state.mode === 'music' ? 'YouTube Music에서 열기 ↗' : 'YouTube에서 열기 ↗';
        state[state.mode] = input.value.trim(); save();
        status.textContent = '플레이어의 ▶ 버튼으로 재생하세요. 재생이 제한되면 원본에서 열어 주세요.';
      } catch (error) {
        status.textContent = error instanceof TypeError ? '올바른 공유 링크를 입력해 주세요.' : error.message;
        input.setCustomValidity(status.textContent); input.reportValidity();
      }
    });
    stop.addEventListener('click', () => endPlayback('재생을 종료했습니다. 다시 들으려면 플레이어를 불러오세요.'));
    media.addEventListener('toggle', () => { if (!media.open) endPlayback('플레이어를 접어 재생을 종료했습니다.'); });
  }

  const comments = document.querySelector('[data-comments]');
  if (!comments || !comments.dataset.endpoint) return;
  let endpoint;
  try {
    endpoint = new URL(comments.dataset.endpoint);
    if (endpoint.protocol !== 'https:' || endpoint.username || endpoint.password) throw Error();
  } catch { return; }
  const form = comments.querySelector('[data-comment-form]');
  if (!form) return;
  const name = form.elements.name;
  const body = form.elements.body;
  const submit = form.querySelector('button[type="submit"]');
  const refresh = comments.querySelector('[data-comments-load]');
  const more = comments.querySelector('[data-comments-more]');
  const list = comments.querySelector('[data-comment-list]');
  const status = comments.querySelector('[data-comments-status]');
  const post = comments.dataset.postPath;
  let cursor = null;
  let loading = false;
  let sending = false;
  let pending = null;
  let rendered = new Set();
  function controls() {
    refresh.disabled = loading || sending;
    more.disabled = loading || sending;
    submit.disabled = loading || sending;
  }
  async function request(url, options = {}) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(url, { ...options, credentials: 'omit', signal: controller.signal });
      const data = await response.json();
      if (!response.ok) throw Error(data.error || '댓글 처리에 실패했습니다. 잠시 후 다시 시도해 주세요.');
      return data;
    } catch (error) {
      if (error.name === 'AbortError') throw Error('응답이 지연되고 있습니다. 입력 내용은 유지됩니다. 다시 시도해 주세요.');
      throw error;
    } finally { clearTimeout(timeout); }
  }
  function render(item, prepend = false) {
    if (rendered.has(item.id)) return;
    rendered.add(item.id);
    const article = document.createElement('article'); article.className = 'comment-card';
    const meta = document.createElement('div'); meta.className = 'comment-meta';
    const author = document.createElement('strong'); author.textContent = item.name || '익명';
    const time = document.createElement('time'); time.dateTime = item.created_at;
    const date = new Date(item.created_at);
    time.textContent = Number.isNaN(date.getTime()) ? '' : date.toLocaleString('ko-KR');
    meta.append(author, time);
    const text = document.createElement('p'); text.className = 'comment-body'; text.textContent = item.body;
    article.append(meta, text);
    if (prepend) list.prepend(article); else list.append(article);
  }
  async function load(append = false) {
    if (loading || sending) return;
    loading = true; controls(); status.textContent = '댓글을 불러오는 중…';
    try {
      const url = new URL(endpoint); url.searchParams.set('post', post);
      if (append && cursor) url.searchParams.set('before', String(cursor));
      const data = await request(url);
      if (!Array.isArray(data.comments)) throw Error('댓글 응답을 확인할 수 없습니다. 다시 시도해 주세요.');
      if (!append) { list.replaceChildren(); rendered = new Set(); }
      data.comments.forEach(item => render(item));
      cursor = data.next_cursor; more.hidden = !cursor;
      status.textContent = rendered.size ? '최근 댓글부터 표시합니다.' : '아직 댓글이 없습니다. 첫 의견을 남겨 주세요.';
    } catch (error) { status.textContent = '댓글을 불러오지 못했습니다. 새로고침으로 다시 시도해 주세요.'; }
    finally { loading = false; controls(); }
  }
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending || loading) return;
    const value = { post, name: name.value.trim(), body: body.value.trim(), website: form.elements.website.value };
    if (!value.body || value.body.length > 2000 || value.name.length > 40) {
      status.textContent = '댓글은 1~2,000자, 이름은 40자 이내로 입력해 주세요.'; body.focus(); return;
    }
    // Reuse an ID after an uncertain response so a retry cannot create a duplicate.
    const fingerprint = JSON.stringify(value);
    if (!pending || pending.fingerprint !== fingerprint) pending = { fingerprint, id: crypto.randomUUID() };
    sending = true; controls(); name.readOnly = true; body.readOnly = true; submit.textContent = '작성 중…';
    status.textContent = '댓글을 저장하는 중…';
    try {
      const data = await request(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...value, request_id: pending.id }) });
      if (!data.comment || !Number.isSafeInteger(data.comment.id)) throw Error('저장 결과를 확인하지 못했습니다. 다시 시도해 주세요.');
      render(data.comment, true); body.value = ''; pending = null;
      status.textContent = '댓글이 작성되었습니다.';
    } catch (error) { status.textContent = error instanceof TypeError ? '연결에 실패했습니다. 입력 내용은 유지됩니다. 다시 시도해 주세요.' : error.message; }
    finally { sending = false; controls(); name.readOnly = false; body.readOnly = false; submit.textContent = '작성'; }
  });
  refresh.addEventListener('click', () => load());
  more.addEventListener('click', () => load(true));
  load();
})();
