<template>
  <section id="offline-exam-tool" class="offline-model">
    <div class="offline-controls workbench-layout">
      <div class="workbench-panel workbench-settings">
        <header class="panel-header">
          <h2 class="panel-title">依章節與題型準備出題 Prompt</h2>
          <p class="panel-subtitle">網站先篩選候選題，agent 再挑題。快速索引由 Worker 一次回傳；完整模式可讀取題幹，也能按章下載完整題目。</p>
        </header>

        <form class="offline-form" @submit.prevent="prepare">
          <div class="offline-fields">
            <div>
              <label class="field-label">
                <span class="label-text">科目</span>
                <select v-model="request.subject" class="field-control">
                  <option v-for="q in subjects" :key="q.value" :value="q.value">{{ q.label }}</option>
                </select>
              </label>
            </div>

            <fieldset class="question-types" :aria-invalid="!!scopeSelection.error" aria-describedby="offline-chapter-help">
              <legend>章節（可複選）</legend>
              <div class="question-type-options">
                <label v-for="chapter in chapters" :key="chapter" class="checkbox-label">
                  <input v-model="request.chapters" type="checkbox" :value="chapter" class="field-checkbox" />
                  <span>Chapter {{ chapter }}</span>
                </label>
              </div>
              <span id="offline-chapter-help" class="field-help">{{ scopeSelection.error || '可複選章節，至少選擇一章。' }}</span>
            </fieldset>

            <div class="form-row-split">
              <label class="field-label">
                <span class="label-text">模考題數（1–10）</span>
                <input v-model="request.count" type="number" min="1" max="10" step="1" required class="field-control" />
              </label>
              <label class="field-label">
                <span class="label-text">候選題數（留空使用全部）</span>
                <input v-model="request.candidateLimit" type="number" :min="request.count" step="1" aria-describedby="candidate-limit-help" class="field-control" />
                <span id="candidate-limit-help" class="field-help">留空使用全部符合條件的候選題；填入數量只限制候選集，不影響模考題數。</span>
              </label>
            </div>

            <div class="form-row-split">
              <label class="field-label">
                <span class="label-text">作答時間（分鐘）</span>
                <input v-model="request.minutes" type="number" min="1" max="480" step="1" required class="field-control" />
              </label>
              <label class="field-label">
                <span class="label-text">Prompt 內容</span>
                <select v-model="request.mode" class="field-control">
                  <option value="compact">快速索引：Worker 候選 TSV</option>
                  <option value="full">完整：TSV＋Markdown／LaTeX 題幹</option>
                </select>
              </label>
            </div>

            <fieldset class="question-types" :aria-invalid="!!typeSelection.error" aria-describedby="offline-type-help">
              <legend>題型</legend>
              <div class="question-type-options">
                <label v-for="option in TYPE_OPTIONS" :key="option.value" class="checkbox-label">
                  <input v-model="selectedTypes" type="checkbox" :value="option.value" class="field-checkbox" />
                  <span>{{ option.label }}</span>
                </label>
              </div>
              <span id="offline-type-help" class="field-help">{{ typeSelection.error || '可複選題型。' }}</span>
            </fieldset>
          </div>

          <div v-if="request.mode === 'full'" class="form-row-toggle">
            <label class="offline-checkbox">
              <input v-model="request.textOnly" type="checkbox" class="field-checkbox" />
              <span>只選無圖題</span>
            </label>
          </div>

          <div class="form-summary">
            <p class="summary-text">目前條件符合 <strong>{{ matchingCount }}</strong> 題。候選題數留空時準備全部符合條件的題目；指定數量時依主題分散取樣。完整模式會排除未載入或不符無圖條件的題目，以實際備妥數量為準。</p>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn-primary" :disabled="busy || !!scopeSelection.error || !!typeSelection.error" :aria-busy="busy">
              {{ busy ? '正在備妥候選…' : request.mode === 'compact' ? '準備候選索引' : '準備完整原題' }}
            </button>
          </div>
        </form>

        <p role="status" class="status-msg">{{ message }}</p>
      </div>

      <div class="workbench-panel workbench-output">
        <template v-if="bundle">
          <div class="output-header">
            <div class="output-meta">
              <span class="status-pill status-ready">已就緒</span>
              <p class="output-summary">
                已備妥 <strong>{{ bundle.entries.length }}</strong> 題候選，請讓 agent 選出 <strong>{{ request.count }}</strong> 題。
                <span v-if="bundle.version" class="index-version">索引版本：{{ bundle.version }} · 範圍共 {{ bundle.scopeCount ?? bundle.entries.length }} 題 · 含圖 {{ bundle.figureCount ?? bundle.entries.filter(q => q.has_figure).length }} 題</span>
                <strong v-if="request.mode === 'full' && bundle.entries.some(q => q.hasFigures)" class="figure-notice">
                  含圖像題：可在網站看圖作答；需要 agent 讀圖時，請附候選題 PDF。
                </strong>
              </p>
            </div>
            <div class="output-button-group">
              <button v-if="shareUrl" type="button" class="btn-copy-prompt" data-action="copy-candidate-index" @click="copyCandidateUrl">
                複製候選題索引網址
              </button>
              <button type="button" class="btn-copy-prompt" data-action="copy-candidate-prompt" @click="copy">
                {{ request.mode === 'full' ? '複製完整題目 Prompt' : '複製候選 TSV Prompt' }}
              </button>
              <button type="button" class="btn-download-prompt" @click="downloadPrompt">
                下載 Prompt（Markdown）
              </button>
              <button type="button" class="btn-download-prompt" data-action="download-candidate-tsv" @click="downloadTsv">
                下載候選 TSV
              </button>
            </div>
          </div>

          <div class="prompt-preview-block">
            <label v-if="shareUrl" class="field-label">
              <span class="label-text">候選題索引網址</span>
              <input ref="sharePreview" :value="shareUrl" readonly class="field-control" />
              <span class="field-help">網址只包含目前候選 ID 與順序；TSV 每列含題型、教材來源、讀取網址與圖像標記。</span>
            </label>
            <label for="offline-prompt-preview" class="preview-label">
              出題 Prompt 預覽
              <textarea id="offline-prompt-preview" ref="preview" :value="bundle.prompt" readonly rows="12" class="prompt-textarea" />
            </label>
          </div>

          <section class="chapter-downloads" aria-labelledby="chapter-download-title">
            <h3 id="chapter-download-title">按章下載完整候選題幹</h3>
            <p class="field-help">下載內容依目前章節、題型與候選清單篩選，保留完整題幹、圖片及原始 Markdown／LaTeX，不含解答。</p>
            <div class="output-button-group">
              <button v-for="item in chapterDownloads" :key="item.chapter" type="button" class="btn-download-prompt" :data-action="`download-chapter-${item.chapter}`" @click="downloadChapter(item.chapter)">
                Chapter {{ item.chapter }}（{{ item.count }} 題）
              </button>
            </div>
          </section>

          <form class="selection-return" @submit.prevent="generateUrl">
            <h3 class="selection-title">貼回 agent 的選題結果</h3>
            <p class="field-help">貼上 ID 清單或本站試卷網址。網站會核對候選範圍、題數與重複 ID，再產生直接連結。</p>
            <label class="field-label">
              <span class="label-text">選定的 ID 或網址</span>
              <textarea v-model="selectionInput" rows="3" placeholder="每行一個科目:ID，也接受逗號分隔" required class="field-control return-textarea" />
            </label>
            <button type="submit" class="btn-secondary btn-validate">核對並產生試卷連結</button>
            <p role="status" class="selection-status">{{ selectionMessage }}</p>

            <template v-if="selectedExam">
              <div class="selected-exam-card">
                <p class="exam-link-p"><a :href="selectedExam.url" class="exam-link" target="_blank" rel="noopener">開啟試卷（{{ selectedExam.questions.length }} 題）</a></p>
                <label class="field-label">
                  <span class="label-text">可複製的直接網址</span>
                  <input ref="urlPreview" :value="selectedExam.url" readonly class="field-control url-preview-input" />
                </label>
                <button type="button" class="btn-secondary" @click="copyUrl">複製試卷網址</button>
                <p class="field-help">已核對 ID、題數與順序；尚未驗證動態試卷載入。</p>
              </div>
            </template>
          </form>
        </template>

        <template v-else>
          <div class="workbench-empty-state">
            <h3 class="empty-state-title">尚未準備候選原題</h3>
            <p class="empty-state-desc">在左側設定科目、章節與題數條件後，點擊「<strong>準備候選索引</strong>」。產生的 Prompt、候選 TSV 與按章完整題幹下載會顯示於此處。</p>
            <ol class="workbench-steps">
              <li><span class="step-num">1</span> 選擇測驗科目、章節與題型</li>
              <li><span class="step-num">2</span> 點擊「準備候選原題」</li>
              <li><span class="step-num">3</span> 複製 Prompt 貼給個人 Agent</li>
              <li><span class="step-num">4</span> 收到選題結果後貼回下方產生試卷連結</li>
            </ol>
          </div>
        </template>
      </div>
    </div>

    <div v-if="bundle && request.mode === 'full'" class="offline-print">
      <div class="gallery-header">
        <h2 class="gallery-title">模擬考候選原題（{{ bundle.entries.length }} 題）</h2>
        <span class="gallery-badge">可向下捲動檢視</span>
      </div>
      <div class="offline-print-gallery" role="region" aria-label="模擬考候選原題清單" tabindex="0">
        <article v-for="(q,i) in bundle.entries" :key="`${q.subject}:${q.id}`" class="offline-question">
          <h3 class="question-title">候選 {{ i+1 }}：{{ q.subject }}:{{ q.id }} — {{ q.title }}</h3>
          <div class="question-statement" v-html="q.statement" />
        </article>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, reactive, computed, watch, onBeforeUnmount } from 'vue'
