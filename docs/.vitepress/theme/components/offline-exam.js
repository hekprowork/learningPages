import { buildCandidatePrompt } from './candidate-prompt.js'
import { parseQuestionTypes } from './agent-exam-prompt.js'
import { matchCandidateScope, parseCandidateLimit, selectCandidates } from '../../../../shared/candidate-selection.js'

const SITE='https://hekprowork.github.io/learningPages/'

function offlineScope({ subject, chapters, type }) {
  return { subject, chapters, types: parseQuestionTypes(type).types }
}

export function matchOfflineScope(catalog, request) {
  return matchCandidateScope(catalog, offlineScope(request))
}

function selectOfflineCandidates(catalog, request) {
  const count = Number(request.count)
  const minutes = Number(request.minutes)
  if (!Number.isInteger(count) || count < 1 || count > 10) throw new Error('免連網模式每次請選 1–10 題；更多題目請分批。')
  if (!Number.isInteger(minutes) || minutes < 1 || minutes > 480) throw new Error('請填入 1–480 分鐘的有效作答時間。')
  const candidateLimit = parseCandidateLimit(request.candidateLimit, count)
  return { ...selectCandidates(catalog, offlineScope(request), candidateLimit), count }
}
export function prepareCandidateIndex(catalog,request){
 const {chapters,types,count,wanted,ordered}=selectOfflineCandidates(catalog,request)
 if(request.textOnly)throw new Error('只選無圖題需要完整模式確認原題。')
 const entries=ordered.slice(0,wanted).map(q=>({...q,hasFigures:q.has_figure,reader_url:q.reader_url||`${SITE}question-reader/${q.subject}/${encodeURIComponent(q.id)}.html`}))
 if(entries.length<count)throw new Error(`目前條件下只有 ${entries.length} 題候選，需要 ${count} 題；請調整章節或題型。`)
 return {entries,prompt:buildCandidatePrompt(entries,{...request,chapters,type:types.join(','),scopeCount:ordered.length,indexVersion:'本機題庫索引'},'compact'),failures:[],version:'本機題庫索引',scopeCount:ordered.length,candidateCount:entries.length,tsv:null}
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
