import { test } from 'node:test'
import assert from 'node:assert/strict'
import { JSDOM } from 'jsdom'
import { readQuestionCatalog } from '../scripts/question-catalog.js'
import { resolveQuestions, extractCard, loadExam } from '../docs/.vitepress/theme/components/exam-loader.js'
const Parser = new JSDOM('').window.DOMParser
const fixture = (id,body='題幹') => `<div data-practice-card data-practice-id="${id}" data-practice-type="example"><h3 class="practice-card-title">題目 ${id}</h3><div class="practice-card-statement">${body}</div><details><div class="practice-card-solution-body"><span class="katex">公式詳解</span></div></details></div>`
const catalog = [{id:'a',subject:'circuits',path:'circuits/one.html'},{id:'b',subject:'engineering-math',path:'math/two.html'},{id:'c',subject:'circuits',path:'circuits/one.html'}]
test('all current indexed IDs resolve, including cross-subject selection',()=>{
 const actual=readQuestionCatalog(process.cwd())
 assert.ok(actual.length > 0)
 assert.ok(resolveQuestions(actual,new Set(actual.map(q=>`${q.subject}:${q.id}`))).every(row=>row.question))
})
test('unknown and ambiguous IDs are explicit; qualified IDs disambiguate',()=>{
 const rows=resolveQuestions([...catalog,{id:'a',subject:'electronics',path:'three.html'}],['missing','a','circuits:a'])
 assert.ok(rows[0].error);assert.ok(rows[1].error);assert.equal(rows[2].question.subject,'circuits')
})
test('preserves math, figures and solutions; resolves relative assets under Pages base',()=>{
 const card=extractCard(fixture('a','<span class="katex">x</span><img src="../assets/fig.png"><a href="../notes.html">筆記</a>'),'a','https://example.com/learningPages/circuits/one.html',Parser)
 assert.match(card.statement,/https:\/\/example.com\/learningPages\/assets\/fig.png/)
 assert.match(card.statement,/class="katex"/);assert.match(card.solution,/公式詳解/)
 assert.throws(()=>extractCard(fixture('a')+fixture('a'),'a','https://example.com',Parser),/重複/)
})
test('cross-page results follow URL order; fetches each page once and keeps partial success',async()=>{
 const calls=[]
 const fetcher=async url=>{calls.push(url);return {ok:!url.includes('two'),status:503,text:async()=>fixture('a')+fixture('c')}}
 const result=await loadExam(resolveQuestions(catalog,['c','b','a','missing']),'https://example.com/learningPages/',fetcher,Parser)
 assert.deepEqual(result.map(r=>r.key),['c','b','a','missing']);assert.equal(calls.length,2)
 assert.ok(result[0].card);assert.match(result[1].error,/503/);assert.ok(result[2].card);assert.ok(result[3].error)
})
test('missing source cards fail visibly, aborted navigation does not return stale cards',async()=>{
 const row=resolveQuestions(catalog,['a'])
 const result=await loadExam(row,'https://example.com/',async()=>({ok:true,text:async()=>fixture('b')}),Parser)
 assert.match(result[0].error,/不存在/)
 const controller=new AbortController();controller.abort()
 await assert.rejects(loadExam(row,'https://example.com/',async()=>{throw new Error('aborted')},Parser,controller.signal),/aborted/)
})
