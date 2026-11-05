import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { build } from 'esbuild'
import { parse, compileScript } from '@vue/compiler-sfc'
import { JSDOM } from 'jsdom'
import { buildAgentExamPrompt, validateExamRequest, AGENT_GUIDE_URL, TYPE_OPTIONS, parseQuestionTypes } from '../docs/.vitepress/theme/components/agent-exam-prompt.js'
const request = {subject:'circuits',scope:'第四章',count:5,minutes:60,type:'example,practice'}
test('generated prompt includes public guide and exact user requirements',()=>{
 const text=buildAgentExamPrompt({...request,subject:'mixed',scope:'電路學 CH4；工程數學 CH3',count:8})
 assert.ok(text.includes(AGENT_GUIDE_URL));assert.match(text,/JSON 與 SHA-256 都不是必要步驟/);assert.match(text,/電路學 CH4；工程數學 CH3/);assert.match(text,/8 題/);assert.match(text,/60 分鐘/);assert.match(text,/預設不揭露答案/)
})
test('invalid scope, count, time and unsupported options cannot produce a prompt',()=>{
 for(const change of [{scope:' '},{count:0},{count:1.5},{count:101},{minutes:''},{minutes:481},{subject:'unknown'},{type:'unknown'}]){
  assert.ok(Object.values(validateExamRequest({...request,...change})).some(Boolean));assert.throws(()=>buildAgentExamPrompt({...request,...change}))
 }
})
test('Vue form supports copy success, manual-copy fallback and invalid-input feedback',async()=>{
 const dom=new JSDOM('<div id="app"></div>',{url:'https://example.com/',pretendToBeVisual:true})
 const keys=['window','document','Element','HTMLElement','SVGElement','Node','navigator']
 const old=new Map(keys.map(key=>[key,Object.getOwnPropertyDescriptor(globalThis,key)]))
 for(const key of keys)Object.defineProperty(globalThis,key,{value:dom.window[key],configurable:true,writable:true})
 let app
 try {
  let copied=''
  Object.defineProperty(navigator,'clipboard',{value:{writeText:async text=>{copied=text}},configurable:true})
  const dir=resolve('docs/.vitepress/theme/components')
  const script=compileScript(parse(readFileSync(resolve(dir,'AgentExamPrompt.vue'),'utf8')).descriptor,{id:'agent-prompt-test',inlineTemplate:true}).content
  const result=await build({stdin:{contents:script+"\nexport { nextTick, createApp } from 'vue'",resolveDir:dir},write:false,bundle:true,format:'esm',platform:'browser',define:{'process.env.NODE_ENV':'"test"',__VUE_OPTIONS_API__:'true',__VUE_PROD_DEVTOOLS__:'false',__VUE_PROD_HYDRATION_MISMATCH_DETAILS__:'false'}})
  const mod=await import('data:text/javascript;base64,'+Buffer.from(result.outputFiles[0].text).toString('base64'))
  app=mod.createApp(mod.default);app.mount('#app');await mod.nextTick()
  const button=document.querySelector('button')
  button.click();await new Promise(r=>setTimeout(r,0));await mod.nextTick()
  assert.equal(copied,buildAgentExamPrompt(request));assert.equal(button.dataset.state,'success')
  navigator.clipboard.writeText=async()=>{throw new Error('denied')}
  button.click();await new Promise(r=>setTimeout(r,0));await mod.nextTick()
  assert.equal(button.dataset.state,'error');assert.match(document.querySelector('[role=status]').textContent,/長按複製/)
  const preview=document.querySelector('textarea');assert.equal(preview.selectionEnd,preview.value.length)
  const boxes=[...document.querySelectorAll('fieldset input[type=checkbox]')]
  assert.equal(boxes.length,5)
  assert.deepEqual(boxes.filter(box=>box.checked).map(box=>box.value),['example','practice'])
  for(const box of boxes){box.checked=['homework','exam'].includes(box.value);box.dispatchEvent(new dom.window.Event('change',{bubbles:true}));await mod.nextTick()}
  assert.match(preview.value,/作業 Homework、考題 Exam（homework,exam）/)
  for(const box of boxes){box.checked=false;box.dispatchEvent(new dom.window.Event('change',{bubbles:true}));await mod.nextTick()}
  assert.equal(button.disabled,true)
  const fieldset=document.querySelector('fieldset')
  assert.equal(fieldset.getAttribute('aria-invalid'),'true')
  assert.match(document.getElementById(fieldset.getAttribute('aria-describedby')).textContent,/至少選擇/)
  const scope=document.querySelector('input:not([type=checkbox])');scope.value='';scope.dispatchEvent(new dom.window.Event('input',{bubbles:true}));scope.dispatchEvent(new dom.window.Event('blur'));await mod.nextTick()
  assert.equal(button.disabled,true);assert.equal(scope.getAttribute('aria-invalid'),'true')
 } finally {
  app?.unmount();dom.window.close()
  for(const key of keys){const descriptor=old.get(key);if(descriptor)Object.defineProperty(globalThis,key,descriptor);else delete globalThis[key]}
 }
})

test('all nonempty type subsets validate and render in canonical registry order',()=>{
 const values=TYPE_OPTIONS.map(option=>option.value)
 for(let mask=1;mask<32;mask++){
  const types=values.filter((_,i)=>mask & (1<<i))
  const raw=[...types].reverse().join(',')
  assert.equal(parseQuestionTypes(raw).csv,types.join(','))
  assert.equal(validateExamRequest({...request,type:raw}).type,'')
  assert.ok(buildAgentExamPrompt({...request,type:raw}).includes(`（${types.join(',')}）`))
 }
 assert.equal(parseQuestionTypes('all').csv,values.join(','))
 assert.equal(parseQuestionTypes('exam,exam,example').csv,'example,exam')
 for(const type of ['', 'example,unknown', 'example,', undefined]){
  assert.ok(validateExamRequest({...request,type}).type)
  assert.throws(()=>buildAgentExamPrompt({...request,type}))
 }
})
