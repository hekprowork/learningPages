import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import assert from 'node:assert/strict'
import { AGENT_GUIDE_URL } from '../docs/.vitepress/theme/components/agent-exam-prompt.js'
import { parseAgentContext } from './agent-context.js'
const root = process.cwd()
const dist = resolve(root, 'docs/.vitepress/dist')
const html = readFileSync(resolve(dist, 'agent-exam.html'), 'utf8')
assert.ok(html.includes('設定一次，之後直接問你的 Agent'), 'Missing persistent-agent primary flow')
assert.ok(html.includes('<title>Agent 找相似練習 | 學習筆記庫</title>'), 'Missing remediation page title')
assert.ok(html.includes('讓我的 Agent 找相似練習'), 'Missing updated navigation label')
assert.ok(html.includes(AGENT_GUIDE_URL), 'Missing public guide URL in rendered prompt')
assert.ok(html.includes('下載 Agent context pack'), 'Missing first-time context-pack setup affordance')
assert.ok(html.includes('/learningPages/agent-context.txt'), 'Missing reusable context-pack URL in rendered page')
assert.ok(html.includes('之後直接在同一個 Agent 對話貼錯題'), 'Persistent-agent workflow must skip the website form')
assert.ok(html.includes('單次聊天或需要限制搜尋範圍？生成 Prompt'), 'Missing secondary one-shot prompt workflow')
assert.ok(html.indexOf('設定一次，之後直接問你的 Agent') < html.indexOf('單次聊天或需要限制搜尋範圍？生成 Prompt'), 'One-time agent setup must appear before the optional generator')
assert.ok(html.includes('生成相似練習 Prompt'), 'Missing similar-practice generation action')
assert.ok(html.includes('準備候選原題'), 'Missing secondary mock-exam workflow')
assert.ok(readFileSync(resolve(dist, 'model-reading.html'), 'utf8').includes('工具權限問題須與檔案格式問題分開判斷'), 'Missing compatibility audit page')
assert.deepEqual(readFileSync(resolve(dist, 'agent-guide.txt')), readFileSync(resolve(root, 'docs/public/agent-guide.txt')), 'Public guide differs from source')
const pack = parseAgentContext(readFileSync(resolve(dist, 'agent-context.txt')))
assert.ok(pack.rowCount > 0 && pack.chapters.length > 0, 'Published context pack is empty')
assert.equal(pack.rows.length, pack.rowCount, 'Published context pack row count mismatch')
assert.equal(pack.chapters.length, pack.subjectChapterCount, 'Published context pack chapter count mismatch')
assert.ok(pack.guideText.includes('完整題庫 context pack'), 'Pack is missing the curated agent guide')
assert.ok(pack.compatibilityText.includes('工具權限問題須與檔案格式問題分開判斷'), 'Pack is missing the access note')
assert.ok(readFileSync(resolve(dist, 'agent-guide.html'), 'utf8').includes('learningPages 相似練習與模考指引'), 'Missing readable guide page')
console.log(`Similar-practice page, reusable context pack (${pack.rowCount} rows / ${pack.chapters.length} chapters), secondary mock flow and public guide verified.`)
