import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import worker from '../workers/candidate-index/index.js'
import { candidateIndexUrl } from '../docs/.vitepress/theme/components/candidate-index-url.js'

const endpoint = 'https://index.example.workers.dev'
const upstream = 'https://hekprowork.github.io/learningPages/question-index/circuits.tsv'
const index = await readFile(new URL('../.agents/skills/learningpages-question-bank-local/references/circuits.tsv', import.meta.url), 'utf8')

test('an unavailable or invalid Worker origin leaves sharing disabled', () => {
  const entries = [{ subject: 'circuits', id: 'ch4-pr2' }]
  assert.equal(candidateIndexUrl(undefined, entries), '')
  assert.equal(candidateIndexUrl('index.example.workers.dev', entries), '')
  assert.equal(candidateIndexUrl('ftp://index.example.workers.dev', entries), '')
})

test('the shared URL returns only the fixed Chapter 4 IDs in selection order', async t => {
  const ids = ['ch4-pr2', 'ch4-ex-4-1', 'ch4-pr1', 'ch4-ex-4-3', 'ch4-ex-4-2']
  const url = candidateIndexUrl(endpoint, ids.map(id => ({ subject: 'circuits', id })))
  t.mock.method(globalThis, 'fetch', async target => {
    assert.equal(String(target), upstream)
    return new Response(index + '4\tch4-ex999\tNew example\texample\tNew topic\tSource\tpath\n')
  })
  const response = await worker.fetch(new Request(url))
  assert.equal(response.status, 200)
  assert.match(response.headers.get('content-type'), /^text\/tab-separated-values/)
  const [header, ...rows] = (await response.text()).trimEnd().split('\n')
  assert.equal(header, 'subject_id\tchapter\ttitle\ttype\ttopic\tsource\treader_url')
  assert.deepEqual(rows.map(row => row.split('\t')[0]), ids.map(id => 'circuits:' + id))
  assert.match(rows[0], /https:\/\/hekprowork\.github\.io\/learningPages\/question-reader\/circuits\/ch4-pr2\.html$/)
})

test('an empty or malformed selection, a missing ID and an upstream outage are explicit', async t => {
  const fetch = t.mock.method(globalThis, 'fetch', async () => new Response(index))
  for (const query of ['', '?subject=circuits&ids=', '?subject=circuits&ids=ch4-ex1,ch4-ex1', '?subject=unknown&ids=ch4-ex1']) {
    const response = await worker.fetch(new Request(endpoint + '/selection.tsv' + query))
    assert.equal(response.status, 400)
  }
  assert.equal(fetch.mock.callCount(), 0)
  const request = new Request(endpoint + '/selection.tsv?subject=circuits&ids=ch4-ex-4-1,missing')
  const missing = await worker.fetch(request)
  assert.equal(missing.status, 404)
  assert.match(await missing.text(), /missing/)
  fetch.mock.mockImplementation(async () => { throw new Error('offline') })
  assert.equal((await worker.fetch(request)).status, 502)
})
