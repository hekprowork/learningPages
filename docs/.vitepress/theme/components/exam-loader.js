// Accept unqualified IDs when unique; subject:id disambiguates future collisions.
export function resolveQuestions(catalog, ids) {
  const seen = new Set()
  return [...ids].map(key => {
    const matches = catalog.filter(q => key === `${q.subject}:${q.id}` || key === q.id)
    return matches.length === 1 ? { key, question: matches[0] } : {
      key, error: matches.length ? '題目 ID 不唯一，請使用 科目:ID' : '索引中找不到此題目'
    }
  }).filter(row => {
    const identity = row.question ? `${row.question.subject}:${row.question.id}` : row.key
    if (seen.has(identity)) return false
    seen.add(identity)
    return true
  })
}

export function extractCard(html, id, sourceUrl, Parser) {
  const doc = new Parser().parseFromString(html, 'text/html')
  return extractCardFromDocument(doc, id, sourceUrl)
}

export function extractCardFromDocument(doc, id, sourceUrl) {
  const cards = [...doc.querySelectorAll('[data-practice-card]')].filter(card => card.dataset.practiceId === id)
  if (cards.length !== 1) throw new Error('原頁題卡不存在或 ID 重複')
  const card = cards[0].cloneNode(true)
  const statement = card.querySelector('.practice-card-statement')
  if (!statement) throw new Error('原頁缺少題幹')
  // Built asset URLs and relative links must keep pointing to their source page.
  for (const node of card.querySelectorAll('[src], [href], [poster]')) {
    for (const attr of ['src', 'href', 'poster']) {
      const value = node.getAttribute(attr)
      if (value && !value.startsWith('#')) node.setAttribute(attr, new URL(value, sourceUrl).href)
    }
  }
  return {
    id, type: card.dataset.practiceType,
    title: card.querySelector('.practice-card-title')?.textContent ?? '',
    source: card.querySelector('.practice-badge--source')?.textContent ?? '',
    topic: card.querySelector('.practice-badge--topic')?.textContent ?? '',
    statement: statement.innerHTML,
    solution: card.querySelector('.practice-card-solution-body')?.innerHTML ?? ''
  }
}

export async function loadExam(rows, base, fetcher, Parser, signal) {
  const pages = new Map()
  for (const row of rows) if (row.question) {
    const url = new URL(row.question.path, base).href
    if (!pages.has(url)) pages.set(url, fetcher(url, { signal }).then(response => {
      if (!response.ok) throw new Error(`載入原頁失敗（HTTP ${response.status}）`)
      return response.text().then(html => new Parser().parseFromString(html, 'text/html'))
    }))
  }
  return Promise.all(rows.map(async row => {
    if (!row.question) return row
    const url = new URL(row.question.path, base).href
    try {
      const card = extractCardFromDocument(await pages.get(url), row.question.id, url)
      return { ...row, card, url: `${url}#card-${encodeURIComponent(row.question.id)}` }
    } catch (error) {
      if (signal?.aborted) throw error
      return { ...row, error: error.message }
    }
  }))
}