import { withBase } from 'vitepress'
import { data as catalog } from './question-catalog.data.js'
import { SUBJECT_OPTIONS, TYPE_OPTIONS, DEFAULT_TYPES, parseQuestionTypes } from './agent-exam-prompt.js'
import { prepareOfflineExam, prepareCandidateIndex, matchOfflineScope } from './offline-exam.js'
import { loadCandidateIndex } from './candidate-index-api.js'
import { candidateTsv } from './candidate-prompt.js'
import { filterOfflineChapterHtml } from './offline-chapter-download.js'
import { offlineChapterPath } from './question-reader-url.js'
import { validateExamSelection } from './exam-url.js'
import { candidateIndexUrl } from './candidate-index-url.js'

const subjects = SUBJECT_OPTIONS.filter(q => q.value !== 'mixed')
const workerOrigin = import.meta.env?.VITE_CANDIDATE_INDEX_ORIGIN
const request = reactive({ subject: 'circuits', chapters: ['4'], count: 5, candidateLimit: '', minutes: 60, type: DEFAULT_TYPES, textOnly: false, mode: 'compact' })
const typeSelection = computed(() => parseQuestionTypes(request.type))
const selectedTypes = computed({
  get: () => typeSelection.value.types,
  set: values => { request.type = TYPE_OPTIONS.filter(option => values.includes(option.value)).map(option => option.value).join(',') }
})
const chapters = computed(() => [...new Set(catalog.filter(q => q.subject === request.subject).map(q => q.chapter))].sort((a,b) => Number(a) - Number(b) || a.localeCompare(b)))
const scopeSelection = computed(() => {
  try { return { ...matchOfflineScope(catalog, request), error: '' } }
  catch (error) { return { rows: [], error: error.message === typeSelection.value.error ? '' : error.message } }
})
const matchingCount = computed(() => scopeSelection.value.rows.length)
const bundle = ref(null), busy = ref(false), message = ref('快速索引會在背景預載；Worker 無法使用時會改用本機題庫。'), preview = ref(null)
const sharePreview = ref(null)
const shareUrl = computed(() => {
  if (!bundle.value) return ''
  if (Object.hasOwn(bundle.value, 'shareUrl')) return bundle.value.shareUrl
  return candidateIndexUrl(workerOrigin, bundle.value.entries ?? [])
})
const selectionInput = ref(''), selectedExam = ref(null), selectionMessage = ref(''), urlPreview = ref(null)
const chapterDownloads = computed(() => {
  if (!bundle.value) return []
  return request.chapters.map(chapter => ({
    chapter,
    count: bundle.value.entries.filter(entry => entry.chapter === chapter).length
  })).filter(item => item.count > 0)
})
let generation = 0
let prefetchToken = 0
let prefetchTimer = null
let prefetchController = null
let prefetchJob = null
let workerCache = null

