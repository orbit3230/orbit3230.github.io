(() => {
  'use strict';
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  let activeCard = null;
  let pointerFrame = 0;
  let pointerX = 0;
  let pointerY = 0;

  function clearPointer() {
    if (pointerFrame) cancelAnimationFrame(pointerFrame);
    pointerFrame = 0;
    if (!activeCard) return;
    activeCard.classList.remove('is-pointer-active');
    activeCard.style.removeProperty('--pointer-x');
    activeCard.style.removeProperty('--pointer-y');
    activeCard = null;
  }
  function movePointer(event) {
    if (!finePointer.matches || reducedMotion.matches || event.pointerType === 'touch') return;
    const card = event.target instanceof Element ? event.target.closest('.post-entry') : null;
    if (card !== activeCard) { clearPointer(); activeCard = card; }
    if (!card) return;
    pointerX = event.clientX;
    pointerY = event.clientY;
    if (pointerFrame) return;
    pointerFrame = requestAnimationFrame(() => {
      pointerFrame = 0;
      if (!activeCard?.isConnected || activeCard.hidden) { clearPointer(); return; }
      const bounds = activeCard.getBoundingClientRect();
      activeCard.style.setProperty('--pointer-x', `${pointerX - bounds.left}px`);
      activeCard.style.setProperty('--pointer-y', `${pointerY - bounds.top}px`);
      activeCard.classList.add('is-pointer-active');
    });
  }
  // Delegation also covers cards inserted by search, filtering and pagination.
  document.addEventListener('pointermove', movePointer, { passive: true });
  document.addEventListener('pointerout', event => {
    if (activeCard && (!(event.relatedTarget instanceof Node) || !activeCard.contains(event.relatedTarget))) clearPointer();
  }, { passive: true });
  document.addEventListener('pointercancel', clearPointer, { passive: true });
  window.addEventListener('blur', clearPointer);
  finePointer.addEventListener('change', clearPointer);
  reducedMotion.addEventListener('change', clearPointer);

  const main = document.getElementById('site-main');
  if (!main) return;
  const article = main.querySelector('.post-body');
  let progress;
  let progressFill;
  let lastPercent = -1;
  if (article) {
    progress = document.createElement('div');
    progress.className = 'reading-progress';
    progress.setAttribute('role', 'progressbar');
    progress.setAttribute('aria-label', '본문 읽기 진행률');
    progress.setAttribute('aria-valuemin', '0');
    progress.setAttribute('aria-valuemax', '100');
    progressFill = document.createElement('span');
    progressFill.className = 'reading-progress-fill';
    progress.append(progressFill);
    document.body.append(progress);
  }
  const topButton = document.createElement('button');
  topButton.type = 'button';
  topButton.className = 'back-to-top';
  topButton.hidden = true;
  topButton.setAttribute('aria-label', '맨 위로 이동');
  topButton.title = '맨 위로 이동';
  topButton.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 12 6-6 6 6M12 6v13"/></svg>';
  topButton.addEventListener('click', () => {
    main.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  });
  document.body.append(topButton);

  let scrollFrame = 0;
  function updateScroll() {
    scrollFrame = 0;
    topButton.hidden = window.scrollY < Math.max(500, window.innerHeight * .75);
    if (!article) return;
    const rect = article.getBoundingClientRect();
    const viewport = window.innerHeight;
    const start = window.scrollY + rect.top;
    const end = start + rect.height - viewport;
    // Short articles are complete once their bottom fits in the viewport.
    const value = end <= start ? (rect.bottom <= viewport ? 1 : 0) : Math.min(1, Math.max(0, (window.scrollY - start) / (end - start)));
    progressFill.style.setProperty('--reading-progress', String(value));
    const percent = Math.round(value * 100);
    if (percent !== lastPercent) {
      progress.setAttribute('aria-valuenow', String(percent));
      lastPercent = percent;
    }
  }
  function scheduleScroll() {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
  }
  window.addEventListener('scroll', () => { clearPointer(); scheduleScroll(); }, { passive: true });
  window.addEventListener('resize', () => { clearPointer(); scheduleScroll(); }, { passive: true });
  window.addEventListener('pageshow', scheduleScroll);
  // Images, maths and expanding widgets can change the article position/height.
  if ('ResizeObserver' in window) new ResizeObserver(scheduleScroll).observe(document.body);
  updateScroll();
})();
