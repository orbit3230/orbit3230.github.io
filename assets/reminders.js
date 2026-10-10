(() => {
  'use strict';
  const sidebar = document.querySelector('.quick-search-trigger');
  if (!sidebar) return;
  const key = 'orbit-heading-reminders-v1';
  const pagePath = location.pathname;
  const body = document.querySelector('.post-body');
  const postTitle = document.querySelector('.post-header h1')?.textContent.trim() || document.title;
  const identity = item => JSON.stringify([item.path, item.id]);
  function valid(item) {
    if (!item || typeof item.path !== 'string' || !item.path.startsWith('/') || item.path.startsWith('//')) return false;
    try {
      const url = new URL(item.path, location.origin);
      return url.origin === location.origin && url.pathname === item.path && !url.search && !url.hash
        && typeof item.id === 'string' && item.id.length > 0 && item.id.length <= 2000
        && typeof item.heading === 'string' && item.heading.length > 0 && item.heading.length <= 1000
        && typeof item.title === 'string' && item.title.length <= 1000 && Number.isFinite(item.saved);
    } catch { return false; }
  }
  function read() {
    const raw = JSON.parse(localStorage.getItem(key) || '[]');
    if (!Array.isArray(raw)) throw new Error('Invalid reminders');
    const unique = new Map();
    raw.filter(valid).forEach(item => unique.set(identity(item), item));
    return [...unique.values()].sort((a, b) => b.saved - a.saved);
  }
  let items = [], unavailable = false;
  try { items = read(); } catch { unavailable = true; }
  const panel = document.createElement('details'); panel.className = 'reminder-panel';
  const summary = document.createElement('summary');
  const count = document.createElement('span'); count.className = 'reminder-count';
  summary.append('다시 볼 소제목 ', count);
  const help = document.createElement('p'); help.className = 'reminder-help';
  help.textContent = '이 브라우저에만 저장됩니다. 깃발을 눌러 표시하거나 해제하세요.';
  const list = document.createElement('ul'); list.className = 'reminder-list';
  const empty = document.createElement('p'); empty.className = 'reminder-empty';
  const pager = document.createElement('div'); pager.className = 'reminder-pages';
  const prev = document.createElement('button'); prev.type = 'button'; prev.textContent = '이전';
  prev.setAttribute('aria-label', '저장한 소제목 이전 페이지');
  const pageLabel = document.createElement('span');
  const next = document.createElement('button'); next.type = 'button'; next.textContent = '다음';
  next.setAttribute('aria-label', '저장한 소제목 다음 페이지');
  pager.append(prev, pageLabel, next); panel.append(summary, help, list, empty, pager);
  const desktopSlot = document.createElement('div'); desktopSlot.className = 'reminder-desktop-slot';
  sidebar.after(desktopSlot);
  const mobileSlot = document.createElement('div'); mobileSlot.className = 'reminder-mobile-slot';
  const footer = document.querySelector('.community-footer');
  if (footer) footer.before(mobileSlot); else document.querySelector('.site-shell')?.after(mobileSlot);
  const mobile = matchMedia('(max-width: 760px)');
  function placePanel() { (mobile.matches && mobileSlot.isConnected ? mobileSlot : desktopSlot).append(panel); }
  mobile.addEventListener('change', placePanel); placePanel();
  const feedback = document.createElement('div'); feedback.className = 'reminder-feedback';
  feedback.setAttribute('role', 'status'); feedback.setAttribute('aria-live', 'polite');
  document.body.append(feedback);
  let feedbackTimer, page = 1;
  function announce(message) {
    clearTimeout(feedbackTimer); feedback.textContent = message;
    feedbackTimer = setTimeout(() => { feedback.textContent = ''; }, 3500);
  }
  const controls = [];
  const icon = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 21V4m0 0c5-4 9 4 14 0v10c-5 4-9-4-14 0Z"/></svg>';
  body?.querySelectorAll('h2[id],h3[id],h4[id],h5[id],h6[id]').forEach(heading => {
    const text = heading.textContent.trim();
    if (!text) return;
    const item = { path: pagePath, id: heading.id, heading: text.slice(0, 1000), title: postTitle.slice(0, 1000) };
    const button = document.createElement('button'); button.type = 'button'; button.className = 'heading-reminder';
    button.innerHTML = icon;
    button.setAttribute('aria-label', `${text} 다시 보기 표시`);
    button.addEventListener('click', () => toggle(item));
    heading.append(button); controls.push({ heading, button, item });
  });
  function toggle(item, removeOnly = false) {
    // Read on every edit to preserve changes made in other tabs.
    let latest;
    try { latest = read(); } catch {
      announce('저장 공간을 사용할 수 없습니다. 브라우저 저장 설정을 확인해 주세요.'); return;
    }
    const exists = latest.some(saved => identity(saved) === identity(item));
    const removing = removeOnly || exists;
    const updated = removing ? latest.filter(saved => identity(saved) !== identity(item))
      : [{ ...item, saved: Date.now() }, ...latest];
    try { localStorage.setItem(key, JSON.stringify(updated)); } catch {
      announce('저장하지 못했습니다. 브라우저 저장 공간을 확인해 주세요.'); return;
    }
    items = updated; unavailable = false;
    if (!removing) page = 1;
    render(); announce(removing ? '다시 보기 표시를 해제했습니다.' : '다시 볼 소제목에 저장했습니다.');
  }
  function render() {
    const saved = new Set(items.map(identity));
    controls.forEach(({heading,button,item}) => {
      const marked = saved.has(identity(item));
      button.setAttribute('aria-pressed', String(marked));
      button.title = marked ? '다시 보기 표시 해제' : '나중에 다시 보기';
      heading.classList.toggle('has-reminder', marked);
    });
    count.textContent = String(items.length);
    const pages = Math.max(1, Math.ceil(items.length / 5)); page = Math.min(page, pages);
    const focusInList = list.contains(document.activeElement);
    list.replaceChildren();
    items.slice((page - 1) * 5, page * 5).forEach(item => {
      const row = document.createElement('li');
      const link = document.createElement('a');
      const url = new URL(item.path, location.origin); url.hash = item.id; link.href = url.href;
      const title = document.createElement('small'); title.textContent = item.title;
      const label = document.createElement('span'); label.textContent = item.heading;
      link.append(title, label);
      const remove = document.createElement('button'); remove.type = 'button'; remove.textContent = '×';
      remove.setAttribute('aria-label', `${item.heading} 다시 보기 표시 해제`);
      remove.addEventListener('click', () => toggle(item, true));
      row.append(link, remove); list.append(row);
    });
    empty.hidden = items.length > 0;
    empty.textContent = unavailable ? '브라우저 저장 공간을 사용할 수 없습니다.' : '아직 표시한 소제목이 없습니다.';
    pager.hidden = pages <= 1; prev.disabled = page === 1; next.disabled = page === pages;
    pageLabel.textContent = `${page} / ${pages}`;
    if (focusInList) (list.querySelector('a') || summary).focus({preventScroll:true});
  }
  prev.addEventListener('click', () => { page--; render(); });
  next.addEventListener('click', () => { page++; render(); });
  window.addEventListener('storage', event => {
    if (event.key !== key && event.key !== null) return;
    try { items = read(); unavailable = false; } catch { items = []; unavailable = true; }
    render();
  });
  render();
})();