function requestSnapshot() {
  return {
    ...request,
    chapters: [...request.chapters],
    type: typeSelection.value.csv,
  }
}
function snapshotKey(snapshot) {
  return JSON.stringify({
    subject: snapshot.subject,
    chapters: snapshot.chapters,
    type: snapshot.type,
    count: String(snapshot.count),
    minutes: String(snapshot.minutes),
    candidateLimit: String(snapshot.candidateLimit ?? '').trim(),
  })
}
function queueWorkerPrefetch() {
  clearTimeout(prefetchTimer)
  prefetchToken++
  const token = prefetchToken
  prefetchController?.abort()
  prefetchController = null
  prefetchJob = null
  workerCache = null
  if (typeof window === 'undefined' || request.mode !== 'compact' || !workerOrigin || scopeSelection.value.error || typeSelection.value.error) return
  const snapshot = requestSnapshot()
  const key = snapshotKey(snapshot)
  prefetchTimer = setTimeout(() => {
    if (token !== prefetchToken) return
    prefetchController = new AbortController()
    const signal = prefetchController.signal
    const fetcher = window.fetch?.bind(window) ?? fetch.bind(globalThis)
    const promise = loadCandidateIndex(workerOrigin, snapshot, fetcher, signal)
      .then(result => {
        if (token === prefetchToken && key === snapshotKey(requestSnapshot())) {
          workerCache = { key, result }
          message.value = `已預載 ${result.candidateCount} 題候選索引（${result.version}）。`
        }
        return result
      })
      .catch(error => {
        if (token === prefetchToken && key === snapshotKey(requestSnapshot())) {
          message.value = 'Worker 暫時無法讀取；準備時會改用本機題庫。'
        }
        throw error
      })
    prefetchJob = { key, promise }
    promise.catch(() => {})
  }, 120)
}
watch(() => request.subject, () => { request.chapters = chapters.value.length ? [chapters.value[0]] : [] }, { flush: 'sync' })
watch(() => request.mode, () => { request.textOnly = false }, { flush: 'sync' })
watch(request, () => {
  generation++
  busy.value = false
  bundle.value = null
  selectionInput.value = ''
  selectedExam.value = null
  selectionMessage.value = ''
  message.value = request.mode === 'compact' ? '條件已變更，正在更新候選索引。' : '條件已變更，請重新準備原題。'
  queueWorkerPrefetch()
}, { flush: 'sync', deep: true, immediate: true })
watch(selectionInput, () => { selectedExam.value = null; selectionMessage.value = '' }, { flush: 'sync' })
onBeforeUnmount(() => {
  clearTimeout(prefetchTimer)
  prefetchController?.abort()
})

