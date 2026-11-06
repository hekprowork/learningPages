import { buildCandidatePrompt } from './candidate-prompt.js'
import { parseQuestionTypes } from './agent-exam-prompt.js'
const SITE='https://hekprowork.github.io/learningPages/'
export function matchOfflineScope(catalog,request){
 const available=[...new Set(catalog.filter(q=>q.subject===request.subject).map(q=>q.chapter))].sort((a,b)=>Number(a)-Number(b)||a.localeCompare(b))
 if(!Array.isArray(request.chapters)||!request.chapters.length)throw new Error('請至少選擇一個章節。')
 if([...request.chapters].some(chapter=>typeof chapter!=='string'||!available.includes(chapter)))throw new Error('請選擇此科目有效的章節。')
 const chapters=available.filter(chapter=>request.chapters.includes(chapter))
 const selection=parseQuestionTypes(request.type)
 if(selection.error)throw new Error(selection.error)
 const types=selection.types
 const rows=catalog.filter(q=>q.subject===request.subject&&chapters.includes(q.chapter)&&types.includes(q.type))
 return {chapters,types,rows}
}
export function selectOfflineCandidates(catalog,request){
 const count=Number(request.count)
 if(!Number.isInteger(count)||count<1||count>10)throw new Error('免連網模式每次請選 1–10 題；更多題目請分批。')
 if(!Number.isInteger(Number(request.minutes))||Number(request.minutes)<1||Number(request.minutes)>480)throw new Error('請填入 1–480 分鐘的有效作答時間。')
 const rawLimit=request.candidateLimit
 const hasLimit=rawLimit!==undefined&&!(typeof rawLimit==='string'&&rawLimit.trim()==='')
 const candidateLimit=hasLimit?Number(rawLimit):null
 if(hasLimit&&(!['number','string'].includes(typeof rawLimit)||!Number.isInteger(candidateLimit)||candidateLimit<count))throw new Error(`候選題數請留空使用全部，或填入至少 ${count} 題的正整數；不得少於模考題數。`)
 const {chapters,types,rows}=matchOfflineScope(catalog,request)
 const groups=new Map()
 for(const q of rows){const key=q.topic||q.type;if(!groups.has(key))groups.set(key,[]);groups.get(key).push(q)}
 const ordered=[]
 while([...groups.values()].some(g=>g.length))for(const group of groups.values())if(group.length)ordered.push(group.shift())
 return {chapters,types,count,wanted:candidateLimit===null?ordered.length:Math.min(candidateLimit,ordered.length),ordered}
}
export function prepareCandidateIndex(catalog,request){
 const {chapters,types,count,wanted,ordered}=selectOfflineCandidates(catalog,request)
 if(request.textOnly)throw new Error('只選無圖題需要完整模式確認原題。')
 const entries=ordered.slice(0,wanted)
 if(entries.length<count)throw new Error(`目前條件下只有 ${entries.length} 題候選，需要 ${count} 題；請調整章節或題型。`)
 return {entries,prompt:buildCandidatePrompt(entries,{...request,chapters,type:types.join(',')},'compact'),failures:[]}
}
export async function prepareOfflineExam(catalog,request,fetcher,Parser,base=SITE){
 const {chapters,types,count,wanted,ordered}=selectOfflineCandidates(catalog,request)
 const entries=[],failures=[]
 for(let offset=0;offset<ordered.length&&entries.length<wanted;offset+=4){
  const batch=await Promise.all(ordered.slice(offset,offset+4).map(async q=>{
   try{
    const path=`question-reader/${q.subject}/${encodeURIComponent(q.id)}`
    const [html,text]=await Promise.all(['.html','.txt'].map(async ext=>{const response=await fetcher(new URL(path+ext,base).href);if(!response.ok)throw new Error(`HTTP ${response.status}`);return response.text()}))
    if(!text.startsWith(`ID: ${q.id}\n`))throw new Error('題目文字與 ID 不符')
    const doc=new Parser().parseFromString(html,'text/html')
    const articles=doc.querySelectorAll('article[data-reader-id]')
    if(articles.length!==1||articles[0].dataset.readerId!==q.id)throw new Error('題卡 ID 不符')
    const statement=articles[0].querySelector('.practice-card-statement')
    if(!statement)throw new Error('題幹不存在')
    const hasFigures=!!statement.querySelector('img')||[...statement.querySelectorAll('svg')].some(svg=>!svg.closest('mjx-container,.katex,.MathJax'))
    if(request.textOnly&&hasFigures)return null
    for(const el of statement.querySelectorAll('script,iframe,object,embed,input,button,form'))el.remove()
    for(const el of statement.querySelectorAll('*'))for(const attr of [...el.attributes])if(/^on/i.test(attr.name))el.removeAttribute(attr.name)
    for(const img of statement.querySelectorAll('img'))img.setAttribute('loading','eager')
    return {...q,text,statement:statement.innerHTML,hasFigures}
   }catch(error){failures.push(`${q.id}：${error.message}`);return null}
  }))
  for(const entry of batch)if(entry&&entries.length<wanted)entries.push(entry)
 }
 if(entries.length<count)throw new Error(`目前條件下只備妥 ${entries.length} 題，需要 ${count} 題。請調整章節／題型／只選無圖題選項。${failures.length?' 部分來源載入失敗，請重試。':''}`)
 const prompt=buildCandidatePrompt(entries,{...request,chapters,type:types.join(',')},'full')
 return {entries,prompt,failures}
}
