import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { build } from 'esbuild'
import { parse, compileScript } from '@vue/compiler-sfc'
import { JSDOM } from 'jsdom'

const catalog = [
  { id: 'e1', subject: 'circuits', chapter: '4', type: 'example', title: '例題', topic: 'A', source: 'p.1', path: 'circuits/ch4.html' },
  { id: 'x1', subject: 'circuits', chapter: '4', type: 'exercise', title: '習題', topic: 'A', source: 'p.2', path: 'circuits/ch4.html' },
  { id: 'm1', subject: 'circuits', chapter: '4', type: 'exam', title: '考題', topic: 'B', source: 'p.3', path: 'circuits/ch4.html' },
  { id: 'e2', subject: 'circuits', chapter: '3', type: 'example', title: '另一章', topic: 'C', source: 'p.4', path: 'circuits/ch3.html' },
  { id: 'e1', subject: 'electronics', chapter: '2', type: 'example', title: '同 ID 電子題', topic: 'D', source: 'p.5', path: 'electronics/ch2.html' },
  { id: 'h1', subject: 'electronics', chapter: '2', type: 'homework', title: '作業', topic: 'E', source: 'p.6', path: 'electronics/ch2.html' },
  { id: 's1', subject: 'solid-state', chapter: '1', type: 'exam', title: '固態考題', topic: 'F', source: 'p.7', path: 'solid-state/ch1.html' },
  { id: 'p1', subject: 'engineering-math', chapter: '1', type: 'practice', title: '數學練習', topic: 'G', source: 'p.8', path: 'engineering-math/ch1.html' }
]

