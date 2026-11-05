import { questionIndexFiles } from '../scripts/public-question-index.js'
export default {
  watch: ['../.agents/skills/learningpages-question-bank-local/references/*.tsv'],
  load() {
    const manifest = JSON.parse(questionIndexFiles(process.cwd()).get('manifest.json').toString())
    return { source_commit: manifest.source_commit }
  }
}
