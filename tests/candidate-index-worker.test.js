import assert from 'node:assert/strict'
import { readQuestionCatalog } from '../scripts/question-catalog.js'
import test from 'node:test'
import worker from '../workers/candidate-index/index.js'
import { candidateIndexUrl } from '../docs/.vitepress/theme/components/candidate-index-url.js'
import { selectOfflineCandidates } from '../docs/.vitepress/theme/components/offline-exam.js'

const endpoint = 'https://index.example.workers.dev'
const site = 'https://hekprowork.github.io/learningPages/'
const catalog = readQuestionCatalog(process.cwd())
const circuits = catalog.filter(row => row.subject === 'circuits').map(row => ({
  ...row,
  reader_url: `${site}question-reader/${row.subject}/${encodeURIComponent(row.id)}.html`
}))
const index = { subject: 'circuits', version: 'test-version-9', count: circuits.length, entries: circuits }

async function withIndex(t, data = index) {
  return t.mock.method(globalThis, 'fetch', async (target, options) => {
    assert.equal(String(target), site + 'question-index/circuits.candidates.json')
    assert.deepEqual(options, { cf: { cacheTtl: 60, cacheEverything: true } })
    return new Response(JSON.stringify(data), { headers: { 'content-type': 'application/json' } })
  })
}

test('an unavailable or invalid Worker origin leaves sharing disabled', () => {
  const entries = [{ subject: 'circuits', id: 'ch4-pr2' }]
  assert.equal(candidateIndexUrl(undefined, entries), '')
  assert.equal(candidateIndexUrl('index.example.workers.dev', entries), '')
  assert.equal(candidateIndexUrl('ftp://index.example.workers.dev', entries), '')
})

test('prepare returns the exact filtered 429 candidates, figure flags, version and fixed-order TSV link', async t => {
  const fetch = await withIndex(t)
  const query = new URLSearchParams({
    subject: 'circuits', chapters: '1,2,3,4', types: 'example,practice,exercise', count: '5', minutes: '60'
  })
  const response = await worker.fetch(new Request(endpoint + '/prepare?' + query))
  assert.equal(response.status, 200)
  assert.equal(response.headers.get('access-control-allow-origin'), '*')
  const data = await response.json()
  assert.equal(data.version, 'test-version-9')
  assert.equal(data.scope_count, 429)
  assert.equal(data.candidate_count, 429)
  assert.equal(data.figure_count, 407)
  assert.deepEqual(Object.fromEntries(['1', '2', '3', '4'].map(chapter => [chapter, data.entries.filter(row => row.chapter === chapter).length])), {
    '1': 59, '2': 117, '3': 119, '4': 134
  })
  const expected = selectOfflineCandidates(catalog, {
    subject: 'circuits', chapters: ['1', '2', '3', '4'], type: 'example,practice,exercise', count: '5', minutes: '60', candidateLimit: ''
  }).ordered.map(row => row.id)
  assert.deepEqual(data.entries.map(row => row.id), expected)
  assert.equal(data.tsv.trimEnd().split('\n').length, 430)
  assert.match(data.tsv.split('\n')[0], /reader_url\thas_figure$/)
  assert.ok(data.share_url)
  const share = new URL(data.share_url)
  assert.equal(share.pathname, '/selection.tsv')
  assert.deepEqual(share.searchParams.get('ids').split(','), expected)
  assert.equal(fetch.mock.callCount(), 1, 'one prepare call loads one indexed metadata file, not one file per question')

  const selected = await worker.fetch(new Request(data.share_url))
  assert.equal(selected.status, 200)
  assert.equal(selected.headers.get('x-index-version'), 'test-version-9')
  assert.equal(await selected.text(), data.tsv)
  assert.equal(fetch.mock.callCount(), 2)
})

test('prepare applies candidate limits after deterministic topic round-robin and handles empty scopes', async t => {
  await withIndex(t)
  const limited = await worker.fetch(new Request(endpoint + '/prepare?subject=circuits&chapters=4&types=example,practice&count=2&minutes=30&candidate_limit=12'))
  const limitedData = await limited.json()
  assert.equal(limitedData.scope_count, circuits.filter(row => row.chapter === '4' && ['example', 'practice'].includes(row.type)).length)
  assert.equal(limitedData.candidate_count, 12)

  const largeLimit = await worker.fetch(new Request(endpoint + '/prepare?subject=circuits&chapters=4&types=example,practice&count=2&minutes=30&candidate_limit=1000000'))
  const largeLimitData = await largeLimit.json()
  assert.equal(largeLimitData.candidate_count, largeLimitData.scope_count)

  const empty = await worker.fetch(new Request(endpoint + '/prepare?subject=circuits&chapters=4&types=exam&count=1&minutes=30'))
  const emptyData = await empty.json()
  assert.equal(empty.status, 200)
  assert.equal(emptyData.scope_count, 0)
  assert.equal(emptyData.candidate_count, 0)
  assert.equal(emptyData.entries.length, 0)
  assert.equal(emptyData.share_url, '')
})

test('invalid or duplicate options fail before fetching and missing IDs are explicit', async t => {
  const fetch = t.mock.method(globalThis, 'fetch', async () => new Response(JSON.stringify(index)))
  for (const query of [
    '',
    '?subject=unknown&chapters=4&types=example&count=1&minutes=30',
    '?subject=circuits&chapters=4,4&types=example&count=1&minutes=30',
    '?subject=circuits&chapters=4&types=example,invalid&count=1&minutes=30',
    '?subject=circuits&chapters=4&types=example&count=0&minutes=30',
    '?subject=circuits&chapters=4&types=example&count=2&minutes=30&candidate_limit=1',
    '?subject=circuits&chapters=4&types=example&count=1&minutes=30&candidate_limit=1&candidate_limit=2',
    '?subject=circuits&chapters=4&chapters=3&types=example&count=1&minutes=30'
  ]) {
    assert.equal((await worker.fetch(new Request(endpoint + '/prepare' + query))).status, 400)
  }
  assert.equal(fetch.mock.callCount(), 0)

  const missing = await worker.fetch(new Request(endpoint + '/selection.tsv?subject=circuits&ids=ch4-pr2,not-in-index'))
  assert.equal(missing.status, 404)
  assert.match(await missing.text(), /not-in-index/)
})

test('upstream failures, malformed indexes, unsupported routes and methods return clear status codes', async t => {
  let unavailable = true
  let body = index
  t.mock.method(globalThis, 'fetch', async () => {
    if (unavailable) throw new Error('offline')
    return new Response(JSON.stringify(body))
  })
  const query = endpoint + '/prepare?subject=circuits&chapters=4&types=example&count=1&minutes=30'
  assert.equal((await worker.fetch(new Request(query))).status, 502)

  unavailable = false
  body = { ...index, count: 999 }
  assert.equal((await worker.fetch(new Request(query))).status, 502)
  assert.equal((await worker.fetch(new Request(endpoint + '/unknown'))).status, 404)
  assert.equal((await worker.fetch(new Request(endpoint + '/prepare', { method: 'POST' }))).status, 405)
  assert.equal((await worker.fetch(new Request(endpoint + '/prepare', { method: 'OPTIONS' }))).status, 204)
})
