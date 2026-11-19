import { readFileSync, mkdirSync, writeFileSync, renameSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'
import { createHash } from 'node:crypto'
import { TYPE_OPTIONS } from '../docs/.vitepress/theme/components/agent-exam-prompt.js'
import { chapterReaderPath, offlineChapterPath } from '../docs/.vitepress/theme/components/question-reader-url.js'
import { readerPath, READER_BASE } from './question-readers.js'
import { SUBJECTS } from './question-catalog.js'

export const AGENT_CONTEXT_URL = `${READER_BASE}agent-context.txt`
export const AGENT_CONTEXT_END_MARKER = 'END_AGENT_CONTEXT'
const FORMAT_VERSION = 1
const QUESTION_COLUMNS = ['subject_id', 'chapter', 'title', 'type', 'topic', 'source', 'repo_path', 'reader_url']
const CHAPTER_COLUMNS = ['subject', 'chapter', 'row_count', ...TYPE_OPTIONS.map(type => `${type.value}_count`), 'reader_url', 'offline_url']
const TYPES = TYPE_OPTIONS.map(type => type.value)

const fail = message => { throw new Error(`Invalid Agent context pack: ${message}`) }
const absoluteRoute = route => new URL(String(route).replace(/^\/+/, ''), READER_BASE).href
const number = (value, label) => {
  const parsed = Number(value)
  if (!Number.isSafeInteger(parsed) || parsed < 0) fail(`invalid ${label}`)
  return parsed
}
const lineSafe = (value, label) => {
  if (typeof value !== 'string' || /[\t\r\n]/.test(value)) fail(`${label} must be a single TSV cell`)
  return value
}
const digest = text => createHash('sha256').update(text, 'utf8').digest('hex')
const chapterKey = (subject, chapter) => `${subject}:${chapter}`

function rowForQuestion(question) {
  const subject = lineSafe(question.subject, 'subject')
  const id = lineSafe(question.id, 'id')
  const chapter = lineSafe(question.chapter, 'chapter')
  if (!SUBJECTS.includes(subject)) fail(`unknown subject ${subject}`)
  if (!id || !chapter) fail(`missing subject-qualified ID or chapter for ${subject}:${id}`)
  const type = lineSafe(question.type, 'type')
  if (!TYPES.includes(type)) fail(`unknown question type ${type}`)
  const readerUrl = new URL(readerPath(question), READER_BASE).href
  return Object.freeze({
    subjectId: `${subject}:${id}`,
    subject,
    chapter,
    title: lineSafe(question.title ?? '', 'title'),
    type,
    topic: lineSafe(question.topic ?? '', 'topic'),
    source: lineSafe(question.source ?? '', 'source'),
    repoPath: lineSafe(question.repo_path ?? '', 'repo_path'),
    readerUrl
  })
}

function questionLine(row) {
  return [row.subjectId, row.chapter, row.title, row.type, row.topic, row.source, row.repoPath, row.readerUrl].join('\t')
}

export function buildAgentContext(catalog, guideText, compatibilityText) {
  if (!Array.isArray(catalog)) fail('catalog must be an array')
  if (typeof guideText !== 'string' || typeof compatibilityText !== 'string') fail('guide and access note must be text')
  for (const [label, text] of [['guide', guideText], ['access note', compatibilityText]]) {
    if (text.split(/\r?\n/).some(line => /^END_(?:CURATED_GUIDE|ACCESS_NOTE)$/.test(line))) fail(`${label} contains a reserved section marker`)
  }

  const rows = catalog.map(rowForQuestion)
  const ids = new Set()
  for (const row of rows) {
    if (ids.has(row.subjectId)) fail(`duplicate subject-qualified ID ${row.subjectId}`)
    ids.add(row.subjectId)
  }

  const grouped = new Map()
  for (const row of rows) {
    const key = chapterKey(row.subject, row.chapter)
    if (!grouped.has(key)) grouped.set(key, [])
    grouped.get(key).push(row)
  }
  const chapters = [...grouped].map(([key, chapterRows]) => {
    const [subject, chapter] = key.split(':')
    const typeCounts = Object.fromEntries(TYPES.map(type => [type, 0]))
    for (const row of chapterRows) typeCounts[row.type]++
    return Object.freeze({
      subject,
      chapter,
      rowCount: chapterRows.length,
      typeCounts: Object.freeze(typeCounts),
      readerUrl: absoluteRoute(chapterReaderPath(subject, chapter)),
      offlineUrl: absoluteRoute(offlineChapterPath(subject, chapter))
    })
  })
  const orderedRows = [...grouped.values()].flat()
  const rowText = orderedRows.map(questionLine).map(line => `${line}\n`).join('')
  return Object.freeze({
    formatVersion: FORMAT_VERSION,
    rowCount: rows.length,
    subjectCount: new Set(rows.map(row => row.subject)).size,
    subjectChapterCount: chapters.length,
    metadataSha256: digest(rowText),
    guideText,
    compatibilityText,
    chapters: Object.freeze(chapters),
    rows: Object.freeze(orderedRows),
    groups: Object.freeze([...grouped].map(([key, groupRows]) => Object.freeze({ key, rows: Object.freeze(groupRows) })))
  })
}

export function serializeAgentContext(snapshot) {
  if (!snapshot || snapshot.formatVersion !== FORMAT_VERSION) fail('unsupported snapshot version')
  const chapterRows = snapshot.chapters.map(chapter => [
    chapter.subject, chapter.chapter, chapter.rowCount,
    ...TYPES.map(type => chapter.typeCounts[type]), chapter.readerUrl, chapter.offlineUrl
  ].join('\t'))
  const questionGroups = snapshot.groups.flatMap(group => {
    const [subject, chapter] = group.key.split(':')
    return [
      `GROUP\t${subject}\t${chapter}\t${group.rows.length}`,
      QUESTION_COLUMNS.join('\t'),
      ...group.rows.map(questionLine),
      'END_GROUP'
    ]
  })
  const lines = [
    'LEARNINGPAGES_AGENT_CONTEXT',
    `format_version\t${snapshot.formatVersion}`,
    `expected_rows\t${snapshot.rowCount}`,
    `expected_subjects\t${snapshot.subjectCount}`,
    `expected_subject_chapters\t${snapshot.subjectChapterCount}`,
    `expected_groups\t${snapshot.groups.length}`,
    `metadata_sha256\t${snapshot.metadataSha256}`,
    'BEGIN_CURATED_GUIDE',
    snapshot.guideText.replace(/\r\n?/g, '\n').replace(/\n*$/, ''),
    'END_CURATED_GUIDE',
    'BEGIN_ACCESS_NOTE',
    snapshot.compatibilityText.replace(/\r\n?/g, '\n').replace(/\n*$/, ''),
    'END_ACCESS_NOTE',
    'BEGIN_CHAPTER_DIRECTORY',
    CHAPTER_COLUMNS.join('\t'),
    ...chapterRows,
    'END_CHAPTER_DIRECTORY',
    'BEGIN_QUESTION_GROUPS',
    ...questionGroups,
    'END_QUESTION_GROUPS',
    AGENT_CONTEXT_END_MARKER,
    ''
  ]
  // Some static hosts serve .txt without a charset, so mark this UTF-8 file
  // explicitly for browsers that would otherwise choose a legacy encoding.
  return new TextEncoder().encode(`\uFEFF${lines.join('\n')}`)
}

export function parseAgentContext(input) {
  const text = typeof input === 'string' ? input : new TextDecoder('utf-8', { fatal: true }).decode(input)
  const lines = text.replace(/^\uFEFF/, '').split('\n')
  if (lines.at(-1) !== '') fail('missing final newline')
  lines.pop()
  if (lines.shift() !== 'LEARNINGPAGES_AGENT_CONTEXT') fail('missing file signature')
  const header = new Map()
  while (lines.length && !lines[0].startsWith('BEGIN_CURATED_GUIDE')) {
    const line = lines.shift()
    const tab = line.indexOf('\t')
    if (tab < 1) fail('malformed header field')
    const key = line.slice(0, tab)
    if (header.has(key)) fail(`duplicate header field ${key}`)
    header.set(key, line.slice(tab + 1))
  }
  const version = number(header.get('format_version'), 'format version')
  if (version !== FORMAT_VERSION) fail(`unsupported format version ${version}`)
  const expectedRows = number(header.get('expected_rows'), 'row count')
  const expectedSubjects = number(header.get('expected_subjects'), 'subject count')
  const expectedChapters = number(header.get('expected_subject_chapters'), 'subject chapter count')
  const expectedGroups = number(header.get('expected_groups'), 'group count')
  const expectedHash = header.get('metadata_sha256')
  if (!/^[a-f0-9]{64}$/.test(expectedHash ?? '')) fail('invalid metadata fingerprint')

  const takeSection = (start, end) => {
    if (lines.shift() !== start) fail(`missing ${start}`)
    const values = []
    while (lines.length && lines[0] !== end) values.push(lines.shift())
    if (lines.shift() !== end) fail(`missing ${end}`)
    return values.join('\n')
  }
  const guideText = takeSection('BEGIN_CURATED_GUIDE', 'END_CURATED_GUIDE')
  const compatibilityText = takeSection('BEGIN_ACCESS_NOTE', 'END_ACCESS_NOTE')
  const directoryText = takeSection('BEGIN_CHAPTER_DIRECTORY', 'END_CHAPTER_DIRECTORY')
  const directoryLines = directoryText.split('\n')
  if (directoryLines.shift() !== CHAPTER_COLUMNS.join('\t')) fail('invalid chapter directory schema')
  const directory = new Map()
  for (const line of directoryLines) {
    const cells = line.split('\t')
    if (cells.length !== CHAPTER_COLUMNS.length) fail('invalid chapter directory row')
    const [subject, chapter, rowCountRaw, ...rest] = cells
    const typeCounts = Object.fromEntries(TYPES.map((type, index) => [type, number(rest[index], `${subject}:${chapter} ${type} count`)]))
    const readerUrl = rest[TYPES.length]
    const offlineUrl = rest[TYPES.length + 1]
    const key = chapterKey(subject, chapter)
    if (!SUBJECTS.includes(subject) || !chapter || directory.has(key)) fail(`invalid or duplicate chapter ${key}`)
    const rowCount = number(rowCountRaw, `${key} row count`)
    if (Object.values(typeCounts).reduce((sum, count) => sum + count, 0) !== rowCount) fail(`type counts do not add up for ${key}`)
    const expectedChapterReaderUrl = absoluteRoute(chapterReaderPath(subject, chapter))
    const expectedOfflineUrl = absoluteRoute(offlineChapterPath(subject, chapter))
    if (readerUrl !== expectedChapterReaderUrl || offlineUrl !== expectedOfflineUrl) fail(`invalid chapter routes for ${key}`)
    directory.set(key, { subject, chapter, rowCount, typeCounts, readerUrl, offlineUrl })
  }
  if (directory.size !== expectedChapters) fail('chapter directory count does not match header')

  if (lines.shift() !== 'BEGIN_QUESTION_GROUPS') fail('missing question groups')
  const seenGroups = new Map()
  const seenIds = new Set()
  const rows = []
  const canonicalRowLines = []
  while (lines.length && lines[0] !== 'END_QUESTION_GROUPS') {
    const marker = lines.shift().split('\t')
    if (marker.length !== 4 || marker[0] !== 'GROUP') fail('malformed question group marker')
    const [, subject, chapter, countRaw] = marker
    const key = chapterKey(subject, chapter)
    const expectedCount = number(countRaw, `${key} group count`)
    const chapterInfo = directory.get(key)
    if (!chapterInfo || seenGroups.has(key) || chapterInfo.rowCount !== expectedCount) fail(`unexpected group or group count for ${key}`)
    if (lines.shift() !== QUESTION_COLUMNS.join('\t')) fail(`invalid question schema for ${key}`)
    const groupRows = []
    while (lines.length && lines[0] !== 'END_GROUP') {
      const rawLine = lines.shift()
      const cells = rawLine.split('\t')
      if (cells.length !== QUESTION_COLUMNS.length) fail(`invalid question row in ${key}`)
      const [subjectId, rowChapter, title, type, topic, source, repoPath, readerUrl] = cells
      const split = subjectId.indexOf(':')
      const rowSubject = split < 0 ? '' : subjectId.slice(0, split)
      const id = split < 0 ? '' : subjectId.slice(split + 1)
      if (rowSubject !== subject || rowChapter !== chapter || !id || !TYPES.includes(type) || !repoPath) fail(`invalid row identity or fields in ${key}`)
      if (seenIds.has(subjectId)) fail(`duplicate subject-qualified ID ${subjectId}`)
      seenIds.add(subjectId)
      const expectedReaderUrl = new URL(readerPath({ subject, id }), READER_BASE).href
      if (readerUrl !== expectedReaderUrl) fail(`invalid source URL for ${subjectId}`)
      const row = { subjectId, subject, id, chapter, title, type, topic, source, repoPath, readerUrl }
      groupRows.push(row)
      rows.push(row)
      canonicalRowLines.push(`${rawLine}\n`)
    }
    if (lines.shift() !== 'END_GROUP') fail(`missing END_GROUP for ${key}`)
    if (groupRows.length !== expectedCount) fail(`row count mismatch for ${key}`)
    const actualTypeCounts = Object.fromEntries(TYPES.map(type => [type, groupRows.filter(row => row.type === type).length]))
    if (TYPES.some(type => actualTypeCounts[type] !== chapterInfo.typeCounts[type])) fail(`per-type count mismatch for ${key}`)
    seenGroups.set(key, groupRows)
  }
  if (lines.shift() !== 'END_QUESTION_GROUPS') fail('missing END_QUESTION_GROUPS')
  if (lines.shift() !== AGENT_CONTEXT_END_MARKER || lines.length) fail('missing or misplaced end marker')
  if (seenGroups.size !== expectedGroups || seenGroups.size !== expectedChapters) fail('question group count does not match header')
  if ([...directory.keys()].some(key => !seenGroups.has(key))) fail('a chapter group is missing')
  if (rows.length !== expectedRows) fail('question row count does not match header')
  if (new Set(rows.map(row => row.subject)).size !== expectedSubjects) fail('subject count does not match header')
  if (digest(canonicalRowLines.join('')) !== expectedHash) fail('metadata fingerprint mismatch')
  return { formatVersion: version, rowCount: rows.length, subjectCount: expectedSubjects, subjectChapterCount: directory.size, metadataSha256: expectedHash, guideText, compatibilityText, chapters: [...directory.values()], rows }
}

export function publishAgentContext(root, catalog, outputDirectory = resolve(root, 'docs/public')) {
  const guideText = readFileSync(resolve(root, 'docs/public/agent-guide.txt'), 'utf8')
  const compatibilityText = readFileSync(resolve(root, 'docs/model-reading.md'), 'utf8')
  const snapshot = buildAgentContext(catalog, guideText, compatibilityText)
  const bytes = serializeAgentContext(snapshot)
  parseAgentContext(bytes)
  mkdirSync(outputDirectory, { recursive: true })
  const output = resolve(outputDirectory, 'agent-context.txt')
  const temporary = `${output}.tmp-${process.pid}`
  try {
    writeFileSync(temporary, bytes)
    renameSync(temporary, output)
  } catch (error) {
    rmSync(temporary, { force: true })
    throw error
  }
  return snapshot
}
