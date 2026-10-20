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
    if (document.querySelector('dialog[open]')) return;
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
  const year = search.querySelector('[data-search-year]');
  const tag = search.querySelector('[data-search-tag]');
  const pager = search.querySelector('.search-pagination');
  let generation = 0, timer, page = 1, total = 0;
  async function runSearch() {
    const current = ++generation;
    const query = input.value.trim();
    results.replaceChildren(); tags.replaceChildren(); pager.hidden = true;
    if (!query && !year.value && !tag.value) { status.textContent = '검색어를 입력하거나 연도·태그를 선택하세요.'; return; }
    status.textContent = '글을 검색하고 있습니다…';
    try {
      const found = await window.OrbitSearch.search(query, {year:year.value, tag:tag.value}, page);
      if (current !== generation || !search.open) return;
      total = found.total;
      found.posts.forEach(post => {
        const url = safeURL(post.url); if (!url) return;
        const row = document.createElement('li'), link = document.createElement('a');
        link.href = url.href;
        const title = document.createElement('strong'); window.OrbitSearch.markText(title, post.title, query);
        const detail = document.createElement('small'); detail.textContent = [post.date, ...post.tags.slice(0,2)].filter(Boolean).join(' · ');
        const excerpt = document.createElement('p'); excerpt.className = 'search-excerpt';
        window.OrbitSearch.markExcerpt(excerpt, post.excerpt, query, post.richExcerpt);
        link.append(title, detail, excerpt); row.append(link);
        post.sections.slice(0,2).forEach(section => {
          const target = safeURL(section.url); if (!target || !target.hash || target.pathname !== url.pathname) return;
          const jump = document.createElement('a'); jump.className = 'search-section'; jump.href = target.href;
          jump.textContent = `↳ ${section.title}`; row.append(jump);
        });
        results.append(row);
      });
      const pages = Math.max(1, Math.ceil(total / 5));
      pager.hidden = pages <= 1;
      pager.querySelector('[data-search-prev]').disabled = page <= 1;
      pager.querySelector('[data-search-next]').disabled = page >= pages;
      pager.querySelector('[data-search-page]').textContent = `${page} / ${pages}`;
      status.textContent = total ? `${total}개의 글 · ${page} / ${pages} 페이지` : '검색 결과가 없습니다. 검색어나 필터를 바꿔보세요.';
      results.scrollTop = 0;
    } catch {
      if (current === generation && search.open) status.textContent = '검색을 불러오지 못했습니다. Enter로 재시도해 주세요.';
    }
  }
  [year, tag].forEach(control => control.addEventListener('change', () => { page = 1; runSearch(); }));
  search.querySelector('[data-search-reset]').addEventListener('click', () => { input.value = ''; year.value = ''; tag.value = ''; page = 1; runSearch(); input.focus(); });
  pager.querySelector('[data-search-prev]').addEventListener('click', () => { if (page > 1) { page--; runSearch(); } });
  pager.querySelector('[data-search-next]').addEventListener('click', () => { if (page * 5 < total) { page++; runSearch(); } });
  const sidebarInput = document.querySelector('.sidebar-search input');
  sidebarInput?.addEventListener('input', event => {
    if (event.isComposing) return;
    input.value = sidebarInput.value; page = 1; openSearch(sidebarInput);
  });
  sidebarInput?.addEventListener('keydown', event => {
    if (event.key === 'Enter') { event.preventDefault(); input.value = sidebarInput.value; page = 1; openSearch(sidebarInput); }
  });
  function openSearch(source) {
    if (!search.open && document.querySelector('dialog[open]')) return;
    open(search, source); input.focus(); runSearch();
  }
  document.querySelectorAll('.quick-search-trigger').forEach(button => {
    button.hidden = false; button.addEventListener('click', () => openSearch(button));
  });
  document.addEventListener('keydown', event => {
    if (event.isComposing || event.repeat || event.altKey || !(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== 'k') return;
    if (!search.open && document.querySelector('dialog[open]')) return;
    event.preventDefault();
    if (search.open) search.close(); else openSearch(document.activeElement);
  });
  input.addEventListener('input', () => { page = 1; ++generation; clearTimeout(timer); timer = setTimeout(runSearch, 180); });
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
    if (!button || document.querySelector('dialog[open]')) return;
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
