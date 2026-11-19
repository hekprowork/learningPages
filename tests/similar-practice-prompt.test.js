import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readQuestionCatalog } from '../scripts/question-catalog.js'
import { MAX_ATTEMPT_TEXT, MAX_SEED_TEXT, prepareSimilarPractice, resolveSeed, selectPracticeScope } from '../docs/.vitepress/theme/components/similar-practice-prompt.js'
import { AGENT_CONTEXT_URL } from '../scripts/agent-context.js'

const catalog = readQuestionCatalog(process.cwd())
const example = catalog.find(q => q.subject === 'circuits' && q.chapter === '4' && q.type === 'example')

test('default request covers all subjects, chapters, IDs and types; soft preference is not a filter', () => {
  const result = prepareSimilarPractice(catalog, { seed: `circuits:${example.id}`, attempt: '' })
  assert.equal(result.candidates.length, catalog.length)
  const expectedChapters = new Set(catalog.map(q => `${q.subject}:${q.chapter}`)).size
  assert.equal(result.inventory.length, expectedChapters)
  assert.equal(new Set(result.inventory.map(ch => ch.subject)).size, 4)
  assert.equal(result.inventory.reduce((sum,ch) => sum + ch.matchingCount, 0), catalog.length)
  assert.deepEqual([...new Set(result.inventory.flatMap(ch => Object.keys(ch.typeCounts)))].sort(), ['example','exam','exercise','homework','practice'].sort())
  assert.equal(result.recommendationCandidates.length, catalog.length - 1)
  assert.ok(result.prompt.includes(AGENT_CONTEXT_URL))
  assert.equal((result.prompt.match(/agent-context\.txt/g) || []).length, 1)
  assert.doesNotMatch(result.prompt, /question-index\/(?:circuits|electronics|engineering-math|solid-state)\.tsv/)
  assert.doesNotMatch(result.prompt, /章節索引：https:\/\//)
  assert.doesNotMatch(result.prompt, /question-reader-offline\//)
  assert.match(result.prompt, /預期 row\/group 數、指紋|row\/group 數、指紋/)
  assert.match(result.prompt, /Example 與 Exercise 僅是相近程度相同時的優先參考，不是篩選條件/)
  assert.match(result.prompt, /實際掃描的索引及涵蓋範圍/)
  assert.match(result.prompt, /已讀取完整原題並確認相似的題目/)
  assert.ok(!result.prompt.includes(catalog.find(q => q.id !== example.id).title), 'prompt contains metadata only, not candidate statements')
})

test('bare, qualified, reader and published card references resolve; ambiguous and malformed refs ask for correction', () => {
  assert.equal(resolveSeed(catalog, example.id).question.id, example.id)
  assert.equal(resolveSeed(catalog, `circuits:${example.id}`).question.id, example.id)
  assert.equal(resolveSeed(catalog, `https://hekprowork.github.io/learningPages/question-reader/circuits/${encodeURIComponent(example.id)}.html`).question.id, example.id)
  assert.equal(resolveSeed(catalog, `https://hekprowork.github.io/learningPages/${example.path}#card-${encodeURIComponent(example.id)}`).question.id, example.id)
  assert.throws(() => resolveSeed(catalog, `circuits:${example.id}-missing`), /找不到/)
  assert.throws(() => resolveSeed(catalog, 'circuits:'), /缺少題目 ID/)
  assert.throws(() => resolveSeed(catalog, 'foo:123'), /無效的科目:ID/)
  assert.throws(() => resolveSeed(catalog, `https://hekprowork.github.io/learningPages/${example.path}#card-wrong`), /找不到網址中的題目/)
  assert.throws(() => resolveSeed(catalog, 'https://example.com/question-reader/circuits/x.html'), /不是 learningPages/)
  const duplicate = [{ ...example }, { ...example, subject: 'electronics' }]
  assert.throws(() => resolveSeed(duplicate, example.id), /多個科目/)
  assert.equal(resolveSeed(duplicate, `circuits:${example.id}`).question.subject, 'circuits')
})

test('manual subject and chapter limits are explicit and type restriction works independently', () => {
  const all = selectPracticeScope(catalog, { limitScope: false, restrictTypes: false })
  assert.equal(all.candidates.length, catalog.length)
  const limited = selectPracticeScope(catalog, { limitScope: true, subject: 'circuits', chapters: ['4'], restrictTypes: false })
  assert.ok(limited.candidates.every(q => q.subject === 'circuits' && q.chapter === '4'))
  assert.ok(limited.types.includes('practice') && limited.types.includes('exam'))
  const typeOnly = selectPracticeScope(catalog, { limitScope: false, restrictTypes: true, type: 'exercise' })
  assert.ok(typeOnly.candidates.every(q => q.type === 'exercise'))
  assert.deepEqual(typeOnly.candidates, catalog.filter(q => q.type === 'exercise'))
  const tiny = [{ id: 'seed', subject: 'circuits', chapter: '4', type: 'example' }]
  const zero = prepareSimilarPractice(tiny, { seed: 'circuits:seed', attempt: '', limitScope: true, subject: 'circuits', chapters: ['4'], restrictTypes: true, type: 'homework' })
  assert.equal(zero.candidates.length, 0)
  assert.match(zero.prompt, /範圍索引列出 0 題/)
  assert.match(zero.prompt, /範圍內零題時照實回報/)
  assert.throws(() => selectPracticeScope(catalog, { limitScope: true, subject: 'circuits', chapters: [], restrictTypes: false }), /至少選擇/)
})

test('known seed outside manual scope gets a separate complete chapter download', () => {
  const result = prepareSimilarPractice(catalog, { seed: `electronics:${catalog.find(q => q.subject === 'electronics').id}`, attempt: '', limitScope: true, subject: 'circuits', chapters: ['3'], restrictTypes: false })
  const seed = result.seed.question
  assert.ok(result.chapters.some(ch => ch.subject === seed.subject && ch.chapter === seed.chapter && ch.seedOnly))
  assert.ok(result.chapters.every(ch => ch.subject === 'circuits' && ch.chapter === '3' || ch.seedOnly))
  assert.ok(result.prompt.includes(`${seed.subject}:${seed.id}`), 'outside seed reader remains separate contextual information')
  assert.ok(!result.prompt.includes(`${seed.subject} Chapter ${seed.chapter}（種子題參考，不屬搜尋範圍）`), 'filtered prompt omits chapter routes')
  assert.ok(!result.prompt.includes(`${seed.subject} Chapter ${seed.chapter} 離線章節`), 'filtered prompt omits offline routes')
  assert.ok(!result.prompt.includes('agent-context.txt'), 'manual chapter scope uses selected routes instead of full-corpus pack')
  assert.ok(result.prompt.includes('BEGIN-SCOPED-QUESTION-INDEX'))
  const records = [...result.prompt.matchAll(/^\[.*\]$/gm)].map(match => JSON.parse(match[0]))
  assert.ok(!records.some(row => row[0] === `${seed.subject}:${seed.id}`), 'outside seed is not an index candidate')
  assert.ok(!result.prompt.includes('/question-reader/circuits/chapter-3.html'), 'filtered prompt has no chapter index route')
  assert.ok(result.chapters.find(ch => ch.seedOnly).offlinePath.endsWith(`chapter-${seed.chapter}.html`))
})

test('filtered prompts include exactly scope candidates with complete marked index and no traversal routes', () => {
  const result = prepareSimilarPractice(catalog, { seed: `circuits:${example.id}`, attempt: '', limitScope: true, subject: 'circuits', chapters: ['4'], restrictTypes: true, type: 'example,exercise' })
  const expected = result.scope.candidates.map(q => [ `${q.subject}:${q.id}`, ({ example: 'e', practice: 'p', exercise: 'x', homework: 'h', exam: 'm' })[q.type], q.title, q.topic ])
  const records = [...result.prompt.matchAll(/^\[.*\]$/gm)].map(match => JSON.parse(match[0]))
  assert.deepEqual(records, expected)
  assert.match(result.prompt, new RegExp(`SCOPED-QUESTION-INDEX rows=${expected.length}`))
  assert.match(result.prompt, new RegExp(`END-SCOPED-QUESTION-INDEX rows=${expected.length}`))
  assert.match(result.prompt, /完整候選清單/)
  assert.match(result.prompt, /禁止讀取全域目錄、章節索引、TSV、離線整章或其他未列題目/)
  assert.match(result.prompt, /只開啟索引題目的單題 reader URL/)
  assert.match(result.prompt, /Reader URL: https:\/\/hekprowork\.github\.io\/learningPages\/question-reader\/\{subject\}\/\{encodeURIComponent\(ID\)\}\.html/)
  assert.doesNotMatch(result.prompt, /完整目錄涵蓋 \d+ 科/)
  assert.doesNotMatch(result.prompt, /agent-context\.txt|question-index\/.*\.tsv|question-reader\/circuits\/chapter-/)
  assert.ok(result.prompt.includes(`circuits:${example.id}`), 'selected seed remains in the index')
  assert.equal(result.recommendationCandidates.some(q => q.id === example.id), false, 'selected seed is excluded from recommendations')

  const typeOnly = prepareSimilarPractice(catalog, { seed: `circuits:${example.id}`, attempt: '', restrictTypes: true, type: 'homework' })
  assert.deepEqual(typeOnly.scope.candidates, catalog.filter(q => q.type === 'homework'))
  assert.ok(typeOnly.prompt.includes('SCOPED-QUESTION-INDEX'))
  const typeOnlyRecords = [...typeOnly.prompt.matchAll(/^\[.*\]$/gm)].map(match => JSON.parse(match[0]))
  assert.deepEqual(typeOnlyRecords, typeOnly.scope.candidates.map(q => [`${q.subject}:${q.id}`, 'h', q.title, q.topic]))
})

test('all-type filtered prompt contains all catalog rows, accepts maximum seed and attempt, and stays under two seconds', () => {
  const start = performance.now()
  const result = prepareSimilarPractice(catalog, { seed: 's'.repeat(MAX_SEED_TEXT), attempt: 'a'.repeat(MAX_ATTEMPT_TEXT), restrictTypes: true, type: 'all' })
  const elapsed = performance.now() - start
  assert.equal(result.candidates.length, catalog.length)
  assert.match(result.prompt, new RegExp(`SCOPED-QUESTION-INDEX rows=${catalog.length}`))
  assert.match(result.prompt, new RegExp(`END-SCOPED-QUESTION-INDEX rows=${catalog.length}`))
  const records = [...result.prompt.matchAll(/^\[.*\]$/gm)]
  assert.equal(records.length, catalog.length)
  assert.ok(new TextEncoder().encode(result.prompt).byteLength <= 512 * 1024)
  assert.ok(elapsed < 2000, `prompt generation took ${elapsed.toFixed(1)} ms`)
})

test('empty filtered index has explicit matching completion markers', () => {
  const tiny = [{ id: 'seed', subject: 'circuits', chapter: '4', type: 'example', title: 'seed', topic: '' }]
  const result = prepareSimilarPractice(tiny, { seed: 'circuits:seed', attempt: '', limitScope: true, subject: 'circuits', chapters: ['4'], restrictTypes: true, type: 'homework' })
  assert.match(result.prompt, /SCOPED-QUESTION-INDEX rows=0/)
  assert.match(result.prompt, /BEGIN-SCOPED-QUESTION-INDEX\nEND-SCOPED-QUESTION-INDEX rows=0/)
  assert.match(result.prompt, /範圍內零題時照實回報/)
})

test('index fields with line separators remain one physical JSON record and oversized prompts fail without truncation', () => {
  const special = [
    { id: 'seed', subject: 'circuits', chapter: '4', type: 'example', title: 'seed', topic: '' },
    { id: 'other', subject: 'circuits', chapter: '4', type: 'exercise', title: 'line\nbreak\u2028separator', topic: 'topic\r\ncontinued' }
  ]
  const result = prepareSimilarPractice(special, { seed: 'circuits:seed', attempt: '', restrictTypes: true, type: 'all' })
  const recordLines = result.prompt.split('\n').filter(line => line.startsWith('['))
  assert.equal(recordLines.length, 2)
  assert.deepEqual(JSON.parse(recordLines[1]), ['circuits:other', 'x', 'line\nbreak\u2028separator', 'topic\r\ncontinued'])

  const oversized = [special[0], { ...special[1], title: 'x'.repeat(600000) }]
  assert.throws(() => prepareSimilarPractice(oversized, { seed: 'circuits:seed', attempt: '', restrictTypes: true, type: 'all' }), /超過 512 KiB 上限；未截斷任何題目/)
})

test('unfiltered prompt retains reusable context-pack path', () => {
  const result = prepareSimilarPractice(catalog, { seed: `circuits:${example.id}`, attempt: '' })
  assert.ok(result.prompt.includes(AGENT_CONTEXT_URL))
  assert.doesNotMatch(result.prompt, /BEGIN-SCOPED-QUESTION-INDEX/)
})

test('pasted question and attempt limits reject excess text without truncation', () => {
  const pasted = prepareSimilarPractice(catalog, { seed: '我在解題時卡在 $x_1$', attempt: '' })
  assert.equal(pasted.seed.text, '我在解題時卡在 $x_1$')
  assert.match(pasted.prompt, /不要推測或診斷錯因/)
  assert.ok(pasted.prompt.includes(JSON.stringify(pasted.seed.text)), 'learner text is serialized as a JSON string')
  assert.ok(!pasted.prompt.includes('```text'), 'pasted content cannot break instruction fences')
  const withAttempt = prepareSimilarPractice(catalog, { seed: example.id, attempt: '我用了 KCL' })
  assert.match(withAttempt.prompt, /我用了 KCL/)
  assert.throws(() => prepareSimilarPractice(catalog, { seed: 'x'.repeat(MAX_SEED_TEXT + 1), attempt: '' }), /不可超過/)
  assert.throws(() => prepareSimilarPractice(catalog, { seed: example.id, attempt: 'x'.repeat(MAX_ATTEMPT_TEXT + 1) }), /不可超過/)
})
