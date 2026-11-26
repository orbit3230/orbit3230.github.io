(() => {
  'use strict';
  const root=document.querySelector('#history-quiz'); if(!root)return;
  const $=id=>document.getElementById('hq-'+id), apiRoot=root.dataset.api.replace(/\/$/,'');
  const normalize=value=>value.normalize('NFC').trim().replace(/\s+/gu,' ');
  const make=(tag,text,cls)=>{const node=document.createElement(tag);if(text!==undefined)node.textContent=text;if(cls)node.className=cls;return node;};
  let token='',setupToken=new URLSearchParams(location.hash.slice(1)).get('setup')||'',catalog={eras:[],types:[]},selected={era:null,type:null};
  let authState=null,categoryKind='',categoryMenu='',edit=null,deleteTarget=null,managePage=1,question=null,attempt='',answered=false,composing=false,compositionEnd=0,sound=false,audio=null,nextBusy=false;
  let groupMode='play',activeGroup=null,groupBusy=false,answerBusy=false,viewVersion=0;
  let editorSerial=1,playRows=[],player='',manageDirty=true,manageGeneration=0;
  let pendingPlayEnter=null,playEnterTimer=null,playEnterHeld=false;
  let authPurpose='create',quickContext=null,quickEditing=false,quickSaving=false,graded=false;
  try{player=localStorage.getItem('orbit-quiz-player')||'';}catch{}
  if(!/^[a-f0-9]{64}$/.test(player)){player=[...crypto.getRandomValues(new Uint8Array(32))].map(v=>v.toString(16).padStart(2,'0')).join('');}
  try{localStorage.setItem('orbit-quiz-player',player);}catch{$('progress-note').textContent='브라우저 저장소를 사용할 수 없어 내 풀이 기록은 이 화면을 열어 둔 동안만 이어집니다.';}
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
  async function busy(button,task){
    if(button.disabled)return;button.disabled=true;button.setAttribute('aria-busy','true');
    const original=button.textContent,label=button.id==='hq-create-submit'?'저장 중…':button.id==='hq-check'?'채점 중…':button.id==='hq-auth-submit'?'인증 중…':button.closest('#hq-add-form,#hq-group-form')?'추가 중…':null;
    if(label)button.textContent=label;
    try{await task();}finally{button.disabled=false;button.removeAttribute('aria-busy');if(label&&button.textContent===label)button.textContent=original;if(button===$('check'))updatePlayControls();}
  }
  function screen(name){viewVersion++;for(const id of ['home','groups','create','play'])$(id).hidden=id!==name;notice('');closeMenus();updatePlayControls();}
  async function leave(){if(groupBusy||nextBusy||answerBusy||quickContext)return;const old=token;token='';if(old)fetch(apiRoot+'/logout',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+old},body:'{}',credentials:'omit',referrerPolicy:'no-referrer'}).catch(()=>{});screen('home');}
  root.querySelectorAll('.hq-back').forEach(button=>button.addEventListener('click',leave));$('logout').addEventListener('click',leave);
  root.querySelectorAll('[data-close]').forEach(button=>button.addEventListener('click',()=>{if(quickSaving)return;button.closest('dialog').close();}));
  $('auth').addEventListener('close',()=>{$('password').value='';if(authPurpose==='quick'){quickContext=null;authPurpose='create';updatePlayControls();if(!$('next').disabled)$('next').focus({preventScroll:true});}});
  function playEnter(){if(nextBusy||answerBusy||quickContext||$('play').hidden||root.querySelector('dialog[open]'))return;if(answered)next();else $('answer-form').requestSubmit();}
  function flushPlayEnter(){
    clearTimeout(playEnterTimer);
    playEnterTimer=setTimeout(()=>{
      const pending=pendingPlayEnter;if(!pending||composing)return;pendingPlayEnter=null;
      if(pending.attempt===attempt&&pending.version===viewVersion&&pending.input.isConnected)playEnter();
    },0);
  }
  root.addEventListener('compositionstart',()=>{composing=true;});
  root.addEventListener('compositionend',()=>{composing=false;compositionEnd=Date.now();if(pendingPlayEnter)flushPlayEnter();});
  document.addEventListener('keyup',event=>{if(event.key==='Enter'||event.code==='Enter'||event.code==='NumpadEnter')playEnterHeld=false;});
  window.addEventListener('blur',()=>{playEnterHeld=false;pendingPlayEnter=null;clearTimeout(playEnterTimer);});
  root.addEventListener('keydown',event=>{
    if(event.key!=='Enter'&&event.code!=='Enter'&&event.code!=='NumpadEnter')return;
    if(!$('play').hidden&&event.target.closest('#hq-answer-form')){
      if(event.repeat||playEnterHeld||nextBusy||answerBusy){event.preventDefault();return;}
      playEnterHeld=true;
      if(event.target.matches('.hq-answer-input')&&(event.isComposing||composing||event.keyCode===229)){
        // Let the IME commit its final character before submitting this same Enter.
        pendingPlayEnter={attempt,version:viewVersion,input:event.target};if(!composing)flushPlayEnter();return;
      }
      event.preventDefault();playEnter();return;
    }
    if(event.isComposing||composing||event.keyCode===229||Date.now()-compositionEnd<100)event.preventDefault();
  },true);
  const menus={};
  function initMenu(host,key){
    const kind=host.dataset.kind,trigger=make('button',undefined,'hq-select-trigger'),title=make('span'),chevron=make('span','⌄');
    trigger.type='button';trigger.setAttribute('aria-expanded','false');trigger.setAttribute('aria-controls','hq-options-'+key);trigger.setAttribute('aria-label',kind==='era'?'시대 선택':'정답 종류 선택');
    chevron.setAttribute('aria-hidden','true');trigger.append(title,chevron);
    const popup=make('div',undefined,'hq-options');popup.id='hq-options-'+key;popup.hidden=true;
    const list=make('div');list.setAttribute('role','listbox');list.setAttribute('aria-label',kind==='era'?'시대':'정답 종류');
    const add=make('button','+ 항목 추가','hq-add-option');add.type='button';popup.append(list,add);host.append(trigger,popup);
    menus[key]={host,kind,trigger,title,popup,list,add};
    trigger.addEventListener('click',()=>{const open=popup.hidden;closeMenus();popup.hidden=!open;trigger.setAttribute('aria-expanded',String(open));});
    trigger.addEventListener('keydown',event=>{if(event.key==='ArrowDown'){event.preventDefault();closeMenus();popup.hidden=false;trigger.setAttribute('aria-expanded','true');(list.querySelector('button')||add).focus();}});
    popup.addEventListener('keydown',event=>{const buttons=[...popup.querySelectorAll('button')],index=buttons.indexOf(document.activeElement);if(['ArrowDown','ArrowUp','Home','End'].includes(event.key)){event.preventDefault();buttons[event.key==='Home'?0:event.key==='End'?buttons.length-1:(index+(event.key==='ArrowDown'?1:-1)+buttons.length)%buttons.length].focus();}if(event.key==='Escape'){event.preventDefault();event.stopPropagation();closeMenus();trigger.focus();}});
    add.addEventListener('click',()=>{categoryKind=kind;categoryMenu=key;closeMenus();$('add-title').textContent=kind==='era'?'시대 추가':'정답 종류 추가';$('category-name').value='';$('add-error').textContent='';$('add').showModal();$('category-name').focus();});
  }
  for(const host of root.querySelectorAll('.hq-select'))initMenu(host,host.dataset.kind);
  function closeMenus(){for(const menu of Object.values(menus)){menu.popup.hidden=true;menu.trigger.setAttribute('aria-expanded','false');}}
  document.addEventListener('pointerdown',event=>{if(!event.target.closest('.hq-select'))closeMenus();});
  function renderMenus(){for(const [key,menu] of Object.entries(menus)){const kind=menu.kind,options=kind==='era'?catalog.eras:catalog.types;menu.title.textContent=options.find(item=>item.id===selected[key])?.name||(kind==='era'?'시대를 선택하세요':'정답 종류 선택');menu.list.replaceChildren();for(const item of options){const button=make('button',item.name);button.type='button';button.setAttribute('role','option');button.setAttribute('aria-selected',String(item.id===selected[key]));button.addEventListener('click',()=>{selected[key]=item.id;renderMenus();closeMenus();menu.trigger.focus();});menu.list.append(button);}}}
  const editorRows=[{key:'type',host:$('solution').closest('.hq-editor-answer'),input:$('solution')}];
  function updateEditorLabels(){editorRows.forEach((row,index)=>{row.input.setAttribute('aria-label','정답 '+(index+1));menus[row.key].trigger.setAttribute('aria-label','정답 '+(index+1)+' 종류 선택');if(row.remove)row.remove.setAttribute('aria-label','정답 '+(index+1)+' 항목 삭제');});$('answer-add').disabled=editorRows.length>=10;}
  function addAnswer(part={}){
    if(editorRows.length>=10)return;
    const key='type-'+(++editorSerial),host=make('div',undefined,'hq-field hq-editor-answer'),top=make('div',undefined,'hq-editor-answer-top'),menuHost=make('div',undefined,'hq-select'),remove=make('button','−','hq-answer-remove'),input=make('input');
    menuHost.dataset.kind='type';remove.type='button';input.id='hq-solution-'+editorSerial;input.maxLength=120;input.required=true;input.autocomplete='off';input.placeholder='정답을 입력하세요';input.value=part.answer||'';
    top.append(menuHost,remove);host.append(top,input);$('editor-answers').append(host);selected[key]=part.type_id||null;initMenu(menuHost,key);
    const row={key,host,input,remove};editorRows.push(row);remove.addEventListener('click',()=>{host.remove();delete menus[key];delete selected[key];editorRows.splice(editorRows.indexOf(row),1);updateEditorLabels();$('answer-add').focus();});
    renderMenus();updateEditorLabels();return row;
  }
  function resetAnswers(parts=[{type_id:selected.type,answer:''}]){
    for(const row of editorRows.splice(1)){row.host.remove();delete menus[row.key];delete selected[row.key];}
    selected.type=parts[0].type_id;editorRows[0].input.value=parts[0].answer;
    for(const part of parts.slice(1))addAnswer(part);renderMenus();updateEditorLabels();
  }
  $('answer-add').addEventListener('click',()=>{const row=addAnswer();if(row)menus[row.key].trigger.focus();});
  updateEditorLabels();
  async function loadCatalog(){catalog=await api('/catalog');applyCatalog();}
  function applyCatalog(){renderMenus();const current=$('filter').value;$('filter').replaceChildren(new Option('모든 시대','0'));for(const item of catalog.eras)$('filter').append(new Option(item.name,String(item.id)));$('filter').value=[...$('filter').options].some(item=>item.value===current)?current:'0';}
  async function openAuth(purpose='create'){
    authPurpose=purpose;const context=quickContext;
    $('auth-error').textContent='';$('password').value='';
    try{
      authState=await api('/status');
      if(purpose==='quick'&&quickContext!==context)return;
      if(!authState.initialized&&!setupToken){notice('관리자가 아직 초기 설정을 완료하지 않았습니다. 소유자용 설정 링크에서 비밀번호를 먼저 등록해 주세요.');if(purpose==='quick'){quickContext=null;updatePlayControls();}return;}
      $('auth-title').textContent=authState.initialized?'관리자 인증':'최초 관리자 등록';
      $('auth-help').textContent=authState.initialized?(purpose==='quick'?'방금 푼 문제를 수정하려면 관리자 비밀번호를 입력하세요.':'문제를 만들려면 관리자 비밀번호를 입력하세요.'):'입력한 비밀번호가 관리자 비밀번호로 등록됩니다. 8자 이상으로 설정하고 안전하게 보관하세요.';
      $('auth-submit').textContent=authState.initialized?'접속':'등록하고 접속';$('password').autocomplete=authState.initialized?'current-password':'new-password';$('auth').showModal();$('password').focus();
    }catch(error){notice(error.message);if(purpose==='quick'){quickContext=null;updatePlayControls();}}
  }
  $('create-entry').addEventListener('click',()=>busy($('create-entry'),openAuth));
  async function passwordProof(password,salt){const material=await crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveBits']);const bytes=Uint8Array.from(salt.match(/../g),v=>parseInt(v,16));return [...new Uint8Array(await crypto.subtle.deriveBits({name:'PBKDF2',salt:bytes,iterations:600000,hash:'SHA-256'},material,256))].map(v=>v.toString(16).padStart(2,'0')).join('');}
  $('auth-form').addEventListener('submit',event=>{event.preventDefault();if(composing)return;busy($('auth-submit'),async()=>{
    const purpose=authPurpose,context=quickContext;
    try{
      const salt=authState.salt||[...crypto.getRandomValues(new Uint8Array(16))].map(v=>v.toString(16).padStart(2,'0')).join('');
      const key=await passwordProof($('password').value,salt);$('password').value='';
      const result=await api(authState.initialized?'/login':'/setup',{salt,key,...(authState.initialized?{}:{setup_token:setupToken})});token=result.token;setupToken='';
      if(purpose==='quick'){if(context&&quickContext===context)await openQuickEditor(context);}
      else if($('auth').open){$('auth').close();await openGroups('create');}
    }catch(error){if(error.status===409){authState=await api('/status').catch(()=>authState);if(authState.initialized){$('auth-title').textContent='관리자 인증';$('auth-submit').textContent='접속';}}if($('auth').open)$('auth-error').textContent=error.message;else notice(error.message);}
  });});
  $('add-form').addEventListener('submit',event=>{event.preventDefault();if(composing)return;busy($('add-form').querySelector('[type=submit]'),async()=>{try{const result=await api('/categories',{kind:categoryKind,name:$('category-name').value},true);selected[categoryMenu]=result.category.id;const options=categoryKind==='era'?catalog.eras:catalog.types;if(!options.some(item=>item.id===result.category.id))options.push(result.category);options.sort((a,b)=>a.id-b.id);applyCatalog();$('add').close();menus[categoryMenu].trigger.focus();}catch(error){$('add-error').textContent=error.message;}});});
  function cancelEdit(){edit=null;$('create-submit').textContent='생성';$('edit-cancel').hidden=true;$('keyword').value='';resetAnswers();createRequest={signature:'',id:''};}
  $('edit-cancel').addEventListener('click',()=>{if(quickEditing)$('quick-dialog').close();else cancelEdit();});
  $('create-form').addEventListener('submit',event=>{event.preventDefault();if(composing)return;busy($('create-submit'),async()=>{
    const data={group_id:activeGroup?.id,era_id:selected.era,keyword:$('keyword').value,answers:editorRows.map(row=>({type_id:selected[row.key],answer:row.input.value}))};
    if(!data.era_id||data.answers.some(part=>!part.type_id)){$('save-status').textContent='시대와 정답 종류를 선택해 주세요.';return;}
    const signature=JSON.stringify(data);if(createRequest.signature!==signature)createRequest={signature,id:crypto.randomUUID()};
    const controls=[...$('create-form').querySelectorAll('input,button'),...root.querySelectorAll('.hq-group-switch,.hq-back'),$('logout')].filter(control=>control!==$('create-submit'));
    controls.forEach(control=>control.disabled=true);quickSaving=quickEditing;$('save-status').textContent='문제를 저장하고 있습니다…';
    try{await api('/questions',{...data,...(edit?{id:edit.id,revision:edit.revision}:{request_id:createRequest.id})},true);if(quickEditing){showQuickSaved(data);return;}const wasEdit=!!edit;cancelEdit();$('save-status').textContent=wasEdit?'문제를 수정했습니다.':'문제를 저장했습니다. 다음 문제를 입력하세요.';$('keyword').focus();markManageDirty();refreshManageInBackground();}
    catch(error){$('save-status').textContent=error.message;if(error.status===401&&!quickEditing)openAuth();}
    finally{quickSaving=false;controls.forEach(control=>control.disabled=false);updateEditorLabels();if(!$('create').hidden&&!$('keyword').value)$('keyword').focus();}
  });});
  $('quick-edit').addEventListener('click',()=>{
    if(!graded||!answered||nextBusy||answerBusy||quickContext||$('play').hidden)return;
    quickContext={id:question.id,group:activeGroup.id,version:viewVersion};updatePlayControls();openAuth('quick');
  });
  async function openQuickEditor(context){
    const [options,result]=await Promise.all([api('/catalog'),api('/manage?group='+context.group+'&id='+context.id,undefined,true)]);
    if(quickContext!==context||context.version!==viewVersion)return;
    catalog=options;applyCatalog();edit=result.question;selected.era=edit.era_id;resetAnswers(edit.answers);$('keyword').value=edit.keyword;
    $('create-submit').textContent='수정 저장';$('edit-cancel').hidden=false;$('save-status').textContent='';
    $('quick-body').append($('create-form'));quickEditing=true;authPurpose='create';$('auth').close();$('quick-dialog').showModal();$('keyword').focus();
  }
  $('quick-dialog').addEventListener('cancel',event=>{if(quickSaving)event.preventDefault();});
  $('quick-dialog').addEventListener('close',()=>{
    $('create').insertBefore($('create-form'),$('manage'));quickEditing=false;quickContext=null;closeMenus();cancelEdit();updatePlayControls();if(!$('next').disabled)$('next').focus({preventScroll:true});
  });
  function showQuickSaved(data){
    question={...question,keyword:normalize(data.keyword),era:catalog.eras.find(item=>item.id===data.era_id)?.name||'',answers:data.answers.map(part=>({type:catalog.types.find(item=>item.id===part.type_id)?.name||'정답',words:normalize(part.answer).split(' ').map(word=>[...word].length)}))};
    $('clue').textContent=question.keyword;$('play-era').textContent=question.era;showStats({correct:0,wrong:0,rate:null});
    $('answer-form').classList.remove('is-correct','is-wrong');renderPlayAnswers();playRows.forEach((row,index)=>{row.input.value=normalize(data.answers[index].answer);row.input.readOnly=true;row.feedback.textContent='수정된 정답';slots(row);});
    $('result').textContent='문제를 수정했습니다. 통계가 초기화되었습니다. Enter로 다음 문제를 이어가세요.';
    $('quick-dialog').close();markManageDirty();
  }
  function markManageDirty(){manageDirty=true;manageGeneration++;}
  function refreshManageInBackground(){if($('manage').open)loadManage().catch(()=>{$('manage-status').textContent='목록을 불러오지 못했습니다. 새로고침을 눌러 주세요.';});}
  $('manage').addEventListener('toggle',()=>{if($('manage').open&&manageDirty)refreshManageInBackground();});
  async function loadManage(){
    const generation=++manageGeneration,version=viewVersion;$('manage-status').textContent='목록을 불러오는 중…';const result=await api('/manage?group='+activeGroup.id+'&page='+managePage,undefined,true);if(version!==viewVersion||generation!==manageGeneration)return;if(managePage>1&&!result.questions.length){managePage--;return loadManage();}
    manageDirty=false;$('manage-status').textContent='';$('question-list').replaceChildren();
    for(const item of result.questions){const row=make('article',undefined,'hq-managed-question');row.append(make('small',item.era+' · '+item.type),make('p',item.keyword),make('p',item.answers.map(part=>part.type+': '+part.answer).join(' · ')));const change=make('button','수정'),remove=make('button','삭제');change.type=remove.type='button';change.addEventListener('click',()=>{edit=item;selected.era=item.era_id;resetAnswers(item.answers);$('keyword').value=item.keyword;$('create-submit').textContent='수정 저장';$('edit-cancel').hidden=false;$('save-status').textContent='수정하면 이 문제의 풀이 통계가 초기화됩니다.';$('keyword').focus();});remove.addEventListener('click',()=>{deleteTarget=item;$('delete-error').textContent='';$('delete-dialog').showModal();});row.append(change,remove);$('question-list').append(row);}
    if(!result.total)$('question-list').append(make('p','아직 저장한 문제가 없습니다.','hq-helper'));
    $('page').textContent=`${managePage} / ${Math.max(1,Math.ceil(result.total/5))}`;$('prev').disabled=managePage===1;$('more').disabled=managePage*5>=result.total;
  }
  const refresh=()=>loadManage().catch(error=>notice(error.message));$('refresh').addEventListener('click',()=>busy($('refresh'),refresh));$('prev').addEventListener('click',()=>{managePage--;refresh();});$('more').addEventListener('click',()=>{managePage++;refresh();});
  $('delete-confirm').addEventListener('click',()=>busy($('delete-confirm'),async()=>{try{await api('/delete',{id:deleteTarget.id,revision:deleteTarget.revision},true);if(edit?.id===deleteTarget.id)cancelEdit();$('delete-dialog').close();await loadManage();}catch(error){$('delete-error').textContent=error.message;}}));
  function showStats(value){$('correct').textContent=value.correct+'회';$('wrong').textContent=value.wrong+'회';$('rate').textContent=value.rate===null?'—':value.rate+'%';}
  function slots(row){
    const letters=[...normalize(row.input.value).replace(/ /g,'')];let position=0;row.slots.replaceChildren();
    for(const length of row.part.words){const word=make('span',undefined,'hq-word');for(let i=0;i<length;i++){const value=letters[position++]||'',cell=make('span',value,'hq-cell'+(value?' hq-filled':''));if(value&&position===letters.length)cell.classList.add('hq-pop');word.append(cell);}row.slots.append(word);}
  }
  function renderPlayAnswers(){
    playRows=[];$('play-answers').replaceChildren();
    question.answers.forEach((part,index)=>{
      const host=make('section',undefined,'hq-play-answer'),line=make('div',undefined,'hq-answer-line'),label=make('label',part.type,'hq-answer-type'),cells=make('div',undefined,'hq-slots'),reveal=make('p',undefined,'hq-reveal'),input=make('input',undefined,'hq-answer-input'),feedback=make('p',undefined,'hq-part-feedback');
      input.id=index?'hq-answer-'+(index+1):'hq-answer';label.htmlFor=input.id;input.maxLength=240;input.autocomplete='off';input.spellcheck=false;input.setAttribute('autocapitalize','off');input.placeholder=part.type+' 정답 입력';input.setAttribute('aria-label',`${index+1}. ${part.type} 정답 입력, ${part.words.join(', ')}글자`);
      feedback.id='hq-part-feedback-'+index;input.setAttribute('aria-describedby','hq-answer-help '+feedback.id);cells.setAttribute('aria-hidden','true');reveal.hidden=true;reveal.id=index?'hq-reveal-'+(index+1):'hq-reveal';
      line.append(label,cells,reveal);host.append(line,input,feedback);$('play-answers').append(host);
      const row={host,input,slots:cells,reveal,feedback,part};playRows.push(row);slots(row);
      input.addEventListener('input',event=>{slots(row);if(!event.isComposing&&!composing)tap();});input.addEventListener('compositionend',()=>{slots(row);tap();});
    });
  }
  function soundLabel(){$('sound').setAttribute('aria-pressed',String(sound));$('sound').textContent='타건음 '+(sound?'켜짐':'꺼짐');}
  function tap(){if(!sound)return;try{audio ||= new (window.AudioContext||window.webkitAudioContext)();if(audio.state==='suspended')audio.resume().catch(()=>{});const oscillator=audio.createOscillator(),gain=audio.createGain();oscillator.type='triangle';oscillator.frequency.setValueAtTime(180,audio.currentTime);oscillator.frequency.exponentialRampToValueAtTime(75,audio.currentTime+.035);gain.gain.setValueAtTime(.025,audio.currentTime);gain.gain.exponentialRampToValueAtTime(.001,audio.currentTime+.04);oscillator.connect(gain);gain.connect(audio.destination);oscillator.start();oscillator.stop(audio.currentTime+.045);oscillator.onended=()=>{oscillator.disconnect();gain.disconnect();};}catch{sound=false;soundLabel();}}
  $('sound').addEventListener('click',()=>{sound=!sound;soundLabel();try{localStorage.setItem('orbit-quiz-sound',String(sound));}catch{}if(sound)tap();});soundLabel();
  function updatePlayControls(){
    const loading=nextBusy||answerBusy||!!quickContext,unsolved=!!question&&!answered;
    $('next').disabled=loading||!question||!answered;
    $('retry').disabled=loading||unsolved;$('filter').disabled=loading||unsolved;
    $('check').disabled=loading||!question||answered;
    $('quick-edit').hidden=$('play').hidden||!graded||!answered||nextBusy||answerBusy;
    $('quick-edit').disabled=loading;
  }
  async function next(){
    if(nextBusy||answerBusy||quickContext||!activeGroup||(question&&!answered))return;const version=viewVersion;nextBusy=true;updatePlayControls();notice('');
    try{
      const result=await api('/next',{player,group_id:activeGroup.id,era_id:Number($('filter').value),previous:question?.id||null});if(version!==viewVersion)return;question=result.question;attempt=result.attempt;answered=false;graded=false;
      $('empty').hidden=!!question;$('answer-form').hidden=!question;$('priority').textContent=question?(result.priority==='unmastered'?'아직 맞히지 못한 문제 · 우선 출제':'전체 문제 · 랜덤 출제'):'';
      if(!question)return;
      $('play-era').textContent=question.era;$('clue').textContent=question.keyword;showStats(question.stats);
      $('answer-form').classList.remove('is-correct','is-wrong');$('result').textContent='';$('check').hidden=false;
      renderPlayAnswers();playRows[0].input.focus({preventScroll:true});
    }catch(error){if(version===viewVersion)notice(error.message);}finally{nextBusy=false;updatePlayControls();}
  }
  $('play-entry').addEventListener('click',()=>busy($('play-entry'),async()=>{try{await openGroups('play');}catch(error){notice(error.message);}}));
  $('filter').addEventListener('change',next);$('next').addEventListener('click',next);$('retry').addEventListener('click',next);
  $('answer-form').addEventListener('submit',event=>{event.preventDefault();if(composing||pendingPlayEnter||answered||nextBusy||answerBusy||!question)return;busy($('check'),async()=>{
    const empty=playRows.find(row=>!normalize(row.input.value));if(empty){$('result').textContent='모든 정답 항목을 입력해 주세요.';empty.input.focus();return;}
    const version=viewVersion;answerBusy=true;$('next').disabled=true;$('retry').disabled=true;$('filter').disabled=true;playRows.forEach(row=>row.input.readOnly=true);$('result').textContent='정답을 확인하고 있습니다…';
    try{
      const result=await api('/answer',{attempt,answers:playRows.map(row=>row.input.value)});if(version!==viewVersion)return;answered=true;graded=true;
      let matched=0;result.results.forEach((part,index)=>{const row=playRows[index];row.host.classList.add(part.correct?'is-correct':'is-wrong');row.feedback.textContent=part.correct?'정답':'오답';row.input.setAttribute('aria-invalid',String(!part.correct));row.reveal.hidden=part.correct;row.reveal.textContent='정답: '+part.answer;if(part.correct)matched++;});
      $('answer-form').classList.add(result.correct?'is-correct':'is-wrong');$('result').textContent=result.correct?'모두 정답입니다.':`${result.results.length}개 중 ${matched}개 정답 · 이 문제는 오답으로 기록됩니다.`;
      showStats(result.stats);$('check').hidden=true;
    }catch(error){if(version!==viewVersion)return;$('result').textContent=error.message;if(error.status===409||error.status===410){answered=true;$('check').hidden=true;}else playRows.forEach(row=>row.input.readOnly=false);}
    finally{answerBusy=false;updatePlayControls();if(answered&&!$('play').hidden)$('next').focus({preventScroll:true});}
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
      if(groupMode==='create'){screen('create');markManageDirty();$('question-list').replaceChildren();$('page').textContent='';refreshManageInBackground();$('keyword').focus();}
      else{$('filter').value='0';$('answer-form').hidden=true;$('empty').hidden=true;screen('play');await next();}
    }finally{groupBusy=false;}
  }
  $('groups-refresh').addEventListener('click',()=>busy($('groups-refresh'),()=>loadGroups().catch(error=>notice(error.message))));
  root.querySelectorAll('.hq-group-switch').forEach(button=>button.addEventListener('click',()=>{
    if(nextBusy||groupBusy||answerBusy||quickContext)return;
    if(groupMode==='create'&&($('keyword').value||editorRows.some(row=>row.input.value))&&!window.confirm('그룹을 변경하면 아직 저장하지 않은 입력 내용이 지워집니다. 변경할까요?'))return;
    openGroups(groupMode).catch(error=>notice(error.message));
  }));
  $('group-add').addEventListener('click',()=>{$('group-name').value='';$('group-error').textContent='';$('group-dialog').showModal();$('group-name').focus();});
  $('group-form').addEventListener('submit',event=>{event.preventDefault();if(composing)return;busy($('group-form').querySelector('[type=submit]'),async()=>{
    try{const {group}=await api('/groups',{name:$('group-name').value},true);$('group-dialog').close();await selectGroup(group);}
    catch(error){if($('group-dialog').open)$('group-error').textContent=error.message;else notice(error.message);}
  });});
  renderMenus();if(setupToken)openAuth();
})();
