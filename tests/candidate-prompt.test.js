import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readQuestionCatalog } from '../scripts/question-catalog.js'
import { prepareCandidateIndex, prepareOfflineExam } from '../docs/.vitepress/theme/components/offline-exam.js'
import { candidateTsv, buildCandidatePrompt } from '../docs/.vitepress/theme/components/candidate-prompt.js'
import { buildExamUrl, validateExamSelection } from '../docs/.vitepress/theme/components/exam-url.js'
import { getSelectedIds } from '../docs/.vitepress/theme/components/practice-selection.js'
import { resolveQuestions } from '../docs/.vitepress/theme/components/exam-loader.js'
import { JSDOM } from 'jsdom'

const catalog = readQuestionCatalog(process.cwd())
const request = { subject: 'circuits', chapters: ['4'], type: 'example,practice', count: 3, minutes: 45 }

test('compact candidates use only the requested subject/chapter/types and preserve source provenance', () => {
  const result = prepareCandidateIndex(catalog, request)
  assert.equal(result.entries.length, catalog.filter(q => q.subject === request.subject && request.chapters.includes(q.chapter) && request.type.split(',').includes(q.type)).length)
  for (const q of result.entries) {
    assert.equal(q.subject, 'circuits')
    assert.equal(q.chapter, '4')
    assert.ok(['example', 'practice'].includes(q.type))
    assert.ok(q.source && q.repo_path)
    assert.ok(result.prompt.includes(`https://github.com/hekprowork/learningPages/blob/main/${q.repo_path}`))
  }
  assert.match(result.prompt, /依索引選題，未核對完整原題/)
  assert.ok(!result.prompt.includes('完整候選原題：'))
  const practiceOnly = prepareCandidateIndex(catalog, { ...request, type: 'practice', count: 10 })
  assert.ok(practiceOnly.entries.every(q => q.type === 'practice'))
  assert.equal(practiceOnly.entries.length, catalog.filter(q => q.subject === request.subject && request.chapters.includes(q.chapter) && q.type === 'practice').length)
  assert.throws(() => prepareCandidateIndex(catalog, { ...request, chapters: ['999'] }), /有效的章節/)
  assert.throws(() => prepareCandidateIndex(catalog, { ...request, type: 'bogus' }), /有效題型/)
  assert.throws(() => prepareCandidateIndex(catalog, { ...request, textOnly: true }), /完整模式/)
  assert.throws(() => prepareCandidateIndex(catalog, { ...request, count: 11 }), /1–10/)
  assert.throws(() => prepareCandidateIndex(catalog, { ...request, minutes: 481 }), /480/)
})

test('TSV fields cannot inject rows or columns; full prompt retains authored LaTeX', () => {
  const q = { id: 'q', subject: 'circuits', title: '題\t名\n換行', text: 'ID: q\n求 $\\frac{1}{s}$', chapter: '4', type: 'example' }
  const tsv = candidateTsv([q])
  assert.equal(tsv.split('\n').length, 2)
  assert.ok(tsv.split('\n').every(row => row.split('\t').length === 9))
  const prompt = buildCandidatePrompt([q], { ...request, count: 1 }, 'full')
  assert.match(prompt, /\\frac\{1\}\{s\}/)
  assert.match(prompt, /不要使用 Markdown 超連結/)
  assert.match(prompt, /%253A/)
  assert.match(prompt, /未驗證動態試卷載入/)
  assert.throws(() => buildCandidatePrompt([{ ...q, text: '' }], request, 'full'), /不完整/)
  assert.throws(() => buildCandidatePrompt([{ ...q, text: 'x'.repeat(200001) }], request, 'full'), /減少候選題數或改用精簡模式/)
})

test('canonical URLs round-trip through the existing exam parser in order across subjects', () => {
  const questions = [catalog.find(q => q.subject === 'electronics'), catalog.find(q => q.subject === 'circuits')]
  const url = buildExamUrl(questions)
  assert.match(url, /^https:\/\/hekprowork.github.io\/learningPages\/exam.html\?ids=/)
  assert.ok(!url.includes('%253A'))
  const selected = getSelectedIds(new URL(url).search)
  const resolved = resolveQuestions(catalog, selected)
  assert.deepEqual(resolved.map(row => row.question.id), questions.map(q => q.id))
  assert.ok(questions[0].repo_path.includes('practice-source'))
  const validated = validateExamSelection(url, questions, 2)
  assert.equal(validated.url, url)
  assert.deepEqual(validated.questions, questions)
  assert.equal(validateExamSelection('```text\n' + url + '\n```', questions, 2).url, url)
  assert.equal(validateExamSelection(questions.map(q => `${q.subject}:${q.id}`).join('\n'), questions, 2).url, url)
})

