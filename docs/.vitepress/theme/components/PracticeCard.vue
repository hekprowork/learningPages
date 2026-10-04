<template>
  <div :id="'card-' + id" class="practice-card" :class="{ 'is-done': isDone }">
    <div class="practice-card-header">
      <div class="practice-card-meta">
        <span v-if="source" class="practice-badge practice-badge--source">{{ source }}</span>
        <span v-if="topic" class="practice-badge practice-badge--topic">{{ topic }}</span>
      </div>
      <label v-if="!hideCheckbox" class="practice-card-check">
        <input
          type="checkbox"
          :checked="isDone"
          @change="onToggle"
          class="practice-checkbox"
        />
        <span class="practice-check-label">{{ isDone ? '已完成' : '標記已完成' }}</span>
      </label>
    </div>

    <div v-if="title" class="practice-card-title-wrap">
      <h3 class="practice-card-title">{{ title }}</h3>
    </div>

    <div class="practice-card-statement">
      <slot />
    </div>

    <details v-if="$slots.solution" class="practice-card-solution">
      <summary class="practice-card-summary">查看詳解</summary>
      <div class="practice-card-solution-body">
        <slot name="solution" />
      </div>
    </details>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(
  defineProps<{
    id: string
    title?: string
    source?: string
    topic?: string
    hideCheckbox?: boolean
  }>(),
  {
    title: '',
    source: '',
    topic: '',
    hideCheckbox: false
  }
)

const isDone = ref(false)

const getStorageKey = () => props.id

onMounted(() => {
  const key = getStorageKey()
  isDone.value = localStorage.getItem(key) === 'true'

  const handleProgress = (e: Event) => {
    const custom = e as CustomEvent
    if (custom.detail?.reset) {
      isDone.value = localStorage.getItem(key) === 'true'
    } else if (custom.detail?.id === props.id) {
      isDone.value = !!custom.detail.done
    }
  }

  window.addEventListener('practice-progress', handleProgress)
  onUnmounted(() => {
    window.removeEventListener('practice-progress', handleProgress)
  })
})

const onToggle = (e: Event) => {
  const target = e.target as HTMLInputElement
  isDone.value = target.checked
  if (typeof window !== 'undefined') {
    const key = getStorageKey()
    if (isDone.value) {
      localStorage.setItem(key, 'true')
    } else {
      localStorage.removeItem(key)
    }
    window.dispatchEvent(
      new CustomEvent('practice-progress', {
        detail: { id: props.id, done: isDone.value }
      })
    )
  }
}
</script>

<style scoped>
.practice-card {
  margin: 1.5rem 0;
  padding: 1.25rem 1.5rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background-color: var(--vp-c-bg);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  transition: border-color 0.2s ease, opacity 0.2s ease;
}

.practice-card.is-done {
  border-color: var(--vp-c-text-3);
  opacity: 0.88;
}

.practice-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
  flex-wrap: wrap;
}

.practice-card-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.practice-badge {
  display: inline-block;
  font-size: 0.75rem;
  font-family: var(--vp-font-family-mono);
  font-weight: 600;
  line-height: 1.2;
  padding: 0.2rem 0.55rem;
  border-radius: 4px;
}

.practice-badge--source {
  background-color: var(--vp-c-text-1);
  color: var(--vp-c-bg);
}

.practice-badge--topic {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-border);
}

.practice-card-check {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  cursor: pointer;
  user-select: none;
}

.practice-checkbox {
  cursor: pointer;
  width: 1rem;
  height: 1rem;
  accent-color: var(--vp-c-text-1);
}

.practice-card-title-wrap {
  margin-top: 0.85rem;
}

.practice-card-title {
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.4;
}

.practice-card-statement {
  margin-top: 0.75rem;
  color: var(--vp-c-text-1);
}

.practice-card-statement :deep(p) {
  margin: 0.5rem 0;
  line-height: 1.6;
}

.practice-card-statement :deep(img) {
  max-width: 100%;
  border-radius: 6px;
  border: 1px solid var(--vp-c-border);
  margin: 0.75rem 0;
  background-color: #ffffff;
  padding: 0.25rem;
}

.practice-card-solution {
  margin-top: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  overflow: hidden;
}

.practice-card-summary {
  padding: 0.6rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  cursor: pointer;
  user-select: none;
  background-color: var(--vp-c-bg-alt);
  transition: color 0.15s ease;
}

.practice-card-summary:hover {
  color: var(--vp-c-text-1);
}

.practice-card-solution-body {
  padding: 1rem 1.25rem;
  border-top: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
}

.practice-card-solution-body :deep(img) {
  max-width: 100%;
  border-radius: 6px;
  border: 1px solid var(--vp-c-border);
  margin: 0.75rem 0;
  background-color: #ffffff;
  padding: 0.25rem;
}
</style>
