import { readFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { SUBJECTS } from './question-catalog.js'

export const INDEX_COLUMNS = ['chapter', 'id', 'title', 'type', 'topic', 'source', 'repo_path']
export function questionIndexFiles(root) {
  let sourceCommit = null
  try { sourceCommit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim() } catch {}
  const manifest = {
    version: 1, encoding: 'UTF-8', delimiter: '\t', columns: INDEX_COLUMNS,
    source_commit: sourceCommit,
    repository: 'https://github.com/hekprowork/learningPages',
    exam_url: 'https://hekprowork.github.io/learningPages/exam.html',
    subjects: {}
  }
  const files = new Map()
  for (const subject of SUBJECTS) {
    const bytes = readFileSync(resolve(root, `.agents/skills/learningpages-question-bank-local/references/${subject}.tsv`))
    const [header, ...rows] = bytes.toString('utf8').trimEnd().split(/\r?\n/)
    if (header !== INDEX_COLUMNS.join('\t')) throw new Error(`Invalid TSV header: ${subject}`)
    const ids = new Set()
    for (const row of rows) {
      const fields = row.split('\t')
      if (fields.length !== INDEX_COLUMNS.length || !fields[1] || ids.has(fields[1])) throw new Error(`Invalid or duplicate TSV row: ${subject}: ${fields[1]}`)
      ids.add(fields[1])
    }
    files.set(`${subject}.tsv`, bytes)
    manifest.subjects[subject] = { file: `${subject}.tsv`, questions: rows.length, sha256: createHash('sha256').update(bytes).digest('hex') }
  }
  files.set('version.txt', Buffer.from(`source_commit: ${sourceCommit ?? 'unavailable'}\n`))
  files.set('manifest.json', Buffer.from(JSON.stringify(manifest, null, 2) + '\n'))
  return files
}

export function publishQuestionIndex(root, output = resolve(root, 'docs/public/question-index')) {
  const files = questionIndexFiles(root)
  mkdirSync(output, { recursive: true })
  for (const [name, bytes] of files) writeFileSync(resolve(output, name), bytes)
}
