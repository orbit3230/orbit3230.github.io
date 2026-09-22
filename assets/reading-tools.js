(() => {
  'use strict';
  const main = document.getElementById('site-main');
  if (!main) return;
  const body = main.querySelector('.post-body');
  const toolbar = main.querySelector('.reading-toolbar');
  const resumeKey = 'orbit-reading-resume-v1';
  const settingsKey = 'orbit-reading-settings-v1';
  function read(key) { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } }
  function write(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; } }
  function clear(key) { try { localStorage.removeItem(key); } catch {} }
  function safePath(path) {
    if (typeof path !== 'string' || !path.startsWith('/') || path.startsWith('//')) return null;
    try { const url = new URL(path, location.origin); return url.origin === location.origin ? url : null; } catch { return null; }
  }
  let previous = read(resumeKey);
  if (!previous || !safePath(previous.path) || typeof previous.title !== 'string' || !Number.isFinite(previous.ratio) || previous.ratio <= 0 || previous.ratio >= .98 || !Number.isFinite(previous.saved) || Date.now() - previous.saved > 90 * 86400000) previous = null;
  const samePost = body && previous && safePath(previous.path).pathname === location.pathname;
  let restoreRequested = false;
  if (body) {
    const url = new URL(location.href);
    restoreRequested = url.searchParams.get('resume') === '1';
    if (restoreRequested) { url.searchParams.delete('resume'); history.replaceState(history.state, '', url); }
  }
  let banner;
  function resume() {
    if (!body || !previous || !samePost) return;
    const target = body.getBoundingClientRect().top + window.scrollY + previous.ratio * Math.max(0, body.getBoundingClientRect().height - window.innerHeight);
    window.scrollTo({ top: target, behavior: 'instant' });
    body.setAttribute('tabindex', '-1'); body.focus({ preventScroll: true });
    banner?.remove();
  }
  if (previous && !restoreRequested) {
    banner = document.createElement('aside'); banner.className = 'resume-reading'; banner.setAttribute('aria-label', '이어 읽기');
    const text = document.createElement('div'); const label = document.createElement('small'); label.textContent = `이어 읽기 · ${Math.round(previous.ratio * 100)}%`;
    const title = document.createElement('strong'); title.textContent = previous.title; text.append(label, title);
    const action = document.createElement(samePost ? 'button' : 'a'); action.textContent = '이어서 읽기 →';
    if (samePost) { action.type = 'button'; action.addEventListener('click', resume); }
    else { const url = safePath(previous.path); url.searchParams.set('resume', '1'); action.href = url.href; }
    const dismiss = document.createElement('button'); dismiss.type = 'button'; dismiss.textContent = '×'; dismiss.setAttribute('aria-label', '이어 읽기 기록 지우기');
    dismiss.addEventListener('click', () => { clear(resumeKey); banner.remove(); previous = null; });
    banner.append(text, action, dismiss); main.prepend(banner);
  }
  if (!body || !toolbar) return;
  toolbar.hidden = false;
  const size = toolbar.querySelector('[data-reading-size]');
  const spacing = toolbar.querySelector('[data-reading-spacing]');
  const toggle = toolbar.querySelector('[data-focus-reading]');
  const status = toolbar.querySelector('[role="status"]');
  const settings = read(settingsKey) || {};
  size.value = ['16','18','20'].includes(settings.size) ? settings.size : '16';
  spacing.value = ['1.85','2.1'].includes(settings.spacing) ? settings.spacing : '1.85';
  function applySettings() {
    body.style.setProperty('--reading-size', `${size.value}px`);
    body.style.setProperty('--reading-spacing', spacing.value);
  }
  applySettings();
  function preservePosition(change) {
    const blocks = [...body.children];
    const anchor = blocks.find(node => node.getBoundingClientRect().bottom > 120);
    const top = anchor?.getBoundingClientRect().top;
    change();
    if (anchor && top < window.innerHeight) window.scrollBy({ top: anchor.getBoundingClientRect().top - top, behavior: 'instant' });
  }
  [size, spacing].forEach(control => control.addEventListener('change', () => {
    preservePosition(applySettings);
    status.textContent = write(settingsKey, {size:size.value, spacing:spacing.value}) ? '읽기 설정 저장됨' : '이 페이지에 적용됨';
  }));
  function setFocus(active) {
    preservePosition(() => document.body.classList.toggle('focus-reading', active));
    toggle.setAttribute('aria-pressed', String(active));
    toggle.textContent = active ? '집중 읽기 종료' : '집중해서 읽기';
    status.textContent = active ? '보조 패널을 접었습니다. Esc로 종료할 수 있습니다.' : '기본 화면으로 돌아왔습니다.';
  }
  toggle.addEventListener('click', () => setFocus(!document.body.classList.contains('focus-reading')));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !document.querySelector('dialog[open]') && document.body.classList.contains('focus-reading')) { setFocus(false); toggle.focus({preventScroll:true}); }
  });
  if (restoreRequested && samePost) requestAnimationFrame(resume);
  const title = main.querySelector('.post-header h1')?.textContent.trim() || document.title;
  let saveTimer, hasScrolled = false;
  function saveProgress() {
    clearTimeout(saveTimer); saveTimer = null;
    if (!hasScrolled || document.visibilityState === 'prerender') return;
    const rect = body.getBoundingClientRect();
    const distance = rect.height - window.innerHeight;
    if (distance <= 0) return;
    const ratio = Math.min(1, Math.max(0, -rect.top / distance));
    if (ratio >= .98) {
      if (read(resumeKey)?.path === location.pathname) clear(resumeKey);
    } else if (ratio > .02) write(resumeKey, { path:location.pathname, title, ratio, saved:Date.now() });
  }
  window.addEventListener('scroll', () => { hasScrolled = true; if (!saveTimer) saveTimer = setTimeout(saveProgress, 1200); }, {passive:true});
  window.addEventListener('pagehide', saveProgress);
  document.addEventListener('visibilitychange', () => { if (document.hidden) saveProgress(); });

  body.querySelectorAll('pre').forEach(pre => {
    if (pre.closest('.lineno, .rouge-gutter') || pre.querySelector('pre')) return;
    const wrapper = document.createElement('div'); wrapper.className = 'code-block';
    pre.before(wrapper); wrapper.append(pre);
    const copy = document.createElement('button'); copy.type = 'button'; copy.className = 'code-copy'; copy.textContent = '코드 복사';
    copy.setAttribute('aria-label', '코드 블록 복사'); wrapper.prepend(copy);
    copy.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText((pre.querySelector('code') || pre).textContent); copy.textContent = '복사됨 ✓'; status.textContent = '코드를 복사했습니다.'; }
      catch { copy.textContent = '복사 실패'; status.textContent = '자동 복사가 차단되었습니다. 코드를 직접 선택해 복사해 주세요.'; }
      setTimeout(() => { copy.textContent = '코드 복사'; }, 2000);
    });
  });
  const tables = [];
  body.querySelectorAll('table').forEach(table => {
    if (table.closest('.highlight, pre')) return;
    const wrapper = document.createElement('div'); wrapper.className = 'reading-table';
    wrapper.setAttribute('role', 'region'); wrapper.setAttribute('aria-label', '본문 표');
    const hint = document.createElement('p'); hint.className = 'table-scroll-hint'; hint.textContent = '↔ 좌우로 스크롤해 표 전체를 확인하세요.'; hint.hidden = true;
    table.before(hint, wrapper); wrapper.append(table); tables.push({wrapper, hint, table});
  });
  function updateTables() { tables.forEach(({wrapper,hint}) => { const overflow = wrapper.scrollWidth > wrapper.clientWidth + 1; hint.hidden = !overflow; if (overflow) wrapper.tabIndex = 0; else wrapper.removeAttribute('tabindex'); }); }
  if ('ResizeObserver' in window) { const observer = new ResizeObserver(updateTables); tables.forEach(({wrapper,table}) => { observer.observe(wrapper); observer.observe(table); }); }
  window.addEventListener('resize', updateTables, {passive:true}); updateTables();
})();
