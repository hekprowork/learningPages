const site = 'https://hekprowork.github.io/learningPages/'
const subjects = new Set(['circuits', 'electronics', 'engineering-math', 'solid-state'])
const indexHeader = 'chapter\tid\ttitle\ttype\ttopic\tsource\trepo_path'
const selectionHeader = 'subject_id\tchapter\ttitle\ttype\ttopic\tsource\treader_url'

function response(body, status, contentType = 'text/plain', headers = {}) {
  return new Response(body, {
    status,
    headers: {
      'Content-Type': contentType + '; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      ...headers,
    },
  })
}

export default {
  async fetch(request) {
    const url = new URL(request.url)
    if (url.pathname !== '/selection.tsv') return response('找不到候選題索引路由。', 404)
    if (request.method !== 'GET') return response('請使用 GET 讀取候選題索引。', 405, 'text/plain', { Allow: 'GET' })

    const [subject] = url.searchParams.getAll('subject')
    const ids = url.searchParams.get('ids')?.split(',') ?? []
    if (url.searchParams.getAll('subject').length !== 1 || !subjects.has(subject) ||
        url.searchParams.getAll('ids').length !== 1 || !ids.every(id => /^[a-z0-9_-]+$/i.test(id)) ||
        new Set(ids).size !== ids.length) {
      return response('請提供一個有效科目及不重複的候選題 ID。', 400)
    }

    let lines
    try {
      const index = await fetch(new URL('question-index/' + subject + '.tsv', site))
      if (!index.ok) throw new Error('Index unavailable')
      lines = (await index.text()).trimEnd().split(/\r?\n/)
      if (lines.shift() !== indexHeader) throw new Error('Invalid index header')
    } catch {
      return response('公開題庫索引暫時無法讀取。請稍後再試，或回出題頁複製候選 TSV。', 502)
    }

    const rowsById = new Map()
    for (const line of lines) {
      const fields = line.split('\t')
      if (fields.length !== 7 || !fields[1] || rowsById.has(fields[1])) {
        return response('公開題庫索引格式異常。', 502)
      }
      rowsById.set(fields[1], fields)
    }
    const missing = ids.filter(id => !rowsById.has(id))
    if (missing.length) return response('題庫中找不到候選題 ID：' + missing.join(', '), 404)

    const rows = ids.map(id => {
      const [chapter, , title, type, topic, source] = rowsById.get(id)
      const reader = new URL('question-reader/' + subject + '/' + encodeURIComponent(id) + '.html', site)
      return [subject + ':' + id, chapter, title, type, topic, source, reader.href].join('\t')
    })
    return response([selectionHeader, ...rows, ''].join('\n'), 200, 'text/tab-separated-values')
  },
}
