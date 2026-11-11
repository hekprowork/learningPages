export function filterOfflineChapterHtml(html, { entries, subject, chapter, Parser }) {
  const expectedIds = entries.map(row => row.id)
  if (!expectedIds.length || new Set(expectedIds).size !== expectedIds.length) throw new Error('此章沒有可下載的候選題。')
  const expectedTypes = new Map(entries.map(row => [row.id, row.type]))
  const doc = new Parser().parseFromString(html, 'text/html')
  const articles = [...doc.querySelectorAll('article[data-question-id][data-type]')]
  if (!articles.length) throw new Error('離線章節檔沒有題目資料。')
  const byId = new Map()
  for (const article of articles) {
    const id = article.dataset.questionId
    if (byId.has(id)) throw new Error(`離線章節檔有重複題目：${id}`)
    byId.set(id, article)
  }
  const wanted = new Set(expectedIds)
  for (const article of articles) if (!wanted.has(article.dataset.questionId)) article.remove()
  const selected = [...doc.querySelectorAll('article[data-question-id][data-type]')]
  const selectedIds = selected.map(article => article.dataset.questionId)
  if (selectedIds.length !== expectedIds.length || expectedIds.some(id => !byId.has(id))) {
    throw new Error('離線章節題目與目前候選清單不一致，請重新準備候選題。')
  }
  if (expectedIds.some(id => byId.get(id).dataset.type !== expectedTypes.get(id))) {
    throw new Error('離線章節題型與目前候選索引不一致，請重新準備候選題。')
  }
  for (const article of selected) {
    const statement = article.querySelector('.statement')
    const authored = article.querySelector('details pre')
    if (!statement?.textContent.trim() || !authored?.textContent.trim()) throw new Error(`題目 ${article.dataset.questionId} 的完整題幹不存在。`)
  }
  if (doc.querySelector('script,iframe,video,audio,source,object,embed,link[href]') ||
      [...doc.querySelectorAll('img')].some(img => !img.getAttribute('src')?.startsWith('data:'))) {
    throw new Error('離線章節檔含有未內嵌的資源，不能安全下載。')
  }

  doc.title = `learningPages ${subject} Chapter ${chapter} 候選題`
  const heading = doc.querySelector('h1')
  if (heading) heading.textContent = `${subject} Chapter ${chapter} 候選題`
  const summary = doc.querySelector('h1 + p')
  if (summary) summary.textContent = `共 ${selected.length} 題，包含完整題幹與原始 Markdown／LaTeX，不包含解答。`
  return { html: '<!doctype html>\n' + doc.documentElement.outerHTML, count: selected.length, ids: selectedIds }
}
