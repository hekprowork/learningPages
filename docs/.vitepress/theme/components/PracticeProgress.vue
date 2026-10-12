<template>
  <div class="practice-progress-card">
    <div class="practice-progress-header">
      <div class="practice-progress-stats" aria-live="polite">
        <span class="practice-progress-label">{{ currentLabel }}</span>
        <span v-if="currentTotal > 0" class="practice-progress-count">
          {{ currentDoneCount }} / {{ currentTotal }} 題 ({{ currentPercent }}%)
        </span>
        <span v-else class="practice-progress-count">本分類沒有可勾選題目</span>
        <span class="practice-progress-all">
          全部 All {{ allDoneCount }} / {{ allTotal }} 題 ({{ allPercent }}%)
        </span>
      </div>
      <button
        class="practice-progress-reset"
        type="button"
        :disabled="currentTotal === 0"
        @click="resetProgress"
      >
        {{ resetLabel }}
      </button>
    </div>
    <div
      class="practice-progress-bar"
      role="progressbar"
      :aria-valuenow="currentPercent"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-label="`${currentLabel}進度`"
    >
      <div class="practice-progress-fill" :style="{ width: currentPercent + '%' }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import {
  isPracticeCardType,
  isPracticeFilterType,
  PRACTICE_FILTER_CHANGE_EVENT,
  PRACTICE_TYPE_LABELS,
  type PracticeFilterChangeDetail,
  type PracticeFilterType
} from './practice-filter'

const props = withDefaults(
  defineProps<{
    total: number
    prefix?: string
    prefixes?: string[]
  }>(),
  {
    prefix: '',
    prefixes: undefined
  }
)

const getPrefixes = (): string[] => {
  if (props.prefixes?.length) return props.prefixes
  return props.prefix ? [props.prefix] : []
}

const matchesPrefix = (id: string | undefined): boolean =>
  !!id && getPrefixes().some((prefix) => id.startsWith(prefix))

const currentType = ref<PracticeFilterType>('all')
const currentTotal = ref(props.total)
const currentDoneCount = ref(0)
const allTotal = ref(props.total)
const allDoneCount = ref(0)

const currentLabel = computed(() => {
  const label = PRACTICE_TYPE_LABELS[currentType.value]
  return `目前 ${label.zh} ${label.en}`
})

const resetLabel = computed(() =>
  currentType.value === 'all'
    ? '重設全部進度'
    : `重設${PRACTICE_TYPE_LABELS[currentType.value].zh}進度`
)

const currentPercent = computed(() => {
  if (!currentTotal.value) return 0
  return Math.min(100, Math.round((currentDoneCount.value / currentTotal.value) * 100))
})

const allPercent = computed(() => {
  if (!allTotal.value) return 0
  return Math.min(100, Math.round((allDoneCount.value / allTotal.value) * 100))
})

const getScope = (): HTMLElement | null => {
  if (typeof document === 'undefined') return null
  return document.querySelector('.vp-doc')
}

const getCards = (): HTMLElement[] => {
  const scope = getScope()
  return scope
    ? Array.from(scope.querySelectorAll<HTMLElement>('[data-practice-card]')).filter(
        (card) => card.dataset.practiceTrackable !== 'false'
      )
    : []
}

const getUrlType = (): PracticeFilterType => {
  if (typeof window === 'undefined') return 'all'
  const rawType = new URL(window.location.href).searchParams.get('type')
  return isPracticeFilterType(rawType) ? rawType : 'all'
}

const countDoneForCards = (cards: HTMLElement[]): number => {
  if (typeof window === 'undefined') return 0
  return cards.reduce((count, card) => {
    const id = card.dataset.practiceId
    return matchesPrefix(id) && localStorage.getItem(id) === 'true'
      ? count + 1
      : count
  }, 0)
}

const syncProgress = (detail?: PracticeFilterChangeDetail) => {
  if (typeof window === 'undefined') return
  const cards = getCards().filter((card) => {
    const id = card.dataset.practiceId
    return matchesPrefix(id)
  })
  const type = detail && isPracticeFilterType(detail.type) ? detail.type : getUrlType()
  const currentCards =
    type === 'all'
      ? cards
      : cards.filter((card) => isPracticeCardType(card.dataset.practiceType) && card.dataset.practiceType === type)

  currentType.value = type
  allTotal.value = cards.length
  allDoneCount.value = countDoneForCards(cards)
  currentTotal.value = type === 'all' ? allTotal.value : currentCards.length
  currentDoneCount.value = type === 'all' ? allDoneCount.value : countDoneForCards(currentCards)
}

const onProgressUpdate = () => syncProgress()

const onFilterChange = (event: Event) => {
  const custom = event as CustomEvent<PracticeFilterChangeDetail>
  syncProgress(custom.detail)
}

onMounted(() => {
  syncProgress()
  window.addEventListener('practice-progress', onProgressUpdate)
  window.addEventListener(PRACTICE_FILTER_CHANGE_EVENT, onFilterChange)
})

onUnmounted(() => {
  if (typeof window === 'undefined') return
  window.removeEventListener('practice-progress', onProgressUpdate)
  window.removeEventListener(PRACTICE_FILTER_CHANGE_EVENT, onFilterChange)
})

const resetProgress = () => {
  if (typeof window === 'undefined') return
  const label = PRACTICE_TYPE_LABELS[currentType.value]
  const confirmation =
    currentType.value === 'all'
      ? '確定要重設全部進度嗎？'
      : `確定要重設「${label.zh} ${label.en}」的進度嗎？`
  if (!window.confirm(confirmation)) return

  const cards = getCards().filter((card) => {
    const id = card.dataset.practiceId
    if (!id || !matchesPrefix(id)) return false
    return currentType.value === 'all' || card.dataset.practiceType === currentType.value
  })
  const keysToRemove =
    currentType.value === 'all'
      ? Array.from({ length: localStorage.length }, (_, index) => localStorage.key(index)).filter(
          (key): key is string => !!key && matchesPrefix(key)
        )
      : cards
          .map((card) => card.dataset.practiceId)
          .filter((key): key is string => !!key && matchesPrefix(key))

  keysToRemove.forEach((key) => localStorage.removeItem(key))
  syncProgress()
  window.dispatchEvent(
    new CustomEvent('practice-progress', {
      detail: { reset: true, prefix: props.prefix, type: currentType.value }
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
  flex-wrap: wrap;
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

.practice-progress-all {
  font-family: var(--vp-font-family-mono);
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
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

.practice-progress-reset:disabled {
  cursor: not-allowed;
  opacity: 0.5;
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
