import {test} from 'node:test'
import assert from 'node:assert/strict'
import {JSDOM} from 'jsdom'
import {sourceStatementText,createSourceTextLoader} from '../scripts/question-source-text.js'
import {readerEntries} from '../scripts/question-readers.js'
import {prepareOfflineExam} from '../docs/.vitepress/theme/components/offline-exam.js'
const Parser=new JSDOM('').window.DOMParser
test('authored LaTeX survives text export and solution slot is excluded',()=>{
 const block='<PracticeCard title="a > b" id="q"><p>求 $e^{at}$ 與 $\\frac{1}{s-a}$</p><template #solution>SECRET_ANSWER</template></PracticeCard>'
 const text=sourceStatementText(block);assert.match(text,/\\frac\{1\}/);assert.ok(!text.includes('SECRET_ANSWER'));assert.ok(!text.includes('PracticeCard'))
})
test('every indexed source has an authored standalone text statement',()=>{
 const load=createSourceTextLoader(process.cwd());const entries=readerEntries(process.cwd())
 for(const q of entries){const text=load(q,{statement:''});assert.ok(text.startsWith(`ID: ${q.id}\n`));assert.ok(!text.includes('<template #solution>'));assert.ok(text.length>q.id.length+30)}
})
test('offline flow needs only browser HTML/text fetches and includes full data for a model with no network',async()=>{
 const catalog=[{id:'q1',subject:'circuits',chapter:'4',type:'example',title:'題一',topic:'A'},{id:'q2',subject:'circuits',chapter:'4',type:'example',title:'題二',topic:'B'}]
 const calls=[];const fetcher=async url=>{calls.push(url);assert.ok(!/github\.com|raw\.githubusercontent|\.json|\.tsv/.test(url));const id=url.includes('q1')?'q1':'q2';return {ok:true,text:async()=>url.endsWith('.txt')?`ID: ${id}\n求 $\\frac{1}{s}$`:`<article data-reader-id="${id}"><div class="practice-card-statement">${id==='q1'?'<img src="fig.png">':'<mjx-container><svg></svg></mjx-container>'}題目</div></article>`}}
 const request={subject:'circuits',chapters:['4'],type:'example',count:1,minutes:60,textOnly:false}
 const result=await prepareOfflineExam(catalog,request,fetcher,Parser)
 assert.equal(result.entries.length,2);assert.match(result.prompt,/\\frac\{1\}/);assert.match(result.prompt,/PDF/)
 assert.ok(result.entries.every(q=>!q.statement.includes('practice-card-solution')))
 const textOnly=await prepareOfflineExam(catalog,{...request,textOnly:true},fetcher,Parser)
 assert.equal(textOnly.entries.length,1);assert.equal(textOnly.entries[0].id,'q2')
 await assert.rejects(prepareOfflineExam(catalog,{...request,count:3},fetcher,Parser),/只備妥 2 題/)
})
test('wrong IDs, unavailable pages and oversized requests fail explicitly',async()=>{
 const q={id:'q',subject:'circuits',chapter:'4',type:'example',topic:'x'}
 const request={subject:'circuits',chapters:['4'],type:'all',count:1,minutes:60}
 await assert.rejects(prepareOfflineExam([q],request,async()=>({ok:false,status:404}),Parser),/只備妥 0 題/)
 await assert.rejects(prepareOfflineExam([q],request,async()=>({ok:true,text:async()=>'ID: other\n'}),Parser),/只備妥 0 題/)
 await assert.rejects(prepareOfflineExam([q],{...request,count:11},null,Parser),/1–10 題/)
})
