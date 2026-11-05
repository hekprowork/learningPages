import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

export const SUBJECTS = ['circuits', 'electronics', 'engineering-math', 'solid-state']
export function readQuestionCatalog(root) {
  return SUBJECTS.flatMap(subject => {
    const text = readFileSync(resolve(root, `.agents/skills/learningpages-question-bank-local/references/${subject}.tsv`), 'utf8').trim()
    const [header, ...lines] = text.split(/\r?\n/)
    const fields = header.split('\t')
    return lines.map(line => {
      const row = Object.fromEntries(line.split('\t').map((value, i) => [fields[i], value]))
      if (!row.id || !row.repo_path?.startsWith(`docs/${subject}/`) || !row.repo_path.endsWith('.md') || row.repo_path.includes('..')) throw new Error(`Invalid indexed question: ${subject}:${row.id}`)
      return { id: row.id, subject, title: row.title, path: row.repo_path.slice(5, -3) + '.html' }
    })
  })
}
