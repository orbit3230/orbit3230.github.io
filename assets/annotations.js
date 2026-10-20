(() => {
  'use strict';
  const body = document.querySelector('.post-body');
  if (!body) return;
  const key = 'orbit-reading-marks-v2', preferencesKey = 'orbit-reading-mark-preferences-v2';
  const path = location.pathname;
  const excluded = 'button,script,style,svg,textarea,select,input,math,mjx-container,.MathJax,.MathJax_Display,.MathJax_Preview,.katex,[data-mark-ui]';
  const mobile = matchMedia('(max-width: 760px), (hover: none)');
  const palette = [['#f2d675','노랑'],['#86d8b0','민트'],['#82b9f4','파랑'],['#eaa0bc','분홍'],['#bcabf1','보라'],['#eca16a','주황']];
  const isColor = value => typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value);
  let mode = '', items = [], pending = null, toolInteraction = false, gesture = null, consumed = false;
  let preferences = {highlight:'#f2d675',underline:'#86d8b0',width:2};
  try {
    const stored = JSON.parse(localStorage.getItem(preferencesKey) || '{}');
    for (const kind of ['highlight','underline']) if (isColor(stored[kind])) preferences[kind] = stored[kind];
    if ([1,2,3,4].includes(stored.width)) preferences.width = stored.width;
  } catch {}
  function valid(item) {
    if (!item || !/^[a-zA-Z0-9-]{1,80}$/.test(item.id) || typeof item.path !== 'string' || !item.path.startsWith('/')) return false;
    try {
      const url = new URL(item.path,location.origin);
      return url.origin === location.origin && url.pathname === item.path && !url.search && !url.hash
        && ['highlight','underline'].includes(item.kind) && isColor(item.color) && [1,2,3,4].includes(item.width)
        && typeof item.quote === 'string' && item.quote.trim().length > 0 && item.quote.length <= 3000
        && typeof item.prefix === 'string' && item.prefix.length <= 40 && typeof item.suffix === 'string' && item.suffix.length <= 40
        && Number.isInteger(item.start) && item.start >= 0 && Number.isFinite(item.updated);
    } catch { return false; }
  }
  function read() {
    const data = JSON.parse(localStorage.getItem(key) || '[]');
    if (!Array.isArray(data) || data.length > 1500) throw Error('Invalid marks');
    return [...new Map(data.filter(valid).map(item => [item.id,item])).values()];
  }
  let initialError = false;
  try { items = read(); } catch { initialError = true; }
  function el(tag,className,text) {
    const node = document.createElement(tag); if (className) node.className = className;
    if (text !== undefined) node.textContent = text; return node;
  }
  function button(label,action,className) {
    const node = el('button',className,label); node.type = 'button'; node.addEventListener('click',action); return node;
  }
  const icons = {
    highlight:'<path d="m8 14 7-10 5 4-8 9Z"/><path d="m8 14-2 5 5-2M4 21h8"/>',
    underline:'<path d="M6 4v7a6 6 0 0 0 12 0V4M4 21h16"/>',
    erase:'<path d="m4 14 9-10a2 2 0 0 1 3 0l5 5a2 2 0 0 1 0 3l-9 9H8l-4-4a2 2 0 0 1 0-3Z"/><path d="m8 10 9 8M12 21h9"/>',
    tools:'<path d="m5 16 11-12 4 4L9 20l-5 1ZM13 7l4 4"/>'
  };
  function svg(name) { return `<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`; }
  const dock = el('aside','mark-dock'); dock.dataset.markUi = ''; dock.setAttribute('aria-label','읽기 표시 도구');
  const panel = el('div','mark-panel'); panel.id = 'reading-mark-tools'; panel.hidden = true;
  const launch = button('',() => setOpen(panel.hidden),'mark-launch');
  launch.setAttribute('aria-controls',panel.id); launch.setAttribute('aria-expanded','false');
  const heading = el('div','mark-heading');
  const label = el('strong','','읽기 도구');
  const off = button('끄기',() => setMode(''),'mark-off'); off.setAttribute('aria-label','모든 표시 모드 끄기');
  const close = button('×',() => setOpen(false),'mark-close'); close.setAttribute('aria-label','읽기 도구 접기');
  heading.append(label,off,close);
  const tools = el('div','mark-modes'); tools.setAttribute('role','group'); tools.setAttribute('aria-label','표시 모드');
  const modeButtons = {};
  const names = {highlight:'형광펜',underline:'밑줄',erase:'지우개'};
  for (const kind of Object.keys(names)) {
    const control = button('',() => { setMode(mode === kind ? '' : kind); if (mobile.matches) setOpen(false); },'mark-mode');
    control.innerHTML = svg(kind); control.append(el('span','',names[kind])); control.dataset.mode = kind;
    control.setAttribute('aria-pressed','false'); tools.append(control); modeButtons[kind] = control;
  }
  const settings = el('div','mark-settings');
  const colors = el('div','mark-colors'); colors.setAttribute('role','group'); colors.setAttribute('aria-label','표시 색상');
  const swatches = palette.map(([color,name]) => {
    const control = button('',() => setColor(color),'mark-swatch'); control.style.setProperty('--swatch',color);
    control.setAttribute('aria-label',`${name} 색상`); control.title = name; control.dataset.color = color;
    colors.append(control); return control;
  });
  const customLabel = el('label','mark-custom');
  customLabel.append(el('span','','직접'));
  const custom = el('input'); custom.type = 'color'; custom.setAttribute('aria-label','직접 색상 선택'); customLabel.append(custom);
  custom.addEventListener('input',() => setColor(custom.value)); colors.append(customLabel);
  const widthLabel = el('label','mark-width','밑줄 두께');
  const width = el('select'); width.setAttribute('aria-label','밑줄 두께');
  for (const number of [1,2,3,4]) { const option = el('option','',`${number}px`); option.value = String(number); width.append(option); }
  width.addEventListener('change',() => { preferences.width = Number(width.value); savePreferences(); sync(); });
  widthLabel.append(width); settings.append(colors,widthLabel);
  const hint = el('p','mark-hint');
  const apply = button('선택 영역 적용',() => { if (applySelection()) setOpen(false); },'mark-apply');
  const footer = el('div','mark-footer');
  const count = el('span');
  const undo = button('되돌리기',undoChange,'mark-undo');
  footer.append(count,undo);
  const status = el('p','mark-status'); status.setAttribute('role','status'); status.setAttribute('aria-live','polite');
  panel.append(heading,tools,settings,hint,apply,footer,status); dock.append(panel,launch); document.body.append(dock);
  const history = [];
  function setOpen(open) {
    panel.hidden = !open; launch.setAttribute('aria-expanded',String(open));
    if (!open && panel.contains(document.activeElement)) launch.focus({preventScroll:true});
  }
  function report(text,error = false) {
    status.textContent = text; status.classList.toggle('is-error',error);
    if (error) setOpen(true);
  }
  function savePreferences() {
    try { localStorage.setItem(preferencesKey,JSON.stringify(preferences)); }
    catch { report('색상 설정은 이 페이지에서만 유지됩니다.',true); }
  }
  function setColor(color) {
    if (!['highlight','underline'].includes(mode) || !isColor(color)) return;
    preferences[mode] = color; savePreferences(); sync();
  }
  function setMode(value) {
    mode = value; pending = null; gesture = null; consumed = false;
    body.dataset.markMode = mode; status.textContent = ''; status.classList.remove('is-error');
    // Choosing a tool never paints a selection made before activating it.
    sync();
  }
  function sync() {
    for (const [kind,control] of Object.entries(modeButtons)) control.setAttribute('aria-pressed',String(mode === kind));
    launch.innerHTML = svg(mode || 'tools');
    launch.append(el('span','mark-launch-label',mode ? names[mode] : '읽기 도구'));
    launch.dataset.active = String(!!mode);
    launch.setAttribute('aria-label',`읽기 도구 열기${mode ? ` · ${names[mode]} 켜짐` : ' · 모든 모드 꺼짐'}`);
    launch.title = mode ? `${names[mode]} 켜짐 · 도구 열기` : '읽기 도구 열기';
    off.disabled = !mode;
    settings.hidden = !['highlight','underline'].includes(mode);
    widthLabel.hidden = mode !== 'underline'; width.value = String(preferences.width);
    const color = preferences[mode] || preferences.highlight;
    custom.value = color;
    swatches.forEach(control => control.setAttribute('aria-pressed',String(control.dataset.color.toLowerCase() === color.toLowerCase())));
    hint.textContent = !mode ? '모두 꺼져 있습니다. 도구를 켜면 문장에 표시할 수 있습니다.'
      : mode === 'erase' ? '표시를 누르면 지웁니다. 일부만 지우려면 해당 글자를 선택하세요.'
      : mobile.matches ? '길게 눌러 문장을 선택한 뒤, 이 도구를 열어 선택 영역을 적용하세요.'
      : '문장을 드래그하면 표시됩니다. 같은 도구를 다시 누르면 꺼집니다.';
    apply.hidden = !mode; apply.disabled = !pending;
    apply.textContent = mode === 'erase' ? '선택 영역 지우기' : '선택 영역 적용';
    undo.disabled = history.length === 0;
  }
  function textMap() {
    const nodes = []; let text = '';
    const walker = document.createTreeWalker(body,NodeFilter.SHOW_TEXT,{acceptNode(node) {
      return node.parentElement?.closest(excluded) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    }});
    let node;
    while ((node = walker.nextNode())) { nodes.push({node,start:text.length,end:text.length + node.length}); text += node.data; }
    return {nodes,text};
  }
  function locate(item,text) {
    const hits = []; let offset = text.indexOf(item.quote);
    while (offset !== -1 && hits.length < 200) { hits.push(offset); offset = text.indexOf(item.quote,offset + 1); }
    if (hits.length === 1) return hits[0];
    if (!hits.length) return -1;
    const scored = hits.map(start => ({start,score:
      Number(!!item.prefix && text.slice(Math.max(0,start-item.prefix.length),start) === item.prefix) +
      Number(!!item.suffix && text.slice(start+item.quote.length,start+item.quote.length+item.suffix.length) === item.suffix)})).sort((a,b) => b.score-a.score);
    if (scored[0].score > scored[1].score) return scored[0].start;
    if (scored.find(hit => hit.start === item.start)?.score === 2) return item.start;
    return -1;
  }
  function record(text,start,end,style) {
    return {id:crypto.randomUUID(),path,kind:style.kind,color:style.color,width:style.width,
      start,quote:text.slice(start,end),prefix:text.slice(Math.max(0,start-40),start),suffix:text.slice(end,end+40),updated:Date.now()};
  }
  function fingerprint(data) { return JSON.stringify(data.filter(item => item.path === path).sort((a,b) => a.id.localeCompare(b.id))); }
  function commit(change) {
    try {
      const before = read(), after = change(before);
      if (JSON.stringify(before) === JSON.stringify(after)) return false;
      if (after.length > 1500) { report('저장된 표시가 많습니다. 지우개로 정리한 후 다시 시도해 주세요.',true); return false; }
      localStorage.setItem(key,JSON.stringify(after));
      history.push({before:before.filter(item => item.path === path),after:fingerprint(after)});
      if (history.length > 20) history.shift();
      items = after; pending = null; render(); sync(); report(mode === 'erase' ? '표시를 지웠습니다.' : '표시를 저장했습니다.');
      return true;
    } catch { report('저장하지 못했습니다. 브라우저 저장 공간과 권한을 확인해 주세요.',true); return false; }
  }
  function undoChange() {
    if (!history.length) return;
    pending = null;
    try {
      const latest = read(), previous = history[history.length-1];
      if (fingerprint(latest) !== previous.after) {
        history.length = 0; items = latest; render(); sync(); report('다른 탭에서 표시가 변경되어 되돌리기를 중단했습니다.',true); return;
      }
      const updated = [...latest.filter(item => item.path !== path),...previous.before];
      localStorage.setItem(key,JSON.stringify(updated)); history.pop(); items = updated; render(); sync(); report('마지막 작업을 되돌렸습니다.');
    } catch { report('되돌리지 못했습니다. 브라우저 저장 공간을 확인해 주세요.',true); }
  }
  function applySelection() {
    if (!mode || !pending || document.querySelector('dialog[open]')) return false;
    const map = textMap(), selected = pending;
    if (map.text.slice(selected.start,selected.end) !== selected.quote) { pending = null; sync(); return false; }
    if (mode !== 'erase' && selected.quote.length > 3000) { report('한 번에 3,000자까지 표시할 수 있습니다.',true); return false; }
    const success = commit(latest => {
      const output = [];
      for (const item of latest) {
        const start = item.path === path ? locate(item,map.text) : -1, end = start + item.quote.length;
        if (start < 0 || end <= selected.start || start >= selected.end || (mode !== 'erase' && item.kind !== mode)) { output.push(item); continue; }
        // Repainting and erasing only change the selected part of an existing stroke.
        if (start < selected.start && map.text.slice(start,selected.start).trim()) output.push(record(map.text,start,selected.start,item));
        if (end > selected.end && map.text.slice(selected.end,end).trim()) output.push(record(map.text,selected.end,end,item));
      }
      if (mode !== 'erase') output.push(record(map.text,selected.start,selected.end,{kind:mode,color:preferences[mode],width:preferences.width}));
      return output;
    });
    if (success) window.getSelection()?.removeAllRanges();
    return success;
  }
  function capture() {
    if (!mode || document.querySelector('dialog[open]')) return;
    const selection = window.getSelection();
    if (!selection?.rangeCount || selection.isCollapsed) { pending = null; sync(); return; }
    const range = selection.getRangeAt(0);
    if (!body.contains(range.startContainer) || !body.contains(range.endContainer)) { pending = null; sync(); return; }
    const map = textMap();
    // Range intersection also handles whole inline elements and multi-paragraph selections.
    const included = map.nodes.filter(entry => range.intersectsNode(entry.node));
    if (!included.length) { pending = null; sync(); return; }
    const first = included[0], last = included[included.length-1];
    let start = first.start + (range.startContainer === first.node ? range.startOffset : 0);
    let end = last.start + (range.endContainer === last.node ? range.endOffset : last.node.length);
    const raw = map.text.slice(start,end); start += raw.length - raw.trimStart().length; end -= raw.length - raw.trimEnd().length;
    pending = end > start ? {start,end,quote:map.text.slice(start,end)} : null;
    sync();
  }
  function render() {
    body.querySelectorAll('span.reading-mark').forEach(span => span.replaceWith(...span.childNodes));
    body.normalize();
    const map = textMap(), marks = [];
    let unresolved = 0;
    for (const item of items.filter(item => item.path === path)) {
      const start = locate(item,map.text);
      if (start < 0) { unresolved++; continue; }
      marks.push({...item,start,end:start+item.quote.length});
    }
    for (const entry of [...map.nodes].reverse()) {
      const active = marks.filter(item => item.start < entry.end && item.end > entry.start);
      if (!active.length) continue;
      const cuts = new Set([0,entry.node.length]);
      active.forEach(item => { cuts.add(Math.max(0,item.start-entry.start)); cuts.add(Math.min(entry.node.length,item.end-entry.start)); });
      const points = [...cuts].sort((a,b) => a-b), fragment = document.createDocumentFragment();
      for (let index=0;index<points.length-1;index++) {
        const start = entry.start+points[index], end = entry.start+points[index+1];
        const covering = active.filter(item => item.start <= start && item.end >= end).sort((a,b) => b.updated-a.updated);
        const text = document.createTextNode(entry.node.data.slice(points[index],points[index+1]));
        if (!covering.length) { fragment.append(text); continue; }
        const span = el('span','reading-mark'); span.dataset.markIds = covering.map(item => item.id).join(' ');
        const highlighter = covering.find(item => item.kind === 'highlight'), underline = covering.find(item => item.kind === 'underline');
        if (highlighter) span.style.backgroundColor = `${highlighter.color}4d`;
        if (underline) {
          span.style.textDecorationLine = 'underline'; span.style.textDecorationColor = underline.color;
          span.style.textDecorationThickness = `${underline.width}px`;
        }
        span.append(text); fragment.append(span);
      }
      entry.node.replaceWith(fragment);
    }
    count.textContent = `이 글의 표시 ${marks.length}개`;
    count.title = unresolved ? `본문이 변경되어 위치를 찾지 못한 표시 ${unresolved}개는 보관 중입니다.` : '이 브라우저에 저장됩니다.';
  }
  document.addEventListener('pointerdown',event => {
    toolInteraction = dock.contains(event.target); consumed = false;
    gesture = !toolInteraction && mode && body.contains(event.target) && !event.target.closest(excluded)
      ? {x:event.clientX,y:event.clientY,target:event.target,pointerType:event.pointerType} : null;
    if (gesture) pending = null;
    if (!toolInteraction && !panel.hidden) setOpen(false);
  },{passive:true});
  document.addEventListener('pointerup',event => {
    if (!gesture || !mode) return;
    const current = gesture; gesture = null;
    capture();
    if (!mobile.matches && event.pointerType !== 'touch' && pending) { consumed = applySelection(); return; }
    if (mode !== 'erase' || pending || Math.hypot(event.clientX-current.x,event.clientY-current.y) > 6) return;
    const span = current.target.closest('.reading-mark');
    if (!span) return;
    const ids = new Set(span.dataset.markIds.split(' '));
    consumed = commit(latest => latest.filter(item => item.path !== path || !ids.has(item.id)));
  });
  document.addEventListener('pointercancel',() => { gesture = null; });
  body.addEventListener('click',event => {
    if (consumed) { event.preventDefault(); event.stopPropagation(); consumed = false; }
  },true);
  let selectionTimer;
  document.addEventListener('selectionchange',() => {
    clearTimeout(selectionTimer);
    if (!mode || toolInteraction || dock.contains(document.activeElement)) return;
    selectionTimer = setTimeout(capture,80);
  });
  document.addEventListener('keydown',event => {
    if (!dock.contains(event.target) && event.shiftKey) toolInteraction = false;
    if (event.key === 'Escape' && !document.querySelector('dialog[open]')) { setMode(''); setOpen(false); }
  });
  window.addEventListener('storage',event => {
    if (event.key !== key && event.key !== null) return;
    try { items = read(); history.length = 0; pending = null; render(); sync(); }
    catch { report('다른 탭의 저장 내용을 불러오지 못했습니다.',true); }
  });
  mobile.addEventListener('change',() => { setOpen(false); sync(); });
  const initialize = () => { render(); sync(); if (initialError) report('저장된 표시를 읽지 못했습니다. 저장 공간을 확인해 주세요.',true); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',initialize,{once:true}); else initialize();
})();
