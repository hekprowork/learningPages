<template>
  <section class="similar-practice" aria-labelledby="similar-title">
    <header class="similar-header">
      <h2 id="similar-title">單次聊天或要限定範圍？生成一次 Prompt</h2>
      <p>已把資料包加入持續型 Agent 時，直接在該 Agent 對話貼錯題即可。以下表單供單次聊天使用，或在需要時限制科目、章節與題型；預設仍搜尋完整題庫。</p>
    </header>
    <div class="similar-workbench">
      <form class="similar-form" @submit.prevent="generate">
        <label class="field-label">
          <span class="label-text">錯題、題庫 ID 或題目網址（最多 {{ MAX_SEED_TEXT.toLocaleString() }} 字元）</span>
          <textarea v-model="request.seed" rows="5" required class="field-control" :aria-invalid="request.seed.length > MAX_SEED_TEXT" placeholder="貼上題目文字；也可貼唯一題庫 ID、科目:ID 或 learningPages 題目網址" />
          <span class="field-help" :class="{ 'limit-error': request.seed.length > MAX_SEED_TEXT }">{{ request.seed.length.toLocaleString() }} / {{ MAX_SEED_TEXT.toLocaleString() }} 字元。超過上限會顯示錯誤，不會截斷。</span>
        </label>
        <label class="field-label">
          <span class="label-text">你的作答或卡住步驟（選填，最多 {{ MAX_ATTEMPT_TEXT.toLocaleString() }} 字元）</span>
          <textarea v-model="request.attempt" rows="3" class="field-control" :aria-invalid="request.attempt.length > MAX_ATTEMPT_TEXT" placeholder="例如：我列出這兩個方程式後，不知道如何繼續。" />
          <span class="field-help" :class="{ 'limit-error': request.attempt.length > MAX_ATTEMPT_TEXT }">{{ request.attempt.length.toLocaleString() }} / {{ MAX_ATTEMPT_TEXT.toLocaleString() }} 字元。未填時，Prompt 會要求 Agent 不推測錯因。</span>
        </label>

        <details class="optional-scope">
          <summary>選填：限制搜尋範圍（預設搜尋完整題庫）</summary>
          <div class="optional-scope-body">
            <label class="scope-toggle"><input v-model="request.limitScope" type="checkbox" class="field-checkbox"> <span>限制到單一科目與指定章節</span></label>
            <template v-if="request.limitScope">
              <label class="field-label"><span class="label-text">科目</span>
                <select v-model="request.subject" class="field-control"><option v-for="item in subjects" :key="item.value" :value="item.value">{{ item.label }}</option></select>
              </label>
              <fieldset class="scope-choice">
                <legend>章節（可複選）</legend>
                <label v-for="chapter in subjectChapters" :key="chapter"><input v-model="request.chapters" type="checkbox" :value="chapter" class="field-checkbox"> <span>Chapter {{ chapter }}</span></label>
              </fieldset>
            </template>
            <label class="scope-toggle"><input v-model="request.restrictTypes" type="checkbox" class="field-checkbox"> <span>限制題型</span></label>
            <fieldset v-if="request.restrictTypes" class="scope-choice">
              <legend>只搜尋以下題型</legend>
              <label v-for="type in TYPE_OPTIONS" :key="type.value"><input v-model="selectedTypes" type="checkbox" :value="type.value" class="field-checkbox"> <span>{{ type.label }}</span></label>
            </fieldset>
            <p class="field-help">題型限制可獨立於科目與章節使用。開啟時預選 Example 和 Exercise；保持關閉時可搜尋所有題型，Example／Exercise 只作相近程度相同時的軟性偏好。</p>
          </div>
        </details>

        <p class="scope-count" role="status">{{ scopeSummary }}</p>
        <div class="similar-submit-row">
          <button class="btn-primary" type="submit" :disabled="!!scopeError">生成相似練習 Prompt</button>
        </div>
      </form>

      <div class="similar-output-pane">
        <p role="status" class="status-msg">{{ message }}</p>

        <section v-if="result" class="prompt-result">
          <p class="result-seed-meta"><strong>種子題：</strong>{{ seedLabel }}。搜尋範圍含 {{ result.candidates.length.toLocaleString() }} 題；已知題庫種子只會從推薦候選排除，不會從範圍統計扣除。</p>
          <div class="prompt-actions">
            <button type="button" class="btn-copy-prompt" @click="copy">複製 Prompt</button>
            <button type="button" class="btn-download-prompt" @click="download">下載 Prompt</button>
          </div>
          <label class="field-label"><span class="label-text">Prompt 預覽</span><textarea ref="preview" :value="result.prompt" rows="16" readonly class="field-control prompt-preview" /></label>
          <details class="offline-downloads">
            <summary>離線題庫下載（{{ result.chapters.length }} 個章節）</summary>
            <div class="offline-downloads-body">
              <div v-for="group in downloadGroups" :key="group.subject" class="offline-group">
                <h4>{{ group.label }}</h4>
                <ul><li v-for="chapter in group.chapters" :key="chapter.chapter">Chapter {{ chapter.chapter }}<template v-if="chapter.seedOnly">（種子題章節）</template>：<a :href="withBase(chapter.offlinePath)" download>下載完整章節</a></li></ul>
              </div>
            </div>
          </details>
        </section>

        <div v-else class="similar-empty-hint">
          <p class="empty-hint-title">Prompt 輸出區</p>
          <p class="empty-hint-body">填入錯題或 ID 並點擊「生成相似練習 Prompt」後，此處會產生含完整檢索指示的 Prompt 與對應離線章節下載。</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { withBase } from 'vitepress'
