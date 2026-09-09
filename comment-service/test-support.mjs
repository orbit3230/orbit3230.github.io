import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import service from './worker.mjs';
export function harness() {
  const db = new DatabaseSync(':memory:');
  db.exec(fs.readFileSync(new URL('./schema.sql',import.meta.url),'utf8'));
  db.prepare('INSERT INTO comments(request_id,post,name,body,created_at,created_ms) VALUES(?,?,?,?,?,?)').run('legacy','/legacy/','기존 독자','기존 댓글 보존',new Date().toISOString(),Date.now());
  db.exec(fs.readFileSync(new URL('./migrations/0001_conversations.sql',import.meta.url),'utf8'));
  const env = { RATE_SALT:'test-rate-salt-with-more-than-32-characters', PASSWORD_PEPPER:'test-pepper-with-more-than-32-characters', ALLOWED_ORIGINS:'https://orbit3230.github.io,http://localhost', DB:{
    prepare(sql) { return { bind(...values) { const stmt = db.prepare(sql); return {first:async () => stmt.get(...values) || null,all:async () => ({results:stmt.all(...values)}),run:async () => stmt.run(...values)}; } }; }
  }};
  let nextIP = 1;
  async function api(route, data, options={}) {
    const response = await service.fetch(new Request('https://comments.example'+route,{method:data === undefined ? 'GET' : 'POST',headers:{Origin:'https://orbit3230.github.io','Content-Type':'application/json','CF-Connecting-IP':options.ip || `192.0.2.${nextIP++}`,...options.headers},...(data === undefined ? {} : {body:JSON.stringify(data)})}),env);
    return {status:response.status,data:await response.json(),headers:response.headers};
  }
  function payload(post='/test/',extra={}) { return {post,name:'독자',body:'댓글 내용',request_id:crypto.randomUUID(),website:'',password_salt:'a'.repeat(32),password_key:'b'.repeat(64),notify_token:crypto.randomUUID().replaceAll('-','')+crypto.randomUUID().replaceAll('-',''),reply_to:null,...extra}; }
  function seed(post,extra={}) { const now=Date.now(); const r=db.prepare('INSERT INTO comments(request_id,post,name,body,created_at,created_ms,root_id,reply_to) VALUES(?,?,?,?,?,?,?,?) RETURNING *').get(crypto.randomUUID(),post,'검사','본문',new Date(now).toISOString(),now,extra.root_id || null,extra.reply_to || null); return r; }
  return {db,env,api,payload,seed,service};
}
