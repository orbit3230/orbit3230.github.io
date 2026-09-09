import fs from 'node:fs';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';

import worker from './worker.mjs';


const db = new DatabaseSync(':memory:');
db.exec(fs.readFileSync(new URL('./schema.sql', import.meta.url), 'utf8'));
const env = { RATE_SALT: 'test-only-secret-with-at-least-32-characters', ALLOWED_ORIGINS: 'https://orbit3230.github.io', DB: {
  prepare(sql) { return { bind(...values) {
    const stmt = db.prepare(sql);
    return { first: async () => stmt.get(...values) || null, all: async () => ({ results: stmt.all(...values) }), run: async () => stmt.run(...values) };
  } }; }
} };
let count = 0;
function check(value, label) { assert.ok(value, label); count++; }
const payload = (post = '/test/', extra = {}) => ({ post, name: '', body: '댓글 내용', request_id: crypto.randomUUID(), website: '', ...extra });
async function api(method, data, options = {}) {
  const url = 'https://comments.example/comments' + (method === 'GET' ? '?' + new URLSearchParams(data) : '');
  const request = new Request(url, { method, headers: { Origin: env.ALLOWED_ORIGINS, 'Content-Type': 'application/json', 'CF-Connecting-IP': options.ip || '192.0.2.1', ...options.headers }, ...(method === 'POST' ? { body: JSON.stringify(data) } : {}) });
  const response = await worker.fetch(request, env);
  return { status: response.status, data: response.status === 204 ? null : await response.json(), headers: response.headers };
}
let result = await api('GET', { post: '/test/' });
check(result.status === 200 && result.data.comments.length === 0, 'Empty database returns true empty list');
check(result.headers.get('Access-Control-Allow-Origin') === env.ALLOWED_ORIGINS, 'Exact CORS origin');
check((await api('OPTIONS', {})).status === 204, 'Cross-origin preflight works');
check((await api('GET', { post: '/test/' }, { headers: { Origin: 'https://evil.test' } })).status === 403, 'Other origins rejected');
const first = payload();
result = await api('POST', first);
check(result.status === 201 && result.data.comment.name === '익명', 'Anonymous comment persists');
check(!('writer_key' in result.data.comment) && !('request_id' in result.data.comment), 'Only public fields returned');
check((await api('POST', first)).data.comment.id === result.data.comment.id, 'Retry returns original comment');
check((await api('POST', { ...first, body: '다른 내용' })).status === 409, 'Request ID cannot replace content');
check((await api('POST', payload())).status === 429, '30-second cooldown enforced');
check((await api('POST', payload('/test/', { name: '독자', body: '<script>alert(1)</script>' }), { ip: '192.0.2.2' })).status === 201, 'Another visitor may use their own name');
check((await api('GET', { post: '/other/' })).data.comments.length === 0, 'Posts isolated');
for (const invalid of [payload('/bad?query'), payload('/test/', { body: ' ' }), payload('/test/', { body: 'x'.repeat(2001) }), payload('/test/', { name: 'x'.repeat(41) }), payload('/test/', { website: 'bot' }), payload('/test/', { request_id: 'invalid' }), payload('/test/', { body: 'x'.repeat(17000) })]) {
  check((await api('POST', invalid, { ip: '192.0.2.3' })).status === 400, 'Invalid input rejected on server');
}
check((await api('GET', { post: '/test/', before: 'not-a-number' })).status === 400, 'Invalid cursor rejected');
const concurrent = payload('/concurrent/');
const races = await Promise.all([api('POST', concurrent, { ip: '192.0.2.4' }), api('POST', concurrent, { ip: '192.0.2.4' })]);
check(races.every(item => item.data.comment?.id === races[0].data.comment.id), 'Concurrent duplicate requests return same stored comment');
const distinctRaces = await Promise.all([api('POST', payload('/concurrent/'), { ip: '192.0.2.5' }), api('POST', payload('/concurrent/'), { ip: '192.0.2.5' })]);
check(distinctRaces.filter(item => item.status === 201).length === 1 && distinctRaces.some(item => item.status === 429), 'Atomic rate check prevents concurrent distinct spam');
const hourly = await api('POST', payload('/hourly/'), { ip: '192.0.2.6' });
const hourlyKey = db.prepare('SELECT writer_key FROM comments WHERE id = ?').get(hourly.data.comment.id).writer_key;
for (let i = 0; i < 9; i++) db.prepare('INSERT INTO comments(request_id,post,name,body,created_at,created_ms,writer_key) VALUES(?,?,?,?,?,?,?)').run(crypto.randomUUID(), '/hourly/', 'a', 'b', new Date().toISOString(), Date.now() - 60000, hourlyKey);
db.prepare('UPDATE comments SET created_ms = ? WHERE id = ?').run(Date.now() - 60000, hourly.data.comment.id);
check((await api('POST', payload('/hourly/'), { ip: '192.0.2.6' })).status === 429, 'Hourly limit enforced separately from cooldown');
for (let i = 0; i < 25; i++) db.prepare('INSERT INTO comments(request_id,post,name,body,created_at,created_ms) VALUES(?,?,?,?,?,?)').run(crypto.randomUUID(), '/pages/', '독자', '댓글 '+i, new Date().toISOString(), Date.now());
const page1 = (await api('GET', { post: '/pages/' })).data;
const page2 = (await api('GET', { post: '/pages/', before: page1.next_cursor })).data;
check(page1.comments.length === 20 && page2.comments.length === 5 && page2.next_cursor === null, 'Cursor pagination ends correctly');
check(new Set([...page1.comments,...page2.comments].map(row => row.id)).size === 25, 'No pagination duplicates');
db.prepare('UPDATE comments SET created_ms = ? WHERE writer_key IS NOT NULL').run(Date.now() - 300000000);
const totalBefore = db.prepare('SELECT COUNT(*) AS n FROM comments').get().n;
await worker.scheduled({}, env);
check(db.prepare('SELECT COUNT(*) AS n FROM comments').get().n === totalBefore && db.prepare('SELECT COUNT(*) AS n FROM comments WHERE writer_key IS NOT NULL').get().n === 0, 'Privacy cleanup keeps comments and removes old identifiers');

db.close(); console.log(JSON.stringify({status: 'PASS', checks: count}));
