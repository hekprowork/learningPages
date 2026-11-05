import {readFileSync,mkdirSync,writeFileSync} from 'node:fs'
import {resolve} from 'node:path'
import {readQuestionCatalog,SUBJECTS} from './question-catalog.js'
export const READER_BASE='https://hekprowork.github.io/learningPages/'
export const escapeHtml=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))
const names={circuits:'電路學',electronics:'電子學','engineering-math':'工程數學','solid-state':'固態電子導論'}
export const readerPath=q=>`question-reader/${q.subject}/${encodeURIComponent(q.id)}.html`
export function readerEntries(root){
 const catalog=new Map(readQuestionCatalog(root).map(q=>[`${q.subject}:${q.id}`,q]))
 return SUBJECTS.flatMap(subject=>{
  const [header,...lines]=readFileSync(resolve(root,`.agents/skills/learningpages-question-bank-local/references/${subject}.tsv`),'utf8').trimEnd().split(/\r?\n/)
  const fields=header.split('\t')
  return lines.map(line=>{const row=Object.fromEntries(line.split('\t').map((v,i)=>[fields[i],v]));return {...row,...catalog.get(`${subject}:${row.id}`)}})
 })
}
const documentHtml=(title,body)=>`<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css"><style>body{font:16px/1.7 system-ui;margin:2rem auto;padding:0 1rem;max-width:960px;overflow-wrap:anywhere}img,svg{max-width:100%;height:auto}table{border-collapse:collapse;width:100%}td,th{padding:.5rem;text-align:left;border-bottom:1px solid #ccc}details{margin:1.5rem 0}code{white-space:pre-wrap}</style></head><body><main>${body}</main></body></html>`
const save=(output,path,html)=>{const file=resolve(output,path);mkdirSync(resolve(file,'..'),{recursive:true});writeFileSync(file,html)}
export function publishReaderNavigation(root,output=resolve(root,'docs/public')){
 const entries=readerEntries(root);const groups=new Map()
 for(const q of entries){const key=`${q.subject}/chapter-${encodeURIComponent(q.chapter)}.html`;if(!groups.has(key))groups.set(key,[]);groups.get(key).push(q)}
 let links=''
 for(const [path,questions] of groups){const q=questions[0];const title=`${names[q.subject]} Chapter ${q.chapter}`
  links+=`<li><a href="${READER_BASE}question-reader/${path}">${escapeHtml(title)}</a>（${questions.length} 題）</li>`
  const rows=questions.map(q=>`<tr><td><a href="${READER_BASE}${readerPath(q)}">${escapeHtml(q.id)}</a></td><td>${escapeHtml(q.title)}</td><td>${escapeHtml(q.type)}</td><td>${escapeHtml(q.topic)}</td><td>${escapeHtml(q.source)}</td></tr>`).join('')
  save(output,`question-reader/${path}`,documentHtml(title,`<h1>${escapeHtml(title)}</h1><p>依題型與主題選題，點題目 ID 直接讀取原題；無需 GitHub、JSON 或 JavaScript。</p><table><thead><tr><th>ID／讀取原題</th><th>題名</th><th>題型</th><th>主題</th><th>教材來源</th></tr></thead><tbody>${rows}</tbody></table>`))
 }
 save(output,'question-reader/index.html',documentHtml('Agent 原題讀取目錄',`<h1>Agent 原題讀取目錄</h1><p>先選科目與章節，再開啟所需題目的靜態 HTML。每頁只包含一題，保留原題、圖片、公式與詳解。出題後將 ID 放入 <code>${READER_BASE}exam.html?ids=ID1,ID2</code>，回傳一個組卷連結。</p><ul>${links}</ul>`))
 return entries
}
export function readerHtml(q,card,showSolution=false){
 return documentHtml(card.title,`<h1>${escapeHtml(card.title)}</h1><p>題目 ID：<code>${escapeHtml(q.id)}</code> · 科目：${escapeHtml(names[q.subject])} · 題型：${escapeHtml(card.type)}</p><p>教材來源：${escapeHtml(card.source)}</p><article data-reader-id="${escapeHtml(q.id)}"><div class="practice-card-statement">${card.statement}</div>${card.solution?(showSolution?`<section class="practice-card-solution-body"><h2>詳解</h2>${card.solution}</section>`:`<p><a href="${READER_BASE}question-reader/${q.subject}/solutions/${encodeURIComponent(q.id)}.html">需要時閱讀詳解</a></p>`):''}</article><p><a href="${READER_BASE}${q.path}#card-${encodeURIComponent(q.id)}">完整練習頁</a> · <a href="${READER_BASE}exam.html?ids=${encodeURIComponent(q.subject+':'+q.id)}">練習此題</a></p>`)
}
export function publishReaderCard(output,q,card){save(output,readerPath(q),readerHtml(q,card));if(card.solution)save(output,`question-reader/${q.subject}/solutions/${encodeURIComponent(q.id)}.html`,readerHtml(q,card,true))}
