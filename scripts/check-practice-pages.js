#!/usr/bin/env node
/**
 * Validate every course practice page before deployment.
 * Source checks cover PracticeCard metadata, progress scopes, card IDs/types,
 * and local images. After VitePress builds, compare cards with server-rendered
 * HTML and reject raw math in plain-text metadata or visible text.
 */
import {
  existsSync,
  readdirSync,
  readFileSync
} from 'node:fs'
import {
  dirname,
  isAbsolute,
  relative,
  resolve,
  sep
} from 'node:path'

const docsRoot = resolve('docs')
const distRoot = resolve('docs/.vitepress/dist')
const practiceRoots = [
  'docs/circuits/practice',
  'docs/electronics/practice-source',
  'docs/engineering-math/practice',
  'docs/solid-state/practice'
]
const validTypes = new Set(['example', 'practice', 'exercise', 'homework', 'exam'])
const failures = []
const globalIds = new Map()

const parseAttributes = (raw) => {
  const attributes = {}
  const pattern = /([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g
  for (const match of raw.matchAll(pattern)) {
    attributes[match[1]] = match[2] ?? match[3] ?? match[4] ?? ''
  }
  return attributes
}

const hasRawMathDelimiter = (value) =>
  /(?<!\\)\$|\\\(|\\\[/.test(value)

const maskCodeAndComments = (text) =>
  text
    .replace(/(^|\n)(\x60{3}|~~~)[^\n]*\n[\s\S]*?\n\2/g, (block) =>
      block.replace(/[^\n]/g, ' ')
    )
    .replace(/\x60[^\x60\n]+\x60/g, (code) => ' '.repeat(code.length))
    .replace(/<!--[\s\S]*?-->/g, (comment) =>
      comment.replace(/[^\n]/g, ' ')
    )

const walkMarkdown = (directory) => {
  const result = []
  if (!existsSync(directory)) return result
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const fullPath = resolve(directory, entry.name)
    if (entry.isDirectory()) result.push(...walkMarkdown(fullPath))
    else if (entry.isFile() && entry.name.endsWith('.md')) result.push(fullPath)
  }
  return result
}

const insideDocs = (target) => {
  const pathFromDocs = relative(docsRoot, target)
  return pathFromDocs !== '..' &&
    !pathFromDocs.startsWith('..' + sep) &&
    !isAbsolute(pathFromDocs)
}

const checkImage = (sourceFile, rawUrl) => {
  const cleanUrl = rawUrl.replace(/^<|>$/g, '').split(/[?#]/, 1)[0]
  if (!cleanUrl || /^(?:https?:|data:|#)/i.test(cleanUrl)) return
  let decodedUrl
  try {
    decodedUrl = decodeURIComponent(cleanUrl.replace(/\\ /g, ' '))
  } catch {
    failures.push(sourceFile + ': invalid URL encoding in image path ' + rawUrl)
    return
  }
  const target = decodedUrl.startsWith('/')
    ? resolve(docsRoot, '.' + decodedUrl)
    : resolve(dirname(sourceFile), decodedUrl)
  if (!insideDocs(target)) {
    failures.push(sourceFile + ': image path escapes docs/: ' + rawUrl)
  } else if (!existsSync(target)) {
    failures.push(sourceFile + ': missing local image ' + rawUrl)
  }
}

const getPrefixes = (attributes, sourceFile, componentName) => {
  const rawPrefixes = attributes[':prefixes'] ?? attributes.prefixes
  if (rawPrefixes !== undefined) {
    const prefixes = [...rawPrefixes.matchAll(/["']([^"']+)["']/g)]
      .map((match) => match[1])
    if (prefixes.length === 0) {
      failures.push(sourceFile + ': ' + componentName + ' prefixes must be a static string array')
    }
    return prefixes
  }
  const prefix = attributes[':prefix'] ?? attributes.prefix
  return prefix ? [prefix] : []
}

const pages = practiceRoots.flatMap((root) => walkMarkdown(resolve(root)))
if (pages.length === 0) {
  console.error('Practice-page check failed: no practice Markdown files found.')
  process.exit(1)
}

let cardCount = 0
for (const sourceFile of pages) {
  const source = readFileSync(sourceFile, 'utf8')
  const cleanSource = maskCodeAndComments(source)
  const cards = []
  const cardTagPattern = /<PracticeCard\b([^>]*)>/g

  for (const match of cleanSource.matchAll(cardTagPattern)) {
    const rawAttributes = match[1]
    const attributes = parseAttributes(rawAttributes)
    const id = attributes.id
    const type = attributes.type
    const location = relative(process.cwd(), sourceFile)

    if (/(?:^|\s):(?:id|type|title|source|topic)\s*=/.test(rawAttributes)) {
      failures.push(location + ': PracticeCard metadata must use static props so CI can validate it')
    }
    if (!id) {
      failures.push(location + ': PracticeCard is missing its id')
      continue
    }
    if (!type) {
      failures.push(location + ': PracticeCard ' + id + ' is missing its type')
    } else if (!validTypes.has(type)) {
      failures.push(location + ': PracticeCard ' + id + ' has invalid type "' + type + '"')
    }
    if (globalIds.has(id)) {
      failures.push(location + ': duplicate PracticeCard id "' + id + '" also used in ' + globalIds.get(id))
    } else {
      globalIds.set(id, location)
    }

    for (const field of ['title', 'source', 'topic']) {
      if (hasRawMathDelimiter(attributes[field] ?? '')) {
        failures.push(location + ': PracticeCard ' + id + ' has math delimiters in plain-text ' + field + ' prop')
      }
    }

    const hideCheckbox = Object.prototype.hasOwnProperty.call(attributes, 'hideCheckbox') &&
      attributes.hideCheckbox !== 'false'
    cards.push({ id, type, trackable: !hideCheckbox })
    cardCount++
  }

  if (cards.length === 0) {
    failures.push(relative(process.cwd(), sourceFile) + ': practice page contains no PracticeCard components')
  }

  const progressPattern = /<PracticeProgress\b([^>]*)\/?>/g
  for (const match of cleanSource.matchAll(progressPattern)) {
    const location = relative(process.cwd(), sourceFile)
    const attributes = parseAttributes(match[1])
    const rawTotal = attributes[':total'] ?? attributes.total
    if (!/^\d+$/.test(rawTotal ?? '')) {
      failures.push(location + ': PracticeProgress is missing a static integer total')
      continue
    }
    if (/(?:^|\s):prefix\s*=/.test(match[1]) || /(?:^|\s):prefixes\s*=/.test(match[1])) {
      failures.push(location + ': PracticeProgress prefix scope must be static')
      continue
    }
    const prefixes = getPrefixes(attributes, location, 'PracticeProgress')
    const expectedTotal = cards.filter((card) =>
      card.trackable && prefixes.some((prefix) => card.id.startsWith(prefix))
    ).length
    if (Number(rawTotal) !== expectedTotal) {
      failures.push(
        location + ': PracticeProgress total is ' + rawTotal +
        ' but its prefix matches ' + expectedTotal + ' trackable cards'
      )
    }
  }

  const imageSource = maskCodeAndComments(source)
  const markdownImages = /!\[[^\]]*\]\(\s*(<[^>]+>|(?:\\.|[^)\s])+)(?:\s+[^)]*)?\s*\)/g
  for (const match of imageSource.matchAll(markdownImages)) {
    checkImage(sourceFile, match[1])
  }
  const htmlImages = /<img\b[^>]*\bsrc\s*=\s*(?:"([^"]+)"|'([^']+)')/gi
  for (const match of imageSource.matchAll(htmlImages)) {
    checkImage(sourceFile, match[1] ?? match[2])
  }

  const relativeSource = relative(docsRoot, sourceFile).replace(/\\/g, '/')
  const outputFile = resolve(distRoot, relativeSource.replace(/\.md$/i, '.html'))
  if (!existsSync(outputFile)) {
    failures.push(relative(process.cwd(), sourceFile) + ': missing VitePress output ' + relative(process.cwd(), outputFile))
    continue
  }

  const html = readFileSync(outputFile, 'utf8')
  const renderedCards = []
  for (const tag of html.matchAll(/<div\b[^>]*>/g)) {
    if (!/\bdata-practice-card(?:\s|=|>)/.test(tag[0])) continue
    const attributes = parseAttributes(tag[0])
    renderedCards.push({ id: attributes['data-practice-id'], type: attributes['data-practice-type'] })
  }

  const expectedById = new Map(cards.map((card) => [card.id, card]))
  const renderedById = new Map()
  for (const card of renderedCards) {
    if (!card.id) {
      failures.push(relative(process.cwd(), sourceFile) + ': rendered PracticeCard has no data-practice-id')
      continue
    }
    if (renderedById.has(card.id)) {
      failures.push(relative(process.cwd(), sourceFile) + ': rendered duplicate PracticeCard id "' + card.id + '"')
    }
    renderedById.set(card.id, card)
    const expected = expectedById.get(card.id)
    if (!expected) {
      failures.push(relative(process.cwd(), sourceFile) + ': unexpected rendered PracticeCard "' + card.id + '"')
    } else if (expected.type !== card.type) {
      failures.push(relative(process.cwd(), sourceFile) + ': rendered type differs for PracticeCard "' + card.id + '"')
    }
  }
  for (const card of cards) {
    if (!renderedById.has(card.id)) {
      failures.push(relative(process.cwd(), sourceFile) + ': PracticeCard "' + card.id + '" is missing from rendered HTML')
    }
  }

  const pageWithoutScripts = html
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
  if (/(?:katex-error|data-mjx-error|<mjx-merror\b|<merror\b)/i.test(pageWithoutScripts)) {
    failures.push(relative(process.cwd(), sourceFile) + ': rendered page contains a KaTeX or MathJax error')
  }

  const plainMetadata = []
  for (const match of pageWithoutScripts.matchAll(/<(h3|span)\b([^>]*)>([\s\S]*?)<\/\1>/gi)) {
    const attributes = parseAttributes(match[2])
    const classes = (attributes.class ?? '').split(/\s+/)
    if (classes.some((name) =>
      ['practice-card-title', 'practice-badge--source', 'practice-badge--topic'].includes(name)
    )) {
      plainMetadata.push(match[3].replace(/<[^>]*>/g, ' '))
    }
  }
  for (const text of plainMetadata) {
    if (hasRawMathDelimiter(text)) {
      failures.push(relative(process.cwd(), sourceFile) + ': rendered PracticeCard metadata contains raw math delimiters')
      break
    }
  }

  const markdownBody = maskCodeAndComments(
    source.replace(/<PracticeCard\b[^>]*>/g, ' ')
      .replace(/<PracticeProgress\b[^>]*\/?>/g, ' ')
      .replace(/<PracticeFilter\b[^>]*\/?>/g, ' ')
  )
  const hasMarkdownMath =
    /(?<!\\)\$\$?[^$\n]+\$\$?/.test(markdownBody) ||
    /\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/.test(markdownBody)
  if (hasMarkdownMath && !/<mjx-container\b|<span class="katex\b/i.test(pageWithoutScripts)) {
    failures.push(relative(process.cwd(), sourceFile) + ': source contains math but rendered HTML has no MathJax or KaTeX output')
  }
}

if (failures.length > 0) {
  console.error('Practice-page check failed with ' + failures.length + ' issue(s):')
  for (const failure of failures.slice(0, 60)) console.error('- ' + failure)
  if (failures.length > 60) console.error('- ...and ' + (failures.length - 60) + ' more')
  process.exit(1)
}

console.log(
  'Practice-page check passed: ' + pages.length + ' pages, ' + cardCount +
  ' cards, progress totals, metadata, local images, and rendered HTML verified.'
)
