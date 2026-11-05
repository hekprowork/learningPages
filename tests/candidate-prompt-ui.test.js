import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { build } from 'esbuild'
import { parse, compileScript } from '@vue/compiler-sfc'
import { JSDOM } from 'jsdom'

const catalog = [
  { id: 'q1', subject: 'circuits', chapter: '4', type: 'example', title: '題一', topic: 'A', source: 'p.1', repo_path: 'docs/circuits/practice/one.md' },
  { id: 'q2', subject: 'circuits', chapter: '4', type: 'practice', title: '題二', topic: 'B', source: 'p.2', repo_path: 'docs/circuits/practice/one.md' }
]

test('candidate form copies prompts, validates returned IDs and clears stale selections and preparation', async () => {
  const dom = new JSDOM('<div id="app"></div>', { url: 'https://example.com/learningPages/agent-exam.html', pretendToBeVisual: true })
  const keys = ['window', 'document', 'Element', 'HTMLElement', 'SVGElement', 'Node', 'navigator', 'location', 'DOMParser']
  const old = new Map(keys.map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]))
  for (const key of keys) Object.defineProperty(globalThis, key, { value: dom.window[key], configurable: true, writable: true })
  let app
  try {
    let copied = ''
    Object.defineProperty(navigator, 'clipboard', { value: { writeText: async text => { copied = text } }, configurable: true })
    const dir = resolve('docs/.vitepress/theme/components')
    const script = compileScript(parse(readFileSync(resolve(dir, 'OfflineExamPrompt.vue'), 'utf8')).descriptor, { id: 'candidate-ui-test', inlineTemplate: true }).content
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
    app = mod.createApp(mod.default)
    app.mount('#app')
    const settle = async () => { await new Promise(r => setTimeout(r, 0)); await mod.nextTick() }
    const change = async (selector, value, event = 'input') => {
      const el = document.querySelector(selector)
      el.value = value
      el.dispatchEvent(new dom.window.Event(event, { bubbles: true }))
      await mod.nextTick()
    }
    await change('input[type=number]', '1')
    const mode = [...document.querySelectorAll('.offline-fields select')].find(select => [...select.options].some(option => option.value === 'compact'))
    mode.value = 'compact'; mode.dispatchEvent(new dom.window.Event('change', { bubbles: true })); await mod.nextTick()
    document.querySelector('button[type=submit]').click(); await settle()
    assert.match(document.querySelector('textarea[readonly]').value, /依索引選題/)
    document.querySelector('[data-action="copy-candidate-prompt"]').click(); await settle()
    assert.match(copied, /篩選後 TSV/)
    const selection = '.selection-return textarea'
    await change(selection, 'circuits:q2')
    document.querySelector('.selection-return button[type=submit]').click(); await settle()
    assert.match(document.querySelector('.selection-return a').href, /ids=circuits%3Aq2/)
    await change(selection, 'https://www.google.com/search?q=bad')
    assert.equal(document.querySelector('.selection-return a'), null)
    document.querySelector('.selection-return button[type=submit]').click(); await settle()
    assert.match(document.querySelector('.selection-return [role=status]').textContent, /Google/)
    navigator.clipboard.writeText = async () => { throw Error('denied') }
    document.querySelector('[data-action="copy-candidate-prompt"]').click(); await settle()
    const preview = document.querySelector('textarea[readonly]')
    assert.equal(preview.selectionEnd, preview.value.length)

    await change(selection, 'circuits:q1')
    document.querySelector('.selection-return button[type=submit]').click(); await settle()
    assert.ok(document.querySelector('.selection-return a'))
    const candidateLimit = document.querySelector('input[aria-describedby="candidate-limit-help"]')
    assert.equal(candidateLimit.value, '')
    assert.match(document.getElementById('candidate-limit-help').textContent, /全部符合條件/)
    assert.match(document.querySelector('.offline-controls').textContent, /已備妥 2 題候選/)
    await change('input[aria-describedby="candidate-limit-help"]', '1')
    assert.equal(document.querySelector('.selection-return a'), null)
    assert.equal(document.querySelector('textarea[readonly]'), null)
    document.querySelector('button[type=submit]').click(); await settle()
    assert.match(document.querySelector('.offline-controls').textContent, /已備妥 1 題候選/)
    await change('input[aria-describedby="candidate-limit-help"]', '')
    document.querySelector('button[type=submit]').click(); await settle()
    assert.match(document.querySelector('.offline-controls').textContent, /已備妥 2 題候選/)
    const practice = document.querySelector('fieldset input[value=practice]')
    practice.checked = false; practice.dispatchEvent(new dom.window.Event('change', { bubbles: true })); await mod.nextTick()
    assert.equal(document.querySelector('.selection-return a'), null)
    assert.equal(document.querySelector('textarea[readonly]'), null)
    const example = document.querySelector('fieldset input[value=example]')
    example.checked = false; example.dispatchEvent(new dom.window.Event('change', { bubbles: true })); await mod.nextTick()
    assert.equal(document.querySelector('button[type=submit]').disabled, true)
    const fieldset = document.querySelector('fieldset')
    assert.equal(fieldset.getAttribute('aria-invalid'), 'true')
    assert.match(document.getElementById(fieldset.getAttribute('aria-describedby')).textContent, /至少選擇/)
    for (const box of [example, practice]) { box.checked = true; box.dispatchEvent(new dom.window.Event('change', { bubbles: true })); await mod.nextTick() }

    const pending = []
    window.fetch = async url => new Promise(done => pending.push(() => {
      const id = url.includes('q1') ? 'q1' : 'q2'
      done({ ok: true, text: async () => url.endsWith('.txt') ? `ID: ${id}\n求 $x_1$` : `<article data-reader-id="${id}"><div class="practice-card-statement">原題</div></article>` })
    }))
    mode.value = 'full'; mode.dispatchEvent(new dom.window.Event('change', { bubbles: true })); await mod.nextTick()
    assert.equal(document.querySelector('textarea[readonly]'), null)
    document.querySelector('button[type=submit]').click(); await settle()
    assert.equal(pending.length, 4)
    const type = document.querySelector('fieldset input[value=example]')
    type.checked = false; type.dispatchEvent(new dom.window.Event('change', { bubbles: true })); await mod.nextTick()
    pending.forEach(done => done()); await settle()
    assert.equal(document.querySelector('textarea[readonly]'), null, 'old preparation must not reappear after filter changes')
    assert.match(document.querySelector('[role=status]').textContent, /條件已變更/)
  } finally {
    app?.unmount(); dom.window.close()
    for (const key of keys) {
      const descriptor = old.get(key)
      if (descriptor) Object.defineProperty(globalThis, key, descriptor)
      else delete globalThis[key]
    }
  }
})
