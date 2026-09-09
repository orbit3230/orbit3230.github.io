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
    const account = media.querySelector('[data-media-account]');
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
      updateAccountLink();
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
    function updateAccountLink() {
      account.textContent = state.mode === 'music' ? 'YouTube Music에서 계정으로 이용 ↗' : 'YouTube에서 계정으로 이용 ↗';
      account.href = state.mode === 'music' ? 'https://music.youtube.com/' : 'https://www.youtube.com/';
      if (input.value.trim()) {
        try { account.href = parseLink(input.value.trim()).source.href; } catch { /* Invalid links never leave the trusted service homepage. */ }
      }
    }
    input.value = state[state.mode];
    select(state.mode);
    media.open = matchMedia('(min-width: 1201px)').matches;
    buttons.forEach(button => button.addEventListener('click', () => { if (button.dataset.mediaMode !== state.mode) select(button.dataset.mediaMode); }));
    input.addEventListener('input', () => { input.setCustomValidity(''); updateAccountLink(); });
    [account, original].forEach(link => link.addEventListener('click', () => {
      state[state.mode] = input.value.trim(); save();
      endPlayback('원본 서비스를 열었습니다. 계정 선택과 로그인은 열린 서비스에서 진행해 주세요.');
    }));
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
  if (comments) {
    const repo = comments.dataset.repo;
    if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repo)) return;
    const title = `[블로그 댓글] ${comments.dataset.postPath}`;
    const base = `https://github.com/${repo}/issues`;
    const query = `repo:${repo} is:issue in:title "${title}"`;
    const write = comments.querySelector('[data-comments-write]');
    const load = comments.querySelector('[data-comments-load]');
    const more = comments.querySelector('[data-comments-more]');
    const list = comments.querySelector('[data-comment-list]');
    const status = comments.querySelector('[data-comments-status]');
    const searchURL = new URL(base); searchURL.searchParams.set('q', `is:issue in:title "${title}"`);
    write.href = searchURL.href;
    let issue = null;
    let page = 1;
    let busy = false;
    let blockedUntil = 0;
    const validGithubURL = value => {
      try { const url = new URL(value); return url.protocol === 'https:' && url.hostname === 'github.com' ? url.href : base; } catch { return base; }
    };
    async function request(url) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 12000);
      try {
        const response = await fetch(url, { credentials: 'omit', headers: { Accept: 'application/vnd.github+json' }, signal: controller.signal });
        if (!response.ok) {
          if (response.status === 403 || response.status === 429) {
            const retry = Number(response.headers.get('retry-after'));
            const reset = Number(response.headers.get('x-ratelimit-reset')) * 1000;
            blockedUntil = Math.max(Date.now() + (retry > 0 ? retry : 60) * 1000, Number.isFinite(reset) ? reset : 0);
            throw Error('GitHub의 조회 한도에 도달했습니다. 잠시 후 다시 시도하거나 GitHub에서 확인해 주세요.');
          }
          throw Error('댓글을 불러오지 못했습니다. GitHub에서 대화를 확인하거나 다시 시도해 주세요.');
        }
        return { data: await response.json(), hasNext: (response.headers.get('link') || '').includes('rel="next"') };
      } finally { clearTimeout(timeout); }
    }
    function renderComment(comment, first = false) {
      const article = document.createElement('article'); article.className = 'comment-card';
      const header = document.createElement('div'); header.className = 'comment-meta';
      const author = document.createElement('a'); author.textContent = comment.user?.login || '삭제된 사용자'; author.href = validGithubURL(comment.user?.html_url); author.target = '_blank'; author.rel = 'noopener noreferrer';
      const date = document.createElement('a'); date.href = validGithubURL(comment.html_url); date.target = '_blank'; date.rel = 'noopener noreferrer';
      const parsedDate = new Date(comment.created_at);
      date.textContent = Number.isNaN(parsedDate.getTime()) ? 'GitHub에서 보기' : parsedDate.toLocaleDateString('ko-KR');
      header.append(author,date);
      if (first) { const badge = document.createElement('span'); badge.textContent = '대화 시작'; header.append(badge); }
      const body = document.createElement('p'); body.className = 'comment-body'; body.textContent = comment.body || '(내용 없음)';
      article.append(header,body); list.append(article);
    }
    async function loadDiscussion(append = false) {
      if (busy) return;
      if (Date.now() < blockedUntil) { status.textContent = 'GitHub 조회 한도가 회복된 뒤 다시 시도해 주세요. GitHub에서 댓글을 확인할 수 있습니다.'; return; }
      busy = true; load.disabled = true; more.disabled = true;
      status.textContent = '공개 댓글을 불러오는 중…';
      try {
        if (!append) {
          page = 1;
          const url = new URL('https://api.github.com/search/issues');
          url.searchParams.set('q',query); url.searchParams.set('per_page','100'); url.searchParams.set('sort','created'); url.searchParams.set('order','asc');
          const result = await request(url.href);
          if (result.data.incomplete_results) throw Error('GitHub 검색이 지연되고 있습니다. 잠시 후 다시 확인해 주세요.');
          issue = result.data.items.find(item => !item.pull_request && item.title === title && Number.isSafeInteger(item.number));
          list.replaceChildren(); more.hidden = true;
          if (!issue) {
            const create = new URL(`${base}/new`);
            create.searchParams.set('title',title);
            create.searchParams.set('body',`글: ${comments.dataset.postTitle}\n${comments.dataset.postUrl}\n\n의견을 아래에 작성해 주세요. 이 제목은 글과 댓글을 연결하므로 그대로 두세요.\n\n`);
            write.href = create.href; write.textContent = '첫 의견 남기기 ↗';
            status.textContent = '아직 대화가 없습니다. 첫 의견은 GitHub에서 새 대화로 등록됩니다. 작성 직후에는 검색 반영까지 잠시 걸릴 수 있습니다.';
            return;
          }
          write.href = `${base}/${issue.number}#new_comment_field`;
          write.textContent = issue.locked ? 'GitHub에서 대화 보기 ↗' : 'GitHub에서 댓글 쓰기 ↗';
          renderComment(issue,true);
        }
        if (!issue) return;
        const result = await request(`https://api.github.com/repos/${repo}/issues/${issue.number}/comments?per_page=20&page=${page}`);
        result.data.forEach(comment => renderComment(comment));
        page += 1; more.hidden = !result.hasNext;
        status.textContent = issue.locked ? '작성자가 잠근 대화입니다. 기존 댓글은 읽을 수 있습니다.' : '등록된 공개 의견입니다. 작성 후 새로고침을 눌러 확인해 주세요.';
      } catch (error) {
        status.textContent = error.name === 'AbortError' ? 'GitHub 응답이 지연됩니다. 잠시 후 다시 시도해 주세요.' : error.name === 'TypeError' ? '네트워크 연결을 확인한 뒤 다시 시도하거나 GitHub에서 대화를 확인해 주세요.' : error.message;
      } finally {
        busy = false; load.disabled = false; more.disabled = false; load.textContent = '댓글 새로고침';
      }
    }
    load.addEventListener('click', () => loadDiscussion());
    more.addEventListener('click', () => loadDiscussion(true));
  }
})();
