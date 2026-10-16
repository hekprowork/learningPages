import { existsSync, readFileSync } from 'node:fs'
import { relative, resolve, sep } from 'node:path'

const base = '/learningPages/'
const subjects = ['solid-state', 'electronics', 'circuits', 'engineering-math']
const distRoot = resolve('docs/.vitepress/dist')
const origin = 'https://learning-pages.test'
const failures = []

const routeCandidates = (pathname) => {
  const route = decodeURIComponent(pathname.slice(base.length))
  const exact = resolve(distRoot, route)
  if (route.endsWith('/')) return [resolve(distRoot, route, 'index.html')]
  return [exact, resolve(distRoot, `${route}.html`), resolve(distRoot, route, 'index.html')]
}

const isInsideDist = (file) => {
  const relativePath = relative(distRoot, file)
  return relativePath !== '..' && !relativePath.startsWith(`..${sep}`)
}

// Validate authored HTML links too: VitePress runs under /learningPages/,
// and GitHub Pages does not serve extensionless lesson URLs directly.
for (const subject of subjects) {
  const source = readFileSync(resolve('docs', subject, 'index.md'), 'utf8')
  for (const [, href] of source.matchAll(/(?<![:\w-])href="([^"]+)"/g)) {
    if (!href || /^(?:#|https?:|mailto:|tel:)/i.test(href)) continue
    failures.push(`${subject}: raw HTML href="${href}" should use :href="withBase('/...html')"`)
  }
  const boundLinks = [...source.matchAll(/:href="withBase\('([^']+)'\)"/g)].map((match) => match[1])
  for (const link of new Set(boundLinks)) {
    if (!link.startsWith('/') || (!link.endsWith('/') && !link.endsWith('.html'))) {
      failures.push(`${subject}: link ${link} must be an absolute .html route or a directory URL`)
      continue
    }
    if (!routeCandidates(`${base}${link.slice(1)}`).some((file) => isInsideDist(file) && existsSync(file))) {
      failures.push(`${subject}: withBase('${link}') has no generated output file`)
    }
  }
}

for (const subject of ['.', ...subjects]) {
  const pageRoute = subject === '.' ? base : `${base}${subject}/`
  const pageFile = subject === '.' ? resolve(distRoot, 'index.html') : resolve(distRoot, subject, 'index.html')

  if (!existsSync(pageFile)) {
    failures.push(`${subject}: missing home page output ${pageFile}`)
    continue
  }

  const html = readFileSync(pageFile, 'utf8')
  const hrefs = [...html.matchAll(/\bhref="([^"]+)"/g)].map((match) => match[1])

  for (const href of new Set(hrefs)) {
    if (!href || href.startsWith('#') || /^(?:https?:|mailto:|javascript:)/i.test(href)) continue

    const target = new URL(href, `${origin}${pageRoute}`)
    if (target.origin !== origin) continue

    if (!target.pathname.startsWith(base)) {
      failures.push(`${subject}: ${href} resolves outside configured base (${target.pathname})`)
      continue
    }

    const candidates = routeCandidates(target.pathname)
    if (!candidates.some((candidate) => isInsideDist(candidate) && existsSync(candidate))) {
      failures.push(`${subject}: ${href} resolves to a missing route (${target.pathname})`)
    }
  }
}

if (failures.length > 0) {
  console.error('❌ Subject route check failed:')
  for (const failure of failures.slice(0, 30)) console.error(`- ${failure}`)
  if (failures.length > 30) console.error(`- ...and ${failures.length - 30} more`)
  process.exitCode = 1
} else {
  console.log(`✅ Subject route check passed: ${subjects.length + 1} home pages and all internal home-page links resolve under ${base}.`)
}
