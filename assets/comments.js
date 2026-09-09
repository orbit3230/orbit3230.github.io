(() => {
  'use strict';
  const section = document.querySelector('[data-comments]');
  const panel = document.querySelector('[data-community-panel]');
  const endpointText = section?.dataset.endpoint || panel?.dataset.endpoint;
  if (!endpointText) return;
  let endpoint;
  try { endpoint = new URL(endpointText); if (endpoint.protocol !== 'https:' || endpoint.username || endpoint.password) return; } catch { return; }
  const apiURL = route => new URL(route, endpoint);
  const node = (tag, className, text) => { const element = document.createElement(tag); if (className) element.className = className; if (text !== undefined) element.textContent = text; return element; };
  const button = (text, action) => { const b = node('button','',text); b.type = 'button'; b.addEventListener('click',action); return b; };
  const dateText = text => { const date = new Date(text); return Number.isNaN(date.getTime()) ? '' : date.toLocaleString('ko-KR'); };
  const hex = buffer => [...new Uint8Array(buffer)].map(b => b.toString(16).padStart(2,'0')).join('');
  const randomHex = length => hex(crypto.getRandomValues(new Uint8Array(length)));
  async function passwordProof(password, salt) {
    if (!crypto.subtle) throw Error('안전한 비밀번호 처리를 지원하는 최신 브라우저에서 다시 시도해 주세요.');
    const key = await crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveBits']);
    const bytes = Uint8Array.from(salt.match(/../g), pair => parseInt(pair,16));
    return hex(await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt:bytes,iterations:600000},key,256));
  }
  async function request(url, data) {
    const controller = new AbortController(), timeout = setTimeout(() => controller.abort(),15000);
    try {
      const response = await fetch(url,{credentials:'omit',signal:controller.signal,...(data === undefined ? {} : {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)})});
      const result = await response.json();
      if (!response.ok) throw Error(result.error || '요청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.');
      return result;
    } catch (error) {
      if (error.name === 'AbortError' || error instanceof TypeError) throw Error('연결이 지연되거나 끊겼습니다. 입력 내용은 유지됩니다. 다시 시도해 주세요.');
      throw error;
    } finally { clearTimeout(timeout); }
  }
  const storageKey = 'orbit-comment-receipts-v1';
  let receipts = [], seen = 0, storageOK = true;
  function readStorage() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
      receipts = Array.isArray(saved.receipts) ? saved.receipts.filter(r => Number.isSafeInteger(r.id) && r.id > 0 && /^[a-f0-9]{64}$/.test(r.token)).slice(-200) : [];
      seen = Number.isSafeInteger(saved.seen) && saved.seen >= 0 ? saved.seen : 0;
    } catch { storageOK = false; }
  }
  readStorage();
  function storeReceipt(id, token) {
    readStorage();
    receipts = receipts.filter(r => r.id !== id).concat({id,token}).slice(-200);
    return saveStorage();
  }
  function saveStorage() {
    try { localStorage.setItem(storageKey,JSON.stringify({receipts,seen})); storageOK = true; return true; }
    catch { storageOK = false; return false; }
  }
  const postLink = (post,id) => {
    if (typeof post !== 'string' || !post.startsWith('/') || post.startsWith('//') || /[\\\u0000-\u0020]/.test(post)) return null;
    const link = new URL(post,location.origin);
    if (link.origin !== location.origin) return null;
    link.searchParams.set('comment',String(id)); link.hash = 'comment-' + id; return link.href;
  };
  let indexPromise;
  async function titles() {
    if (!indexPromise) indexPromise = fetch(panel.dataset.index,{credentials:'same-origin'}).then(r => { if (!r.ok) throw Error(); return r.json(); }).then(rows => new Map(rows.map(r => [r.url,r.title]))).catch(() => { indexPromise = null; return new Map(); });
    return indexPromise;
  }
  let refreshActivity = () => {}, refreshInbox = () => {};
  if (panel) {
    const media = matchMedia('(max-width: 760px)');
    const position = () => { const slot = document.querySelector(media.matches ? '[data-community-footer-slot]' : '[data-community-sidebar-slot]'); if (slot && panel.parentElement !== slot) slot.append(panel); };
    position(); media.addEventListener('change',position);
    const activityList = panel.querySelector('[data-activity-list]'), activityStatus = panel.querySelector('[data-activity-status]');
    const prev = panel.querySelector('[data-activity-prev]'), next = panel.querySelector('[data-activity-next]');
    let cursors = [null], page = 0, nextCursor = null, activityBusy = false;
    async function activity(destination=0, reset=false) {
      if (activityBusy) return;
      activityBusy = true; prev.disabled = true; next.disabled = true;
      activityStatus.textContent = '최근 대화를 불러오는 중…';
      try {
        const before = reset ? null : cursors[destination];
        const url = apiURL('/activity'); if (before) url.searchParams.set('before',before);
        const [data,map] = await Promise.all([request(url),titles()]);
        if (reset) cursors = [null]; page = destination; nextCursor = data.next_cursor;
        activityList.replaceChildren();
        for (const post of data.posts) {
          const href = postLink(post.post,post.last_comment_id); if (!href) continue;
          const item = node('li'); const a = node('a','',map.get(post.post) || post.post); a.href = href;
          const meta = node('small','',`${post.comment_count}개의 댓글·답글 · ${dateText(post.created_at)}`); item.append(a,meta); activityList.append(item);
        }
        activityStatus.textContent = data.posts.length ? '최근 댓글·답글 순 · 5개씩 표시' : '아직 대화가 있는 글이 없습니다.';
        panel.querySelector('[data-activity-page]').textContent = `${page+1} 페이지`;
      } catch (error) { activityStatus.textContent = error.message; }
      finally { activityBusy = false; prev.disabled = page === 0; next.disabled = !nextCursor; }
    }
    prev.addEventListener('click',() => { if (page > 0) activity(page-1); });
    next.addEventListener('click',() => { if (nextCursor) { cursors[page+1] = nextCursor; activity(page+1); } });
    refreshActivity = () => activity(0,true);
    panel.querySelector('[data-activity-refresh]').addEventListener('click',refreshActivity);
    refreshActivity();
    const inbox = panel.querySelector('[data-inbox]'), inboxList = panel.querySelector('[data-inbox-list]');
    const inboxStatus = panel.querySelector('[data-inbox-status]'), inboxBadge = panel.querySelector('[data-inbox-badge]');
    const inboxMore = panel.querySelector('[data-inbox-more]');
    let inboxBusy = false, inboxCursor = null, latest = 0;
    async function loadInbox(append=false) {
      if (inboxBusy) return;
      readStorage();
      if (!receipts.length) { inboxList.replaceChildren(); inboxBadge.textContent = '0'; inboxMore.hidden = true; inboxStatus.textContent = storageOK ? '이 브라우저에서 작성한 댓글이 없습니다.' : '브라우저 저장소를 사용할 수 없어 답글 알림을 기억할 수 없습니다.'; return; }
      inboxBusy = true; inboxMore.disabled = true;
      try {
        const [data,map] = await Promise.all([request(apiURL('/notifications'),{receipts,seen,before:append ? inboxCursor : null}),titles()]);
        if (!append) inboxList.replaceChildren();
        latest = data.latest_id; inboxCursor = data.next_cursor; inboxMore.hidden = !inboxCursor;
        inboxBadge.textContent = String(data.unread); inboxBadge.classList.toggle('has-unread',data.unread > 0);
        for (const notification of data.notifications) {
          const href = postLink(notification.post,notification.id); if (!href) continue;
          const item = node('li',notification.id > seen ? 'is-unread' : '');
          const a = node('a','',`${notification.name}님의 답글`); a.href = href;
          const label = node('small','',map.get(notification.post) || notification.post);
          const excerpt = node('p','',notification.body.slice(0,100)); item.append(a,label,excerpt); inboxList.append(item);
        }
        inboxStatus.textContent = data.unread ? `읽지 않은 답글 ${data.unread}개` : '새 답글이 없습니다.';
        if (!storageOK) inboxStatus.textContent += ' 알림 읽음 상태를 이 브라우저에 저장할 수 없습니다.';
      } catch (error) { inboxStatus.textContent = error.message; }
      finally { inboxBusy = false; inboxMore.disabled = false; }
    }
    refreshInbox = () => loadInbox();
    panel.querySelector('[data-inbox-refresh]').addEventListener('click',refreshInbox);
    inboxMore.addEventListener('click',() => loadInbox(true));
    panel.querySelector('[data-inbox-read]').addEventListener('click',() => { if (!inboxBusy) { readStorage(); seen = Math.max(seen,latest); saveStorage(); refreshInbox(); } });
    inbox.addEventListener('toggle',() => { if (inbox.open) refreshInbox(); });
    window.addEventListener('storage',event => { if (event.key === storageKey) refreshInbox(); });
    setInterval(() => { if (!document.hidden && receipts.length) refreshInbox(); },60000);
    refreshInbox();
  }
  if (!section) return;
  const mainForm = section.querySelector('[data-comment-form]'); if (!mainForm) return;
  const list = section.querySelector('[data-comment-list]'), status = section.querySelector('[data-comments-status]');
  const refresh = section.querySelector('[data-comments-load]'), more = section.querySelector('[data-comments-more]');
  const post = section.dataset.postPath;
  const entries = new Map(), threads = new Map();
  let rootCursor = null, busy = false;
  function lock(value) { busy = value; section.querySelectorAll('button,input,textarea').forEach(el => { el.disabled = value; }); section.setAttribute('aria-busy',String(value)); }
  function closeInline() { section.querySelectorAll('.comment-inline').forEach(el => el.remove()); }
  const eventChanged = () => { refreshActivity(); refreshInbox(); };
  function render(item, target=list, prepend=false) {
    let entry = entries.get(item.id);
    if (!entry || !entry.isConnected) { entry = node('div','comment-entry'); entry.id = 'comment-' + item.id; entries.set(item.id,entry); if (prepend) target.prepend(entry); else target.append(entry); }
    const article = node('article','comment-card'); article.classList.toggle('is-deleted',item.deleted);
    const meta = node('div','comment-meta'), time = node('time','',dateText(item.created_at)); time.dateTime = item.created_at;
    meta.append(node('strong','',item.name),time); if (item.updated_at && !item.deleted) meta.append(node('span','','수정됨'));
    article.append(meta);
    if (item.reply_to && item.reply_to !== item.root_id) article.append(node('p','reply-target',`${item.reply_to_name || '댓글 작성자'}님에게 답글`));
    article.append(node('p','comment-body',item.body));
    const actions = node('div','comment-card-actions');
    if (!item.deleted) actions.append(button('답글',() => { if (!busy) openReply(item,article); }));
    if (item.manageable && !item.deleted) actions.append(button('수정',() => { if (!busy) openMutation(item,article,'edit'); }),button('삭제',() => { if (!busy) openMutation(item,article,'delete'); }));
    if (!item.root_id) actions.append(button(item.reply_count ? `답글 ${item.reply_count}개 보기` : '답글 보기',() => { if (!busy) loadThread(item.id); }));
    article.append(actions);
    const old = entry.querySelector(':scope > article'); if (old) old.replaceWith(article); else entry.prepend(article);
    return entry;
  }
  function threadView(rootId) {
    const root = entries.get(rootId); if (!root) return null;
    let thread = threads.get(rootId);
    if (!thread || !thread.element.isConnected) {
      const element = node('div','comment-replies'), items = node('div','reply-list'), message = node('p','comments-status');
      const first = button('답글 처음부터 보기',() => { if (!busy) loadThread(rootId); }); first.hidden = true;
      const next = button('답글 더 보기',() => { if (!busy) loadThread(rootId,true); }); next.hidden = true;
      element.append(first,items,message,next); root.append(element);
      thread = {element,items,message,first,next,cursor:null}; threads.set(rootId,thread);
    }
    return thread;
  }
  async function fetchThread(rootId,append=false,focus=null) {
    const thread = threadView(rootId); if (!thread) return;
    const url = apiURL('/comments'); url.searchParams.set('post',post); url.searchParams.set('thread',rootId);
    const after = focus && focus !== rootId ? focus-1 : append ? thread.cursor : 0;
    if (after) url.searchParams.set('after',after);
    thread.message.textContent = '답글을 불러오는 중…';
    try {
      const data = await request(url);
      if (!append) thread.items.replaceChildren();
      data.comments.forEach(item => render(item,thread.items));
      thread.cursor = data.next_cursor; thread.next.hidden = !thread.cursor;
      if (!append) thread.first.hidden = !after;
      thread.message.textContent = data.comments.length ? '' : '아직 답글이 없습니다.';
    } catch (error) { thread.message.textContent = error.message; }
  }
  async function loadThread(rootId,append=false) { if (busy) return; lock(true); try { await fetchThread(rootId,append); } finally { lock(false); } }
  async function loadRoots(append=false,focus=null) {
    if (busy) return; lock(true); status.textContent = '댓글을 불러오는 중…';
    try {
      const url = apiURL('/comments'); url.searchParams.set('post',post);
      if (append && rootCursor) url.searchParams.set('before',rootCursor); if (focus) url.searchParams.set('focus',focus);
      const data = await request(url);
      if (!append) { list.replaceChildren(); entries.clear(); threads.clear(); }
      data.comments.forEach(item => render(item)); rootCursor = data.next_cursor; more.hidden = !rootCursor;
      status.textContent = data.focus_id ? '선택한 대화입니다. 전체 댓글은 새로고침으로 확인하세요.' : entries.size ? '최근 댓글부터 표시합니다.' : '아직 댓글이 없습니다. 첫 의견을 남겨 주세요.';
      if (data.focus_id && data.comments[0]) {
        await fetchThread(data.comments[0].id,false,data.focus_id);
        entries.get(data.focus_id)?.scrollIntoView?.({block:'center'});
      }
    } catch (error) { status.textContent = error.message; }
    finally { lock(false); }
  }
  function hookComposer(form,localStatus,replyTo=null) {
    let pending = null;
    form.addEventListener('submit',async event => {
      event.preventDefault(); if (busy) return;
      const name = form.elements.name.value.trim(), body = form.elements.body.value.trim(), password = form.elements.password.value;
      if (!body || body.length > 2000 || name.length > 40 || password.length < 8 || password.length > 128) { localStatus.textContent = '비밀번호는 8~128자, 댓글은 1~2,000자로 입력해 주세요.'; return; }
      const fingerprint = JSON.stringify([name,body,password,replyTo?.id || null]);
      lock(true); localStatus.textContent = '비밀번호를 보호하고 댓글을 저장하는 중…';
      try {
        if (!pending || pending.fingerprint !== fingerprint) { const salt = randomHex(16); pending = {fingerprint,request_id:crypto.randomUUID(),password_salt:salt,password_key:await passwordProof(password,salt),notify_token:randomHex(32)}; }
        const {fingerprint:ignored,...proof} = pending;
        const data = await request(endpoint,{post,name,body,website:form.elements.website.value,reply_to:replyTo?.id || null,...proof});
        const stored = storeReceipt(data.comment.id,pending.notify_token);
        form.elements.body.value = ''; form.elements.password.value = ''; pending = null;
        if (replyTo) {
          await fetchThread(data.comment.root_id,false,data.comment.id);
          // A successful write remains visible even if refreshing the thread fails.
          const target = threadView(data.comment.root_id); if (target) render(data.comment,target.items);
          form.closest('.comment-inline')?.remove();
        } else render(data.comment,list,true);
        status.textContent = stored ? '댓글이 작성되었습니다.' : '댓글이 작성되었습니다. 브라우저 저장소를 사용할 수 없어 답글 알림은 기억되지 않습니다.';
        eventChanged();
      } catch (error) { localStatus.textContent = error.message; }
      finally { lock(false); }
    });
  }
  function openReply(item,article) {
    closeInline();
    const wrapper = node('div','comment-inline'), heading = node('p','',`${item.name}님에게 답글`);
    const form = mainForm.cloneNode(true); form.removeAttribute('data-comment-form'); form.reset();
    for (const element of form.querySelectorAll('[id]')) element.id += '-reply-' + item.id;
    for (const label of form.querySelectorAll('[for]')) label.htmlFor += '-reply-' + item.id;
    for (const el of form.querySelectorAll('[aria-describedby]')) el.setAttribute('aria-describedby',el.getAttribute('aria-describedby').split(' ').map(id => id + '-reply-' + item.id).join(' '));
    form.querySelector('button[type="submit"]').textContent = '답글 작성';
    const localStatus = node('p','comments-status'); localStatus.setAttribute('role','status');
    wrapper.append(heading,form,localStatus,button('취소',() => wrapper.remove())); article.append(wrapper);
    hookComposer(form,localStatus,item); form.elements.body.focus();
  }
  function openMutation(item,article,action) {
    closeInline(); const wrapper = node('div','comment-inline'), form = node('form','comment-form');
    const body = node('textarea'); body.name = 'body'; body.value = item.body; body.maxLength = 2000; body.required = true; body.rows = 4;
    body.id = `edit-body-${item.id}`;
    const bodyLabel = node('label','','댓글'); bodyLabel.htmlFor = body.id;
    if (action === 'edit') form.append(bodyLabel,body);
    else form.append(node('p','comments-intro','댓글 내용을 삭제합니다. 이 댓글에 달린 답글은 남습니다.'));
    const password = node('input'); password.name = 'password'; password.type = 'password'; password.autocomplete = 'current-password'; password.required = true; password.minLength = 8; password.maxLength = 128; password.id = `manage-password-${item.id}`;
    const label = node('label','','작성 시 설정한 비밀번호'); label.htmlFor = password.id;
    const submit = node('button','',action === 'edit' ? '수정 저장' : '삭제'); submit.type = 'submit';
    const localStatus = node('p','comments-status'); localStatus.setAttribute('role','status');
    form.append(label,password,submit); wrapper.append(form,localStatus,button('취소',() => wrapper.remove())); article.append(wrapper); password.focus();
    form.addEventListener('submit',async event => {
      event.preventDefault(); if (busy) return;
      if (password.value.length < 8 || password.value.length > 128) { localStatus.textContent = '비밀번호를 8~128자로 입력해 주세요.'; return; }
      lock(true); localStatus.textContent = '비밀번호를 확인하는 중…';
      try {
        const key = await passwordProof(password.value,item.password_salt);
        const data = await request(apiURL(`/comments/${item.id}/${action}`),{password_key:key,revision:item.revision,body:body.value.trim()});
        password.value = ''; render(data.comment); wrapper.remove(); status.textContent = action === 'edit' ? '댓글이 수정되었습니다.' : '댓글이 삭제되었습니다. 답글은 유지됩니다.'; eventChanged();
      } catch (error) { localStatus.textContent = error.message; }
      finally { lock(false); }
    });
  }
  hookComposer(mainForm,status);
  refresh.addEventListener('click',() => loadRoots()); more.addEventListener('click',() => loadRoots(true));
  const focus = Number(new URL(location.href).searchParams.get('comment'));
  loadRoots(false,Number.isSafeInteger(focus) && focus > 0 ? focus : null);
})();
