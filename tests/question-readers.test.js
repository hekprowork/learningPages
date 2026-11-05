import {test} from 'node:test'
import assert from 'node:assert/strict'
import {JSDOM} from 'jsdom'
import {readerHtml,readerPath,readerEntries} from '../scripts/question-readers.js'
import {extractCardFromDocument} from '../docs/.vitepress/theme/components/exam-loader.js'
test('single reader preserves exact source statement, math, images and solution without scripts',()=>{
 const q={id:'one',subject:'circuits',path:'circuits/example.html'}
 const original=new JSDOM('<div data-practice-card data-practice-id="one" data-practice-type="example"><h3 class="practice-card-title">A &lt; B</h3><div class="practice-card-statement"><img src="../assets/x.png"><span class="katex">x</span></div><div class="practice-card-solution-body">解答</div></div><div data-practice-card data-practice-id="two"></div>')
 const card=extractCardFromDocument(original.window.document,'one','https://hekprowork.github.io/learningPages/circuits/example.html')
 const html=readerHtml(q,card);const doc=new JSDOM(html).window.document
 assert.equal(doc.querySelectorAll('[data-reader-id]').length,1)
 assert.equal(doc.querySelectorAll('script,iframe,input').length,0)
 assert.equal(doc.querySelector('.practice-card-statement').innerHTML,card.statement)
 assert.equal(doc.querySelector('.practice-card-solution-body'),null)
 assert.equal(new JSDOM(readerHtml(q,card,true)).window.document.querySelector('.practice-card-solution-body').innerHTML,'<h2>詳解</h2>'+card.solution)
 assert.equal(doc.querySelector('h1').textContent,'A < B')
 assert.match(doc.querySelector('img').src,/learningPages\/assets\/x.png/)
})
test('all indexed questions have unique static reader paths',()=>{
 const entries=readerEntries(process.cwd())
 assert.equal(new Set(entries.map(readerPath)).size,entries.length)
 assert.ok(entries.every(q=>q.chapter&&q.type&&q.path&&!q.path.includes('practice-source')))
})
