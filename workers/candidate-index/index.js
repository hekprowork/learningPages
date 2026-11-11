const site = 'https://hekprowork.github.io/learningPages/'
const subjects = new Set(['circuits', 'electronics', 'engineering-math', 'solid-state'])
const types = ['example', 'practice', 'exercise', 'homework', 'exam']
const selectionHeader = 'subject_id\tchapter\ttitle\ttype\ttopic\tsource\treader_url\thas_figure'

function response(body, status, contentType = 'text/plain', headers = {}) {
  if (status === 204) return new Response(null, { status, headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    ...headers,
  } })
  return new Response(body, {
    status,
    headers: {
      'Content-Type': contentType + '; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Cache-Control': status >= 400 ? 'no-store' : 'public, max-age=30, s-maxage=60',
      ...headers,
    },
  })
}

const json = (body, status = 200, headers = {}) => response(JSON.stringify(body), status, 'application/json', headers)
const cleanCell = value => String(value ?? '').replace(/[\t\r\n]+/g, ' ')
const asTsv = entries => [selectionHeader, ...entries.map(q => [
  `${q.subject}:${q.id}`, q.chapter, q.title, q.type, q.topic, q.source, q.reader_url, q.has_figure
    ? 'true'
    : 'false'
].map(cleanCell).join('\t')), ''].join('\n')

function singleParam(url, key, required = true) {
  const values = url.searchParams.getAll(key)
  if (required ? values.length !== 1 : values.length > 1) return null
  return values.length ? values[0] : required ? null : ''
}

function parsePrepareOptions(url) {
  const subject = singleParam(url, 'subject')
  const rawChapters = singleParam(url, 'chapters')
  const rawTypes = singleParam(url, 'types')
  const rawCount = singleParam(url, 'count')
  const rawMinutes = singleParam(url, 'minutes')
  const rawLimit = singleParam(url, 'candidate_limit', false)
  if (!subject || !subjects.has(subject)) throw new Error('請提供一個有效科目。')
  if (!rawChapters || !rawChapters.trim()) throw new Error('請至少選擇一個章節。')
  const chapters = rawChapters.split(',')
  if (chapters.some(chapter => !/^\d+(?:\.\d+)?$/.test(chapter)) || new Set(chapters).size !== chapters.length) {
    throw new Error('章節選項格式錯誤。')
  }
  if (!rawTypes || !rawTypes.trim()) throw new Error('請至少選擇一種題型。')
  const selectedTypes = rawTypes.split(',')
  if (selectedTypes.some(type => !types.includes(type)) || new Set(selectedTypes).size !== selectedTypes.length) {
    throw new Error('題型選項無效或重複。')
  }
  const count = Number(rawCount)
  const minutes = Number(rawMinutes)
  if (!Number.isSafeInteger(count) || count < 1 || count > 10) throw new Error('模考題數必須是 1–10 的整數。')
  if (!Number.isSafeInteger(minutes) || minutes < 1 || minutes > 480) throw new Error('作答時間必須是 1–480 分鐘的整數。')
  if (rawLimit === null) throw new Error('候選題數選項不得重複。')
  const candidateLimit = rawLimit.trim() === '' ? null : Number(rawLimit)
  if (candidateLimit !== null && (!Number.isSafeInteger(candidateLimit) || candidateLimit < count)) {
    throw new Error(`候選題數請留空使用全部，或填入至少 ${count} 題的整數。`)
  }
  return {
    subject,
    chapters: chapters.sort((a, b) => Number(a) - Number(b) || a.localeCompare(b)),
    types: types.filter(type => selectedTypes.includes(type)),
    count,
    minutes,
    candidateLimit,
  }
}

