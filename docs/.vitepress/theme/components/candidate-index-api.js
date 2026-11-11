import { buildCandidatePrompt } from './candidate-prompt.js'
import { parseQuestionTypes } from './agent-exam-prompt.js'

export function candidatePrepareUrl(endpoint, request) {
  const url = new URL('/prepare', endpoint)
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('候選索引服務網址無效。')
  const selection = parseQuestionTypes(request.type)
  if (selection.error) throw new Error(selection.error)
  if (!Array.isArray(request.chapters) || !request.chapters.length) throw new Error('請至少選擇一個章節。')
  url.searchParams.set('subject', request.subject)
  url.searchParams.set('chapters', [...request.chapters].join(','))
  url.searchParams.set('types', selection.csv)
  url.searchParams.set('count', String(request.count))
  url.searchParams.set('minutes', String(request.minutes))
  if (String(request.candidateLimit ?? '').trim()) url.searchParams.set('candidate_limit', String(request.candidateLimit).trim())
  return url
}

export async function loadCandidateIndex(endpoint, request, fetcher, signal) {
  const url = candidatePrepareUrl(endpoint, request)
  const response = await fetcher(url.href, signal ? { signal } : undefined)
  let data
  try { data = await response.json() } catch { throw new Error('候選索引服務回傳了無法讀取的資料。') }
  if (!response.ok) throw new Error(data?.error || `候選索引服務暫時無法使用（HTTP ${response.status}）。`)
  if (!data || data.subject !== request.subject || typeof data.version !== 'string' ||
      !Array.isArray(data.entries) || !Number.isInteger(data.scope_count) ||
      !Array.isArray(data.chapters) || !Array.isArray(data.types) ||
      data.candidate_count !== data.entries.length || data.count !== data.entries.length ||
      data.scope_count < data.entries.length || typeof data.tsv !== 'string') {
    throw new Error('候選索引資料格式不完整。')
  }
  const selection = parseQuestionTypes(request.type)
  const expectedChapters = [...request.chapters].sort((a, b) => Number(a) - Number(b) || a.localeCompare(b))
  if (JSON.stringify(data.chapters) !== JSON.stringify(expectedChapters) || JSON.stringify(data.types) !== JSON.stringify(selection.types)) {
    throw new Error('Worker 回傳的章節或題型與目前條件不一致。')
  }

  const seen = new Set()
  const entries = data.entries.map(row => {
    let reader
    try { reader = new URL(row?.reader_url) } catch {}
    if (!row || !/^[a-z0-9_-]+$/i.test(row.id ?? '') || seen.has(row.id) ||
        typeof row.has_figure !== 'boolean' || !row.reader_url || !row.source || !row.title ||
        reader?.origin !== 'https://hekprowork.github.io' || !reader.pathname.startsWith('/learningPages/question-reader/') ||
        !request.chapters.includes(row.chapter) || !parseQuestionTypes(request.type).types.includes(row.type)) {
      throw new Error('候選索引包含重複或不符合目前條件的題目。')
    }
    seen.add(row.id)
    return { ...row, subject: request.subject, hasFigures: row.has_figure }
  })
  if (!entries.length) throw new Error('目前條件下沒有符合的候選題，請更改章節或題型。')
  if (entries.length < Number(request.count)) throw new Error(`目前條件下只有 ${entries.length} 題候選，需要 ${Number(request.count)} 題；請調整章節或題型。`)
  if (!Number.isInteger(data.figure_count) || data.figure_count !== entries.filter(row => row.has_figure).length) {
    throw new Error('候選索引的圖像題統計不一致。')
  }
  const tsvLines = data.tsv.trimEnd().split(/\r?\n/)
  const tsvHeader = 'subject_id\tchapter\ttitle\ttype\ttopic\tsource\treader_url\thas_figure'
  if (tsvLines.shift() !== tsvHeader || tsvLines.length !== entries.length || tsvLines.some((line, index) => {
    const fields = line.split('\t')
    const row = entries[index]
    return fields.length !== 8 || fields[0] !== `${request.subject}:${row.id}` || fields[1] !== row.chapter ||
      fields[2] !== row.title || fields[3] !== row.type || fields[4] !== row.topic || fields[5] !== row.source ||
      fields[6] !== row.reader_url || fields[7] !== String(row.has_figure)
  })) throw new Error('Worker 回傳的 TSV 與候選清單不一致。')

  let shareUrl = ''
  if (data.share_url) {
    try {
      const candidate = new URL(data.share_url)
      if (!['http:', 'https:'].includes(candidate.protocol) || candidate.origin !== new URL(endpoint).origin || candidate.pathname !== '/selection.tsv' ||
          candidate.searchParams.get('subject') !== request.subject ||
          candidate.searchParams.get('ids') !== entries.map(row => row.id).join(',')) {
        throw new Error()
      }
      shareUrl = candidate.href
    } catch { throw new Error('候選索引分享網址與目前題目順序不一致。') }
  }

  const prompt = buildCandidatePrompt(entries, {
    ...request,
    chapters: data.chapters,
    type: selection.csv,
    scopeCount: data.scope_count,
    indexVersion: data.version,
    candidateIndexUrl: shareUrl,
  }, 'compact')
  return {
    entries,
    prompt,
    failures: [],
    version: data.version,
    scopeCount: data.scope_count,
    candidateCount: entries.length,
    figureCount: data.figure_count,
    tsv: data.tsv,
    shareUrl,
  }
}
