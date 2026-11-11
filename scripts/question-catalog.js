import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

export const SUBJECTS = ['circuits', 'electronics', 'engineering-math', 'solid-state']

function sourceHasFigure(root, repoPath, id, figureSource) {
  const cacheKey = repoPath
  if (!figureSource.has(cacheKey)) {
    const source = readFileSync(resolve(root, repoPath), 'utf8')
    const cards = new Map()
    for (const block of source.match(/<PracticeCard\b[\s\S]*?<\/PracticeCard>/g) ?? []) {
      const cardId = block.match(/\bid\s*=\s*(["'])(.*?)\1/)?.[2]
      if (cardId) {
        const statement = block
          .replace(/<template\s+(?:#solution|v-slot:solution)[^>]*>[\s\S]*?<\/template>/g, '')
          .replace(/<template\s+(?:#solution|v-slot:solution)[^>]*>[\s\S]*$/g, '')
        cards.set(cardId, /!\[[^\]]*\]\([^)]*\)|<img\b|<svg\b/i.test(statement))
      }
    }
    figureSource.set(cacheKey, cards)
  }
  const cards = figureSource.get(cacheKey)
  if (!cards.has(id)) throw new Error(`Missing source PracticeCard: ${id}`)
  return cards.get(id)
}

export function readQuestionCatalog(root) {
  const figureSource = new Map()
  const publishedSources = new Map()
  for (const subject of SUBJECTS) {
    const directory = `docs/${subject}/practice`
    for (const file of readdirSync(resolve(root, directory)).filter(file => file.endsWith('.md'))) {
      const page = `${directory}/${file}`
      const source = readFileSync(resolve(root, page), 'utf8')
      for (const match of source.matchAll(/<!--\s*workbook-include:\s*cards\s+([^>\s]+)\s*-->/g)) {
        if (publishedSources.has(match[1]) && publishedSources.get(match[1]) !== page) throw new Error(`Ambiguous published source: ${match[1]}`)
        publishedSources.set(match[1], page)
      }
    }
  }
  return SUBJECTS.flatMap(subject => {
    const text = readFileSync(resolve(root, `.agents/skills/learningpages-question-bank-local/references/${subject}.tsv`), 'utf8').trim()
    const [header, ...lines] = text.split(/\r?\n/)
    const fields = header.split('\t')
    return lines.map(line => {
      const row = Object.fromEntries(line.split('\t').map((value, i) => [fields[i], value]))
      if (!row.id || !row.repo_path?.startsWith(`docs/${subject}/`) || !row.repo_path.endsWith('.md') || row.repo_path.includes('..')) throw new Error(`Invalid indexed question: ${subject}:${row.id}`)
      const published = publishedSources.get(row.repo_path) ?? row.repo_path
      if (published.includes('/practice-source/') || !existsSync(resolve(root, published))) throw new Error(`No published route for ${row.repo_path}`)
      return { id: row.id, subject, title: row.title, chapter: row.chapter, type: row.type, topic: row.topic, source: row.source, repo_path: row.repo_path, path: published.slice(5, -3) + '.html', has_figure: sourceHasFigure(root, row.repo_path, row.id, figureSource) }
    })
  })
}
