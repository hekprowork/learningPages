import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'
import { createHash } from 'node:crypto'
import { questionIndexFiles, INDEX_COLUMNS } from '../scripts/public-question-index.js'
import { SUBJECTS } from '../scripts/question-catalog.js'

test('public exports preserve source bytes, Unicode, CRLF and hash/count metadata', () => {
  const root = mkdtempSync(resolve(tmpdir(), 'public-index-'))
  try {
    const dir = resolve(root, '.agents/skills/learningpages-question-bank-local/references')
    mkdirSync(dir, { recursive: true })
    const bytes = Buffer.from(INDEX_COLUMNS.join('\t') + '\r\n1\tid-1\t中文標題\texample\t主題\t課本 p.1\tdocs/a.md\r\n')
    for (const subject of SUBJECTS) writeFileSync(resolve(dir, `${subject}.tsv`), bytes)
    const files = questionIndexFiles(root)
    assert.equal(files.size, 5)
    const manifest = JSON.parse(files.get('manifest.json'))
    for (const subject of SUBJECTS) {
      assert.deepEqual(files.get(`${subject}.tsv`), bytes)
      assert.equal(manifest.subjects[subject].questions, 1)
      assert.equal(manifest.subjects[subject].sha256, createHash('sha256').update(bytes).digest('hex'))
    }
    writeFileSync(resolve(dir, 'circuits.tsv'), Buffer.concat([bytes, Buffer.from('1\tid-1\t重複\texample\t主題\t頁\tdocs/a.md\n')]))
    assert.throws(() => questionIndexFiles(root), /duplicate/)
  } finally { rmSync(root, { recursive: true, force: true }) }
})

test('the real four-subject exports have the documented schema and nonempty rows', () => {
  const files = questionIndexFiles(process.cwd())
  const manifest = JSON.parse(files.get('manifest.json'))
  assert.deepEqual(manifest.columns, INDEX_COLUMNS)
  assert.equal(manifest.exam_url, 'https://hekprowork.github.io/learningPages/exam.html')
  for (const subject of SUBJECTS) assert.ok(manifest.subjects[subject].questions > 0)
})
