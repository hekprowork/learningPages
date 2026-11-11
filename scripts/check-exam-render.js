import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, relative, extname, sep } from 'node:path'
import assert from 'node:assert/strict'
import { JSDOM } from 'jsdom'
import {createSourceStatementLoader,createSourceTextLoader} from './question-source-text.js'
import {publishReaderNavigation,readerPath,publishReaderCard,READER_BASE,offlineChapterPath,offlineDocumentHtml,escapeHtml} from './question-readers.js'
import { extractCardFromDocument } from '../docs/.vitepress/theme/components/exam-loader.js'
const root = process.cwd()
const dist = resolve(root, 'docs/.vitepress/dist')
const catalog = publishReaderNavigation(root, dist)
const sourceText = createSourceTextLoader(root)
const sourceStatement = createSourceStatementLoader(root)
const pages = new Map()
for (const q of catalog) {
  if (!pages.has(q.path)) pages.set(q.path, [])
  pages.get(q.path).push(q)
}
for (const [path, questions] of pages) {
  const dom = new JSDOM(readFileSync(resolve(dist, path), 'utf8'))
  for (const q of questions) {
    const url = `${READER_BASE}${q.path}`
    const card = extractCardFromDocument(dom.window.document, q.id, url)
    const statementDom = new JSDOM(`<main>${card.statement}</main>`)
    const statement = statementDom.window.document.querySelector('main')
    const hasFigure = !!statement.querySelector('img') || [...statement.querySelectorAll('svg')].some(svg => !svg.closest('mjx-container,.katex,.MathJax'))
    statementDom.window.close()
    assert.equal(hasFigure, q.has_figure, `Source figure flag differs from rendered statement: ${q.id}`)
    publishReaderCard(dist,q,card)
    writeFileSync(resolve(dist,readerPath(q).replace(/\.html$/,'.txt')),sourceText(q,card))
    assert.ok(card.statement.trim(), `Empty statement: ${q.id}`)
    assert.ok(['example','practice','exercise','homework','exam'].includes(card.type), `Invalid type: ${q.id}`)
  }
  dom.window.close()
}
const questionIndexDirectory = resolve(dist, 'question-index')
mkdirSync(questionIndexDirectory, { recursive: true })
const indexManifest = JSON.parse(readFileSync(resolve(questionIndexDirectory, 'manifest.json'), 'utf8'))
for (const subject of new Set(catalog.map(q => q.subject))) {
  const entries = catalog.filter(q => q.subject === subject).map(q => ({
    id: q.id,
    chapter: q.chapter,
    title: q.title,
    type: q.type,
    topic: q.topic,
    source: q.source,
    repo_path: q.repo_path,
    has_figure: q.has_figure,
    reader_url: `${READER_BASE}${readerPath(q)}`
  }))
  assert.equal(new Set(entries.map(q => q.id)).size, entries.length, `Duplicate candidate index ID: ${subject}`)
  writeFileSync(resolve(questionIndexDirectory, `${subject}.candidates.json`), JSON.stringify({
    subject,
    version: indexManifest.source_commit || 'unavailable',
    count: entries.length,
    entries
  }) + '\n')
}
const offlineGroups = new Map()
for(const q of catalog){const key=`${q.subject}:${q.chapter}`;if(!offlineGroups.has(key))offlineGroups.set(key,[]);offlineGroups.get(key).push(q)}
for(const [key,items] of offlineGroups){
  const [subject,chapter]=key.split(':')
  const expected=catalog.filter(q=>q.subject===subject&&q.chapter===chapter)
  assert.equal(items.length,expected.length,`Offline chapter coverage mismatch: ${key}`)
  assert.deepEqual(new Set(items.map(q=>q.id)),new Set(expected.map(q=>q.id)),`Offline chapter IDs mismatch: ${key}`)
  assert.deepEqual(new Map(items.map(q=>[q.id,q.type])),new Map(expected.map(q=>[q.id,q.type])),`Offline chapter type mismatch: ${key}`)
  const title=`${subject} Chapter ${chapter}`
  const articles=[]
  for(const q of items){
    const readerDom=new JSDOM(readFileSync(resolve(dist,readerPath(q)),'utf8'))
    const statement=readerDom.window.document.querySelector('.practice-card-statement')
    assert.ok(statement?.innerHTML.trim(),`Offline statement missing: ${q.id}`)
    const statementDom=new JSDOM(`<main>${statement.innerHTML}</main>`,{url:`${READER_BASE}${q.path}`})
    readerDom.window.close()
    assert.equal(statementDom.window.document.querySelector('source[src],source[srcset],video,audio,iframe,object,embed'),null,`Unsupported media container in ${q.id}`)
    for(const img of statementDom.window.document.querySelectorAll('img')){
      const src=img.getAttribute('src')
      assert.ok(src,`Image without src: ${q.id}`)
      if(src.startsWith('data:'))continue
      const url=new URL(src,`${READER_BASE}${q.path}`)
      assert.equal(url.origin,new URL(READER_BASE).origin,`External image in ${q.id}: ${src}`)
      let assetPath=decodeURIComponent(url.pathname)
      if(assetPath.startsWith('/learningPages/'))assetPath=assetPath.slice('/learningPages/'.length)
      else assetPath=assetPath.replace(/^\//,'')
      const assetFile=resolve(dist,assetPath)
      const rel=relative(dist,assetFile)
      assert.ok(rel&&!rel.startsWith(`..${sep}`)&&rel!=='..',`Image escapes build output in ${q.id}: ${src}`)
      assert.ok(existsSync(assetFile),`Missing image for ${q.id}: ${src}`)
      const mime=({'.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.gif':'image/gif','.webp':'image/webp','.svg':'image/svg+xml'})[extname(assetFile).toLowerCase()]
      assert.ok(mime,`Unsupported image type in ${q.id}: ${src}`)
      const bytes=readFileSync(assetFile)
      if(mime==='image/svg+xml')assert.ok(!/(?:href|src)=["'](?:https?:)?\/\/|url\(["']?(?:https?:)?\/\//i.test(bytes.toString('utf8')),`External SVG reference in ${q.id}: ${src}`)
      img.setAttribute('src',`data:${mime};base64,${bytes.toString('base64')}`)
      img.removeAttribute('srcset')
    }
    const rendered=statementDom.window.document.querySelector('main').innerHTML
    statementDom.window.close()
    assert.ok(!/<(?:img|source|video|audio|iframe)\b[^>]*(?:src|srcset)=["']https?:/i.test(rendered),`Remote media dependency in offline statement: ${q.id}`)
    assert.ok(!/practice-card-solution-body/.test(rendered),`Solution leaked into offline statement: ${q.id}`)
    const authored=sourceStatement(q)
    assert.ok(authored.trim(),`Authored statement missing: ${q.id}`)
    articles.push(`<article data-question-id="${escapeHtml(q.id)}" data-type="${escapeHtml(q.type)}"><h2>${escapeHtml(q.id)} — ${escapeHtml(q.title)}</h2><p>題型：${escapeHtml(q.type)} · 主題：${escapeHtml(q.topic)} · 教材來源：${escapeHtml(q.source)}</p><div class="statement">${rendered}</div><details><summary>作者原始 LaTeX／Markdown</summary><pre>${escapeHtml(authored)}</pre></details></article>`)
  }
  const body=articles.join('\n')
  const out=resolve(dist,offlineChapterPath(subject,chapter).replace(/^\//,''))
  mkdirSync(resolve(out,'..'),{recursive:true})
  writeFileSync(out,offlineDocumentHtml(`${title} 離線題庫`,`<h1>${escapeHtml(title)} 離線題庫</h1><p>共 ${items.length} 題，含所有題型。此檔案不包含解答。</p>${body}`))
  const publishedDom=new JSDOM(readFileSync(out,'utf8'))
  const published=publishedDom.window.document
  const publishedArticles=[...published.querySelectorAll('article[data-question-id]')]
  assert.equal(publishedArticles.length,expected.length,`Published offline count mismatch: ${key}`)
  assert.deepEqual(new Map(publishedArticles.map(article=>[article.dataset.questionId,article.dataset.type])),new Map(expected.map(q=>[q.id,q.type])),`Published offline ID/type mismatch: ${key}`)
  assert.ok(publishedArticles.every(article=>article.querySelector('details pre')?.textContent.trim()),`Missing authored statement in offline chapter: ${key}`)
  assert.equal(published.querySelector('script,iframe,video,audio,source,object,embed,link[href]'),null,`External dependency or active content in offline chapter: ${key}`)
  assert.ok([...published.querySelectorAll('img')].every(img=>img.getAttribute('src')?.startsWith('data:')),`Non-embedded image in offline chapter: ${key}`)
  assert.ok(!published.querySelector('.practice-card-solution-body'),`Solution content in offline chapter: ${key}`)
  publishedDom.window.close()
}
assert.ok(existsSync(resolve(dist, 'exam.html')), 'Missing exam page')
console.log(`Exam source validation passed: ${catalog.length} indexed questions, ${pages.size} source pages.`)
