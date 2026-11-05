<template>
  <section id="offline-mode" class="offline-model">
    <div class="offline-controls">
      <h2>依章節與題型準備出題 Prompt</h2>
      <p>網站先篩選候選題，agent 再挑題。完整模式附原始題幹與 LaTeX；精簡模式只附 TSV，適合選題後到網站作答。</p>
      <form @submit.prevent="prepare">
        <div class="offline-fields">
          <label>科目<select v-model="request.subject"><option v-for="q in subjects" :key="q.value" :value="q.value">{{ q.label }}</option></select></label>
          <label>章節<select v-model="request.chapter"><option v-for="chapter in chapters" :key="chapter" :value="chapter">Chapter {{ chapter }}</option></select></label>
          <label>模考題數（1–10）<input v-model="request.count" type="number" min="1" max="10" step="1" required /></label>
          <label>候選題數（留空使用全部）<input v-model="request.candidateLimit" type="number" :min="request.count" step="1" aria-describedby="candidate-limit-help" /><span id="candidate-limit-help" class="field-help">留空使用全部符合條件的候選題；填入數量只限制候選集，不影響模考題數。</span></label>
          <label>作答時間（分鐘）<input v-model="request.minutes" type="number" min="1" max="480" step="1" required /></label>
          <fieldset class="question-types" :aria-invalid="!!typeSelection.error" aria-describedby="offline-type-help">
            <legend>題型</legend>
            <div class="question-type-options">
              <label v-for="option in TYPE_OPTIONS" :key="option.value"><input v-model="selectedTypes" type="checkbox" :value="option.value" />{{ option.label }}</label>
            </div>
            <span id="offline-type-help" class="field-help">{{ typeSelection.error || '可複選題型。' }}</span>
          </fieldset>
          <label>Prompt 內容<select v-model="request.mode"><option value="full">完整：TSV＋Markdown／LaTeX 題幹</option><option value="compact">精簡：只有候選 TSV</option></select></label>
        </div>
        <label v-if="request.mode === 'full'" class="offline-checkbox"><input v-model="request.textOnly" type="checkbox" />只選無圖題</label>
        <p>目前條件符合 {{ matchingCount }} 題。候選題數留空時準備全部符合條件的題目；指定數量時依主題分散取樣。完整模式會排除未載入或不符無圖條件的題目，以實際備妥數量為準。</p>
        <button type="submit" :disabled="busy || !!typeSelection.error" :aria-busy="busy">{{ busy ? '正在備妥原題…' : '準備候選原題' }}</button>
      </form>
      <p role="status">{{ message }}</p>
      <template v-if="bundle">
        <p>已備妥 {{ bundle.entries.length }} 題候選，請讓 agent 選出 {{ request.count }} 題。<strong v-if="request.mode === 'full' && bundle.entries.some(q => q.hasFigures)">含圖像題：可在網站看圖作答；需要 agent 讀圖時，請附候選題 PDF。</strong></p>
        <button @click="copy">{{ request.mode === 'full' ? '複製完整題目 Prompt' : '複製候選 TSV Prompt' }}</button>
        <button v-if="request.mode === 'full'" @click="print">列印／存成 PDF</button>
        <label>出題 Prompt 預覽<textarea ref="preview" :value="bundle.prompt" readonly rows="12" /></label>
        <form class="selection-return" @submit.prevent="generateUrl">
          <h3>貼回 agent 的選題結果</h3>
          <p>貼上 ID 清單或本站試卷網址。網站會核對候選範圍、題數與重複 ID，再產生直接連結。</p>
          <label>選定的 ID 或網址<textarea v-model="selectionInput" rows="4" placeholder="每行一個科目:ID，也接受逗號分隔" required /></label>
          <button type="submit">核對並產生試卷連結</button>
          <p role="status">{{ selectionMessage }}</p>
          <template v-if="selectedExam">
            <p><a :href="selectedExam.url">開啟試卷（{{ selectedExam.questions.length }} 題）</a></p>
            <label>可複製的直接網址<input ref="urlPreview" :value="selectedExam.url" readonly /></label>
            <button type="button" @click="copyUrl">複製試卷網址</button>
            <p>已核對 ID、題數與順序；尚未驗證動態試卷載入。</p>
          </template>
        </form>
      </template>
    </div>
    <div v-if="bundle && request.mode === 'full'" class="offline-print">
      <h2>模擬考候選原題（{{ bundle.entries.length }} 題）</h2>
      <article v-for="(q,i) in bundle.entries" :key="`${q.subject}:${q.id}`" class="offline-question">
        <h3>候選 {{ i+1 }}：{{ q.subject }}:{{ q.id }} — {{ q.title }}</h3>
        <div v-html="q.statement" />
      </article>
    </div>
  </section>
