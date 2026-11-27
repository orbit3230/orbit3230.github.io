import assert from 'node:assert/strict';
import {harness} from './test.mjs';
const {db,env,api}=harness();let checks=0;
const check=(value,label)=>{assert.ok(value,label);checks++;};
try{
 const token=(await api('/setup',{salt:'a'.repeat(32),key:'b'.repeat(64),setup_token:env.SETUP_TOKEN})).data.token;
 const group=(await api('/groups',{name:'우선 출제 검증'},token)).data.group.id;
 const era=(await api('/categories',{kind:'era',name:'조선'},token)).data.category.id;
 const otherEra=(await api('/categories',{kind:'era',name:'고려'},token)).data.category.id;
 const type=(await api('/categories',{kind:'type',name:'인물'},token)).data.category.id;
 const player='c'.repeat(64),otherPlayer='d'.repeat(64);
 const create=async(keyword,era_id=era)=>(await api('/questions',{group_id:group,era_id,type_id:type,keyword,answer:'정답',request_id:crypto.randomUUID()},token)).data.id;
 const known=await create('두 번 맞힌 문제');
 for(let i=0;i<2;i++){const next=(await api('/next',{group_id:group,player})).data;await api('/answer',{attempt:next.attempt,answer:'정답'});}
 check(db.prepare('SELECT correct,wrong FROM questions WHERE id=?').get(known).correct===2,'Known question has two correct answers');
 const unanswered=await create('아직 안 푼 문제',otherEra);
 const wrongOnly=await create('틀린 문제',otherEra);
 db.prepare('UPDATE questions SET wrong=4 WHERE id=?').run(wrongOnly);
 for(let i=0;i<30;i++){
   const next=(await api('/next',{group_id:group,player,previous:i%2?unanswered:wrongOnly})).data;
   check(next.priority==='unmastered'&&[unanswered,wrongOnly].includes(next.question.id),'Never draw mastered question while any unmastered question remains');
 }
 const filtered=(await api('/next',{group_id:group,era_id:era,player})).data;
 check(filtered.question.id===known&&filtered.priority==='random','Fallback limited to selected era');
 const other=(await api('/next',{group_id:group,era_id:era,player:otherPlayer})).data;
 check(other.question.id===known&&other.priority==='random','Different browser uses same global correct counts');
 for(const identity of [otherPlayer,undefined]){
   for(let i=0;i<20;i++){
     const next=(await api('/next',{group_id:group,player:identity,previous:unanswered})).data;
     check(next.priority==='unmastered'&&next.question.stats.correct===0,'New and legacy clients never draw globally correct question before pool exhausted');
   }
 }
 db.prepare('UPDATE questions SET correct=1 WHERE id IN (?,?)').run(unanswered,wrongOnly);
 const completed=(await api('/next',{group_id:group})).data;
 check(completed.priority==='random','Only exhausted zero-correct pool permits full random');
 db.prepare('UPDATE questions SET correct=0,wrong=0,revision=revision+1 WHERE id=?').run(known);
 const edited=(await api('/next',{group_id:group,previous:known})).data;
 check(edited.question.id===known&&edited.priority==='unmastered','Edited zero-correct question overrides repeat avoidance');
 console.log(`PASS ${checks} priority regression checks`);
}finally{db.close();}
