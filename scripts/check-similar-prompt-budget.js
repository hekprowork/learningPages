import assert from 'node:assert/strict'
import os from 'node:os'
import { performance } from 'node:perf_hooks'
import { MAX_ATTEMPT_TEXT, MAX_SEED_TEXT, prepareSimilarPractice } from '../docs/.vitepress/theme/components/similar-practice-prompt.js'
import { readQuestionCatalog } from './question-catalog.js'

const catalog = readQuestionCatalog(process.cwd())
const request = {
  seed: 's'.repeat(MAX_SEED_TEXT),
  attempt: 'a'.repeat(MAX_ATTEMPT_TEXT),
  restrictTypes: true,
  type: 'all'
}

function verifyCompleteIndex(result) {
  assert.equal(result.candidates.length, catalog.length, 'all question types must include the full catalog')
  const index = result.prompt.match(/BEGIN-SCOPED-QUESTION-INDEX\n([\s\S]*?)\nEND-SCOPED-QUESTION-INDEX rows=(\d+)/)
  assert.ok(index, 'scoped index must have begin and end markers')
  const records = index[1].split('\n').filter(line => line.startsWith('[')).map(line => JSON.parse(line))
  assert.equal(Number(index[2]), result.candidates.length, 'declared index row count must match selection')
  assert.equal(records.length, result.candidates.length, 'every selected question must be present')
  assert.ok(Buffer.byteLength(result.prompt, 'utf8') <= 512 * 1024, 'complete prompt must remain within its byte budget')
}

const warm = prepareSimilarPractice(catalog, request)
verifyCompleteIndex(warm)

const durations = []
for (let run = 0; run < 7; run += 1) {
  const start = performance.now()
  const result = prepareSimilarPractice(catalog, request)
  durations.push(performance.now() - start)
  verifyCompleteIndex(result)
}

const sorted = [...durations].sort((a, b) => a - b)
const medianMs = sorted[Math.floor(sorted.length / 2)]
const worstMs = sorted.at(-1)
assert.ok(worstMs < 2000, `worst prompt-generation run took ${worstMs.toFixed(2)} ms`)

console.log(JSON.stringify({
  node: process.version,
  cpuCount: os.cpus().length,
  loadAverage: os.loadavg(),
  rows: catalog.length,
  maximumSeedCharacters: MAX_SEED_TEXT,
  maximumAttemptCharacters: MAX_ATTEMPT_TEXT,
  promptBytes: Buffer.byteLength(warm.prompt, 'utf8'),
  runs: durations.length,
  medianMs: Number(medianMs.toFixed(2)),
  rangeMs: [Number(sorted[0].toFixed(2)), Number(worstMs.toFixed(2))],
  allRowsVerified: true,
  withinTwoSeconds: true
}, null, 2))
