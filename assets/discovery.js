(() => {
  'use strict';
  const search = document.getElementById('quick-search');
  const preview = document.getElementById('post-preview-dialog');
  if (!search || !preview || typeof search.showModal !== 'function') return;
  const normalize = value => String(value || '').normalize('NFKC').toLocaleLowerCase().trim();
  const safeURL = value => {
    try { const url = new URL(value, location.href); return url.origin === location.origin && /^https?:$/.test(url.protocol) ? url : null; } catch { return null; }
  };
  let opener;
  function open(dialog, source) {
    if (search.open || preview.open) return;
    opener = source || document.activeElement;
    dialog.showModal();
  }
  [search, preview].forEach(dialog => {
    dialog.querySelector('[data-dialog-close]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => {
      if (opener?.isConnected && !opener.closest('[hidden]')) opener.focus({ preventScroll: true });
    });
  });
  const input = search.querySelector('input');
  const status = search.querySelector('[data-search-status]');
  const results = search.querySelector('.quick-results');
  const tags = search.querySelector('.quick-tags');
  let indexPromise, generation = 0, timer;
  function loadIndex() {
    if (!indexPromise) indexPromise = fetch(search.dataset.searchUrl).then(response => {
      if (!response.ok) throw Error('Search unavailable');
      return response.json();
    }).then(posts => posts.map(post => ({ ...post, tags: (post.tags || []).flat(),
      heading: normalize([post.title, ...(post.tags || []).flat()].join(' ')), body: normalize(post.content) })))
      .catch(error => { indexPromise = null; throw error; });
    return indexPromise;
  }
  async function runSearch() {
    const current = ++generation;
    const terms = normalize(input.value).split(/\s+/).filter(Boolean);
    results.replaceChildren(); tags.replaceChildren();
    if (!terms.length) { status.textContent = '검색어를 입력하세요.'; return; }
    status.textContent = '글을 검색하고 있습니다…';
    try {
      const posts = await loadIndex();
      if (current !== generation || !search.open) return;
      const matches = value => terms.every(term => value.includes(term));
      const headings = posts.filter(post => matches(post.heading));
      const headingSet = new Set(headings);
      const found = [...headings, ...posts.filter(post => !headingSet.has(post) && matches(`${post.heading} ${post.body}`))];
      const tagMatches = [...new Set(posts.flatMap(post => post.tags))].filter(tag => matches(normalize(tag)));
      tagMatches.slice(0, 6).forEach(tag => {
        const url = safeURL(search.dataset.tagsUrl); if (!url) return;
        url.hash = tag;
        const link = document.createElement('a'); link.href = url.href; link.textContent = `# ${tag}`; tags.append(link);
      });
      found.slice(0, 12).forEach(post => {
        const url = safeURL(post.url); if (!url) return;
        const item = document.createElement('li');
        const link = document.createElement('a'); link.href = url.href;
        const title = document.createElement('strong'); title.textContent = post.title;
        const detail = document.createElement('small'); detail.textContent = [post.date, ...post.tags.slice(0, 2)].join(' · ');
        link.append(title, detail); item.append(link); results.append(item);
      });
      status.textContent = found.length ? `${found.length}개의 글${found.length > 12 ? ' · 상위 12개 표시' : ''}${tagMatches.length ? ` · 일치하는 태그 ${tagMatches.length}개` : ''}` : '검색 결과가 없습니다. 다른 검색어를 입력해 보세요.';
    } catch { if (current === generation && search.open) status.textContent = '검색을 불러오지 못했습니다. 검색어를 다시 입력하거나 Enter로 재시도해 주세요.'; }
  }
  function openSearch(source) { open(search, source); input.focus(); runSearch(); }
  document.querySelectorAll('.quick-search-trigger').forEach(button => {
    button.hidden = false; button.addEventListener('click', () => openSearch(button));
  });
  document.addEventListener('keydown', event => {
    if (event.isComposing || event.repeat || event.altKey || !(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== 'k') return;
    event.preventDefault(); if (preview.open) return;
    if (search.open) search.close(); else openSearch(document.activeElement);
  });
  input.addEventListener('input', () => { ++generation; clearTimeout(timer); timer = setTimeout(runSearch, 140); });
  input.addEventListener('keydown', event => { if (event.key === 'Enter' && !event.isComposing) { event.preventDefault(); clearTimeout(timer); runSearch(); } });
  search.addEventListener('close', () => { ++generation; clearTimeout(timer); });

  let previewRequest, previewGeneration = 0;
  const cache = new Map();
  function enhanceCards() {
    document.querySelectorAll('.post-preview[hidden]').forEach(button => { button.hidden = false; });
  }
  document.addEventListener('blog:listing-rendered', enhanceCards);
  enhanceCards();
  preview.addEventListener('close', () => { ++previewGeneration; previewRequest?.abort(); });
  document.addEventListener('click', async event => {
    const button = event.target.closest('.post-preview');
    if (!button || preview.open || search.open) return;
    const card = button.closest('.post-entry');
    const link = card?.querySelector('.post-title a');
    const url = safeURL(link?.href); if (!url) return;
    const current = ++previewGeneration;
    preview.querySelector('#preview-title').textContent = link.textContent;
    const summary = preview.querySelector('[data-preview-summary]');
    summary.textContent = card.querySelector('.entry-excerpt')?.textContent || '';
    const outline = preview.querySelector('ol'); outline.replaceChildren();
    const state = preview.querySelector('[data-preview-status]'); state.textContent = '목차를 불러오는 중…';
    preview.querySelector('.preview-read').href = url.href;
    open(preview, button);
    previewRequest?.abort(); previewRequest = new AbortController();
    const controller = previewRequest;
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      let data = cache.get(url.href);
      if (!data) {
        const response = await fetch(url.href, { signal: controller.signal });
        if (!response.ok) throw Error('Preview unavailable');
        const page = new DOMParser().parseFromString(await response.text(), 'text/html');
        const body = page.querySelector('.post-body');
        if (!body) throw Error('Article missing');
        data = { headings: [...body.querySelectorAll('h1[id],h2[id],h3[id],h4[id]')].map(heading => ({text:heading.textContent, id:heading.id})),
          summary: [...body.querySelectorAll('p')].find(p => p.textContent.trim().length > 40)?.textContent.trim().slice(0, 450) || '' };
        if (cache.size >= 20) cache.delete(cache.keys().next().value);
        cache.set(url.href, data);
      }
      if (current !== previewGeneration || !preview.open) return;
      if (!summary.textContent.trim()) summary.textContent = data.summary || '목차를 확인하거나 전체 글을 열어 읽어보세요.';
      data.headings.slice(0, 24).forEach(heading => {
        const item = document.createElement('li'); const a = document.createElement('a');
        const target = new URL(url); target.hash = heading.id;
        a.href = target.href; a.textContent = heading.text; item.append(a); outline.append(item);
      });
      state.textContent = data.headings.length ? `목차 ${data.headings.length}개${data.headings.length > 24 ? ' · 앞의 24개 표시' : ''}` : '등록된 목차가 없는 글입니다.';
    } catch { if (current === previewGeneration && preview.open) state.textContent = '목차를 불러오지 못했습니다. 아래에서 글 전체를 열 수 있습니다.'; }
    finally { clearTimeout(timeout); }
  });
})();
