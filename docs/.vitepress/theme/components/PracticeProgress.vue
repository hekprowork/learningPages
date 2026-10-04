<template>
  <div class="practice-progress-card">
    <div class="practice-progress-header">
      <div class="practice-progress-stats">
        <span class="practice-progress-label">練習進度</span>
        <span class="practice-progress-count">{{ doneCount }} / {{ total }} 題 ({{ percent }}%)</span>
      </div>
      <button class="practice-progress-reset" type="button" @click="resetProgress">
        重設進度
      </button>
    </div>
    <div class="practice-progress-bar">
      <div class="practice-progress-fill" :style="{ width: percent + '%' }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  total: number
  prefix: string
}>()

const doneCount = ref(0)

const percent = computed(() => {
  if (!props.total) return 0
  return Math.min(100, Math.round((doneCount.value / props.total) * 100))
})

const countDone = (): number => {
  if (typeof window === 'undefined') return 0
  let count = 0
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith(props.prefix) && localStorage.getItem(key) === 'true') {
      count++
    }
  }
  return count
}

const onProgressUpdate = () => {
  doneCount.value = countDone()
}

onMounted(() => {
  doneCount.value = countDone()
  window.addEventListener('practice-progress', onProgressUpdate)
  onUnmounted(() => {
    window.removeEventListener('practice-progress', onProgressUpdate)
  })
})

const resetProgress = () => {
  if (typeof window === 'undefined') return
  if (!confirm('確定要重設本章練習進度嗎？')) return

  const toRemove: string[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith(props.prefix)) {
      toRemove.push(key)
    }
  }
  toRemove.forEach((k) => localStorage.removeItem(k))
  doneCount.value = 0
  window.dispatchEvent(
    new CustomEvent('practice-progress', {
      detail: { reset: true, prefix: props.prefix }
    })
  )
}
</script>

<style scoped>
.practice-progress-card {
  margin: 1.5rem 0 2rem;
  padding: 1rem 1.25rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
}

.practice-progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.practice-progress-stats {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
}

.practice-progress-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.practice-progress-count {
  font-family: var(--vp-font-family-mono);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.practice-progress-reset {
  padding: 0.25rem 0.65rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  background-color: transparent;
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.practice-progress-reset:hover {
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg);
}

.practice-progress-bar {
  width: 100%;
  height: 6px;
  background-color: var(--vp-c-divider);
  border-radius: 3px;
  overflow: hidden;
}

.practice-progress-fill {
  height: 100%;
  background-color: var(--vp-c-text-1);
  border-radius: 3px;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
