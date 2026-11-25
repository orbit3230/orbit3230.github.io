(() => {
  'use strict';
  const root=document.querySelector('#history-quiz'); if(!root)return;
  const $=id=>document.getElementById('hq-'+id), apiRoot=root.dataset.api.replace(/\/$/,'');
  const normalize=value=>value.normalize('NFC').trim().replace(/\s+/gu,' ');
  const make=(tag,text,cls)=>{const node=document.createElement(tag);if(text!==undefined)node.textContent=text;if(cls)node.className=cls;return node;};
  let token='',setupToken=new URLSearchParams(location.hash.slice(1)).get('setup')||'',catalog={eras:[],types:[]},selected={era:null,type:null};
  let authState=null,categoryKind='',edit=null,deleteTarget=null,managePage=1,question=null,attempt='',answered=false,composing=false,compositionEnd=0,sound=false,audio=null,nextBusy=false;
  let groupMode='play',activeGroup=null,groupBusy=false,answerBusy=false,viewVersion=0;
  let createRequest={signature:'',id:''};
  if(setupToken)history.replaceState(null,'',location.pathname+location.search);
  try{sound=localStorage.getItem('orbit-quiz-sound')==='true';}catch{}
  function notice(message){$('notice').textContent=message;}
  async function api(path,data,authorized=false){
    if(!apiRoot)throw Error('퀴즈 서버를 준비 중입니다.');
    const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),18000);
    try{
      const response=await fetch(apiRoot+path,{method:data===undefined?'GET':'POST',headers:{...(data===undefined?{}:{'Content-Type':'application/json'}),...(authorized?{Authorization:'Bearer '+token}:{})},...(data===undefined?{}:{body:JSON.stringify(data)}),signal:controller.signal,credentials:'omit',cache:'no-store',referrerPolicy:'no-referrer'});
      const result=await response.json();
      if(!response.ok){if(response.status===401)token='';const error=Error(result.error||'요청을 처리하지 못했습니다.');error.status=response.status;throw error;}
      return result;
    }catch(error){if(error.name==='AbortError'||error instanceof TypeError)throw Error('연결이 지연되었습니다. 입력 내용은 그대로 두었으니 다시 시도해 주세요.');throw error;}
    finally{clearTimeout(timer);}
  }
  async function busy(button,task){if(button.disabled)return;button.disabled=true;try{await task();}finally{button.disabled=false;}}
  function screen(name){viewVersion++;for(const id of ['home','groups','create','play'])$(id).hidden=id!==name;notice('');closeMenus();}
  async function leave(){if(groupBusy||nextBusy||answerBusy)return;const old=token;token='';if(old)fetch(apiRoot+'/logout',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+old},body:'{}',credentials:'omit',referrerPolicy:'no-referrer'}).catch(()=>{});screen('home');}
  root.querySelectorAll('.hq-back').forEach(button=>button.addEventListener('click',leave));$('logout').addEventListener('click',leave);
  root.querySelectorAll('[data-close]').forEach(button=>button.addEventListener('click',()=>button.closest('dialog').close()));
  $('auth').addEventListener('close',()=>{$('password').value='';});
  root.addEventListener('compositionstart',()=>{composing=true;});root.addEventListener('compositionend',()=>{composing=false;compositionEnd=Date.now();});
  root.addEventListener('keydown',event=>{if(event.key==='Enter'&&(event.isComposing||composing||event.keyCode===229||Date.now()-compositionEnd<100))event.preventDefault();},true);
  const menus={};
  for(const host of root.querySelectorAll('.hq-select')){
    const kind=host.dataset.kind,trigger=make('button',undefined,'hq-select-trigger'),title=make('span'),chevron=make('span','⌄');
    trigger.type='button';trigger.setAttribute('aria-expanded','false');trigger.setAttribute('aria-controls','hq-options-'+kind);trigger.setAttribute('aria-label',kind==='era'?'시대 선택':'정답 종류 선택');
    chevron.setAttribute('aria-hidden','true');trigger.append(title,chevron);
    const popup=make('div',undefined,'hq-options');popup.id='hq-options-'+kind;popup.hidden=true;
    const list=make('div');list.setAttribute('role','listbox');list.setAttribute('aria-label',kind==='era'?'시대':'정답 종류');
    const add=make('button','+ 항목 추가','hq-add-option');add.type='button';popup.append(list,add);host.append(trigger,popup);
    menus[kind]={host,trigger,title,popup,list,add};
    trigger.addEventListener('click',()=>{const open=popup.hidden;closeMenus();popup.hidden=!open;trigger.setAttribute('aria-expanded',String(open));});
    trigger.addEventListener('keydown',event=>{if(event.key==='ArrowDown'){event.preventDefault();closeMenus();popup.hidden=false;trigger.setAttribute('aria-expanded','true');(list.querySelector('button')||add).focus();}});
    popup.addEventListener('keydown',event=>{const buttons=[...popup.querySelectorAll('button')],index=buttons.indexOf(document.activeElement);if(['ArrowDown','ArrowUp','Home','End'].includes(event.key)){event.preventDefault();buttons[event.key==='Home'?0:event.key==='End'?buttons.length-1:(index+(event.key==='ArrowDown'?1:-1)+buttons.length)%buttons.length].focus();}if(event.key==='Escape'){event.preventDefault();event.stopPropagation();closeMenus();trigger.focus();}});
    add.addEventListener('click',()=>{categoryKind=kind;closeMenus();$('add-title').textContent=kind==='era'?'시대 추가':'정답 종류 추가';$('category-name').value='';$('add-error').textContent='';$('add').showModal();$('category-name').focus();});
  }
  function closeMenus(){for(const menu of Object.values(menus)){menu.popup.hidden=true;menu.trigger.setAttribute('aria-expanded','false');}}
  document.addEventListener('pointerdown',event=>{if(!event.target.closest('.hq-select'))closeMenus();});
  function renderMenus(){for(const kind of ['era','type']){const menu=menus[kind],options=kind==='era'?catalog.eras:catalog.types;menu.title.textContent=options.find(item=>item.id===selected[kind])?.name||(kind==='era'?'시대를 선택하세요':'정답 종류 선택');menu.list.replaceChildren();for(const item of options){const button=make('button',item.name);button.type='button';button.setAttribute('role','option');button.setAttribute('aria-selected',String(item.id===selected[kind]));button.addEventListener('click',()=>{selected[kind]=item.id;renderMenus();closeMenus();menu.trigger.focus();});menu.list.append(button);}}}
  async function loadCatalog(){catalog=await api('/catalog');renderMenus();const current=$('filter').value;$('filter').replaceChildren(new Option('모든 시대','0'));for(const item of catalog.eras)$('filter').append(new Option(item.name,String(item.id)));$('filter').value=[...$('filter').options].some(item=>item.value===current)?current:'0';}
  async function openAuth(){
    $('auth-error').textContent='';$('password').value='';
    try{
      authState=await api('/status');
      if(!authState.initialized&&!setupToken){notice('관리자가 아직 초기 설정을 완료하지 않았습니다. 소유자용 설정 링크에서 비밀번호를 먼저 등록해 주세요.');return;}
      $('auth-title').textContent=authState.initialized?'관리자 인증':'최초 관리자 등록';
      $('auth-help').textContent=authState.initialized?'문제를 만들려면 관리자 비밀번호를 입력하세요.':'입력한 비밀번호가 관리자 비밀번호로 등록됩니다. 8자 이상으로 설정하고 안전하게 보관하세요.';
      $('auth-submit').textContent=authState.initialized?'접속':'등록하고 접속';$('password').autocomplete=authState.initialized?'current-password':'new-password';$('auth').showModal();$('password').focus();
    }catch(error){notice(error.message);}
  }
  $('create-entry').addEventListener('click',()=>busy($('create-entry'),openAuth));
  async function passwordProof(password,salt){const material=await crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveBits']);const bytes=Uint8Array.from(salt.match(/../g),v=>parseInt(v,16));return [...new Uint8Array(await crypto.subtle.deriveBits({name:'PBKDF2',salt:bytes,iterations:600000,hash:'SHA-256'},material,256))].map(v=>v.toString(16).padStart(2,'0')).join('');}
  $('auth-form').addEventListener('submit',event=>{event.preventDefault();if(composing)return;busy($('auth-submit'),async()=>{
    try{
      const salt=authState.salt||[...crypto.getRandomValues(new Uint8Array(16))].map(v=>v.toString(16).padStart(2,'0')).join('');
      const key=await passwordProof($('password').value,salt);$('password').value='';
      const result=await api(authState.initialized?'/login':'/setup',{salt,key,...(authState.initialized?{}:{setup_token:setupToken})});token=result.token;setupToken='';$('auth').close();await openGroups('create');
    }catch(error){if(error.status===409){authState=await api('/status').catch(()=>authState);if(authState.initialized){$('auth-title').textContent='관리자 인증';$('auth-submit').textContent='접속';}}if($('auth').open)$('auth-error').textContent=error.message;else notice(error.message);}
  });});
  $('add-form').addEventListener('submit',event=>{event.preventDefault();if(composing)return;busy($('add-form').querySelector('[type=submit]'),async()=>{try{const result=await api('/categories',{kind:categoryKind,name:$('category-name').value},true);selected[categoryKind]=result.category.id;await loadCatalog();$('add').close();menus[categoryKind].trigger.focus();}catch(error){$('add-error').textContent=error.message;}});});
  function cancelEdit(){edit=null;$('create-submit').textContent='생성';$('edit-cancel').hidden=true;$('keyword').value='';$('solution').value='';createRequest={signature:'',id:''};}
  $('edit-cancel').addEventListener('click',cancelEdit);
  $('create-form').addEventListener('submit',event=>{event.preventDefault();if(composing)return;busy($('create-submit'),async()=>{
    const data={group_id:activeGroup?.id,era_id:selected.era,type_id:selected.type,keyword:$('keyword').value,answer:$('solution').value};
    if(!data.era_id||!data.type_id){$('save-status').textContent='시대와 정답 종류를 선택해 주세요.';return;}
    const signature=JSON.stringify(data);if(createRequest.signature!==signature)createRequest={signature,id:crypto.randomUUID()};
    const controls=[...$('create-form').querySelectorAll('input,button'),...root.querySelectorAll('.hq-group-switch,.hq-back'),$('logout')].filter(control=>control!==$('create-submit'));
    controls.forEach(control=>control.disabled=true);
    try{await api('/questions',{...data,...(edit?{id:edit.id,revision:edit.revision}:{request_id:createRequest.id})},true);const wasEdit=!!edit;cancelEdit();$('save-status').textContent=wasEdit?'문제를 수정했습니다.':'문제를 저장했습니다. 다음 문제를 입력하세요.';$('keyword').focus();await loadManage();}
    catch(error){$('save-status').textContent=error.message;if(error.status===401)openAuth();}
    finally{controls.forEach(control=>control.disabled=false);if(!$('keyword').value)$('keyword').focus();}
  });});
  async function loadManage(){
    const version=viewVersion;const result=await api('/manage?group='+activeGroup.id+'&page='+managePage,undefined,true);if(version!==viewVersion)return;if(managePage>1&&!result.questions.length){managePage--;return loadManage();}
    $('question-list').replaceChildren();
    for(const item of result.questions){const row=make('article',undefined,'hq-managed-question');row.append(make('small',item.era+' · '+item.type),make('p',item.keyword),make('p','정답: '+item.answer));const change=make('button','수정'),remove=make('button','삭제');change.type=remove.type='button';change.addEventListener('click',()=>{edit=item;selected={era:item.era_id,type:item.type_id};renderMenus();$('keyword').value=item.keyword;$('solution').value=item.answer;$('create-submit').textContent='수정 저장';$('edit-cancel').hidden=false;$('save-status').textContent='수정하면 이 문제의 풀이 통계가 초기화됩니다.';$('keyword').focus();});remove.addEventListener('click',()=>{deleteTarget=item;$('delete-error').textContent='';$('delete-dialog').showModal();});row.append(change,remove);$('question-list').append(row);}
    if(!result.total)$('question-list').append(make('p','아직 저장한 문제가 없습니다.','hq-helper'));
    $('page').textContent=`${managePage} / ${Math.max(1,Math.ceil(result.total/5))}`;$('prev').disabled=managePage===1;$('more').disabled=managePage*5>=result.total;
  }
  const refresh=()=>loadManage().catch(error=>notice(error.message));$('refresh').addEventListener('click',()=>busy($('refresh'),refresh));$('prev').addEventListener('click',()=>{managePage--;refresh();});$('more').addEventListener('click',()=>{managePage++;refresh();});
  $('delete-confirm').addEventListener('click',()=>busy($('delete-confirm'),async()=>{try{await api('/delete',{id:deleteTarget.id,revision:deleteTarget.revision},true);if(edit?.id===deleteTarget.id)cancelEdit();$('delete-dialog').close();await loadManage();}catch(error){$('delete-error').textContent=error.message;}}));
  function showStats(value){$('correct').textContent=value.correct+'회';$('wrong').textContent=value.wrong+'회';$('rate').textContent=value.rate===null?'—':value.rate+'%';}
  function slots(){
    if(!question)return;const letters=[...normalize($('answer').value).replace(/ /g,'')];let position=0;$('slots').replaceChildren();
    for(const length of question.words){const word=make('span',undefined,'hq-word');for(let i=0;i<length;i++){const value=letters[position++]||'',cell=make('span',value,'hq-cell'+(value?' hq-filled':''));if(value&&position===letters.length)cell.classList.add('hq-pop');word.append(cell);}$('slots').append(word);}
  }
  function soundLabel(){$('sound').setAttribute('aria-pressed',String(sound));$('sound').textContent='타건음 '+(sound?'켜짐':'꺼짐');}
  function tap(){if(!sound)return;try{audio ||= new (window.AudioContext||window.webkitAudioContext)();if(audio.state==='suspended')audio.resume().catch(()=>{});const oscillator=audio.createOscillator(),gain=audio.createGain();oscillator.type='triangle';oscillator.frequency.setValueAtTime(180,audio.currentTime);oscillator.frequency.exponentialRampToValueAtTime(75,audio.currentTime+.035);gain.gain.setValueAtTime(.025,audio.currentTime);gain.gain.exponentialRampToValueAtTime(.001,audio.currentTime+.04);oscillator.connect(gain);gain.connect(audio.destination);oscillator.start();oscillator.stop(audio.currentTime+.045);oscillator.onended=()=>{oscillator.disconnect();gain.disconnect();};}catch{sound=false;soundLabel();}}
  $('sound').addEventListener('click',()=>{sound=!sound;soundLabel();try{localStorage.setItem('orbit-quiz-sound',String(sound));}catch{}if(sound)tap();});soundLabel();
  $('answer').addEventListener('input',event=>{slots();if(!event.isComposing&&!composing)tap();});$('answer').addEventListener('compositionend',()=>{slots();tap();});
  async function next(){
    if(nextBusy||!activeGroup)return;const version=viewVersion;nextBusy=true;$('next').disabled=true;$('retry').disabled=true;$('check').disabled=true;$('filter').disabled=true;notice('');
    try{
      const result=await api('/next',{group_id:activeGroup.id,era_id:Number($('filter').value),previous:question?.id||null});if(version!==viewVersion)return;question=result.question;attempt=result.attempt;answered=false;
      $('empty').hidden=!!question;$('answer-form').hidden=!question;
      if(!question)return;
      $('play-era').textContent=question.era;$('clue').textContent=question.keyword;$('answer-type').textContent=question.type;$('answer-type').setAttribute('title','정답 종류');showStats(question.stats);
      $('answer').value='';$('answer').readOnly=false;$('answer-form').classList.remove('is-correct','is-wrong');$('result').textContent='';$('reveal').hidden=true;$('reveal').textContent='';$('check').hidden=false;
      $('answer').setAttribute('aria-label',`${question.type} 정답 입력, ${question.words.join(', ')}글자`);slots();$('answer').focus({preventScroll:true});
    }catch(error){if(version===viewVersion)notice(error.message);}finally{nextBusy=false;$('next').disabled=false;$('retry').disabled=false;$('check').disabled=answered;$('filter').disabled=false;}
  }
  $('play-entry').addEventListener('click',()=>busy($('play-entry'),async()=>{try{await openGroups('play');}catch(error){notice(error.message);}}));
  $('filter').addEventListener('change',next);$('next').addEventListener('click',next);$('retry').addEventListener('click',next);
  $('answer-form').addEventListener('submit',event=>{event.preventDefault();if(composing||answered||nextBusy||!question)return;busy($('check'),async()=>{
    if(!normalize($('answer').value)){$('result').textContent='정답을 입력해 주세요.';return;}
    const version=viewVersion;answerBusy=true;$('next').disabled=true;$('retry').disabled=true;$('filter').disabled=true;$('answer').readOnly=true;
    try{const result=await api('/answer',{attempt,answer:$('answer').value});if(version!==viewVersion)return;answered=true;$('answer-form').classList.add(result.correct?'is-correct':'is-wrong');$('result').textContent=result.correct?'정답입니다.':'아쉽지만, 정답이 아닙니다.';$('reveal').hidden=result.correct;$('reveal').textContent='정답: '+result.answer;showStats(result.stats);$('check').hidden=true;$('next').focus({preventScroll:true});}
    catch(error){if(version!==viewVersion)return;$('result').textContent=error.message;if(error.status===409||error.status===410){answered=true;$('check').hidden=true;}else $('answer').readOnly=false;}
    finally{answerBusy=false;$('next').disabled=false;$('retry').disabled=false;$('filter').disabled=false;}
  });});
  async function openGroups(mode){
    groupMode=mode;screen('groups');$('groups-mode').textContent=mode==='create'?'문제 만들기':'문제 풀기';
    $('groups-title').textContent=mode==='create'?'문제를 만들 그룹을 선택하세요':'풀고 싶은 그룹을 선택하세요';
    $('groups-help').textContent=mode==='create'?'그룹을 먼저 만들고, 그 안에 문제를 추가하세요.':'선택한 그룹에 저장된 문제만 출제됩니다.';
    $('group-add').hidden=mode!=='create';$('groups-title').focus();await loadGroups();
  }
  async function loadGroups(){
    const version=viewVersion;$('group-list').replaceChildren(make('p','그룹을 불러오는 중입니다.','hq-helper'));
    const {groups}=await api('/groups');if(version!==viewVersion)return;
    $('group-list').replaceChildren();
    for(const group of groups){const button=make('button',undefined,'hq-group-card');button.type='button';button.append(make('strong',group.name),make('span',group.count+'개의 문제'),make('small',groupMode==='create'?'문제 만들기 →':'문제 풀기 →'));button.addEventListener('click',()=>selectGroup(group).catch(error=>notice(error.message)));$('group-list').append(button);}
    if(!groups.length)$('group-list').append(make('p',groupMode==='create'?'아직 그룹이 없습니다. 첫 번째 그룹을 만들어 주세요.':'아직 공개된 문제 그룹이 없습니다. 관리자가 그룹과 문제를 만들면 이곳에 표시됩니다.','hq-helper'));
  }
  async function selectGroup(group){
    if(groupBusy||nextBusy)return;const version=viewVersion;groupBusy=true;
    try{await loadCatalog();if(version!==viewVersion)return;activeGroup=group;question=null;attempt='';managePage=1;cancelEdit();$('save-status').textContent='';
      $('create-group').textContent=group.name;$('play-group').textContent=group.name;
      if(groupMode==='create'){screen('create');await loadManage();$('keyword').focus();}
      else{$('filter').value='0';$('answer-form').hidden=true;$('empty').hidden=true;screen('play');await next();}
    }finally{groupBusy=false;}
  }
  $('groups-refresh').addEventListener('click',()=>busy($('groups-refresh'),()=>loadGroups().catch(error=>notice(error.message))));
  root.querySelectorAll('.hq-group-switch').forEach(button=>button.addEventListener('click',()=>{
    if(nextBusy||groupBusy||answerBusy)return;
    if(groupMode==='create'&&($('keyword').value||$('solution').value)&&!window.confirm('그룹을 변경하면 아직 저장하지 않은 입력 내용이 지워집니다. 변경할까요?'))return;
    openGroups(groupMode).catch(error=>notice(error.message));
  }));
  $('group-add').addEventListener('click',()=>{$('group-name').value='';$('group-error').textContent='';$('group-dialog').showModal();$('group-name').focus();});
  $('group-form').addEventListener('submit',event=>{event.preventDefault();if(composing)return;busy($('group-form').querySelector('[type=submit]'),async()=>{
    try{const {group}=await api('/groups',{name:$('group-name').value},true);$('group-dialog').close();await selectGroup(group);}
    catch(error){if($('group-dialog').open)$('group-error').textContent=error.message;else notice(error.message);}
  });});
  renderMenus();if(setupToken)openAuth();
})();
