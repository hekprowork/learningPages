export const EXAM_URL = 'https://hekprowork.github.io/learningPages/exam.html'
export const questionKey = q => `${q.subject}:${q.id}`

export function buildExamUrl(questions) {
  const keys = [...new Set(questions.map(questionKey))]
  if (!keys.length || questions.some(q => !/^[\w-]+$/.test(q.subject) || !/^[\w.-]+$/.test(q.id))) {
    throw new Error('請提供有效的科目與題目 ID。')
  }
  const url = new URL(EXAM_URL)
  url.searchParams.set('ids', keys.join(','))
  return url.href
}

export function validateExamSelection(input, candidates, count) {
  let text = input.trim().replace(/^```(?:text)?\s*\n([\s\S]*?)\n```$/, '$1').trim()
  let ids
  if (/^https?:\/\//i.test(text)) {
    const url = new URL(text)
    if (url.origin + url.pathname !== EXAM_URL || url.username || url.password || url.hash || [...url.searchParams.keys()].some(key => key !== 'ids')) {
      throw new Error('請貼上本站試卷網址或題目 ID，不接受 Google 搜尋及其他網址。')
    }
    ids = url.searchParams.getAll('ids').flatMap(value => value.split(','))
  } else {
    ids = text.split(/[\s,，]+/)
  }
  const selected = []
  const seen = new Set()
  for (const id of ids.map(id => id.trim()).filter(Boolean)) {
    const matches = candidates.filter(q => id === questionKey(q) || (!id.includes(':') && id === q.id))
    if (matches.length !== 1) throw new Error(`題目不在本次候選集或 ID 不明確：${id}`)
    const q = matches[0]
    const key = questionKey(q)
    if (seen.has(key)) throw new Error(`題目重複：${key}`)
    seen.add(key)
    selected.push(q)
  }
  if (selected.length !== Number(count)) throw new Error(`需要 ${count} 題，目前提供 ${selected.length} 題。`)
  return { questions: selected, url: buildExamUrl(selected) }
}

export function examUrlInstructions() {
  return `組卷 URL 規則：基底為 ${EXAM_URL}。將選定題目的「科目:ID」按作答順序，以逗號連接後放入 ids 參數，僅 URL 編碼一次；冒號為 %3A，不能成為 %253A。保留查詢參數起點 ?ids=，不可寫成 %3Fids%3D；只編碼參數值，不可對整段網址使用 encodeURIComponent。不要使用 Google 搜尋網址。\n回覆選題清單與一個 text 程式碼區塊，區塊內僅放一行完整組卷網址；不要使用 Markdown 超連結。另用一個 text 程式碼區塊列出選定的科目:ID（每行一題），使用已備妥候選集的模式時，可貼回網站核對並產生可點擊連結。\n交付前核對 ID 皆在候選範圍、無重複、題數與順序與網址一致。未實際確認動態題卡載入時，標明「未驗證動態試卷載入」。`
}
