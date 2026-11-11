import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import assert from 'node:assert/strict'
import { AGENT_GUIDE_URL } from '../docs/.vitepress/theme/components/agent-exam-prompt.js'
const root = process.cwd()
const dist = resolve(root, 'docs/.vitepress/dist')
const html = readFileSync(resolve(dist, 'agent-exam.html'), 'utf8')
assert.ok(html.includes('複製出題 Prompt'), 'Missing rendered copy button')
assert.ok(html.includes(AGENT_GUIDE_URL), 'Missing public guide URL in rendered prompt')
assert.ok(html.includes('出題 Prompt 預覽'), 'Missing manual copy fallback')
assert.ok(html.includes('準備候選索引') && html.includes('只選無圖題'), 'Missing offline preparation controls')
assert.ok(html.includes('快速索引：Worker 候選 TSV') && html.includes('完整：TSV＋Markdown／LaTeX 題幹'), 'Missing candidate prompt modes')
assert.ok(readFileSync(resolve(dist, 'model-reading.html'), 'utf8').includes('工具權限問題須與檔案格式問題分開判斷'), 'Missing compatibility audit page')
assert.deepEqual(readFileSync(resolve(dist, 'agent-guide.txt')), readFileSync(resolve(root, 'docs/public/agent-guide.txt')), 'Public guide differs from source')
assert.ok(readFileSync(resolve(dist, 'agent-guide.html'), 'utf8').includes('learningPages 公開模擬考出題指引'), 'Missing readable guide page')
console.log('Agent prompt page, copy preview and public guide verified.')
