import assert from 'node:assert/strict';
import fs from 'node:fs';
import {DatabaseSync} from 'node:sqlite';
import service from './worker.mjs';
export function harness(){
  const db=new DatabaseSync(':memory:');db.exec(fs.readFileSync(new URL('./schema.sql',import.meta.url),'utf8'));
  const env={AUTH_PEPPER:'local-test-pepper-only-not-production',SETUP_TOKEN:'local-test-setup-only',ALLOWED_ORIGINS:'https://orbit3230.github.io,http://127.0.0.1:4008',DB:{
    prepare(sql){return {bind(...args){return {sql,args,first:async()=>db.prepare(sql).get(...args)||null,all:async()=>({results:db.prepare(sql).all(...args)}),run:async()=>db.prepare(sql).run(...args)};}};},
    async batch(statements){db.exec('BEGIN');try{const results=statements.map(({sql,args})=>{const query=db.prepare(sql);return query.columns().length?{results:query.all(...args)}:{results:[],meta:query.run(...args)};});db.exec('COMMIT');return results;}catch(error){db.exec('ROLLBACK');throw error;}}
  }};

  let counter=0;
  async function api(path,data,token='',options={}){const response=await service.fetch(new Request('https://quiz.test'+path,{method:data===undefined?'GET':'POST',headers:{Origin:options.origin||'https://orbit3230.github.io','CF-Connecting-IP':options.ip||'192.0.2.'+(++counter),'Content-Type':'application/json',...(token?{Authorization:'Bearer '+token}:{})},...(data===undefined?{}:{body:JSON.stringify(data)})}),env);return {status:response.status,data:await response.json()};}
  return {db,env,api};
}
if(process.argv[1]===new URL(import.meta.url).pathname.replace(/^\/(.:)/,'$1').replaceAll('/','\\')||process.argv[1]?.replaceAll('\\','/').endsWith('/quiz-service/test.mjs')){
 const {db,env,api}=harness();let checks=0;const check=(condition,label)=>{assert.ok(condition,label);checks++;};
 let result=await api('/status');check(!result.data.initialized,'Fresh admin state');
 check((await api('/catalog')).data.eras.length===0,'Empty categories initially');
 const proof={salt:'a'.repeat(32),key:'b'.repeat(64),setup_token:env.SETUP_TOKEN};
 check((await api('/setup',{...proof,setup_token:'wrong'})).status===403,'Stranger cannot claim first admin');
 result=await api('/setup',proof);check(result.status===200,'First password registered');let token=result.data.token;
 check((await api('/setup',proof)).status===409,'First password cannot be overwritten');
 check((await api('/status')).data.salt===proof.salt,'Login receives salt only');
 check(!db.prepare('SELECT verifier FROM admin').get().verifier.includes(proof.key),'Server stores HMAC verifier');
 check((await api('/login',{...proof,key:'c'.repeat(64)})).status===403,'Wrong password denied');
 check((await api('/login',proof)).status===200,'Password authentication works');
 check((await api('/categories',{kind:'era',name:'고대사'})).status===401,'Write requires server authentication');
 const era=(await api('/categories',{kind:'era',name:'조선'},token)).data.category.id;
 await api('/categories',{kind:'era',name:'고대사'},token);
 const type=(await api('/categories',{kind:'type',name:'인물'},token)).data.category.id;
 check((await api('/catalog')).data.eras.map(e=>e.name).join(',')==='조선,고대사','Insertion order preserved');
 check((await api('/categories',{kind:'era',name:'조선'},token)).data.category.id===era,'Category retry deduplicated');
 const group=(await api('/groups',{name:'조선 집중'},token)).data.group.id;
 const other=(await api('/groups',{name:'고대 집중'},token)).data.group.id;
 check((await api('/groups',{name:'무단 생성'})).status===401,'Group creation requires authentication');
 check((await api('/groups',{name:'조선 집중'},token)).data.group.id===group,'Group retry idempotent');
 check((await api('/groups')).data.groups.map(g=>g.name).join(',')==='조선 집중,고대 집중','Groups preserve creation order');
 check((await api('/next',{})).status===400,'Play requires group');
 check((await api('/next',{group_id:999})).status===404,'Unknown group rejected');
 check((await api('/manage',undefined,token)).status===400,'Management requires group');
 const data={group_id:group,request_id:crypto.randomUUID(),era_id:era,type_id:type,keyword:'의정부 서사제',answer:'세종 대왕'};
 const created=await api('/questions',data,token);check(created.status===200,'Question saved');
 check((await api('/questions',data,token)).data.id===created.data.id,'Creation retry is idempotent');
 check((await api('/manage?group='+group,undefined,token)).data.total===1,'Only one stored question');
 check((await api('/questions',{...data,request_id:crypto.randomUUID(),era_id:type},token)).status===400,'Category kinds validated');
 check((await api('/questions',{...data,group_id:undefined,request_id:crypto.randomUUID()},token)).status===400,'Creation requires group');
 check((await api('/manage?group='+other,undefined,token)).data.total===0,'Management isolated by group');
 check((await api('/next',{group_id:other})).data.question===null,'Play isolated by group');
 check((await api('/questions',{...data,group_id:other,id:created.data.id,revision:1},token)).status===409,'Edit cannot transfer question to wrong group');
 check((await api('/groups')).data.groups[0].count===1,'Group question count');
 const otherQuestion=await api('/questions',{...data,group_id:other,request_id:crypto.randomUUID(),keyword:'훈요 10조',answer:'왕건'},token);
 check(otherQuestion.status===200,'Second group question saved');
 check((await api('/next',{group_id:other})).data.question.id===otherQuestion.data.id,'Populated groups serve only their own questions');
 check((await api('/manage?group='+group,undefined,token)).data.questions.every(q=>q.group_id===group),'Management excludes other populated groups');
 const next=await api('/next',{group_id:group});check(next.data.question.words.join(',')==='2,2','Word lengths supplied');
 check(!JSON.stringify(next.data).includes('세종'),'Answer not leaked before submission');
 const scored=await api('/answer',{attempt:next.data.attempt,answer:'세종   대왕'});check(scored.data.correct&&scored.data.stats.correct===1,'Answer normalization and scoring');
 check((await api('/answer',{attempt:next.data.attempt,answer:'세종 대왕'})).data.stats.correct===1,'Retry does not double-count');
 check((await api('/answer',{attempt:next.data.attempt,answer:'태종'})).status===409,'Cannot change submitted answer');
 const another=await api('/next',{group_id:group});const wrong=await api('/answer',{attempt:another.data.attempt,answer:'태종'});check(!wrong.data.correct&&wrong.data.answer==='세종 대왕'&&wrong.data.stats.rate===50,'Wrong answer and shared statistics');
 const old=await api('/next',{group_id:group});const edited=await api('/questions',{...data,id:created.data.id,revision:1,answer:'세종'},token);check(edited.status===200,'Admin edit');
 check((await api('/answer',{attempt:old.data.attempt,answer:'세종 대왕'})).status===409,'Old question version cannot score');
 check((await api('/questions',{...data,id:created.data.id,revision:1},token)).status===409,'Concurrent edit prevented');
 check((await api('/next',{group_id:group})).data.question.stats.correct===0,'Editing resets stats');
 const korean=await api('/next',{group_id:group});check((await api('/answer',{attempt:korean.data.attempt,answer:'세종'.normalize('NFD')})).data.correct,'Decomposed Korean normalized');
 check((await api('/manage')).status===401,'Answers in management protected');
 check((await api('/delete',{id:created.data.id,revision:2},token)).status===200,'Soft deletion');
 check((await api('/next',{group_id:group})).data.question===null,'Deleted question not served');
 check(db.prepare('SELECT count(*) AS n FROM questions').get().n===2,'Deleted data preserved');
 check((await api('/catalog',undefined,'',{origin:'https://evil.test'})).status===403,'Foreign origin blocked');
 for(let i=0;i<10;i++)await api('/login',{...proof,key:'d'.repeat(64)},'',{ip:'1.2.3.4'});
 check((await api('/login',proof,'',{ip:'1.2.3.4'})).status===429,'Brute force limit');
 await api('/logout',{},token);check((await api('/manage?group='+group,undefined,token)).status===401,'Logout invalidates session');
 for(const populated of [false,true]){
   const legacy=new DatabaseSync(':memory:');legacy.exec(fs.readFileSync(new URL('./migrations/0000_initial.sql',import.meta.url),'utf8'));
   if(populated)legacy.exec("INSERT INTO categories(kind,name) VALUES('era','조선'),('type','인물'); INSERT INTO questions(request_id,era_id,type_id,keyword,answer,correct,wrong,created) VALUES('legacy',1,2,'훈민정음','세종',12,3,1)");
   legacy.exec(fs.readFileSync(new URL('./migrations/0001_question_groups.sql',import.meta.url),'utf8'));
   check(legacy.prepare('SELECT count(*) AS n FROM question_groups').get().n===(populated?1:0),'Migration creates a legacy group only when needed');
   if(populated){const q=legacy.prepare('SELECT * FROM questions').get();check(q.group_id===1&&q.answer==='세종'&&q.correct===12&&q.wrong===3,'Migration preserves existing answers and statistics');}
   check(legacy.prepare('PRAGMA foreign_key_check').all().length===0,'Migrated relations are valid');legacy.close();
 }
 console.log(`PASS ${checks} quiz service checks`);db.close();
}
