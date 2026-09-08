(() => {
  'use strict';
  const normalize = (value) => String(value || '').normalize('NFKC').toLocaleLowerCase().trim();
  const decode = (value) => { try { return decodeURIComponent(value); } catch { return value; } };
  const termsFor = (value) => normalize(value).split(/\s+/).filter(Boolean);
  const matches = (text, terms) => terms.every((term) => text.includes(term));

  const archive = document.querySelector('[data-archive]');
  if (archive) {
    const mode = archive.dataset.mode;
    const query = archive.querySelector('#archive-query');
    const year = archive.querySelector('#archive-year');
    const chips = [...archive.querySelectorAll('[data-filter]')];
    const entries = [...archive.querySelectorAll('[data-post]')].map((element) => {
      const tags = JSON.parse(element.dataset.tags || '[]').flat();
      const categories = JSON.parse(element.dataset.categories || '[]').flat();
      return { element, tags, categories, year: element.dataset.year,
        text: normalize([element.dataset.title, ...tags, ...categories].join(' ')) };
    });
    const selection = archive.querySelector('#archive-selection');
    const count = archive.querySelector('#archive-count');
    const empty = archive.querySelector('.empty-state');
    const more = archive.querySelector('.load-more');
    const moreButton = archive.querySelector('[data-load-more]');
    const moreStatus = archive.querySelector('[data-load-status]');
    const toggle = archive.querySelector('.filter-toggle');
    const pageSize = 20;
    let active = '';
    let limit = pageSize;
    let expanded = false;
    let filtered = [];

    function render() {
      const terms = termsFor(query.value);
      filtered = entries.filter((entry) => (!year.value || entry.year === year.value)
        && (!active || mode === 'years' || entry[mode].includes(active)) && matches(entry.text, terms));
      const visible = new Set(filtered.slice(0, limit));
      entries.forEach((entry) => { entry.element.hidden = !visible.has(entry); });
      chips.forEach((chip, index) => {
        chip.setAttribute('aria-pressed', String(chip.dataset.filter === active));
        chip.hidden = !expanded && index > 10 && chip.dataset.filter !== active;
      });
      const label = mode === 'years' ? (year.value ? `${year.value}년의 기록` : '전체 기록') : (active || '전체 기록');
      selection.textContent = label;
      count.textContent = `${filtered.length}개의 글 · 최신순`;
      empty.hidden = filtered.length !== 0;
      more.hidden = filtered.length <= limit;
      moreStatus.textContent = `${Math.min(limit, filtered.length)} / ${filtered.length}개의 기록`;
      moreButton.textContent = `기록 더 보기 (+${Math.min(pageSize, Math.max(0, filtered.length - limit))})`;
    }

    function writeURL(replace = false) {
      const url = new URL(location.href);
      const text = query.value.trim();
      text ? url.searchParams.set('q', text) : url.searchParams.delete('q');
      mode !== 'years' && year.value ? url.searchParams.set('year', year.value) : url.searchParams.delete('year');
      const selected = chips.find((chip) => chip.dataset.filter === active);
      url.hash = selected?.dataset.slug ? encodeURIComponent(selected.dataset.slug) : '';
      if (url.href !== location.href) history[replace ? 'replaceState' : 'pushState'](null, '', url);
    }

    function readURL() {
      const url = new URL(location.href);
      query.value = url.searchParams.get('q') || '';
      const slug = decode(url.hash.slice(1));
      const selected = chips.find((chip) => chip.dataset.slug === slug || chip.dataset.filter === slug);
      active = selected?.dataset.filter || '';
      year.value = mode === 'years' ? active : (url.searchParams.get('year') || '');
      if (!year.value) year.value = '';
      limit = pageSize;
      render();
    }

    chips.forEach((chip) => chip.addEventListener('click', () => {
      active = chip.dataset.filter;
      if (mode === 'years') year.value = active;
      limit = pageSize;
      writeURL();
      render();
    }));
    query.addEventListener('input', () => { limit = pageSize; writeURL(true); render(); });
    year.addEventListener('change', () => {
      if (mode === 'years') active = year.value;
      limit = pageSize; writeURL(); render();
    });
    archive.querySelector('[data-reset]').addEventListener('click', () => {
      active = ''; query.value = ''; year.value = ''; limit = pageSize;
      writeURL(); render(); query.focus();
    });
    moreButton.addEventListener('click', () => {
      const next = filtered[limit];
      limit += pageSize; render();
      next?.element.querySelector('.post-title a')?.focus({ preventScroll: true });
    });
    toggle.hidden = chips.length <= 11;
    toggle.addEventListener('click', () => {
      expanded = !expanded;
      toggle.setAttribute('aria-expanded', String(expanded));
      toggle.textContent = expanded ? '태그 접기' : '태그 모두 보기';
      render();
    });
    archive.querySelector('.archive-tools').hidden = false;
    archive.querySelector('.filter-section').hidden = false;
    addEventListener('popstate', readURL);
    addEventListener('hashchange', readURL);
    readURL();
  }

  const search = document.querySelector('.sidebar-search');
  if (search) {
    const input = search.querySelector('input');
    const results = search.querySelector('.search-results');
    const status = search.querySelector('[role="status"]');
    let indexPromise;
    let timer;
    let generation = 0;
    function loadIndex() {
      if (!indexPromise) {
        indexPromise = fetch(search.dataset.searchUrl).then((response) => {
          if (!response.ok) throw new Error('Search index unavailable');
          return response.json();
        }).then((posts) => posts.map((post) => ({ ...post,
          heading: normalize([post.title, ...(post.tags || []).flat()].join(' ')),
          body: normalize(post.content) }))).catch((error) => { indexPromise = null; throw error; });
      }
      return indexPromise;
    }
    async function runSearch() {
      const current = ++generation;
      const terms = termsFor(input.value);
      results.replaceChildren(); results.hidden = true;
      if (!terms.length) { status.textContent = ''; return; }
      status.textContent = '검색 중…';
      try {
        const index = await loadIndex();
        if (current !== generation) return;
        const headingMatches = index.filter((post) => matches(post.heading, terms));
        const headingSet = new Set(headingMatches);
        const bodyMatches = index.filter((post) => !headingSet.has(post) && matches(`${post.heading} ${post.body}`, terms));
        const found = [...headingMatches, ...bodyMatches];
        found.slice(0, 12).forEach((post) => {
          const url = new URL(post.url, location.href);
          if (url.origin !== location.origin) return;
          const item = document.createElement('li');
          const link = document.createElement('a');
          const date = document.createElement('small');
          link.href = url.href; link.textContent = post.title;
          date.textContent = post.date; link.append(date); item.append(link); results.append(item);
        });
        results.hidden = !found.length;
        status.textContent = found.length ? `${found.length}개 검색됨${found.length > 12 ? ' · 상위 12개 표시' : ''}` : '검색 결과가 없습니다.';
      } catch {
        if (current === generation) status.textContent = '검색을 불러오지 못했습니다. 다시 입력해 주세요.';
      }
    }
    input.addEventListener('input', () => {
      ++generation; clearTimeout(timer); timer = setTimeout(runSearch, 160);
    });
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        ++generation; clearTimeout(timer); input.value = ''; status.textContent = ''; results.replaceChildren(); results.hidden = true;
      }
    });
  }

  const toc = document.querySelector('.toc-wrapper');
  if (toc) {
    // Small screens start with a compact, explicitly expandable table of contents.
    if (matchMedia('(max-width: 1200px)').matches) toc.open = false;
    const links = [...toc.querySelectorAll('.toc-nav a')];
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((records) => {
        const visible = records.filter((entry) => entry.isIntersecting);
        if (!visible.length) return;
        const id = visible[0].target.id;
        links.forEach((link) => {
          if (decode(link.hash.slice(1)) === id) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }, { rootMargin: '-5% 0px -70% 0px' });
      links.forEach((link) => { const heading = document.getElementById(decode(link.hash.slice(1))); if (heading) observer.observe(heading); });
    }
  }
})();
