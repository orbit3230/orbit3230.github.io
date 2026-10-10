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
  // The reading controls float above the article only when requested.
  toolbar.classList.add('reading-toolbar-autohide');
  toolbar.id = 'reading-toolbar';
  toolbar.inert = true;
  toolbar.setAttribute('aria-hidden', 'true');
  const toolbarTrigger = document.createElement('button');
  toolbarTrigger.type = 'button'; toolbarTrigger.className = 'reading-toolbar-trigger';
  toolbarTrigger.textContent = '읽기 설정 열기';
  toolbarTrigger.setAttribute('aria-controls', toolbar.id);
  toolbarTrigger.setAttribute('aria-expanded', 'false');
  toolbar.before(toolbarTrigger);
  let hideTimer, keyboardNavigation = false, pointerInside = false, pointerNearTop = false, selectOpen = false;
  function positionToolbar() {
    const rect = body.getBoundingClientRect();
    const width = Math.max(0, Math.min(rect.width, window.innerWidth - 32));
    const left = Math.max(16, Math.min(rect.left, window.innerWidth - width - 16));
    toolbar.style.setProperty('--toolbar-left', `${left}px`);
    toolbar.style.setProperty('--toolbar-width', `${width}px`);
  }
  function hideToolbar(force = false) {
    clearTimeout(hideTimer);
    if (!force && (pointerInside || pointerNearTop || selectOpen || (keyboardNavigation && toolbar.contains(document.activeElement)))) return;
    if (toolbar.contains(document.activeElement)) document.activeElement.blur();
    toolbar.classList.remove('is-revealed');
    toolbar.inert = true; toolbar.setAttribute('aria-hidden', 'true');
    toolbarTrigger.setAttribute('aria-expanded', 'false');
  }
  function hideLater(delay = 2400) { clearTimeout(hideTimer); hideTimer = setTimeout(hideToolbar, delay); }
  function showToolbar() {
    if (document.querySelector('dialog[open]')) return;
    positionToolbar(); toolbar.inert = false; toolbar.removeAttribute('aria-hidden');
    toolbar.classList.add('is-revealed'); toolbarTrigger.setAttribute('aria-expanded', 'true');
    hideLater();
  }
  toolbarTrigger.addEventListener('click', () => { keyboardNavigation = true; showToolbar(); toolbar.querySelector('button').focus({preventScroll:true}); });
  document.addEventListener('keydown', event => { if (event.key === 'Tab') keyboardNavigation = true; });
  document.addEventListener('pointerdown', event => {
    keyboardNavigation = false;
    selectOpen = toolbar.contains(event.target) && event.target.matches('select');
    if (!toolbar.contains(event.target)) hideLater(350);
  }, {passive:true});
  document.addEventListener('pointermove', event => {
    if (event.pointerType === 'touch' || !matchMedia('(any-hover: hover)').matches) return;
    const rect = body.getBoundingClientRect();
    const nearTop = event.clientY <= 48 && event.clientX >= rect.left && event.clientX <= rect.right;
    const wasNear = pointerInside || pointerNearTop;
    pointerNearTop = nearTop;
    pointerInside = toolbar.contains(event.target) && toolbar.classList.contains('is-revealed');
    if (nearTop || pointerInside) showToolbar(); else if (wasNear) hideLater(450);
  }, {passive:true});
  toolbar.addEventListener('pointerleave', () => { pointerInside = false; hideLater(450); });
  document.addEventListener('pointerout', event => { if (!event.relatedTarget) { pointerInside = false; pointerNearTop = false; hideLater(450); } }, {passive:true});
  toolbar.addEventListener('focusin', () => { showToolbar(); });
  toolbar.addEventListener('focusout', () => { selectOpen = false; hideLater(); });
  toolbar.addEventListener('change', () => { selectOpen = false; hideLater(); });
  toolbar.addEventListener('pointerup', () => { hideLater(); }, {passive:true});
  let touchStart;
  document.addEventListener('touchstart', event => {
    touchStart = null;
    if (event.touches.length !== 1 || event.target.closest('input, textarea, select, button, a, dialog, .reading-toolbar, .reading-table, .sidebar-left, .sidebar-right, .comments-section') || !main.contains(event.target)) return;
    touchStart = {x:event.touches[0].clientX, y:event.touches[0].clientY};
  }, {passive:true});
  document.addEventListener('touchend', event => {
    if (!touchStart || event.changedTouches.length !== 1) { touchStart = null; return; }
    const dx = event.changedTouches[0].clientX - touchStart.x;
    const dy = event.changedTouches[0].clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dy) < 40 || Math.abs(dy) < Math.abs(dx) * 1.5) return;
    keyboardNavigation = false; pointerInside = false; pointerNearTop = false; selectOpen = false;
    if (dy > 0) showToolbar(); else hideToolbar(true);
  }, {passive:true});
  document.addEventListener('touchcancel', () => { touchStart = null; }, {passive:true});
  window.addEventListener('blur', () => { pointerInside = false; pointerNearTop = false; selectOpen = false; hideToolbar(true); });
  window.addEventListener('resize', positionToolbar, {passive:true});
  if ('ResizeObserver' in window) new ResizeObserver(positionToolbar).observe(body);
  positionToolbar();
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
    positionToolbar();
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