test('selection rejects search wrappers, out-of-scope IDs, double encoding, ambiguity and duplicates', () => {
  const entries = prepareCandidateIndex(catalog, request).entries
  const q = entries[0]
  const key = `${q.subject}:${q.id}`
  assert.throws(() => validateExamSelection('https://www.google.com/search?q=' + encodeURIComponent(buildExamUrl([q])), entries, 1), /Google/)
  assert.throws(() => validateExamSelection('https://hekprowork.github.io/learningPages/exam.html?ids=circuits%253A' + q.id, entries, 1), /候選集/)
  assert.throws(() => validateExamSelection('circuits:not-in-scope', entries, 1), /候選集/)
  assert.throws(() => validateExamSelection(key + ',' + q.id, entries, 2), /重複/)
  assert.throws(() => validateExamSelection(key, entries, 3), /需要 3 題/)
  assert.throws(() => validateExamSelection('', entries, 1), /提供 0 題/)
  const ambiguous = [{ ...q }, { ...q, subject: 'electronics' }]
  assert.throws(() => validateExamSelection(q.id, ambiguous, 1), /不明確/)
  assert.equal(validateExamSelection(key, ambiguous, 1).questions[0].subject, 'circuits')
})

test('browser preparation tolerates partial failures without adding other scopes or leaking solutions', async () => {
  const Parser = new JSDOM('').window.DOMParser
  const entries = ['a', 'b', 'c'].map(id => ({ id, subject: 'circuits', chapter: '4', type: 'example', topic: 'x' }))
  const fetcher = async url => {
    const id = url.match(/\/([^/]+)\.(html|txt)$/)[1]
    if (id === 'b') return { ok: false, status: 503 }
    return { ok: true, text: async () => url.endsWith('.txt') ? `ID: ${id}\n原始 $x_1$` : `<article data-reader-id="${id}"><div class="practice-card-statement">題幹</div><div class="practice-card-solution-body">SECRET</div></article>` }
  }
  const result = await prepareOfflineExam(entries, { ...request, type: 'example', count: 2 }, fetcher, Parser)
  assert.deepEqual(result.entries.map(q => q.id), ['a', 'c'])
  assert.equal(result.failures.length, 1)
  assert.ok(!result.prompt.includes('SECRET'))
  assert.match(result.prompt, /原始 \$x_1\$/)
  assert.ok(!result.prompt.includes('circuits:b ====='))
})

test('every nonempty type subset filters the same types advertised in both prompt modes', async () => {
  const types = ['example', 'practice', 'exercise', 'homework', 'exam']
  const rows = types.map(type => ({ id: type, subject: 'circuits', chapter: '4', type, topic: type }))
  const fetcher = async url => {
    const id = new URL(url).pathname.split('/').pop().replace(/\.(html|txt)$/, '')
    return { ok: true, text: async () => url.endsWith('.txt') ? `ID: ${id}\n原題` : `<article data-reader-id="${id}"><div class="practice-card-statement">原題</div></article>` }
  }
  const dom = new JSDOM('')
  const Parser = dom.window.DOMParser
  for (let mask = 1; mask < 32; mask++) {
    const selected = types.filter((_, i) => mask & (1 << i))
    const subsetRequest = { ...request, type: [...selected].reverse().join(','), count: selected.length }
    const compact = prepareCandidateIndex(rows, subsetRequest)
    const full = await prepareOfflineExam(rows, subsetRequest, fetcher, Parser)
    for (const result of [compact, full]) {
      assert.deepEqual(result.entries.map(q => q.type), selected)
      assert.ok(result.prompt.includes(`題型：${selected.join(',')}。`))
    }
  }
  dom.window.close()
  assert.throws(() => prepareCandidateIndex(rows, { ...request, type: '', count: 1 }), /至少選擇/)
  await assert.rejects(prepareOfflineExam(rows, { ...request, type: '', count: 1 }, fetcher, Parser), /至少選擇/)
})

const largeCatalog = Array.from({ length: 105 }, (_, i) => ({ id: `q${i}`, subject: 'circuits', chapter: '4', type: 'example', topic: 'A' }))
const largeRequest = { ...request, type: 'example' }
function sourceFetcher({ failures = 0, figures = 0 } = {}) {
  return async url => {
    const id = new URL(url).pathname.split('/').pop().replace(/\.(html|txt)$/, '')
    const index = Number(id.slice(1))
    if (index < failures) return { ok: false, status: 503 }
    return { ok: true, text: async () => url.endsWith('.txt') ? `ID: ${id}\n原始 $x_1$` : `<article data-reader-id="${id}"><div class="practice-card-statement">${index < figures ? '<img src="fig.png">' : ''}原題</div><div class="practice-card-solution-body">SECRET</div></article>` }
  }
}

