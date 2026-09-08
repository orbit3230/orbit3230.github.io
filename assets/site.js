(() => {
  'use strict';
  const normalize = (value) => String(value || '').normalize('NFKC').toLocaleLowerCase().trim();
  const decode = (value) => { try { return decodeURIComponent(value); } catch { return value; } };
  const termsFor = (value) => normalize(value).split(/\s+/).filter(Boolean);
  const matches = (text, terms) => terms.every((term) => text.includes(term));

  const archive = document.querySelector('[data-archive]');
  if (archive) {
    async function initializeListing() {
      const mode = archive.dataset.mode;
      const recent = mode === 'recent';
      const query = archive.querySelector('#archive-query');
      const year = archive.querySelector('#archive-year');
      const chips = [...archive.querySelectorAll('[data-filter]')];
      const container = archive.querySelector('#archive-posts');
      const arrowIcon = container.querySelector('.entry-arrow svg')?.cloneNode(true);
      let entries;
      if (recent) {
        const response = await fetch(archive.dataset.indexUrl);
        if (!response.ok) throw new Error('Post index unavailable');
        const posts = await response.json();
        entries = posts.map(post => ({ ...post, tags: (post.tags || []).flat(), categories: (post.categories || []).flat(), element: null }));
      } else {
        entries = [...container.querySelectorAll('[data-post]')].map(element => ({
          element, title: element.dataset.title, year: element.dataset.year,
          tags: JSON.parse(element.dataset.tags || '[]').flat(),
          categories: JSON.parse(element.dataset.categories || '[]').flat()
        }));
      }
      entries.forEach(entry => { entry.text = normalize([entry.title, ...entry.tags, ...entry.categories].join(' ')); });
      const selection = archive.querySelector('#archive-selection');
      const count = archive.querySelector('#archive-count');
      const empty = archive.querySelector('.empty-state');
      const toggle = archive.querySelector('.filter-toggle');
      const sizeSelect = archive.querySelector('[data-page-size]');
      const pagination = archive.querySelector('.listing-pagination');
      const numbers = pagination.querySelector('[data-page-numbers]');
      const jump = pagination.querySelector('.page-jump');
      const jumpInput = jump.querySelector('input');
      const pageStatus = pagination.querySelector('[data-page-status]');
      const initialPath = location.pathname;
      const validSizes = [5, 10, 20, 50];
      let pageSize = 5;
      let page = 1;
      let totalPages = 1;
      let active = '';
      let expanded = false;
      let filtered = [];

      function makeCard(post) {
        const element = document.createElement('article');
        element.className = 'post-entry';
        element.dataset.post = '';
        element.dataset.title = post.title;
        element.dataset.year = post.year;
        element.dataset.tags = JSON.stringify(post.tags);
        const link = (url, text, className) => {
          const a = document.createElement('a');
          const target = new URL(url, location.href);
          a.href = target.origin === location.origin ? target.href : '#';
          a.textContent = text;
          if (className) a.className = className;
          return a;
        };
        const meta = document.createElement('div');
        meta.className = 'entry-meta';
        const timeLink = link(post.year_url, '');
        const time = document.createElement('time');
        time.dateTime = post.datetime; time.textContent = post.date;
        timeLink.append(time); meta.append(timeLink);
        const line = document.createElement('span'); line.className = 'meta-line'; meta.append(line);
        post.tag_links.forEach(tag => meta.append(link(tag.url, tag.label, 'entry-tag')));
        const title = document.createElement('h2'); title.className = 'post-title'; title.append(link(post.url, post.title));
        const excerpt = document.createElement('p'); excerpt.className = 'entry-excerpt'; excerpt.textContent = post.excerpt;
        const arrow = link(post.url, '', 'entry-arrow'); arrow.setAttribute('aria-label', `${post.title} 읽기`);
        if (arrowIcon) arrow.append(arrowIcon.cloneNode(true));
        element.append(meta, title, excerpt, arrow);
        return element;
      }

      function stateURL(targetPage = page) {
        const url = new URL(location.href);
        if (recent) url.pathname = archive.dataset.homeUrl;
        const text = query?.value.trim() || '';
        text ? url.searchParams.set('q', text) : url.searchParams.delete('q');
        mode !== 'years' && year?.value ? url.searchParams.set('year', year.value) : url.searchParams.delete('year');
        pageSize === 5 ? url.searchParams.delete('size') : url.searchParams.set('size', pageSize);
        targetPage === 1 ? url.searchParams.delete('page') : url.searchParams.set('page', targetPage);
        const selected = chips.find(chip => chip.dataset.filter === active);
        url.hash = selected?.dataset.slug ? encodeURIComponent(selected.dataset.slug) : '';
        return url;
      }
      function writeURL(replace = false) {
        const url = stateURL();
        if (url.href !== location.href) history[replace ? 'replaceState' : 'pushState'](null, '', url);
      }
      function render() {
        const terms = termsFor(query?.value);
        filtered = entries.filter(entry => (!year?.value || entry.year === year.value)
          && (!active || mode === 'years' || entry[mode].includes(active)) && matches(entry.text, terms));
        totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
        page = Math.max(1, Math.min(page, totalPages));
        const visible = filtered.slice((page - 1) * pageSize, page * pageSize);
        if (recent) {
          container.replaceChildren(...visible.map(entry => entry.element || (entry.element = makeCard(entry))));
        } else {
          const visibleSet = new Set(visible);
          entries.forEach(entry => { entry.element.hidden = !visibleSet.has(entry); });
        }
        chips.forEach((chip, index) => {
          chip.setAttribute('aria-pressed', String(chip.dataset.filter === active));
          chip.hidden = !expanded && index > 10 && chip.dataset.filter !== active;
        });
        selection.textContent = recent ? '최근 글' : mode === 'years' ? (year.value ? `${year.value}년의 기록` : '전체 기록') : (active || '전체 기록');
        count.textContent = `${filtered.length}개의 글 · 최신순`;
        if (empty) empty.hidden = filtered.length !== 0;
        pagination.hidden = filtered.length === 0;
        sizeSelect.value = String(pageSize);
        jumpInput.max = String(totalPages); jumpInput.value = String(page);
        pageStatus.textContent = `${page} / ${totalPages} 페이지`;
        const start = Math.floor((page - 1) / 10) * 10 + 1;
        numbers.replaceChildren();
        for (let number = start; number <= Math.min(start + 9, totalPages); number++) {
          const a = document.createElement('a');
          a.textContent = String(number); a.dataset.page = String(number);
          a.dataset.pageNumber = ''; a.href = stateURL(number).href;
          a.setAttribute('aria-label', `${number}페이지`);
          if (number === page) a.setAttribute('aria-current', 'page');
          numbers.append(a);
        }
        const steps = { first: 1, previous: page - 1, next: page + 1, last: totalPages };
        pagination.querySelectorAll('[data-page-step]').forEach(a => {
          const target = steps[a.dataset.pageStep];
          const disabled = target < 1 || target > totalPages || target === page;
          a.dataset.page = String(target);
          a.setAttribute('aria-disabled', String(disabled));
          if (disabled) { a.removeAttribute('href'); a.tabIndex = -1; }
          else { a.href = stateURL(target).href; a.removeAttribute('tabindex'); }
        });
      }
      function navigate(target) {
        if (!Number.isSafeInteger(target) || target < 1 || target > totalPages || target === page) return;
        page = target; render(); writeURL();
        const heading = archive.querySelector('[data-list-heading]');
        heading.focus({ preventScroll: true });
        heading.scrollIntoView?.({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      }
      function readURL() {
        const url = new URL(location.href);
        if (query) query.value = url.searchParams.get('q') || '';
        const slug = decode(url.hash.slice(1));
        active = chips.find(chip => chip.dataset.slug === slug || chip.dataset.filter === slug)?.dataset.filter || '';
        if (year) { year.value = mode === 'years' ? active : (url.searchParams.get('year') || ''); if (!year.value) year.value = ''; }
        const requestedSize = Number(url.searchParams.get('size'));
        pageSize = validSizes.includes(requestedSize) ? requestedSize : 5;
        const legacyPage = recent && location.pathname === initialPath ? Number(archive.dataset.initialPage) : 1;
        const requestedPage = url.searchParams.has('page') ? Number(url.searchParams.get('page')) : legacyPage;
        page = Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
        render(); writeURL(true);
      }
      function filterChanged(replace = false) { page = 1; render(); writeURL(replace); }
      chips.forEach(chip => chip.addEventListener('click', () => {
        active = chip.dataset.filter;
        if (mode === 'years') year.value = active;
        filterChanged();
      }));
      query?.addEventListener('input', () => filterChanged(true));
      year?.addEventListener('change', () => { if (mode === 'years') active = year.value; filterChanged(); });
      sizeSelect.addEventListener('change', () => { pageSize = Number(sizeSelect.value); filterChanged(); });
      archive.querySelector('[data-reset]')?.addEventListener('click', () => {
        active = ''; query.value = ''; year.value = ''; filterChanged(); query.focus();
      });
      pagination.addEventListener('click', event => {
        const a = event.target.closest('a[data-page]');
        if (!a || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        if (a.getAttribute('aria-disabled') !== 'true') navigate(Number(a.dataset.page));
      });
      jump.addEventListener('submit', event => {
        event.preventDefault();
        if (jumpInput.reportValidity()) navigate(Number(jumpInput.value));
      });
      if (toggle) {
        toggle.hidden = chips.length <= 11;
        toggle.addEventListener('click', () => {
          expanded = !expanded; toggle.setAttribute('aria-expanded', String(expanded));
          toggle.textContent = expanded ? '태그 접기' : '태그 모두 보기'; render();
        });
      }
      archive.querySelectorAll('.archive-tools, .filter-section, .page-size-control').forEach(element => { element.hidden = false; });
      const fallback = archive.querySelector('[data-pagination-fallback]');
      if (fallback) fallback.hidden = true;
      addEventListener('popstate', readURL);
      addEventListener('hashchange', readURL);
      readURL();
    }
    let initializing = false;
    async function startListing() {
      if (initializing) return;
      initializing = true;
      const error = archive.querySelector('[data-list-error]');
      const retry = archive.querySelector('[data-list-retry]');
      if (retry) retry.disabled = true;
      try {
        await initializeListing();
        if (error) error.hidden = true;
      } catch (failure) {
        if (error) error.hidden = false;
      } finally {
        initializing = false;
        if (retry) retry.disabled = false;
      }
    }
    archive.querySelector('[data-list-retry]')?.addEventListener('click', startListing);
    startListing();
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
