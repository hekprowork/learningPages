import { readFileSync, existsSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import assert from 'node:assert/strict'
import { JSDOM } from 'jsdom'
import {createSourceTextLoader} from './question-source-text.js'
import {publishReaderNavigation,readerPath,publishReaderCard,READER_BASE} from './question-readers.js'
import { extractCardFromDocument } from '../docs/.vitepress/theme/components/exam-loader.js'
const root = process.cwd()
const dist = resolve(root, 'docs/.vitepress/dist')
const catalog = publishReaderNavigation(root, dist)
const sourceText = createSourceTextLoader(root)
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
    publishReaderCard(dist,q,card)
    writeFileSync(resolve(dist,readerPath(q).replace(/\.html$/,'.txt')),sourceText(q,card))
    assert.ok(card.statement.trim(), `Empty statement: ${q.id}`)
    assert.ok(['example','practice','exercise','homework','exam'].includes(card.type), `Invalid type: ${q.id}`)
  }
  dom.window.close()
}
assert.ok(existsSync(resolve(dist, 'exam.html')), 'Missing exam page')
console.log(`Exam source validation passed: ${catalog.length} indexed questions, ${pages.size} source pages.`)