async function loadCandidateIndex(subject) {
  const url = new URL(`question-index/${subject}.candidates.json`, site)
  const upstream = await fetch(url, { cf: { cacheTtl: 60, cacheEverything: true } })
  if (!upstream.ok) throw new Error('Published candidate index unavailable')
  const data = await upstream.json()
  if (data?.subject !== subject || typeof data.version !== 'string' || !Array.isArray(data.entries)) throw new Error('Invalid published candidate index')
  const ids = new Set()
  for (const row of data.entries) {
    let reader
    try { reader = new URL(row?.reader_url) } catch {}
    if (!row || !/^[a-z0-9_-]+$/i.test(row.id ?? '') || ids.has(row.id) ||
        !/^\d+(?:\.\d+)?$/.test(row.chapter ?? '') || !types.includes(row.type) || typeof row.has_figure !== 'boolean' ||
        !row.title || !row.source || reader?.origin !== 'https://hekprowork.github.io' || !reader.pathname.startsWith('/learningPages/question-reader/')) {
      throw new Error('Invalid published candidate index row')
    }
    ids.add(row.id)
  }
  if (data.count !== data.entries.length) throw new Error('Published candidate count mismatch')
  return data
}

function roundRobin(entries) {
  const groups = new Map()
  for (const row of entries) {
    const key = row.topic || row.type
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key).push(row)
  }
  const ordered = []
  while ([...groups.values()].some(group => group.length)) {
    for (const group of groups.values()) if (group.length) ordered.push(group.shift())
  }
  return ordered
}

function shareUrl(requestUrl, subject, entries) {
  if (!entries.length) return ''
  const url = new URL('/selection.tsv', requestUrl)
  url.searchParams.set('subject', subject)
  url.searchParams.set('ids', entries.map(row => row.id).join(','))
  return url.href.length <= 15000 ? url.href : ''
}

async function prepare(url) {
  let options
  try { options = parsePrepareOptions(url) } catch (error) { return json({ error: error.message }, 400) }

  let index
  try { index = await loadCandidateIndex(options.subject) }
  catch { return json({ error: '公開題庫索引暫時無法讀取，請稍後再試或改用頁面內的本機候選清單。' }, 502) }

  const availableChapters = new Set(index.entries.map(row => row.chapter))
  if (options.chapters.some(chapter => !availableChapters.has(chapter))) return json({ error: '章節選項不屬於此科目。' }, 400)
  const matching = index.entries.filter(row => options.chapters.includes(row.chapter) && options.types.includes(row.type))
  const ordered = roundRobin(matching)
  const entries = ordered.slice(0, options.candidateLimit ?? ordered.length).map(row => ({ ...row, subject: options.subject }))
  const tsv = asTsv(entries)
  return json({
    subject: options.subject,
    version: index.version,
    chapters: options.chapters,
    types: options.types,
    count: entries.length,
    scope_count: matching.length,
    candidate_count: entries.length,
    figure_count: entries.filter(row => row.has_figure).length,
    entries,
    tsv,
    share_url: shareUrl(url, options.subject, entries),
  }, 200, { 'Content-Disposition': `inline; filename="${options.subject}-candidate-index.json"` })
}

async function selection(url) {
  const subject = singleParam(url, 'subject')
  const rawIds = singleParam(url, 'ids')
  const ids = rawIds?.split(',') ?? []
  if (!subject || !subjects.has(subject) || !rawIds || !ids.length || ids.some(id => !/^[a-z0-9_-]+$/i.test(id)) || new Set(ids).size !== ids.length) {
    return response('請提供一個有效科目及不重複的候選題 ID。', 400)
  }

  let index
  try { index = await loadCandidateIndex(subject) }
  catch { return response('公開題庫索引暫時無法讀取。請稍後再試，或回出題頁複製候選 TSV。', 502) }
  const rowsById = new Map(index.entries.map(row => [row.id, row]))
  const missing = ids.filter(id => !rowsById.has(id))
  if (missing.length) return response('題庫中找不到候選題 ID：' + missing.join(', '), 404)
  const rows = ids.map(id => ({ ...rowsById.get(id), subject }))
  return response(asTsv(rows), 200, 'text/tab-separated-values', {
    'Content-Disposition': `attachment; filename="learningPages-${subject}-candidate-index.tsv"`,
    'X-Index-Version': index.version,
  })
}

export default {
  async fetch(request) {
    const url = new URL(request.url)
    if (request.method === 'OPTIONS') return response('', 204)
    if (request.method !== 'GET') return response('請使用 GET 讀取候選題索引。', 405, 'text/plain', { Allow: 'GET, OPTIONS' })
    if (url.pathname === '/prepare') return prepare(url)
    if (url.pathname === '/selection.tsv') return selection(url)
    return response('找不到候選題索引路由。', 404)
  },
}