import { data as catalog } from './question-catalog.data.js'
import { SUBJECT_OPTIONS, TYPE_OPTIONS, DEFAULT_SIMILAR_TYPES } from './agent-exam-prompt.js'
import { MAX_ATTEMPT_TEXT, MAX_SEED_TEXT, prepareSimilarPractice, selectPracticeScope } from './similar-practice-prompt.js'

const subjects = SUBJECT_OPTIONS.filter(item => item.value !== 'mixed')
const request = reactive({ seed: '', attempt: '', limitScope: false, subject: 'circuits', chapters: [], restrictTypes: false, type: DEFAULT_SIMILAR_TYPES })
const selectedTypes = computed({ get: () => request.type.split(',').filter(Boolean), set: values => { request.type = TYPE_OPTIONS.filter(option => values.includes(option.value)).map(option => option.value).join(',') } })
const subjectChapters = computed(() => [...new Set(catalog.filter(q => q.subject === request.subject).map(q => q.chapter))].sort((a,b) => Number(a)-Number(b)||a.localeCompare(b)))
const scope = computed(() => {
  try { return { value: selectPracticeScope(catalog, request), error: '' } }
  catch (error) { return { value: null, error: error.message } }
})
const scopeError = computed(() => scope.value.error)
const corpusSubjectCount = new Set(catalog.map(q => q.subject)).size
const corpusChapterCount = new Set(catalog.map(q => `${q.subject}:${q.chapter}`)).size
const scopeSummary = computed(() => scopeError.value || `${scope.value.value.candidates.length.toLocaleString()} 題符合目前設定。${request.limitScope || request.restrictTypes ? '目前已啟用手動限制。' : `目前未限制搜尋範圍：Agent 可搜尋 ${corpusSubjectCount} 科、${corpusChapterCount} 章及所有題型。`}`)
const result = ref(null), preview = ref(null), message = ref('可只貼錯題；補上你的作答步驟，Agent 才能針對實際過程回饋。')
const subjectLabels = new Map(subjects.map(item => [item.value,item.label]))
watch(() => request.limitScope, active => { if (active && !request.chapters.length) request.chapters = [...subjectChapters.value] })
watch(() => request.subject, () => { if (request.limitScope) request.chapters = [...subjectChapters.value] })
watch(request, () => { result.value = null }, { flush: 'sync' })
const seedLabel = computed(() => result.value?.seed.kind === 'catalog' ? `${result.value.seed.question.subject}:${result.value.seed.question.id} — ${result.value.seed.question.title}` : '學習者貼上的錯題')
const downloadGroups = computed(() => {
  if (!result.value) return []
  return subjects.map(option => ({ subject: option.value, label: option.label, chapters: result.value.chapters.filter(chapter => chapter.subject === option.value) })).filter(group => group.chapters.length)
})
const subjectName = subject => subjectLabels.get(subject) || subject
function generate() {
  try {
    result.value = prepareSimilarPractice(catalog, request)
    const scoped = result.value.scope.limitScope || result.value.scope.restrictTypes
    message.value = scoped
      ? `Prompt 已生成，已附上 ${result.value.candidates.length.toLocaleString()} 題的範圍索引。`
      : 'Prompt 已生成，包含完整題庫資料包的讀取方式。'
  }
  catch (error) { result.value = null; message.value = error.message }
}
async function copy() { try { await navigator.clipboard.writeText(result.value.prompt); message.value = '已複製 Prompt，可貼給你常用的 Agent。' } catch { preview.value?.focus(); preview.value?.select(); message.value = '自動複製失敗，已選取文字，請手動複製。' } }
function download() { const url = URL.createObjectURL(new Blob([result.value.prompt],{type:'text/markdown;charset=utf-8'})); const link=document.createElement('a'); link.href=url; link.download='learningPages-similar-practice.md'; document.body.append(link); link.click(); link.remove(); setTimeout(()=>URL.revokeObjectURL(url),0) }
</script>

