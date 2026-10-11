import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const subjectPages = ['solid-state', 'electronics', 'circuits', 'engineering-math']
const distRoot = resolve('docs/.vitepress/dist')
const rawInlineMathPattern = /(?<!\\)\$(?!\$)[^$\n]+(?<!\\)\$(?!\$)/g

const stripNonTextMarkup = (html) =>
  html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]*>/g, '')

const failures = []

for (const subject of subjectPages) {
  const file = resolve(distRoot, subject, 'index.html')

  if (!existsSync(file)) {
    failures.push(`${subject}: missing rendered page at ${file}`)
    continue
  }

  const html = readFileSync(file, 'utf8')
  const preCount = (html.match(/<pre\b/g) ?? []).length
  const mathJaxCount = (html.match(/<mjx-container\b/g) ?? []).length
  const katexCount = (html.match(/<span class="katex\b/g) ?? []).length
  const rawMath = stripNonTextMarkup(html).match(rawInlineMathPattern) ?? []

  if (preCount > 0) {
    failures.push(`${subject}: found ${preCount} unexpected <pre> block(s) in the subject portal`)
  }
  if (mathJaxCount + katexCount === 0) {
    failures.push(`${subject}: found no rendered MathJax or KaTeX nodes`)
  }
  if (rawMath.length > 0) {
    failures.push(`${subject}: found raw LaTeX in visible text: ${rawMath.slice(0, 3).join(' | ')}`)
  }
}

if (failures.length > 0) {
  console.error('❌ Subject index render check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exitCode = 1
} else {
  console.log(`✅ Subject index render check passed: ${subjectPages.length} portals contain rendered math and no raw LaTeX/code blocks.`)
}
