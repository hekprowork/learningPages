import {readFileSync} from 'node:fs'
import {resolve} from 'node:path'
// Export authored Markdown/LaTeX; rendered SVG glyphs are unsuitable for text readers.
export function sourceStatementText(block) {
 const opener=block.match(/^<PracticeCard\b(?:[^>"']|"[^"]*"|'[^']*')*>/)
 if(!opener)throw new Error('Invalid source PracticeCard')
 const body=block.slice(opener[0].length).replace(/<\/PracticeCard>\s*$/,'').replace(/<template\s+(?:#solution|v-slot:solution)[^>]*>[\s\S]*?<\/template>/g,'').trim()
 if(/<template\s+(?:#solution|v-slot:solution)/.test(body))throw new Error('Unclosed solution slot')
 return body
}
export function createSourceTextLoader(root){
 const statementLoader=createSourceStatementLoader(root)
 return (q,card)=>{
  const body=statementLoader(q)
  const images=[...card.statement.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)].map(m=>m[1].replace(/&amp;/g,'&'))
  let imageIndex=0
  const withImages=body.replace(/!\[([^\]]*)\]\([^\n]*?\)/g,(match,alt)=>{const url=images[imageIndex++];return url?`![${alt}](${url})`:match})
  return `ID: ${q.id}\n科目: ${q.subject}\n題名: ${q.title}\n題型: ${q.type}\n教材來源: ${q.source}\n\n${withImages}\n\n${images.length?'圖像題：離線模型請配合附上的題目 PDF 讀圖，不要猜測圖片內容。\n實際圖片：\n'+images.join('\n'):''}`
 }
}
export function createSourceStatementLoader(root){
 const files=new Map()
 return (q,card)=>{
  if(!files.has(q.repo_path)){
   const blocks=readFileSync(resolve(root,q.repo_path),'utf8').match(/<PracticeCard\b[\s\S]*?<\/PracticeCard>/g)??[]
   const cards=new Map()
   for(const block of blocks){const id=block.match(/\bid\s*=\s*(["'])(.*?)\1/)?.[2];if(cards.has(id))throw new Error(`Duplicate source ID: ${id}`);cards.set(id,block)}
   files.set(q.repo_path,cards)
  }
  const block=files.get(q.repo_path).get(q.id)
  if(!block)throw new Error(`Missing authored source: ${q.id}`)
  return sourceStatementText(block)
 }
}