test('learner only supplies seed/attempt; default prompt scans all rows and performs zero fetches', async () => {
  const dom = new JSDOM('<div id="app"></div>', { url: 'https://example.com/learningPages/agent-exam.html', pretendToBeVisual: true })
  const keys = ['window', 'document', 'Element', 'HTMLElement', 'SVGElement', 'Node', 'navigator', 'location', 'DOMParser']
  const old = new Map(keys.map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]))
  for (const key of keys) Object.defineProperty(globalThis, key, { value: dom.window[key], configurable: true, writable: true })
  let app
  try {
    let fetches = 0
    window.fetch = async () => { fetches++; throw new Error('prompt generation must not fetch') }
    const dir = resolve('docs/.vitepress/theme/components')
    const script = compileScript(parse(readFileSync(resolve(dir, 'SimilarPracticePrompt.vue'), 'utf8')).descriptor, { id: 'similar-ui-test', inlineTemplate: true }).content
    const result = await build({
      stdin: { contents: script + "\nexport { nextTick, createApp } from 'vue'", resolveDir: dir },
      write: false, bundle: true, format: 'esm', platform: 'browser',
      define: { 'process.env.NODE_ENV': '"test"', __VUE_OPTIONS_API__: 'true', __VUE_PROD_DEVTOOLS__: 'false', __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false' },
      plugins: [{ name: 'page-data', setup(builder) {
        builder.onLoad({ filter: /question-catalog\.data\.js$/ }, () => ({ contents: `export const data = ${JSON.stringify(catalog)}` }))
        builder.onResolve({ filter: /^vitepress$/ }, () => ({ path: 'vitepress', namespace: 'mock' }))
        builder.onLoad({ filter: /.*/, namespace: 'mock' }, () => ({ contents: 'export const withBase = path => "/learningPages" + path' }))
      } }]
    })
    const mod = await import('data:text/javascript;base64,' + Buffer.from(result.outputFiles[0].text).toString('base64'))
    app = mod.createApp(mod.default); app.mount('#app')
    assert.equal(document.querySelectorAll('form textarea').length, 2, 'the only learner inputs are seed and optional attempt')
    assert.match(document.querySelector('.scope-count').textContent, /未限制搜尋範圍/)
    const details = document.querySelector('.optional-scope')
    details.open = true; details.dispatchEvent(new dom.window.Event('toggle')); await mod.nextTick()
    assert.match(document.querySelector('.scope-count').textContent, /未限制搜尋範圍/, 'opening settings does not activate a limit')
    const seed = document.querySelector('textarea[required]')
    seed.value = 'e1'; seed.dispatchEvent(new dom.window.Event('input', { bubbles: true })); await mod.nextTick()
    document.querySelector('button[type=submit]').click(); await mod.nextTick()
    assert.match(document.querySelector('.status-msg').textContent, /多個科目/)
    seed.value = 'circuits:e1'; seed.dispatchEvent(new dom.window.Event('input', { bubbles: true })); await mod.nextTick()
    document.querySelector('button[type=submit]').click(); await mod.nextTick()
    const prompt = document.querySelector('.prompt-preview').value
    assert.match(prompt, /完整題庫 context pack/)
    assert.match(prompt, /agent-context\.txt/)
    assert.doesNotMatch(prompt, /question-index\/.*\.tsv/)
    assert.match(prompt, /不限科目、章節與題型/)
    assert.equal(fetches, 0)
    assert.equal(document.querySelector('.offline-downloads').open, false, 'offline downloads are grouped in a collapsed result section')

    const limitScope = document.querySelector('.scope-toggle input')
    limitScope.checked = true; limitScope.dispatchEvent(new dom.window.Event('change', { bubbles: true })); await mod.nextTick()
    for (const chapter of document.querySelectorAll('.scope-choice:first-of-type input[type=checkbox]')) {
      chapter.checked = false; chapter.dispatchEvent(new dom.window.Event('change', { bubbles: true })); await mod.nextTick()
    }
    const chapter3 = document.querySelector('.scope-choice input[value="3"]')
    const chapter4 = document.querySelector('.scope-choice input[value="4"]')
    chapter4.checked = true; chapter4.dispatchEvent(new dom.window.Event('change', { bubbles: true })); await mod.nextTick()
    seed.value = 'electronics:h1'; seed.dispatchEvent(new dom.window.Event('input', { bubbles: true })); await mod.nextTick()
    document.querySelector('button[type=submit]').click(); await mod.nextTick()
    assert.match(document.querySelector('.prompt-preview').value, /明確限制為 circuits 的 Chapter 4/)
    assert.match(document.querySelector('.prompt-preview').value, /BEGIN-SCOPED-QUESTION-INDEX/)
    assert.doesNotMatch(document.querySelector('.prompt-preview').value, /question-reader\/(?:circuits|electronics)\/chapter-/)
    assert.match(document.querySelector('.prompt-preview').value, /question-reader\/electronics\/h1\.html/, 'outside seed reader remains separate context')
    const offlineHrefs = [...document.querySelectorAll('.offline-downloads a')].map(link => link.href)
    assert.ok(offlineHrefs.some(href => href.includes('/electronics/chapter-2.html')), `outside seed chapter has its own offline download: ${offlineHrefs.join(', ')}; ${document.querySelector('.offline-downloads')?.textContent}`)
    assert.equal(fetches, 0)

    limitScope.checked = false; limitScope.dispatchEvent(new dom.window.Event('change', { bubbles: true })); await mod.nextTick()
    const restrictTypes = document.querySelectorAll('.scope-toggle input')[1]
    restrictTypes.checked = true; restrictTypes.dispatchEvent(new dom.window.Event('change', { bubbles: true })); await mod.nextTick()
    const selectedTypes = [...document.querySelectorAll('.scope-choice input[type=checkbox]:checked')].map(input => input.value).filter(value => ['example','practice','exercise','homework','exam'].includes(value))
    assert.deepEqual(selectedTypes, ['example','exercise'])
    assert.match(document.querySelector('.scope-count').textContent, /目前已啟用手動限制/)
    document.querySelector('button[type=submit]').click(); await mod.nextTick()
    assert.match(document.querySelector('.prompt-preview').value, /不限科目與章節，但只搜尋題型 example、exercise/)
    assert.match(document.querySelector('.prompt-preview').value, /BEGIN-SCOPED-QUESTION-INDEX/)
    assert.equal(fetches, 0)
  } finally {
    app?.unmount(); dom.window.close()
    for (const key of keys) { const descriptor = old.get(key); if (descriptor) Object.defineProperty(globalThis, key, descriptor); else delete globalThis[key] }
  }
})