</template>
<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { withBase } from 'vitepress'
import { data as catalog } from './question-catalog.data.js'
import { SUBJECT_OPTIONS, TYPE_OPTIONS, DEFAULT_TYPES, parseQuestionTypes } from './agent-exam-prompt.js'
import { prepareOfflineExam, prepareCandidateIndex } from './offline-exam.js'
import { validateExamSelection } from './exam-url.js'

const subjects = SUBJECT_OPTIONS.filter(q => q.value !== 'mixed')
const request = reactive({ subject: 'circuits', chapter: '4', count: 5, candidateLimit: '', minutes: 60, type: DEFAULT_TYPES, textOnly: false, mode: 'full' })
const typeSelection = computed(() => parseQuestionTypes(request.type))
const selectedTypes = computed({
  get: () => typeSelection.value.types,
  set: values => { request.type = TYPE_OPTIONS.filter(option => values.includes(option.value)).map(option => option.value).join(',') }
})
const chapters = computed(() => [...new Set(catalog.filter(q => q.subject === request.subject).map(q => q.chapter))].sort((a,b) => Number(a) - Number(b)))
const matchingCount = computed(() => catalog.filter(q => q.subject === request.subject && q.chapter === request.chapter && typeSelection.value.types.includes(q.type)).length)
const bundle = ref(null), busy = ref(false), message = ref('完整模式由你的瀏覽器準備原題，模型本身不必連網。'), preview = ref(null)
const selectionInput = ref(''), selectedExam = ref(null), selectionMessage = ref(''), urlPreview = ref(null)
let generation = 0
watch(() => request.subject, () => { request.chapter = chapters.value[0] || '' }, { flush: 'sync' })
watch(() => request.mode, () => { request.textOnly = false }, { flush: 'sync' })
watch(request, () => {
  generation++
  bundle.value = null
  selectionInput.value = ''
  selectedExam.value = null
  selectionMessage.value = ''
  message.value = '條件已變更，請重新準備原題。'
}, { flush: 'sync' })
watch(selectionInput, () => { selectedExam.value = null; selectionMessage.value = '' }, { flush: 'sync' })

