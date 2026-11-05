import { readQuestionCatalog } from '../../../../scripts/question-catalog.js'
export default {
  watch: ['../../../../.agents/skills/learningpages-question-bank-local/references/*.tsv', '../../../*/practice/*.md'],
  load() { return readQuestionCatalog(process.cwd()) }
}
