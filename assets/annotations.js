(() => {
  'use strict';
  const body = document.querySelector('.post-body');
  const key = 'orbit-text-annotations-v1';
  const path = location.pathname;
  const title = document.querySelector('.post-header h1')?.textContent.trim() || document.title;
  const excluded = 'button,script,style,svg,textarea,select,input,math,mjx-container,.MathJax,.MathJax_Display,.MathJax_Preview,.katex,[data-annotation-ui]';
  const nativeHighlight = !!(window.CSS?.highlights && window.Highlight);
  let items = [], storageError = false, pending = null, editing = null, opener = null, listPage = 1;
  const restored = new Map();
  function valid(item) {
    if (!item || !/^[a-zA-Z0-9-]{1,80}$/.test(item.id) || typeof item.path !== 'string' || !item.path.startsWith('/')) return false;
    try {
      const url = new URL(item.path, location.origin);
      return url.origin === location.origin && url.pathname === item.path && !url.search && !url.hash
        && typeof item.quote === 'string' && item.quote.trim().length > 0 && item.quote.length <= 3000
        && typeof item.note === 'string' && item.note.length <= 2000
        && typeof item.title === 'string' && item.title.length <= 1000
        && typeof item.prefix === 'string' && item.prefix.length <= 40
        && typeof item.suffix === 'string' && item.suffix.length <= 40
        && Number.isInteger(item.start) && item.start >= 0 && Number.isFinite(item.updated);
    } catch { return false; }
  }
  function read() {
    const data = JSON.parse(localStorage.getItem(key) || '[]');
    if (!Array.isArray(data) || data.length > 1000) throw Error('Invalid notes');
    return [...new Map(data.filter(valid).map(item => [item.id,item])).values()].sort((a,b) => b.updated - a.updated);
  }
  try { items = read(); } catch { storageError = true; }
  function element(tag, className, text) {
    const node = document.createElement(tag); if (className) node.className = className;
    if (text !== undefined) node.textContent = text; return node;
  }
  function button(label, action, className) {
    const node = element('button',className,label); node.type = 'button'; node.addEventListener('click', action); return node;
  }
  const notice = element('div','annotation-notice'); notice.setAttribute('role','status'); document.body.append(notice);
  let noticeTimer;
  function tell(text) {
    clearTimeout(noticeTimer); notice.textContent = text;
    document.querySelector('.annotation-dialog[open] [role="status"]')?.replaceChildren(document.createTextNode(text));
    noticeTimer = setTimeout(() => { notice.textContent = ''; },4000);
  }
  function dialog(id, label) {
    const node = element('dialog','discovery-dialog annotation-dialog');
    node.id = id; node.setAttribute('aria-labelledby',`${id}-title`);
    const top = element('div','dialog-top'); const heading = element('h2','',label); heading.id = `${id}-title`;
    top.append(heading,button('닫기',() => node.close())); node.append(top);
    node.addEventListener('close',() => {
      if (document.querySelector('dialog[open]')) return;
      pending = null;
      if (opener?.isConnected && !opener.closest('[hidden]')) opener.focus({preventScroll:true});
    });
    document.body.append(node); return node;
  }
  const editor = dialog('annotation-editor','문장에 메모');
  editor.classList.add('annotation-editor');
  const quote = element('blockquote','annotation-quote');
  const label = element('label','','메모 · 최대 2,000자'); label.htmlFor = 'annotation-note';
  const note = element('textarea'); note.id = 'annotation-note'; note.maxLength = 2000;
  note.placeholder = '다시 읽을 때 떠올리고 싶은 내용을 적어보세요.';
  const editorStatus = element('p','annotation-help'); editorStatus.setAttribute('role','status');
  const actions = element('div','annotation-actions');
  const save = button('저장',() => {
    if (!pending) return;
    const item = {...pending, note:note.value, updated:Date.now()};
    if (mutate(latest => [item,...latest.filter(entry => entry.id !== item.id)])) { editor.close(); tell('형광펜과 메모를 저장했습니다.'); }
  },'annotation-save');
  const remove = button('삭제',() => confirmDelete(remove,editing,() => editor.close()));
  actions.append(save,button('취소',() => editor.close()),remove);
  editor.append(quote,label,note,editorStatus,actions);
  const library = dialog('annotation-library','형광펜 · 메모');
  library.append(element('p','annotation-help','이 브라우저에만 저장됩니다. 문장을 선택하면 형광펜과 메모를 남길 수 있습니다.'));
  const filterLabel = element('label','annotation-list-filter','범위 ');
  const scope = element('select'); scope.setAttribute('aria-label','메모 표시 범위');
  for (const [value,text] of [['page','현재 글'],['all','모든 글']]) { const option = element('option','',text); option.value = value; scope.append(option); }
  if (!body) scope.value = 'all';
  scope.addEventListener('change',() => { listPage = 1; renderList(); }); filterLabel.append(scope);
  const libraryStatus = element('p','annotation-help'); libraryStatus.setAttribute('role','status');
  const list = element('ul','annotation-items');
  const pager = element('nav','search-pagination'); pager.setAttribute('aria-label','메모 목록 페이지');
  const pageLabel = element('span');
  const previous = button('이전',() => { listPage--; renderList(); });
  const next = button('다음',() => { listPage++; renderList(); });
  pager.append(previous,pageLabel,next); library.append(filterLabel,libraryStatus,list,pager);
  function show(node,source) {
    if (typeof node.showModal !== 'function') { tell('이 브라우저에서는 메모 창을 지원하지 않습니다. 최신 브라우저를 사용해 주세요.'); return false; }
    if (document.querySelector('dialog[open]')) return false;
    opener = source || document.activeElement; picker.hidden = true; node.showModal(); return true;
  }
  function openList(source) { renderList(); show(library,source); }
  const globalButton = button('형광펜 · 메모',() => { scope.value = 'all'; listPage = 1; openList(globalButton); },'annotation-global');
  document.querySelector('.quick-search-trigger')?.after(globalButton);
  const launch = button('',() => { scope.value = 'page'; listPage = 1; openList(launch); },'annotation-launch');
  if (body) body.before(launch);
  const picker = element('div','annotation-picker'); picker.hidden = true; picker.dataset.annotationUi = '';
  picker.setAttribute('role','group'); picker.setAttribute('aria-label','선택한 문장 저장');
  const paint = button('형광펜',() => {
    if (!pending) return;
    const captured = pending;
    const existing = items.find(item => item.path === path && item.quote === captured.quote && item.start === captured.start);
    if (existing) { openEditor(existing,paint); return; }
    if (mutate(latest => [{...captured,note:'',updated:Date.now()},...latest])) {
      picker.hidden = true; window.getSelection()?.removeAllRanges(); pending = null; tell('문장을 형광펜으로 표시했습니다.');
    }
  });
  const memo = button('메모',() => { if (pending) openEditor(pending,memo); });
  picker.append(paint,memo,button('취소',() => { picker.hidden = true; pending = null; }));
  // Keep the captured selection while clicking these buttons.
  picker.addEventListener('pointerdown',event => { if (event.pointerType === 'mouse') event.preventDefault(); });
  document.body.append(picker);
  function openEditor(item,source) {
    const saved = items.find(entry => entry.id === item.id) || item;
    if (library.open) library.close();
    pending = {...saved}; editing = saved.id; quote.textContent = saved.quote; note.value = saved.note || '';
    editorStatus.textContent = '메모를 비워 두면 형광펜만 저장됩니다.';
    remove.hidden = !items.some(entry => entry.id === saved.id);
    remove.textContent = '삭제'; delete remove.dataset.confirm;
    if (show(editor,picker.contains(source) ? launch : source)) note.focus();
  }
  function mutate(change) {
    try {
      const updated = change(read());
      if (updated.length > 1000) { tell('저장한 문장이 1,000개입니다. 불필요한 항목을 정리해 주세요.'); return false; }
      localStorage.setItem(key,JSON.stringify(updated));
      items = updated; storageError = false; render(); return true;
    } catch { tell('저장하지 못했습니다. 브라우저 저장 공간과 권한을 확인해 주세요.'); return false; }
  }
  function confirmDelete(control,id,done) {
    if (control.dataset.confirm !== id) { control.dataset.confirm = id; control.textContent = '삭제 확인'; return; }
    if (mutate(latest => latest.filter(item => item.id !== id))) { done?.(); tell('저장한 문장을 삭제했습니다.'); }
  }
  function textMap() {
    const nodes = []; let text = '';
    if (!body) return {nodes,text};
    const walker = document.createTreeWalker(body,NodeFilter.SHOW_TEXT,{acceptNode(node) {
      return node.parentElement?.closest(excluded) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    }});
    let node;
    while ((node = walker.nextNode())) { nodes.push({node,start:text.length,end:text.length + node.length}); text += node.data; }
    return {nodes,text};
  }
  function rangeAt(map,start,length) {
    const first = map.nodes.find(entry => entry.end > start);
    const last = [...map.nodes].reverse().find(entry => entry.start < start + length);
    if (!first || !last) return null;
    const range = document.createRange(); range.setStart(first.node,start - first.start);
    range.setEnd(last.node,start + length - last.start); return range;
  }
  function locate(item,text) {
    const hits = []; let offset = text.indexOf(item.quote);
    while (offset !== -1 && hits.length < 200) { hits.push(offset); offset = text.indexOf(item.quote,offset + 1); }
    if (!hits.length) return -1;
    const scored = hits.map(start => ({start,score:
      Number(!!item.prefix && text.slice(Math.max(0,start - item.prefix.length),start) === item.prefix) +
      Number(!!item.suffix && text.slice(start + item.quote.length,start + item.quote.length + item.suffix.length) === item.suffix)}));
    scored.sort((a,b) => b.score - a.score);
    // Repeated text must be identified by context; an old offset alone is unsafe.
    if (hits.length === 1) return hits[0];
    if (scored[0].score > (scored[1]?.score || 0)) return scored[0].start;
    if (text.slice(item.start,item.start + item.quote.length) === item.quote && scored.find(hit => hit.start === item.start)?.score === 2) return item.start;
    return -1;
  }
  function clearFallback() {
    body?.querySelectorAll('mark.orbit-annotation').forEach(mark => mark.replaceWith(...mark.childNodes));
    body?.normalize();
  }
  function render() {
    if (!nativeHighlight) clearFallback();
    const map = textMap(); restored.clear();
    const ranges = [];
    for (const item of items.filter(item => item.path === path)) {
      const start = locate(item,map.text);
      if (start < 0) continue;
      const range = rangeAt(map,start,item.quote.length);
      if (range) { restored.set(item.id,range); ranges.push(range); }
    }
    if (nativeHighlight) CSS.highlights.set('orbit-annotations',new Highlight(...ranges));
    else if (ranges.length) {
      // Wrap only text segments, preserving links, headings and existing controls.
      const offsets = items.filter(item => item.path === path).map(item => ({start:locate(item,map.text),length:item.quote.length})).filter(item => item.start >= 0);
      for (const entry of [...map.nodes].reverse()) {
        const cuts = new Set([0,entry.node.length]);
        offsets.forEach(item => { if (item.start < entry.end && item.start + item.length > entry.start) {
          cuts.add(Math.max(0,item.start - entry.start)); cuts.add(Math.min(entry.node.length,item.start + item.length - entry.start));
        }});
        const points = [...cuts].sort((a,b) => a-b); if (points.length < 2) continue;
        const fragment = document.createDocumentFragment();
        for (let i=0;i<points.length-1;i++) {
          const start = entry.start + points[i], end = entry.start + points[i+1];
          const marked = offsets.some(item => start >= item.start && end <= item.start + item.length);
          const part = document.createTextNode(entry.node.data.slice(points[i],points[i+1]));
          if (marked) { const mark = element('mark','orbit-annotation'); mark.append(part); fragment.append(mark); } else fragment.append(part);
        }
        entry.node.replaceWith(fragment);
      }
      const rebuilt = textMap(); restored.clear();
      items.filter(item => item.path === path).forEach(item => { const start = locate(item,rebuilt.text); if (start >= 0) restored.set(item.id,rangeAt(rebuilt,start,item.quote.length)); });
    }
    launch.replaceChildren(document.createTextNode('형광펜 · 메모'),element('span','',`${items.filter(item => item.path === path).length}개`));
    globalButton.textContent = `형광펜 · 메모${items.length ? ` · ${items.length}` : ''}`;
    if (library.open) renderList();
  }
  function renderList() {
    const filtered = items.filter(item => scope.value === 'all' || item.path === path);
    const pages = Math.max(1,Math.ceil(filtered.length / 5)); listPage = Math.max(1,Math.min(pages,listPage));
    list.replaceChildren();
    libraryStatus.textContent = storageError ? '브라우저 저장 공간을 불러오지 못했습니다.' : filtered.length ? `${filtered.length}개의 문장` : '아직 저장한 문장이 없습니다.';
    filtered.slice((listPage-1)*5,listPage*5).forEach(item => {
      const row = element('li'), link = element('a','',item.title);
      const url = new URL(item.path,location.origin); url.hash = `note-${item.id}`; link.href = url.href;
      if (item.path === path) link.addEventListener('click',event => { event.preventDefault(); library.close(); jump(item.id); });
      row.append(link,element('blockquote','annotation-quote',item.quote));
      if (item.note) row.append(element('p','',item.note));
      if (item.path === path && !restored.has(item.id)) row.append(element('small','','본문이 변경되어 위치를 찾지 못했습니다. 저장한 문장과 메모는 유지됩니다.'));
      const controls = element('div','annotation-actions');
      const edit = button('메모 수정',() => openEditor(item,launch.isConnected ? launch : globalButton));
      const del = button('삭제',() => confirmDelete(del,item.id));
      controls.append(edit,del); row.append(controls); list.append(row);
    });
    pager.hidden = pages <= 1; previous.disabled = listPage <= 1; next.disabled = listPage >= pages;
    pageLabel.textContent = `${listPage} / ${pages}`;
  }
  function jump(id) {
    const range = restored.get(id);
    if (!range) { tell('저장한 문장의 위치를 찾지 못했습니다. 형광펜·메모 목록에서 확인해 주세요.'); return; }
    const rect = range.getBoundingClientRect();
    window.scrollTo({top:Math.max(0,scrollY + rect.top - 100),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
    if (nativeHighlight) { CSS.highlights.set('orbit-annotation-active',new Highlight(range)); setTimeout(() => CSS.highlights.delete('orbit-annotation-active'),1800); }
  }
  function capture() {
    if (!body || document.querySelector('dialog[open]') || picker.contains(document.activeElement)) return;
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !selection.rangeCount) { picker.hidden = true; return; }
    const range = selection.getRangeAt(0);
    if (!body.contains(range.startContainer) || !body.contains(range.endContainer)) { picker.hidden = true; return; }
    const map = textMap();
    const startEntry = map.nodes.find(entry => entry.node === range.startContainer);
    const endEntry = map.nodes.find(entry => entry.node === range.endContainer);
    if (!startEntry || !endEntry) { picker.hidden = true; return; }
    let start = startEntry.start + range.startOffset, end = endEntry.start + range.endOffset;
    const raw = map.text.slice(start,end); start += raw.length - raw.trimStart().length; end -= raw.length - raw.trimEnd().length;
    const text = map.text.slice(start,end);
    if (!text || text.length > 3000) { picker.hidden = true; if (text.length > 3000) tell('한 번에 3,000자까지 저장할 수 있습니다.'); return; }
    const existing = items.find(item => item.path === path && item.quote === text && locate(item,map.text) === start);
    pending = existing || {id:crypto.randomUUID(),path,title:title.slice(0,1000),quote:text,note:'',start,prefix:map.text.slice(Math.max(0,start-40),start),suffix:map.text.slice(end,end+40),updated:Date.now()};
    paint.textContent = existing ? '메모 수정' : '형광펜';
    const rect = range.getBoundingClientRect(); picker.hidden = false;
    const width = picker.offsetWidth, height = picker.offsetHeight;
    picker.style.left = `${Math.max(12,Math.min(innerWidth-width-12,rect.left + rect.width/2 - width/2))}px`;
    picker.style.top = `${Math.max(12,Math.min(innerHeight-height-12,rect.bottom + 10))}px`;
  }
  let selectionTimer;
  document.addEventListener('selectionchange',() => { clearTimeout(selectionTimer); selectionTimer = setTimeout(capture,160); });
  document.addEventListener('keydown',event => { if (event.key === 'Escape' && !document.querySelector('dialog[open]')) { picker.hidden = true; pending = null; } });
  window.addEventListener('scroll',() => { picker.hidden = true; },{passive:true});
  window.addEventListener('resize',() => { picker.hidden = true; },{passive:true});
  window.addEventListener('storage',event => {
    if (event.key !== key && event.key !== null) return;
    try { items = read(); storageError = false; } catch { storageError = true; }
    render();
  });
  function hashJump() { if (location.hash.startsWith('#note-')) jump(location.hash.slice(6)); }
  window.addEventListener('hashchange',hashJump);
  // Other reading tools finish wrapping code/tables before ranges are restored.
  const initialize = () => { render(); requestAnimationFrame(hashJump); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',initialize,{once:true});
  else initialize();
})();