test('candidate count defaults to all in both modes and explicit limits are independent of quiz size', async () => {
  const dom = new JSDOM('')
  try {
    for (const candidateLimit of [undefined, '', '  ', 30, '50', 500, 1000000]) {
      const wanted = candidateLimit === undefined || String(candidateLimit).trim() === '' ? largeCatalog.length : Math.min(Number(candidateLimit), largeCatalog.length)
      const options = { ...largeRequest, candidateLimit }
      for (const result of [prepareCandidateIndex(largeCatalog, options), await prepareOfflineExam(largeCatalog, options, sourceFetcher(), dom.window.DOMParser)]) {
        assert.equal(result.entries.length, wanted)
        assert.match(result.prompt, new RegExp(`選出 ${request.count} 題`))
        assert.ok(!result.prompt.includes('並非整章全部題目'))
      }
    }
    for (const candidateLimit of [0, -1, 1.5, 'bad', 2, null, false, Infinity]) {
      const options = { ...largeRequest, candidateLimit }
      assert.throws(() => prepareCandidateIndex(largeCatalog, options), /候選題數/)
      await assert.rejects(prepareOfflineExam(largeCatalog, options, sourceFetcher(), dom.window.DOMParser), /候選題數/)
    }
  } finally { dom.window.close() }
})

test('full preparation scans beyond row 80 after failures and image exclusions', async () => {
  const dom = new JSDOM('')
  try {
    const options = { ...largeRequest, textOnly: true, candidateLimit: 10 }
    const result = await prepareOfflineExam(largeCatalog, options, sourceFetcher({ failures: 40, figures: 85 }), dom.window.DOMParser)
    assert.deepEqual(result.entries.map(q => q.id), Array.from({ length: 10 }, (_, i) => `q${85 + i}`))
    assert.equal(result.failures.length, 40)
    assert.ok(!result.prompt.includes('SECRET'))
    const all = await prepareOfflineExam(largeCatalog, { ...options, candidateLimit: '' }, sourceFetcher({ failures: 40, figures: 85 }), dom.window.DOMParser)
    assert.equal(all.entries.length, 20)
  } finally { dom.window.close() }
})

test('full preparation keeps four concurrent per-question tasks', async () => {
  const dom = new JSDOM('')
  let active = 0, peak = 0
  const base = sourceFetcher()
  const fetcher = async url => {
    if (url.endsWith('.html')) { active++; peak = Math.max(peak, active) }
    await new Promise(resolve => setTimeout(resolve, 1))
    const result = await base(url)
    const read = result.text
    result.text = async () => { const text = await read(); if (url.endsWith('.html')) active--; return text }
    return result
  }
  try {
    const result = await prepareOfflineExam(largeCatalog, { ...largeRequest, candidateLimit: 30 }, fetcher, dom.window.DOMParser)
    assert.equal(result.entries.length, 30)
    assert.equal(peak, 4)
    assert.equal(active, 0)
  } finally { dom.window.close() }
})


test('chapter union is canonical in both modes and fetches only selected subject, chapters and types', async () => {
  const rows = [
    { id: 'four', subject: 'circuits', chapter: '4', type: 'example', topic: 'A' },
    { id: 'three', subject: 'circuits', chapter: '3', type: 'practice', topic: 'B' },
    { id: 'other-chapter', subject: 'circuits', chapter: '2', type: 'example' },
    { id: 'other-type', subject: 'circuits', chapter: '3', type: 'exam' },
    { id: 'other-subject', subject: 'electronics', chapter: '3', type: 'example' }
  ]
  const options = { ...request, chapters: ['4', '3', '4'], count: 2 }
  const calls = []
  const dom = new JSDOM('')
  const fetcher = async url => {
    const id = new URL(url).pathname.split('/').pop().replace(/\.(html|txt)$/, '')
    calls.push(id)
    return { ok: true, text: async () => url.endsWith('.txt') ? `ID: ${id}\n原題` : `<article data-reader-id="${id}"><div class="practice-card-statement">原題</div></article>` }
  }
  try {
    for (const result of [prepareCandidateIndex(rows, options), await prepareOfflineExam(rows, options, fetcher, dom.window.DOMParser)]) {
      assert.deepEqual(result.entries.map(q => q.id), ['four', 'three'])
      assert.match(result.prompt, /章節：3、4，/)
      const tsv = candidateTsv(result.entries).split('\n').slice(1).map(row => row.split('\t'))
      assert.deepEqual(tsv.map(row => [row[1], row[2]]), [['4', 'four'], ['3', 'three']])
    }
    assert.deepEqual(calls.sort(), ['four', 'four', 'three', 'three'])
    assert.deepEqual(options.chapters, ['4', '3', '4'])
    for (const chapters of [[], undefined, null, '4', [4], [''], ['3', '999'], [null], [['4']], Array(1)]) {
      const invalid = { ...options, chapters }
      assert.throws(() => prepareCandidateIndex(rows, invalid), /章節/)
      await assert.rejects(prepareOfflineExam(rows, invalid, () => { throw Error('must not fetch') }, dom.window.DOMParser), /章節/)
    }
  } finally { dom.window.close() }
})