async function prepare() {
  if (busy.value || typeSelection.value.error) return
  const current = ++generation
  const snapshot = { ...request }
  busy.value = true
  bundle.value = null
  selectedExam.value = null
  selectionInput.value = ''
  message.value = snapshot.mode === 'full' ? '正在由你的瀏覽器讀取原始題幹與圖片。' : '正在準備篩選後的候選索引。'
  try {
    const result = snapshot.mode === 'compact'
      ? prepareCandidateIndex(catalog, snapshot)
      : await prepareOfflineExam(catalog, snapshot, window.fetch.bind(window), DOMParser, new URL(withBase('/'), location.origin).href)
    if (current !== generation) return
    bundle.value = result
    message.value = result.failures.length ? '部分來源未載入，已使用其餘符合條件的原題；可重試。' : '已準備完成，請複製 Prompt 給你的 agent。'
  } catch (error) {
    if (current === generation) message.value = error.message
  } finally {
    busy.value = false
  }
}
async function copy() {
  const current = bundle.value
  if (!current) return
  try {
    await navigator.clipboard.writeText(current.prompt)
    if (bundle.value === current) message.value = '已複製 Prompt。請貼給 agent；收到選題結果後，可貼回下方產生直接網址。'
  } catch {
    if (bundle.value !== current) return
    preview.value?.focus()
    preview.value?.select()
    message.value = '自動複製失敗，已選取文字，請手動複製。'
  }
}
function generateUrl() {
  selectedExam.value = null
  try {
    selectedExam.value = validateExamSelection(selectionInput.value, bundle.value.entries, request.count)
    selectionMessage.value = '已核對，以下連結直接開啟本站試卷。'
  } catch (error) { selectionMessage.value = error.message }
}
async function copyUrl() {
  const current = selectedExam.value
  if (!current) return
  try {
    await navigator.clipboard.writeText(current.url)
    if (selectedExam.value === current) selectionMessage.value = '已複製試卷網址。'
  } catch {
    if (selectedExam.value !== current) return
    urlPreview.value?.focus()
    urlPreview.value?.select()
    selectionMessage.value = '自動複製失敗，已選取網址，請手動複製。'
  }
}
function print() {
  const images = [...document.querySelectorAll('.offline-print img')]
  if (images.some(image => !image.complete || !image.naturalWidth)) {
    message.value = '仍有圖片尚未載入，請稍候再列印；若持續失敗請重新準備原題。'
    return
  }
  window.print()
}
</script>
<style scoped>
.offline-controls .field-help { font-size: .75rem; font-weight: 400; line-height: 1.5; color: var(--vp-c-text-2); }
.question-types { grid-column: 1 / -1; min-width: 0; margin: 0; padding: .75rem; border: 1px solid var(--vp-c-border); border-radius: 4px; }
.question-types legend { padding-inline: .25rem; font-size: .875rem; font-weight: 600; }
.question-type-options { display: flex; flex-wrap: wrap; gap: .25rem 1rem; }
.question-types .question-type-options label { display: flex; flex-direction: row; align-items: center; min-height: 44px; margin: 0; gap: .5rem; cursor: pointer; }
.question-types .question-type-options input { width: 1rem; height: 1rem; min-height: 0; padding: 0; accent-color: var(--vp-c-text-1); }
.question-types[aria-invalid="true"] { border-color: var(--vp-c-danger-1); }
.question-types .field-help { display: block; font-size: .75rem; color: var(--vp-c-text-2); }

.offline-model{margin-block:2rem;min-width:0}.offline-fields{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem}.offline-controls label{display:flex;flex-direction:column;gap:.4rem;margin-block:.75rem}.offline-controls input,.offline-controls select,.offline-controls textarea{font:inherit;font-size:1rem;padding:.6rem;border:1px solid var(--vp-c-border);border-radius:4px;min-width:0;background:var(--vp-c-bg);color:var(--vp-c-text-1)}.offline-controls textarea{resize:vertical;line-height:1.6;white-space:pre-wrap;overflow-wrap:anywhere}.offline-controls .offline-checkbox{flex-direction:row;align-items:center}.selection-return{border-top:1px solid var(--vp-c-border);margin-top:2rem;padding-top:1rem}.offline-controls button{padding:.6rem .8rem;min-height:44px;margin:.3rem .5rem .3rem 0;border:1px solid var(--vp-c-border);border-radius:4px;white-space:nowrap}.offline-controls button:disabled{opacity:.5;cursor:progress}.offline-controls :focus-visible{outline:2px solid var(--hub-focus);outline-offset:2px}.offline-print :deep(img),.offline-print :deep(svg){max-width:100%;height:auto}.offline-question{margin-block:2rem}@media(max-width:480px){.offline-fields{grid-template-columns:minmax(0,1fr)}}
@media print{:global(body:has(.offline-print)) :global(.VPNav),:global(body:has(.offline-print)) :global(.VPLocalNav),:global(body:has(.offline-print)) :global(.VPSidebar),:global(body:has(.offline-print)) :global(.VPFooter),:global(body:has(.offline-print)) :global(.VPDocFooter),:global(body:has(.offline-print)) :global(.vp-doc>div>:not(.offline-model)){display:none!important}.offline-controls{display:none!important}.offline-question{break-before:page}.offline-question:first-of-type{break-before:auto}:global(body:has(.offline-print)) :global(.VPContent){padding:0!important}}
</style>