<style scoped>
/* Hallmark · component: similar-practice-prompt · genre: editorial · design-system: design.md · designed-as-app
 * states: default · hover · focus · active · disabled · loading · error · success */
.similar-practice {
  min-width: 0;
  margin-block: var(--space-agent-xs, 12px);
}

.similar-header h2 {
  margin: 0 0 var(--space-agent-2xs, 8px);
  padding: 0;
  border: 0;
  font-size: 1.125rem;
  font-weight: 700;
  font-style: normal;
  color: var(--color-agent-ink-title);
}

.similar-header p {
  margin: 0 0 var(--space-agent-md, 24px);
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--color-agent-ink-secondary);
  max-width: 72ch;
}

.similar-workbench {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: var(--space-agent-lg, 32px);
  align-items: start;
}

@media (max-width: 960px) {
  .similar-workbench {
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-agent-md, 24px);
  }
}

.similar-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-agent-sm, 16px);
  min-width: 0;
}

.similar-form textarea {
  resize: vertical;
  line-height: 1.55;
}

.similar-form textarea[aria-invalid="true"] {
  border-color: var(--color-agent-danger);
}

.optional-scope,
.offline-downloads {
  border-top: 1px solid var(--color-agent-rule-border);
  border-bottom: 1px solid var(--color-agent-rule-border);
  padding-block: var(--space-agent-2xs, 8px);
}

.optional-scope summary,
.offline-downloads summary {
  display: flex;
  align-items: center;
  min-height: 44px;
  cursor: pointer;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-agent-ink-title);
  user-select: none;
}

.optional-scope summary:focus-visible,
.offline-downloads summary:focus-visible {
  outline: 2px solid var(--color-agent-focus);
  outline-offset: 2px;
}

.optional-scope-body,
.offline-downloads-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-agent-sm, 16px);
  padding: var(--space-agent-sm, 16px) 0 var(--space-agent-xs, 12px);
  border-top: 1px solid var(--color-agent-rule-light);
}

.scope-toggle {
  display: flex;
  align-items: center;
  gap: var(--space-agent-2xs, 8px);
  min-height: 44px;
  cursor: pointer;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--color-agent-ink-primary);
}

.scope-choice {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 1rem;
  margin: 0;
  padding: 0.625rem 0.75rem;
  border: 1px solid var(--color-agent-control-border);
  border-radius: var(--radius-agent-sm);
}

.scope-choice legend {
  font-size: 0.875rem;
  font-weight: 600;
  padding-inline: 0.25rem;
  color: var(--color-agent-ink-title);
}

.scope-choice label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 44px;
  cursor: pointer;
  font-size: 0.875rem;
  color: var(--color-agent-ink-primary);
}

.scope-count {
  margin: 0;
  padding: 0.625rem 0.75rem;
  background: var(--color-agent-surface-muted);
  border: 1px solid var(--color-agent-rule-light);
  border-radius: var(--radius-agent-sm);
  font-size: 0.84375rem;
  line-height: 1.5;
  color: var(--color-agent-ink-secondary);
}

.similar-output-pane {
  padding: var(--space-agent-md, 24px);
  border: 1px solid var(--color-agent-rule-border);
  border-radius: var(--radius-agent-md);
  background: var(--color-agent-surface);
  box-shadow: var(--shadow-agent-sm);
  min-width: 0;
}

.similar-output-pane .status-msg {
  margin-top: 0;
  margin-bottom: var(--space-agent-sm, 16px);
}

.prompt-result {
  display: flex;
  flex-direction: column;
  gap: var(--space-agent-sm, 16px);
}

.result-seed-meta {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.55;
  color: var(--color-agent-ink-primary);
}

.prompt-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.prompt-preview {
  font-family: var(--font-agent-mono);
  font-size: 0.8125rem;
  background: var(--color-agent-surface-muted);
  min-height: 220px;
}

.offline-group h4 {
  margin: 0 0 0.375rem;
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--color-agent-ink-title);
}

.offline-group ul {
  margin: 0;
  padding-left: 1.25rem;
}

.similar-empty-hint {
  padding-top: var(--space-agent-sm, 16px);
  border-top: 1px solid var(--color-agent-rule-light);
}

.empty-hint-title {
  margin: 0 0 0.375rem;
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--color-agent-ink-title);
}

.empty-hint-body {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--color-agent-ink-secondary);
}

.limit-error {
  color: var(--color-agent-danger);
}
</style>
