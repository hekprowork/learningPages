<template>
  <div class="question-exam" aria-live="polite">
    <div v-if="loading" class="exam-loading-panel" role="status">
      正在載入指定題目與圖表…
    </div>

    <div v-else-if="!rows.length" class="exam-loader-shell">
      <form class="exam-loader-panel" @submit.prevent="applyIdsInput">
        <h2 class="exam-panel-title">載入指定題目</h2>
        <p class="exam-panel-desc">貼上 Agent 提供的題目 ID（逗號、空白或換行分隔），或直接貼上含 <code>?ids=</code> 的試卷網址。</p>
        <label class="exam-field-label">
          <span>題目 ID 或試卷網址</span>
          <textarea
            v-model="idsInput"
            class="exam-textarea"
            rows="3"
            placeholder="例如：ch4-ex-4-1, math-ch3-prob-1, ss-ch3-p3-1"
            :aria-invalid="!!inputError"
            aria-describedby="exam-ids-help"
          />
          <span id="exam-ids-help" class="exam-help">{{ inputError || '支援裸 ID 或「科目:ID」格式，依貼上順序組卷並自動去除重複。' }}</span>
        </label>
        <div class="exam-loader-actions">
          <button type="submit" class="exam-btn-primary">載入指定試題</button>
          <a class="exam-btn-secondary" :href="withBase('/agent-exam.html')">請 Agent 挑題</a>
        </div>

        <div class="exam-sample-block">
          <p class="exam-sample-caption">跨科試卷範例（電路學 Ch4 · 工數 Ch3 · 固態 Ch3）：</p>
          <button type="button" class="exam-btn-secondary" @click="loadSample">載入三題範例試卷</button>
        </div>
      </form>

      <aside class="exam-guide-aside" aria-label="組卷運作方式">
        <h3 class="exam-aside-title">如何與 Agent 出題搭配</h3>
        <ul class="exam-guide-list">
          <li><strong>1. 由 Agent 選題</strong>：在「<a :href="withBase('/agent-exam.html')">Agent 找相似練習</a>」取得題目 ID 清單或 <code>exam.html?ids=...</code> 連結。</li>
          <li><strong>2. 原頁即時組卷</strong>：本頁直接抓取已發布原題的題幹、圖片、KaTeX 公式與收合詳解。</li>
          <li><strong>3. 本機紀錄同步</strong>：勾選「標記已完成」會寫入同一份本機紀錄，不外傳或分享個人進度。</li>
        </ul>
      </aside>
    </div>

    <template v-else>
      <div class="exam-toolbar" role="region" aria-label="試卷控制列">
        <div class="exam-stats">
          <span class="exam-stat-item">指定 <strong>{{ rows.length }}</strong> 題</span>
          <span class="exam-stat-item">已載入 <strong>{{ loadedCount }}</strong> 題</span>
          <span class="exam-stat-item">已完成 <strong>{{ doneCount }} / {{ loadedCount }}</strong> 題</span>
        </div>
        <div class="exam-toolbar-actions">
          <button type="button" class="exam-btn-secondary" @click="copyExamLink">複製試卷連結</button>
          <button type="button" class="exam-btn-secondary" @click="printExam">列印試卷</button>
          <button type="button" class="exam-btn-secondary" :aria-expanded="editingIds" @click="toggleEditor">
            {{ editingIds ? '收合題號編輯' : '編輯題號' }}
          </button>
          <button v-if="rows.some(row => row.error)" type="button" class="exam-btn-primary" @click="sync">重新載入</button>
        </div>
      </div>

      <p v-if="statusMessage" role="status" class="exam-status-line">{{ statusMessage }}</p>

      <form v-if="editingIds" class="exam-editor-panel" @submit.prevent="applyIdsInput">
        <label class="exam-field-label">
          <span>調整或替換題目 ID</span>
          <textarea
            v-model="idsInput"
            class="exam-textarea"
            rows="3"
            placeholder="以逗號、空白或換行分隔題目 ID"
            :aria-invalid="!!inputError"
            aria-describedby="exam-edit-help"
          />
          <span id="exam-edit-help" class="exam-help">{{ inputError || '套用後會立即更新網址參數與試卷內容。' }}</span>
        </label>
        <div class="exam-loader-actions">
          <button type="submit" class="exam-btn-primary">更新試卷</button>
          <button type="button" class="exam-btn-secondary" @click="editingIds = false">取消</button>
        </div>
      </form>

      <nav v-if="rows.length > 1" class="exam-jump-nav" aria-label="試題快速跳轉">
        <a
          v-for="(row, index) in rows"
          :key="`jump-${row.key}`"
          :href="`#exam-q-${index + 1}`"
          class="exam-jump-pill"
          :class="{
            'is-done': row.card && doneIds.has(row.card.id),
            'is-error': !!row.error
          }"
        >
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <span>·</span>
          <span>{{ row.key }}</span>
        </a>
      </nav>

      <section
        v-for="(row, index) in rows"
        :id="`exam-q-${index + 1}`"
        :key="row.key"
        class="exam-question"
      >
        <div class="exam-question-head">
          <div class="exam-question-meta">
            <span class="exam-question-num">第 {{ String(index + 1).padStart(2, '0') }} 題</span>
            <code class="exam-question-id">{{ row.key }}</code>
          </div>
          <a v-if="row.url" :href="row.url" target="_blank" rel="noopener" class="exam-source-link">
            查看原頁 ↗
          </a>
        </div>

        <div v-if="row.error" role="alert" class="exam-error-box">
          <strong>無法載入題目（{{ row.key }}）：</strong>{{ row.error }}。
          可至 <a :href="withBase('/question-index.html')">公開題目索引</a> 確認正確 ID。
        </div>

        <PracticeCard
          v-else-if="row.card"
          :id="row.card.id"
          :type="row.card.type"
          :title="row.card.title"
          :source="row.card.source"
          :topic="row.card.topic"
        >
          <div v-html="row.card.statement" />
          <template v-if="row.card.solution" #solution>
            <div v-html="row.card.solution" />
          </template>
        </PracticeCard>
      </section>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, withBase } from 'vitepress'
