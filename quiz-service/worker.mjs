const enc = text => new TextEncoder().encode(text);
const hex = data => [...new Uint8Array(data)].map(n=>n.toString(16).padStart(2,'0')).join('');
const unhex = text => Uint8Array.from(text.match(/../g)||[],n=>parseInt(n,16));
const random = () => hex(crypto.getRandomValues(new Uint8Array(32)));
const digest = async text => hex(await crypto.subtle.digest('SHA-256',enc(text)));
const normalize = text => typeof text==='string' ? text.normalize('NFC').trim().replace(/\s+/gu,' ') : '';
const now = () => Date.now();
class Problem extends Error { constructor(status,message){super(message);this.status=status;} }
const fail=(status,message)=>{throw new Problem(status,message);};
const stmt=(env,sql,...args)=>env.DB.prepare(sql).bind(...args);
const first=(env,sql,...args)=>stmt(env,sql,...args).first();
const run=(env,sql,...args)=>stmt(env,sql,...args).run();
const all=async(env,sql,...args)=>(await stmt(env,sql,...args).all()).results;
const validID=n=>Number.isSafeInteger(n)&&n>0;
async function hmac(env){return crypto.subtle.importKey('raw',enc(env.AUTH_PEPPER),{name:'HMAC',hash:'SHA-256'},false,['sign','verify']);}
async function sign(env,text){return hex(await crypto.subtle.sign('HMAC',await hmac(env),enc(text)));}
function limitStatement(env,key,max,seconds){
  const bucket=Math.floor(now()/(seconds*1000));
  return stmt(env,'INSERT INTO limits(key,count,expires) VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1 WHERE count<? RETURNING count',key+':'+bucket,(bucket+1)*seconds*1000,max);
}
async function guard(request,env,url,ip){
  const path=url.pathname,post=request.method==='POST';
  const needsAdmin=(request.method==='GET'&&path==='/manage')||(post&&['/logout','/groups','/categories','/questions','/delete'].includes(path));
  const token=request.headers.get('Authorization')?.replace(/^Bearer /,'');
  const queries=[limitStatement(env,'all:'+ip,240,60)];
  const scope=post?((path==='/setup'||path==='/login')?['auth',10,900]:['/groups','/categories','/questions'].includes(path)?['write',120,60]:path==='/next'?['play',80,60]:path==='/answer'?['answer',80,60]:null):null;
  if(scope)queries.push(limitStatement(env,scope[0]+':'+ip,scope[1],scope[2]));
  const limits=queries.length;
  if(needsAdmin)queries.push(stmt(env,'SELECT token FROM sessions WHERE token=? AND expires>?',/^[a-f0-9]{64}$/.test(token||'')?await digest(token):'',now()));
  const results=await env.DB.batch(queries);
  if(results.slice(0,limits).some(result=>!result.results.length))fail(429,'요청이 많습니다. 잠시 후 다시 시도해 주세요.');
  if(needsAdmin&&!results[limits].results.length)fail(401,'관리자 인증이 만료되었습니다. 다시 접속해 주세요.');
  return token;
}
async function payload(request){
  if(!request.headers.get('Content-Type')?.startsWith('application/json')) fail(415,'JSON 요청이 필요합니다.');
  const reader=request.body?.getReader(); if(!reader) fail(400,'내용을 입력해 주세요.');
  let size=0,parts=[];
  while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>16384){await reader.cancel();fail(413,'입력 내용이 너무 깁니다.');}parts.push(value);}
  try {const bytes=new Uint8Array(size);let offset=0;for(const part of parts){bytes.set(part,offset);offset+=part.length;}const data=JSON.parse(new TextDecoder().decode(bytes));if(!data||Array.isArray(data)||typeof data!=='object')throw Error();return data;}catch{fail(400,'입력 형식을 확인해 주세요.');}
}
function proof(data){if(!/^[a-f0-9]{32}$/.test(data.salt||'')||!/^[a-f0-9]{64}$/.test(data.key||''))fail(400,'비밀번호 정보를 확인해 주세요.');}
async function session(env){const token=random();await run(env,'INSERT INTO sessions(token,expires) VALUES(?,?)',await digest(token),now()+4*60*60*1000);return {token};}
const stats=q=>({correct:q.correct,wrong:q.wrong,rate:q.correct+q.wrong?Math.round(q.correct/(q.correct+q.wrong)*1000)/10:null});
// Keep legacy single-answer rows readable; new questions store ordered answer parts atomically.
const answerParts=q=>q.answers_json?JSON.parse(q.answers_json):[{type_id:q.type_id,answer:q.answer}];
function namedParts(q,types){const names=new Map(types.map(t=>[t.id,t.name]));return answerParts(q).map(part=>({...part,type:names.get(part.type_id)||'정답'}));}
async function playerID(env,value){if(value===undefined)return null;if(!/^[a-f0-9]{64}$/.test(value))fail(400,'풀이 식별 정보를 확인해 주세요.');return sign(env,'quiz-player:'+value);}
async function route(request,env,url,access){
  const path=url.pathname,method=request.method;
  if(method==='GET'&&path==='/status'){
    const row=await first(env,'SELECT salt FROM admin WHERE id=1');
    return {initialized:!!row,salt:row?.salt||null};
  }
  if(method==='GET'&&path==='/groups')return {groups:await all(env,'SELECT g.id,g.name,count(q.id) AS count FROM question_groups g LEFT JOIN questions q ON q.group_id=g.id AND q.deleted=0 GROUP BY g.id ORDER BY g.id')};
  if(method==='GET'&&path==='/catalog'){const rows=await all(env,'SELECT id,name,kind FROM categories ORDER BY id');return {eras:rows.filter(r=>r.kind==='era').map(({id,name})=>({id,name})),types:rows.filter(r=>r.kind==='type').map(({id,name})=>({id,name}))};}
  if(method!=='GET'&&method!=='POST')fail(405,'지원하지 않는 요청입니다.');
  const data=method==='POST'?await payload(request):{};
  if(method==='POST'&&(path==='/setup'||path==='/login')){
    proof(data);
    const existing=await first(env,'SELECT * FROM admin WHERE id=1');
    if(path==='/setup'){
      if(existing)fail(409,'관리자 비밀번호가 이미 설정되었습니다. 로그인해 주세요.');
      // Initial enrollment is only reachable with an owner-held, one-time setup key.
      if(!env.SETUP_TOKEN||typeof data.setup_token!=='string'||data.setup_token.length>128||!await crypto.subtle.verify('HMAC',await hmac(env),unhex(await sign(env,env.SETUP_TOKEN)),enc(data.setup_token)))fail(403,'소유자용 초기 설정 링크가 필요합니다.');
      const inserted=await first(env,'INSERT INTO admin(id,salt,verifier,created) VALUES(1,?,?,?) ON CONFLICT(id) DO NOTHING RETURNING id',data.salt,await sign(env,data.salt+':'+data.key),now());
      if(!inserted)fail(409,'이미 등록되었습니다. 로그인해 주세요.');
    }else{
      if(!existing)fail(409,'관리자가 아직 초기 설정을 완료하지 않았습니다.');
      if(data.salt!==existing.salt||!await crypto.subtle.verify('HMAC',await hmac(env),unhex(existing.verifier),enc(data.salt+':'+data.key)))fail(403,'비밀번호가 일치하지 않습니다.');
    }
    return session(env);
  }
  if(method==='POST'&&path==='/logout'){const token=access;await run(env,'DELETE FROM sessions WHERE token=?',await digest(token));return {ok:true};}
  if(method==='POST'&&path==='/groups'){
    
    const name=normalize(data.name);if(!name||[...name].length>60||/[\u0000-\u001f\u007f]/u.test(name))fail(400,'그룹 이름은 1~60자로 입력해 주세요.');
    return {group:await first(env,'INSERT INTO question_groups(name,created) VALUES(?,?) ON CONFLICT(name) DO UPDATE SET name=excluded.name RETURNING id,name',name,now())};
  }
  if(method==='POST'&&path==='/categories'){
    
    const name=normalize(data.name);if(!['era','type'].includes(data.kind)||!name||[...name].length>30)fail(400,'항목은 1~30자로 입력해 주세요.');
    return {category:await first(env,'INSERT INTO categories(kind,name) VALUES(?,?) ON CONFLICT(kind,name) DO UPDATE SET name=excluded.name RETURNING id,name',data.kind,name)};
  }
  if(path==='/manage'&&method==='GET'){
    const group=Number(url.searchParams.get('group'));if(!validID(group))fail(400,'문제 그룹을 먼저 선택해 주세요.');
    if(url.searchParams.has('id')){
      const id=Number(url.searchParams.get('id'));if(!validID(id))fail(400,'문제 번호를 확인해 주세요.');
      const [rows,types]=await env.DB.batch([
        stmt(env,'SELECT q.*,e.name AS era,t.name AS type FROM questions q JOIN categories e ON q.era_id=e.id JOIN categories t ON q.type_id=t.id WHERE q.id=? AND q.group_id=? AND q.deleted=0',id,group),
        stmt(env,"SELECT id,name FROM categories WHERE kind='type'")
      ]);
      const row=rows.results[0];if(!row)fail(404,'문제가 삭제되었거나 해당 그룹에 없습니다.');
      const {answers_json,...fields}=row;return {question:{...fields,answers:namedParts(row,types.results)}};
    }
    const page=Math.max(1,Number(url.searchParams.get('page')||1));if(!Number.isSafeInteger(page)||page>100000)fail(400,'페이지를 확인해 주세요.');
    const [exists,rows,total,types]=await env.DB.batch([
      stmt(env,'SELECT id FROM question_groups WHERE id=?',group),
      stmt(env,'SELECT q.*,e.name AS era,t.name AS type FROM questions q JOIN categories e ON q.era_id=e.id JOIN categories t ON q.type_id=t.id WHERE q.deleted=0 AND q.group_id=? ORDER BY q.id DESC LIMIT 5 OFFSET ?',group,5*(page-1)),
      stmt(env,'SELECT count(*) AS n FROM questions WHERE deleted=0 AND group_id=?',group),
      stmt(env,"SELECT id,name FROM categories WHERE kind='type'")
    ]);
    if(!exists.results.length)fail(404,'문제 그룹을 찾을 수 없습니다.');
    const questions=rows.results.map(row=>{const {answers_json,...fields}=row;return {...fields,answers:namedParts(row,types.results)};});
    return {questions,total:total.results[0].n};
  }

  if(method==='POST'&&path==='/questions'){
    
    const group=data.group_id,keyword=normalize(data.keyword);if(!validID(group))fail(400,'문제 그룹을 먼저 선택해 주세요.');
    const input=data.answers===undefined?[{type_id:data.type_id,answer:data.answer}]:data.answers;
    if(!keyword||keyword.length>500||!validID(data.era_id)||/[\u0000-\u001f\u007f]/u.test(keyword))fail(400,'키워드는 1~500자로 입력하고 시대를 선택해 주세요.');
    if(!Array.isArray(input)||input.length<1||input.length>10)fail(400,'정답 항목은 1~10개로 구성해 주세요.');
    const answers=input.map(part=>({type_id:part?.type_id,answer:normalize(part?.answer)}));
    if(answers.some(part=>!validID(part.type_id)||!part.answer||[...part.answer].length>60||/[\u0000-\u001f\u007f]/u.test(part.answer)))fail(400,'각 항목의 분류와 1~60자의 정답을 입력해 주세요.');
    const checks=await env.DB.batch([
      stmt(env,'SELECT id FROM question_groups WHERE id=?',group),
      stmt(env,"SELECT id FROM categories WHERE id=? AND kind='era'",data.era_id),
      stmt(env,"SELECT id FROM categories WHERE kind='type'"),
      ...(data.id&&data.answers===undefined?[stmt(env,'SELECT * FROM questions WHERE id=? AND deleted=0',data.id)]:[])
    ]);
    if(!checks[0].results.length)fail(404,'문제 그룹을 찾을 수 없습니다.');
    if(!checks[1].results.length)fail(400,'시대를 선택해 주세요.');
    const types=new Set(checks[2].results.map(t=>t.id));
    if(answers.some(part=>!types.has(part.type_id)))fail(400,'정답 종류를 선택해 주세요.');
    const serialized=JSON.stringify(answers),head=answers[0];
    if(data.id){
      if(!validID(data.id)||!validID(data.revision))fail(400,'문제 정보를 확인해 주세요.');
      const existing=checks[3]?.results[0];
      if(data.answers===undefined&&existing&&answerParts(existing).length>1)fail(409,'여러 정답이 있는 문제입니다. 페이지를 새로고침하고 수정해 주세요.');
      const row=await first(env,'UPDATE questions SET era_id=?,type_id=?,keyword=?,answer=?,answers_json=?,revision=revision+1,correct=0,wrong=0 WHERE id=? AND revision=? AND deleted=0 AND group_id=? RETURNING id',data.era_id,head.type_id,keyword,head.answer,serialized,data.id,data.revision,group);
      if(!row)fail(409,'다른 화면에서 변경된 문제입니다. 목록을 새로고침해 주세요.');return row;
    }
    if(!/^[a-f0-9-]{36}$/i.test(data.request_id||''))fail(400,'요청 번호를 확인해 주세요.');
    const saved=await env.DB.batch([stmt(env,'INSERT INTO questions(request_id,group_id,era_id,type_id,keyword,answer,answers_json,created) VALUES(?,?,?,?,?,?,?,?) ON CONFLICT(request_id) DO NOTHING',data.request_id,group,data.era_id,head.type_id,keyword,head.answer,serialized,now()),stmt(env,'SELECT * FROM questions WHERE request_id=?',data.request_id)]);
    const row=saved[1].results[0];
    if(row.group_id!==group||row.era_id!==data.era_id||row.keyword!==keyword||JSON.stringify(answerParts(row))!==serialized||row.deleted)fail(409,'저장 요청이 변경되었습니다. 다시 시도해 주세요.');return {id:row.id};
  }

  if(method==='POST'&&path==='/delete'){
    if(!validID(data.id)||!validID(data.revision))fail(400,'문제 정보를 확인해 주세요.');
    const row=await first(env,'UPDATE questions SET deleted=1 WHERE id=? AND revision=? AND deleted=0 RETURNING id',data.id,data.revision);if(!row)fail(409,'이미 변경되거나 삭제된 문제입니다.');return {ok:true};
  }
  if(method==='POST'&&path==='/next'){
    const group=data.group_id;if(!validID(group))fail(400,'문제 그룹을 먼저 선택해 주세요.');
    const era=data.era_id??0;if(era!==0&&!validID(era))fail(400,'시대를 확인해 주세요.');
    const previous=validID(data.previous)?data.previous:0,player=await playerID(env,data.player);
    const [exists,count,candidates,types]=await env.DB.batch([
      stmt(env,'SELECT id FROM question_groups WHERE id=?',group),
      stmt(env,'SELECT count(*) AS n FROM questions WHERE deleted=0 AND group_id=? AND (?=0 OR era_id=?)',group,era,era),
      stmt(env,`SELECT q.*,e.name AS era FROM questions q
        JOIN categories e ON e.id=q.era_id
        WHERE q.deleted=0 AND q.group_id=? AND (?=0 OR q.era_id=?)
        ORDER BY (q.correct>0), (q.id=?), RANDOM() LIMIT 1`,group,era,era,previous),
      stmt(env,"SELECT id,name FROM categories WHERE kind='type'")
    ]);
    if(!exists.results.length)fail(404,'문제 그룹을 찾을 수 없습니다.');
    const total=count.results[0].n,q=candidates.results[0];if(!q)return {question:null,total:0};
    const token=random(),parts=namedParts(q,types.results);
    await run(env,'INSERT INTO attempts(token,question_id,revision,expires,player_id) VALUES(?,?,?,?,?)',await digest(token),q.id,q.revision,now()+86400000,player);
    const answers=parts.map(part=>({type:part.type,words:part.answer.split(' ').map(w=>[...w].length)}));
    return {question:{id:q.id,era:q.era,type:answers[0].type,keyword:q.keyword,words:answers[0].words,answers,stats:stats(q)},attempt:token,total,priority:q.correct===0?'unmastered':'random'};
  }
  if(method==='POST'&&path==='/answer'){
    if(!/^[a-f0-9]{64}$/.test(data.attempt||''))fail(400,'답을 확인해 주세요.');
    const token=await digest(data.attempt);
    const [loaded,types]=await env.DB.batch([
      stmt(env,`SELECT a.question_id,a.revision AS attempt_revision,q.* FROM attempts a
        LEFT JOIN questions q ON q.id=a.question_id WHERE a.token=? AND a.expires>?`,token,now()),
      stmt(env,"SELECT id,name FROM categories WHERE kind='type'")
    ]);
    const q=loaded.results[0];if(!q)fail(410,'풀이 시간이 만료되었습니다. 다음 문제를 열어 주세요.');
    if(!q.id||q.deleted||q.revision!==q.attempt_revision)fail(409,'관리자가 수정한 문제입니다. 다음 문제를 열어 주세요.');
    const parts=namedParts(q,types.results),input=data.answers===undefined?[data.answer]:data.answers;
    if(!Array.isArray(input)||input.length!==parts.length||input.some(value=>typeof value!=='string'||value.length>240))fail(400,'모든 정답 항목을 입력해 주세요.');
    const answers=input.map(normalize);if(answers.some(value=>!value))fail(400,'모든 정답 항목을 입력해 주세요.');
    const results=parts.map((part,i)=>({type:part.type,correct:answers[i]===part.answer,answer:part.answer}));
    const correct=results.every(part=>part.correct),submitted=answers.length===1?answers[0]:JSON.stringify(answers);
    // Keep scoring, idempotency verification and post-trigger counters in one transaction.
    const saved=await env.DB.batch([
      stmt(env,'UPDATE attempts SET submitted=?,correct=? WHERE token=? AND submitted IS NULL AND EXISTS (SELECT 1 FROM questions WHERE id=attempts.question_id AND revision=attempts.revision AND deleted=0)',submitted,Number(correct),token),
      stmt(env,'SELECT submitted,correct FROM attempts WHERE token=?',token),
      stmt(env,'SELECT correct,wrong,revision,deleted FROM questions WHERE id=?',q.id)
    ]);
    const recorded=saved[1].results[0],latest=saved[2].results[0];
    if(recorded.submitted!==submitted)fail(409,'이미 제출했거나 변경된 문제입니다. 다음 문제를 열어 주세요.');
    if(!latest||latest.deleted||latest.revision!==q.revision)fail(409,'관리자가 수정한 문제입니다. 다음 문제를 열어 주세요.');
    return {correct:!!recorded.correct,answer:parts[0].answer,results,stats:stats(latest)};
  }

  fail(404,'요청을 찾을 수 없습니다.');
}
export default {
  async fetch(request,env){
    const origin=request.headers.get('Origin'),allowed=(env.ALLOWED_ORIGINS||'').split(',').map(v=>v.trim());
    const headers={'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Vary':'Origin'};
    if(origin&&allowed.includes(origin)){headers['Access-Control-Allow-Origin']=origin;headers['Access-Control-Allow-Headers']='Content-Type, Authorization';headers['Access-Control-Allow-Methods']='GET, POST, OPTIONS';headers['Access-Control-Max-Age']='86400';}
    try{
      if(origin&&!allowed.includes(origin))fail(403,'허용되지 않은 사이트입니다.');
      if(!env.AUTH_PEPPER)fail(503,'퀴즈 서버를 준비 중입니다.');
      if(request.method==='OPTIONS')return new Response(null,{status:204,headers});
      const ip=await sign(env,new Date().toISOString().slice(0,10)+':'+(request.headers.get('CF-Connecting-IP')||'unknown'));
      const url=new URL(request.url),started=performance.now(),access=await guard(request,env,url,ip);
      const result=await route(request,env,url,access);headers['Server-Timing']='app;dur='+Math.round(performance.now()-started);
      return new Response(JSON.stringify(result),{headers});
    }catch(error){return new Response(JSON.stringify({error:error instanceof Problem?error.message:'서버 연결을 확인하고 다시 시도해 주세요.'}),{status:error instanceof Problem?error.status:500,headers});}
  },
  async scheduled(event,env){await run(env,'DELETE FROM limits WHERE expires<?',now());await run(env,'DELETE FROM sessions WHERE expires<?',now());await run(env,'DELETE FROM attempts WHERE expires<?',now()-7*86400000);}
};
