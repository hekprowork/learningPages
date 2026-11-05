<template>
  <div class="question-exam" aria-live="polite">
    <p v-if="loading" role="status">正在載入指定題目…</p>
    <p v-else-if="!rows.length">請在網址加入 <code>?ids=題目ID1,題目ID2</code>，指定要練習的題目。</p>
    <template v-else>
      <p>共指定 {{ rows.length }} 題，已載入 {{ rows.filter(row => row.card).length }} 題。</p>
      <button v-if="rows.some(row => row.error)" type="button" @click="sync">重新載入</button>
      <section v-for="(row, index) in rows" :key="row.key" class="exam-question">
        <p>第 {{ index + 1 }} 題 · <code>{{ row.key }}</code>
          <a v-if="row.url" :href="row.url" target="_blank" rel="noopener">查看原頁</a>
        </p>
        <p v-if="row.error" role="alert">{{ row.error }}：{{ row.key }}</p>
        <PracticeCard v-else-if="row.card" :id="row.card.id" :type="row.card.type" :title="row.card.title" :source="row.card.source" :topic="row.card.topic">
          <div v-html="row.card.statement" />
          <template v-if="row.card.solution" #solution><div v-html="row.card.solution" /></template>
        </PracticeCard>
      </section>
    </template>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, withBase } from 'vitepress'
import PracticeCard from './PracticeCard.vue'
import { data as catalog } from './question-catalog.data.js'
import { getSelectedIds } from './practice-selection.js'
import { resolveQuestions, loadExam } from './exam-loader.js'
const router = useRouter()
const rows = ref([])
const loading = ref(false)
let controller
let previousAfterRouteChange
let afterRouteChange
async function sync() {
  controller?.abort()
  const current = new AbortController()
  controller = current
  const ids = getSelectedIds(window.location.search) ?? new Set()
  rows.value = []
  loading.value = ids.size > 0
  if (!ids.size) return
  try {
    const base = new URL(withBase('/'), window.location.origin).href
    const result = await loadExam(resolveQuestions(catalog, ids), base, window.fetch.bind(window), DOMParser, current.signal)
    if (!current.signal.aborted) rows.value = result
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
})
onUnmounted(() => {
  controller?.abort()
  if (router.onAfterRouteChange === afterRouteChange) router.onAfterRouteChange = previousAfterRouteChange
  window.removeEventListener('popstate', sync)
})
</script>
<style scoped>
.exam-question { margin-block: 2rem; }
.exam-question > p { display: flex; flex-wrap: wrap; align-items: baseline; gap: .5rem; }
.exam-question > p a { margin-left: auto; }
.question-exam > button { border: 1px solid var(--vp-c-border); border-radius: 4px; padding: .3rem .7rem; }
</style>
