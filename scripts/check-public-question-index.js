import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import assert from 'node:assert/strict'
import { questionIndexFiles } from './public-question-index.js'
const root = process.cwd()
const dist = resolve(root, 'docs/.vitepress/dist')
for (const [name, expected] of questionIndexFiles(root)) {
  assert.deepEqual(readFileSync(resolve(dist, 'question-index', name)), expected, `Published index differs from source: ${name}`)
}
assert.ok(existsSync(resolve(dist, 'question-index.html')), 'Missing public index landing page')
console.log('Public question index verified: four TSV files match source bytes; manifest and landing page exist.')
