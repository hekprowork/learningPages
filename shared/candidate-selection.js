export const TYPE_OPTIONS = [
  { value: 'example', label: '範例 Example', defaultSelected: true },
  { value: 'practice', label: '練習 Practice', defaultSelected: true },
  { value: 'exercise', label: '習題 Exercise' },
  { value: 'homework', label: '作業 Homework' },
  { value: 'exam', label: '考題 Exam' }
]

export function parseCandidateLimit(value, count) {
  if (value === undefined || (typeof value === 'string' && value.trim() === '')) return null

  const limit = typeof value === 'number' || typeof value === 'string' ? Number(value) : NaN
  if (!Number.isSafeInteger(limit) || limit < count) {
    throw new Error(`候選題數請留空使用全部，或填入至少 ${count} 題的安全整數。`)
  }
  return limit
}

export function matchCandidateScope(catalog, { subject, chapters: selectedChapters, types }) {
  if (!Array.isArray(selectedChapters) || !selectedChapters.length) {
    throw new Error('請至少選擇一個章節。')
  }
  const subjectRows = catalog.filter(row => row.subject === subject)
  const availableChapters = new Set(subjectRows.map(row => row.chapter))
  const chapterSet = new Set(selectedChapters)
  if ([...chapterSet].some(chapter => typeof chapter !== 'string' || !availableChapters.has(chapter))) {
    throw new Error('請選擇此科目有效的章節。')
  }
  if (!types.length) throw new Error('請至少選擇一種有效題型。')

  const chapters = [...chapterSet].sort((a, b) => Number(a) - Number(b) || a.localeCompare(b))
  const rows = subjectRows.filter(row => chapterSet.has(row.chapter) && types.includes(row.type))
  return { chapters, types, rows }
}

export function selectCandidates(catalog, scope, candidateLimit) {
  const { chapters, types, rows } = matchCandidateScope(catalog, scope)
  const groups = new Map()
  for (const row of rows) {
    const key = row.topic || row.type
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key).push(row)
  }

  const ordered = []
  while ([...groups.values()].some(group => group.length)) {
    for (const group of groups.values()) if (group.length) ordered.push(group.shift())
  }
  const wanted = Math.min(candidateLimit ?? ordered.length, ordered.length)
  return { chapters, types, ordered, wanted }
}