async function prepare() {
  if (busy.value || scopeSelection.value.error || typeSelection.value.error) return
  const current = ++generation
  const snapshot = requestSnapshot()
  const key = snapshotKey(snapshot)
  busy.value = true
  bundle.value = null
  selectedExam.value = null
  selectionInput.value = ''
  message.value = snapshot.mode === 'full' ? '正在由你的瀏覽器讀取原始題幹與圖片。' : '正在準備候選索引。'
  if (snapshot.mode === 'compact' && prefetchTimer) {
    clearTimeout(prefetchTimer)
    prefetchTimer = null
  }
  try {
    let result
    if (snapshot.mode === 'compact') {
      if (!workerOrigin) {
        result = prepareCandidateIndex(catalog, snapshot)
        result.fallbackReason = 'Worker 網址未設定'
      } else {
        try {
          if (workerCache?.key === key) result = workerCache.result
          else if (prefetchJob?.key === key) result = await prefetchJob.promise
          else result = await loadCandidateIndex(workerOrigin, snapshot, window.fetch?.bind(window) ?? fetch.bind(globalThis))
        } catch (error) {
          if (current !== generation) return
          result = prepareCandidateIndex(catalog, snapshot)
          result.fallbackReason = error.message
        }
      }
    } else {
      result = await prepareOfflineExam(catalog, snapshot, window.fetch.bind(window), DOMParser, new URL(withBase('/'), location.origin).href)
    }
    if (current !== generation) return
    bundle.value = result
    if (result.fallbackReason) message.value = `Worker 索引未能讀取（${result.fallbackReason}），目前使用本機題庫；可下載此頁的候選 TSV。`
    else message.value = result.failures.length ? '部分來源未載入，已使用其餘符合條件的原題；可重試。' : '已準備完成，請複製 Prompt 給你的 agent。'
  } catch (error) {
    if (current === generation) message.value = error.message
  } finally {
    if (current === generation) busy.value = false
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
async function copyCandidateUrl() {
  const current = shareUrl.value
  if (!current) return
  try {
    await navigator.clipboard.writeText(current)
    if (shareUrl.value === current) message.value = '已複製候選題索引網址。請連同出題要求貼給 AI。'
  } catch {
    if (shareUrl.value !== current) return
    sharePreview.value?.focus()
    sharePreview.value?.select()
    message.value = '自動複製失敗，已選取候選題索引網址，請手動複製。'
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
function downloadPrompt() {
  const current = bundle.value
  if (!current) return
  const file = new Blob([current.prompt], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(file)
  const link = document.createElement('a')
  link.href = url
  link.download = `learningPages-${request.subject}-exam-prompt.md`
  document.body.append(link)
  link.click()
  link.remove()
  setTimeout(() => URL.revokeObjectURL(url), 0)
  message.value = '已開始下載 Markdown Prompt。'
}
function downloadTsv() {
  const current = bundle.value
  if (!current) return
  const file = new Blob([current.tsv || candidateTsv(current.entries)], { type: 'text/tab-separated-values;charset=utf-8' })
  const url = URL.createObjectURL(file)
  const link = document.createElement('a')
  link.href = url
  link.download = `learningPages-${request.subject}-candidates.tsv`
  document.body.append(link)
  link.click()
  link.remove()
  setTimeout(() => URL.revokeObjectURL(url), 0)
  message.value = '已開始下載候選 TSV。'
}
async function downloadChapter(chapter) {
  const current = bundle.value
  if (!current) return
  const entries = current.entries.filter(entry => entry.chapter === chapter && typeSelection.value.types.includes(entry.type))
  if (!entries.length) return
  try {
    const base = new URL(withBase('/'), location.origin)
    const path = offlineChapterPath(request.subject, chapter).replace(/^\//, '')
    const response = await (window.fetch?.bind(window) ?? fetch.bind(globalThis))(new URL(path, base).href)
    if (!response.ok) throw new Error(`離線章節讀取失敗（HTTP ${response.status}）。`)
    const result = filterOfflineChapterHtml(await response.text(), { entries, subject: request.subject, chapter, Parser: DOMParser })
    if (bundle.value !== current) return
    const file = new Blob([result.html], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(file)
    const link = document.createElement('a')
    link.href = url
    link.download = `learningPages-${request.subject}-chapter-${chapter}-candidates.html`
    document.body.append(link)
    link.click()
    link.remove()
    setTimeout(() => URL.revokeObjectURL(url), 0)
    message.value = `已開始下載 Chapter ${chapter} 完整題幹（${result.count} 題）。`
  } catch (error) {
    if (bundle.value === current) message.value = error.message
  }
}
</script>
<style scoped>
/* Hallmark · component: offline-exam-prompt · genre: editorial · theme: Monograph */
.offline-model {
  margin-block: 1rem;
  min-width: 0;
}
</style>
