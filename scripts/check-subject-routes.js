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

for (const subject of subjects) {
  const pageRoute = `${base}${subject}/`
  const pageFile = resolve(distRoot, subject, 'index.html')

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
  console.log(`✅ Subject route check passed: ${subjects.length} home pages and all internal home-page links resolve under ${base}.`)
}
