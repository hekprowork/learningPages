import assert from 'node:assert/strict'
import test from 'node:test'
import { JSDOM } from 'jsdom'
import { filterOfflineChapterHtml } from '../docs/.vitepress/theme/components/offline-chapter-download.js'

const dom = new JSDOM('')
const Parser = dom.window.DOMParser
const html = `<!doctype html><html><head><title>circuits Chapter 4 離線題庫</title></head><body><main>
<h1>circuits Chapter 4 離線題庫</h1><p>共 3 題，含所有題型。</p>
<article data-question-id="q1" data-type="example"><h2>q1</h2><div class="statement"><p>完整第一題 $V=IR$</p><img src="data:image/png;base64,AA=="></div><details><pre>原始第一題完整 LaTeX</pre></details></article>
<article data-question-id="q2" data-type="practice"><h2>q2</h2><div class="statement"><p>第二題</p></div><details><pre>原始第二題</pre></details></article>
<article data-question-id="q3" data-type="exercise"><h2>q3</h2><div class="statement"><p>完整第三題</p></div><details><pre>原始第三題完整 Markdown</pre></details></article>
</main></body></html>`

test('chapter download keeps only the current candidate IDs and retains complete text and embedded figures', () => {
  const result = filterOfflineChapterHtml(html, {
    entries: [{ id: 'q1', type: 'example' }, { id: 'q3', type: 'exercise' }],
    subject: 'circuits', chapter: '4', Parser
  })
  assert.equal(result.count, 2)
  assert.deepEqual(new Set(result.ids), new Set(['q1', 'q3']))
  const document = new Parser().parseFromString(result.html, 'text/html')
  assert.deepEqual([...document.querySelectorAll('article')].map(article => article.dataset.questionId), ['q1', 'q3'])
  assert.equal(document.querySelectorAll('img[src^="data:"]').length, 1)
  assert.match(result.html, /原始第一題完整 LaTeX/)
  assert.match(result.html, /原始第三題完整 Markdown/)
  assert.doesNotMatch(result.html, /q2|原始第二題/)
  assert.match(document.title, /Chapter 4 候選題/)
})

test('chapter download rejects missing IDs, mismatched types, and remote assets', () => {
  assert.throws(() => filterOfflineChapterHtml(html, {
    entries: [{ id: 'missing', type: 'example' }], subject: 'circuits', chapter: '4', Parser
  }), /不一致/)
  assert.throws(() => filterOfflineChapterHtml(html, {
    entries: [{ id: 'q1', type: 'practice' }], subject: 'circuits', chapter: '4', Parser
  }), /題型與目前候選索引不一致/)
  assert.throws(() => filterOfflineChapterHtml(html.replace('data:image/png;base64,AA==', 'https://example.com/figure.png'), {
    entries: [{ id: 'q1', type: 'example' }], subject: 'circuits', chapter: '4', Parser
  }), /未內嵌的資源/)
})

test('chapter download cannot create an empty candidate file', () => {
  assert.throws(() => filterOfflineChapterHtml(html, { entries: [], subject: 'circuits', chapter: '4', Parser }), /沒有可下載/)
  dom.window.close()
})
