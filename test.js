// Content integrity tests: run with `node test.js`
const fs = require('fs'), vm = require('vm');
const ctx = { window: {} }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync('data.js', 'utf8'), ctx);
new vm.Script(fs.readFileSync('app.js', 'utf8'));
const D = ctx.window.VOID_DATA; let fail = 0;
const ok = (c, m) => { if (!c) { console.error('FAIL:', m); fail++; } };
ok(D.levels.length === 5, '5 levels');
D.lessons.forEach(l => {
  ok(l.body_ar.length && l.body_en.length, l.id + ' bilingual body');
  ok(l.refs && l.refs.length, l.id + ' has refs');
  ok(l.quiz && l.quiz.a < l.quiz.o_ar.length && l.quiz.o_ar.length === l.quiz.o_en.length, l.id + ' quiz');
  ok(l.status === 'pending_review', l.id + ' pending review');
});
ok(D.lessons.length >= D.levels[4].need, 'enough lessons for level 5');
D.forbidden.forEach(f => ok(f.danger >= 1 && f.danger <= 5 && f.src_ar && f.mind_ar && f.scale_ar, f.id + ' fields'));
D.manuscripts.forEach(m => ok(m.links.length && m.links.every(x => /^https:\/\//.test(x[1])), m.id + ' https links'));
const banned = /\b(dose|dosage|grams? of|mg of)\b/i;
JSON.stringify(D.forbidden).split('"').forEach(s => ok(!banned.test(s), 'no recipe wording: ' + s.slice(0, 40)));
if (fail) process.exit(1); console.log('all tests passed');
