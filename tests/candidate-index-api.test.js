import assert from 'node:assert/strict'
import test from 'node:test'
import { candidatePrepareUrl, loadCandidateIndex } from '../docs/.vitepress/theme/components/candidate-index-api.js'

const endpoint = 'https://index.example.workers.dev'
const request = {
  subject: 'circuits', chapters: ['1', '2', '3', '4'], type: 'example,practice,exercise',
  count: '5', minutes: '60', candidateLimit: ''
}
const entries = [
  { id: 'ch4-ex1', chapter: '4', title: 'Example one', type: 'example', topic: 'A', source: 'p.1', has_figure: true, reader_url: 'https://hekprowork.github.io/learningPages/question-reader/circuits/ch4-ex1.html', repo_path: 'docs/circuits/practice/one.md' },
  { id: 'ch4-pr1', chapter: '4', title: 'Practice one', type: 'practice', topic: 'B', source: 'p.2', has_figure: false, reader_url: 'https://hekprowork.github.io/learningPages/question-reader/circuits/ch4-pr1.html', repo_path: 'docs/circuits/practice/one.md' }
]
const workerTsv = rows => ['subject_id\tchapter\ttitle\ttype\ttopic\tsource\treader_url\thas_figure', ...rows.map(row => [
  `circuits:${row.id}`, row.chapter, row.title, row.type, row.topic, row.source, row.reader_url, String(row.has_figure)
].join('\t')), ''].join('\n')

test('prepare request encodes subject, chapter/type filters and optional candidate limits', () => {
  const url = candidatePrepareUrl(endpoint, { ...request, candidateLimit: '20' })
  assert.equal(url.origin, endpoint)
  assert.equal(url.pathname, '/prepare')
  assert.equal(url.searchParams.get('chapters'), '1,2,3,4')
  assert.equal(url.searchParams.get('types'), 'example,practice,exercise')
  assert.equal(url.searchParams.get('candidate_limit'), '20')
  assert.equal(candidatePrepareUrl(endpoint, request).searchParams.has('candidate_limit'), false)
})

test('Worker response builds a versioned compact prompt and preserves candidate order and figure metadata', async () => {
  const ids = entries.map(row => row.id)
  const shareUrl = `${endpoint}/selection.tsv?subject=circuits&ids=${ids.join(',')}`
  const body = {
    subject: 'circuits', version: 'c0ffee', chapters: ['1', '2', '3', '4'], types: ['example', 'practice', 'exercise'],
    count: 2, scope_count: 429, candidate_count: 2, figure_count: 1, entries,
    tsv: workerTsv(entries), share_url: shareUrl
  }
  let requested
  const result = await loadCandidateIndex(endpoint, { ...request, count: 2 }, async (url, options) => {
    requested = { url: new URL(url), options }
    return new Response(JSON.stringify(body), { status: 200 })
  })
  assert.equal(requested.url.pathname, '/prepare')
  assert.deepEqual(requested.options, undefined)
  assert.deepEqual(result.entries.map(row => row.id), ids)
  assert.deepEqual(result.entries.map(row => row.has_figure), [true, false])
  assert.equal(result.version, 'c0ffee')
  assert.equal(result.scopeCount, 429)
  assert.equal(result.figureCount, 1)
  assert.match(result.prompt, /候選索引版本：c0ffee/)
  assert.match(result.prompt, /固定 ID 順序的 TSV 網址/)
  assert.match(result.prompt, /has_figure/)
  assert.ok(result.prompt.indexOf('ch4-ex1') < result.prompt.indexOf('ch4-pr1'))
})

test('empty, incomplete or reordered Worker responses are rejected with actionable errors', async () => {
  const response = data => async () => new Response(JSON.stringify(data), { status: 200 })
  await assert.rejects(loadCandidateIndex(endpoint, { ...request, count: 2 }, response({
    subject: 'circuits', version: 'v1', chapters: ['1', '2', '3', '4'], types: ['example', 'practice', 'exercise'], count: 0, scope_count: 0, candidate_count: 0, figure_count: 0, entries: [], tsv: workerTsv([]), share_url: ''
  })), /沒有符合/)
  await assert.rejects(loadCandidateIndex(endpoint, { ...request, count: 2 }, response({
    subject: 'circuits', version: 'v1', chapters: ['1', '2', '3', '4'], types: ['example', 'practice', 'exercise'], count: 2, scope_count: 2, candidate_count: 2, figure_count: 1,
    entries: [...entries, entries[0]], tsv: workerTsv([...entries, entries[0]]), share_url: ''
  })), /格式不完整/)
  const wrongShare = { subject: 'circuits', version: 'v1', chapters: ['1', '2', '3', '4'], types: ['example', 'practice', 'exercise'], count: 2, scope_count: 2, candidate_count: 2, figure_count: 1,
    entries, tsv: workerTsv(entries), share_url: `${endpoint}/selection.tsv?subject=circuits&ids=ch4-pr1,ch4-ex1` }
  await assert.rejects(loadCandidateIndex(endpoint, { ...request, count: 2 }, response(wrongShare)), /順序不一致/)
  await assert.rejects(loadCandidateIndex(endpoint, { ...request, count: 2 }, async () => new Response(JSON.stringify({ error: 'upstream offline' }), { status: 502 })), /upstream offline/)
})