import PracticeCard from './PracticeCard.vue'
import { data as catalog } from './question-catalog.data.js'
import { getSelectedIds } from './practice-selection.js'
import { resolveQuestions, loadExam } from './exam-loader.js'

const SAMPLE_IDS = ['ch4-ex-4-1', 'math-ch3-prob-1', 'ss-ch3-p3-1']

const router = useRouter()
const rows = ref([])
const loading = ref(false)
const idsInput = ref('')
const inputError = ref('')
const editingIds = ref(false)
const statusMessage = ref('')
const doneIds = ref(new Set())

let controller
let previousAfterRouteChange
let afterRouteChange

const loadedCount = computed(() => rows.value.filter(row => row.card).length)
const doneCount = computed(() => rows.value.filter(row => row.card && doneIds.value.has(row.card.id)).length)

function refreshDoneState() {
  if (typeof window === 'undefined') return
  const next = new Set()
  for (const row of rows.value) {
    if (row.card && localStorage.getItem(row.card.id) === 'true') {
      next.add(row.card.id)
    }
  }
  doneIds.value = next
}

function handleProgressEvent() {
  refreshDoneState()
}

function parseIdsFromInput(raw) {
  const trimmed = raw.trim()
  if (!trimmed) return []
  if (/^https?:\/\//i.test(trimmed)) {
    const parsed = new URL(trimmed)
    return parsed.searchParams.getAll('ids').flatMap(v => v.split(',')).map(v => v.trim()).filter(Boolean)
  }
  return trimmed.split(/[\s,，]+/).map(v => v.trim()).filter(Boolean)
}

function navigateToIds(ids) {
  if (typeof window === 'undefined') return
  const unique = [...new Set(ids)]
  const url = new URL(window.location.href)
  if (unique.length) {
    url.searchParams.set('ids', unique.join(','))
  } else {
    url.searchParams.delete('ids')
  }
  window.history.pushState(null, '', url.pathname + url.search)
  editingIds.value = false
  statusMessage.value = ''
  sync()
}

function applyIdsInput() {
  inputError.value = ''
  let parsed
  try {
    parsed = parseIdsFromInput(idsInput.value)
  } catch {
    inputError.value = '網址格式無效，請檢查後重試。'
    return
  }
  if (!parsed.length) {
    inputError.value = '請至少輸入一個題目 ID（例如 ch4-ex-4-1）。'
    return
  }
  navigateToIds(parsed)
}

function loadSample() {
  inputError.value = ''
  idsInput.value = SAMPLE_IDS.join(', ')
  navigateToIds(SAMPLE_IDS)
}

function toggleEditor() {
  editingIds.value = !editingIds.value
  inputError.value = ''
  if (editingIds.value) {
    idsInput.value = rows.value.map(row => row.key).join(', ')
  }
}

async function copyExamLink() {
  if (typeof window === 'undefined') return
  try {
    await navigator.clipboard.writeText(window.location.href)
    statusMessage.value = '已複製目前試卷網址。'
  } catch {
    statusMessage.value = '無法自動複製，請直接複製瀏覽器網址列。'
  }
}

function printExam() {
  if (typeof window !== 'undefined') window.print()
}

async function sync() {
  controller?.abort()
  const current = new AbortController()
  controller = current
  const ids = getSelectedIds(window.location.search) ?? new Set()
  rows.value = []
  loading.value = ids.size > 0
  if (!ids.size) {
    refreshDoneState()
    return
  }
  if (!editingIds.value) {
    idsInput.value = [...ids].join(', ')
  }
  try {
    const base = new URL(withBase('/'), window.location.origin).href
    const result = await loadExam(resolveQuestions(catalog, ids), base, window.fetch.bind(window), DOMParser, current.signal)
    if (!current.signal.aborted) {
      rows.value = result
      refreshDoneState()
    }
  } catch (error) {
    if (!current.signal.aborted) rows.value = [{ key: '載入失敗', error: error.message }]
  } finally {
    if (!current.signal.aborted) loading.value = false
  }
}

onMounted(() => {
  sync()
  previousAfterRouteChange = router.onAfterRouteChange
  afterRouteChange = async (href) => {
    await previousAfterRouteChange?.(href)
    await sync()
  }
  router.onAfterRouteChange = afterRouteChange
  window.addEventListener('popstate', sync)
  window.addEventListener('practice-progress', handleProgressEvent)
})

onUnmounted(() => {
  controller?.abort()
  if (router.onAfterRouteChange === afterRouteChange) router.onAfterRouteChange = previousAfterRouteChange
  window.removeEventListener('popstate', sync)
  window.removeEventListener('practice-progress', handleProgressEvent)
})
</script>
