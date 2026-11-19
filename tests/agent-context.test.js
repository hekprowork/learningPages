import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { readerEntries } from '../scripts/question-readers.js'
import { buildAgentContext, serializeAgentContext, parseAgentContext, AGENT_CONTEXT_END_MARKER } from '../scripts/agent-context.js'

const root = process.cwd()
const catalog = readerEntries(root)
const guide = readFileSync(resolve(root, 'docs/public/agent-guide.txt'), 'utf8')
const compatibility = readFileSync(resolve(root, 'docs/model-reading.md'), 'utf8')
const snapshot = buildAgentContext(catalog, guide, compatibility)
const bytes = serializeAgentContext(snapshot)
const source = new TextDecoder().decode(bytes)

test('pack round-trips complete canonical metadata, source URLs, counts and route groups', () => {
  assert.deepEqual([...bytes.slice(0, 3)], [0xef, 0xbb, 0xbf])
  const parsed = parseAgentContext(bytes)
  const unstrippedBomText = new TextDecoder('utf-8', { fatal: true, ignoreBOM: true }).decode(bytes)
  assert.equal(parseAgentContext(unstrippedBomText).rowCount, catalog.length)
  assert.equal(parsed.rowCount, catalog.length)
  assert.equal(parsed.subjectCount, new Set(catalog.map(q => q.subject)).size)
  assert.equal(parsed.subjectChapterCount, new Set(catalog.map(q => `${q.subject}:${q.chapter}`)).size)
  assert.equal(parsed.rows.length, catalog.length)
  assert.equal(parsed.guideText, guide.trimEnd())
  assert.equal(parsed.compatibilityText, compatibility.trimEnd())
  assert.deepEqual(new Set(parsed.rows.map(row => row.subjectId)), new Set(catalog.map(q => `${q.subject}:${q.id}`)))
  for (const row of parsed.rows) {
    const original = catalog.find(q => `${q.subject}:${q.id}` === row.subjectId)
    assert.equal(row.source, original.source)
    assert.equal(row.repoPath, original.repo_path)
    assert.match(row.readerUrl, /^https:\/\/hekprowork\.github\.io\/learningPages\/question-reader\//)
  }
  for (const chapter of parsed.chapters) {
    const rows = catalog.filter(q => q.subject === chapter.subject && q.chapter === chapter.chapter)
    assert.equal(chapter.rowCount, rows.length)
    for (const [type, count] of Object.entries(chapter.typeCounts)) assert.equal(count, rows.filter(q => q.type === type).length)
    assert.match(chapter.offlineUrl, /offline/)
  }
  assert.ok(source.endsWith(`${AGENT_CONTEXT_END_MARKER}\n`))
})

test('same bare ID in two subjects remains uniquely identified and reader URL encodes IDs', () => {
  const rows = [
    { subject: 'circuits', id: 'same/id', chapter: '1', title: 'A', type: 'example', source: 'S', repo_path: 'docs/circuits/a.md' },
    { subject: 'electronics', id: 'same/id', chapter: '1', title: 'B', type: 'exercise', source: 'T', repo_path: 'docs/electronics/b.md' }
  ]
  const parsed = parseAgentContext(serializeAgentContext(buildAgentContext(rows, '', '')))
  assert.deepEqual(parsed.rows.map(row => row.subjectId), ['circuits:same/id', 'electronics:same/id'])
  assert.ok(parsed.rows.every(row => row.readerUrl.endsWith('same%2Fid.html')))
})

test('parser rejects a missing middle group even when the end marker remains', () => {
  const lines = source.split('\n')
  const groupStarts = lines.flatMap((line, index) => line.startsWith('GROUP\t') ? [index] : [])
  assert.ok(groupStarts.length > 2)
  const start = groupStarts[Math.floor(groupStarts.length / 2)]
  const end = lines.indexOf('END_GROUP', start)
  lines.splice(start, end - start + 1)
  assert.ok(lines.includes(AGENT_CONTEXT_END_MARKER))
  assert.throws(() => parseAgentContext(lines.join('\n')), /group|chapter/i)
})

test('parser rejects a missing row within a group even when the end marker remains', () => {
  const lines = source.split('\n')
  const start = lines.findIndex(line => line.startsWith('GROUP\t'))
  const schema = lines.indexOf('subject_id\tchapter\ttitle\ttype\ttopic\tsource\trepo_path\treader_url', start)
  assert.ok(start >= 0 && schema > start)
  lines.splice(schema + 1, 1)
  assert.ok(lines.includes(AGENT_CONTEXT_END_MARKER))
  assert.throws(() => parseAgentContext(lines.join('\n')), /row count|fingerprint|type count/i)
})

test('builder rejects duplicate qualified IDs and unsafe TSV cells', () => {
  const row = { subject: 'circuits', id: '1', chapter: '1', title: 'A', type: 'example', source: 'S', repo_path: 'docs/circuits/a.md' }
  assert.throws(() => buildAgentContext([row, row], '', ''), /duplicate/)
  assert.throws(() => buildAgentContext([{ ...row, title: 'bad\ttitle' }], '', ''), /TSV cell/)
})
