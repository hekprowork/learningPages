<template>
  <nav ref="filterRoot" class="practice-filter" aria-label="練習題分類篩選">
    <div class="practice-filter-inner">
      <span class="practice-filter-title">題型</span>
      <div class="practice-filter-segmented" role="group" aria-label="選擇題型">
        <button
          v-for="type in visibleTypes"
          :key="type"
          class="practice-filter-button"
          :class="{ 'is-active': activeType === type }"
          type="button"
          :aria-pressed="activeType === type"
          @click="selectType(type)"
        >
          <span>{{ labels[type].zh }} {{ labels[type].en }}</span>
          <span class="practice-filter-count">{{ categoryCounts[type] }}</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import {
  createPracticeCounts,
  isPracticeCardType,
  isPracticeFilterType,
  PRACTICE_FILTER_CHANGE_EVENT,
  PRACTICE_FILTER_TYPES,
  PRACTICE_TYPE_LABELS,
  type PracticeFilterChangeDetail,
  type PracticeFilterType
} from './practice-filter'

const props = defineProps<{
  prefix: string
}>()

const filterRoot = ref<HTMLElement | null>(null)
const activeType = ref<PracticeFilterType>('all')
const categoryCounts = reactive(createPracticeCounts())
const labels = PRACTICE_TYPE_LABELS

const visibleTypes = computed(() =>
  PRACTICE_FILTER_TYPES.filter((type) => type === 'all' || categoryCounts[type] > 0)
)

const getScope = (): HTMLElement | null => {
  if (typeof document === 'undefined') return null
  return filterRoot.value?.closest<HTMLElement>('.vp-doc') ?? document.querySelector('.vp-doc')
}

const getCards = (scope: HTMLElement): HTMLElement[] =>
  Array.from(scope.querySelectorAll<HTMLElement>('[data-practice-card]')).filter((card) =>
    card.dataset.practiceId?.startsWith(props.prefix)
  )

const getHeadings = (scope: HTMLElement): HTMLHeadingElement[] =>
  Array.from(scope.querySelectorAll<HTMLHeadingElement>('h2, h3, h4')).filter(
    (heading) => !heading.closest('[data-practice-card]')
  )

const getCardType = (card: HTMLElement): string => card.dataset.practiceType ?? ''

const countCards = (cards: HTMLElement[]) => {
  const nextCounts = createPracticeCounts()
  nextCounts.all = cards.length

  cards.forEach((card) => {
    const type = getCardType(card)
    if (isPracticeCardType(type)) nextCounts[type] += 1
  })

  Object.assign(categoryCounts, nextCounts)
}

const updateHeadingVisibility = (scope: HTMLElement) => {
  const headings = getHeadings(scope)
  const orderedNodes = Array.from(
    scope.querySelectorAll<HTMLElement>('h2, h3, h4, [data-practice-card]')
  ).filter((node) => !node.closest('[data-practice-card]') || node.matches('[data-practice-card]'))

  headings.forEach((heading) => {
    const headingIndex = orderedNodes.indexOf(heading)
    const headingLevel = Number(heading.tagName.slice(1))
    let sectionEnd = orderedNodes.length

    for (let index = headingIndex + 1; index < orderedNodes.length; index += 1) {
      const node = orderedNodes[index]
      if (/^H[2-4]$/.test(node.tagName) && Number(node.tagName.slice(1)) <= headingLevel) {
        sectionEnd = index
        break
      }
    }

    const sectionCards = orderedNodes
      .slice(headingIndex + 1, sectionEnd)
      .filter((node): node is HTMLElement => node.matches('[data-practice-card]'))
    const hasCards = sectionCards.length > 0
    const hasVisibleCards = sectionCards.some((card) => !card.hidden)

    if (!heading.dataset.practiceFilterOriginalHidden) {
      heading.dataset.practiceFilterOriginalHidden = String(heading.hidden)
    }
    const originallyHidden = heading.dataset.practiceFilterOriginalHidden === 'true'
    heading.hidden = originallyHidden || (activeType.value !== 'all' && hasCards && !hasVisibleCards)
  })

}

const updateUrl = (
  type: PracticeFilterType,
  mode: 'push' | 'replace',
  clearHash = false
) => {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)

  if (type === 'all') url.searchParams.delete('type')
  else url.searchParams.set('type', type)
  if (clearHash) url.hash = ''

  const nextUrl = `${url.pathname}${url.search}${url.hash}`
  const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`
  if (nextUrl === currentUrl) return
  if (mode === 'push') window.history.pushState(window.history.state, '', nextUrl)
  else window.history.replaceState(window.history.state, '', nextUrl)
}

const getUrlType = (): { type: PracticeFilterType; needsNormalization: boolean } => {
  if (typeof window === 'undefined') return { type: 'all', needsNormalization: false }
  const rawType = new URL(window.location.href).searchParams.get('type')

  if (!rawType) return { type: 'all', needsNormalization: false }
  if (isPracticeFilterType(rawType)) {
    return { type: rawType, needsNormalization: rawType === 'all' }
  }
  return { type: 'all', needsNormalization: true }
}

const getHashCard = (): HTMLElement | null => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return null
  if (!window.location.hash.startsWith('#card-')) return null

  const rawId = window.location.hash.slice(1)
  const ids = [rawId]
  try {
    ids.push(decodeURIComponent(rawId))
  } catch {
    // Keep the raw hash when it is not valid URI encoding.
  }

  for (const id of ids) {
    const element = document.getElementById(id)
    if (element?.matches('[data-practice-card]')) return element
  }
  return null
}

const emitFilterChange = () => {
  if (typeof window === 'undefined') return
  const detail: PracticeFilterChangeDetail = {
    type: activeType.value,
    counts: { ...categoryCounts },
    total: categoryCounts.all
  }
  window.dispatchEvent(new CustomEvent<PracticeFilterChangeDetail>(PRACTICE_FILTER_CHANGE_EVENT, { detail }))
}

const applyFilter = () => {
  const scope = getScope()
  if (!scope) return
  const cards = getCards(scope)

  countCards(cards)
  if (activeType.value !== 'all' && categoryCounts[activeType.value] === 0) {
    activeType.value = 'all'
    updateUrl('all', 'replace')
  }

  cards.forEach((card) => {
    card.hidden = activeType.value !== 'all' && getCardType(card) !== activeType.value
  })

  updateHeadingVisibility(scope)
  emitFilterChange()
}

let hashScrollFrame = 0
let hashScrollFinalFrame = 0

const cancelHashScroll = () => {
  if (typeof window === 'undefined') return
  window.cancelAnimationFrame(hashScrollFrame)
  window.cancelAnimationFrame(hashScrollFinalFrame)
  hashScrollFrame = 0
  hashScrollFinalFrame = 0
}

const scrollToHashCard = () => {
  const card = getHashCard()
  if (!card || typeof window === 'undefined') return

  cancelHashScroll()
  hashScrollFrame = window.requestAnimationFrame(() => {
    // VitePress performs its own hash scroll after child components mount.
    // A second frame makes our sticky-header-aware position the final one.
    hashScrollFinalFrame = window.requestAnimationFrame(() => {
      if (!card.isConnected) return
      const filterHeight = filterRoot.value?.getBoundingClientRect().height ?? 0
      const cssNavHeight =
        Number.parseFloat(
          window.getComputedStyle(document.documentElement).getPropertyValue('--vp-nav-height')
        ) || 0
      const navHeight = window.innerWidth >= 960 ? cssNavHeight : 0
      const localNavHeight = window.innerWidth < 1280 ? 48 : 0
      const top =
        card.getBoundingClientRect().top +
        window.scrollY -
        navHeight -
        localNavHeight -
        filterHeight -
        16
      window.scrollTo({ top: Math.max(0, top), behavior: 'auto' })
    })
  })
}

const syncFromUrl = (scrollToHash = false) => {
  const urlState = getUrlType()
  const hashCard = getHashCard()
  const hashType = hashCard ? getCardType(hashCard) : ''
  const nextType: PracticeFilterType = isPracticeCardType(hashType)
    ? hashType
    : urlState.type

  activeType.value = nextType

  if (urlState.needsNormalization || (hashCard && nextType !== urlState.type)) {
    updateUrl(nextType, 'replace')
  }

  applyFilter()
  if (scrollToHash && hashCard && isPracticeCardType(hashType)) scrollToHashCard()
}

const selectType = (type: PracticeFilterType) => {
  const hashCard = getHashCard()
  const clearHash = !!hashCard && getCardType(hashCard) !== type
  if (activeType.value === type && !clearHash) return
  activeType.value = type
  updateUrl(type, 'push', clearHash)
  applyFilter()
}

let observer: MutationObserver | null = null
let refreshFrame = 0

const scheduleRefresh = () => {
  if (typeof window === 'undefined') return
  window.cancelAnimationFrame(refreshFrame)
  refreshFrame = window.requestAnimationFrame(() => applyFilter())
}

const onPopState = () => syncFromUrl(true)
const onHashChange = () => syncFromUrl(true)

onMounted(() => {
  syncFromUrl(true)

  const scope = getScope()
  if (scope && typeof window !== 'undefined' && 'MutationObserver' in window) {
    observer = new MutationObserver(scheduleRefresh)
    observer.observe(scope, { childList: true, subtree: true })
  }

  window.addEventListener('popstate', onPopState)
  window.addEventListener('hashchange', onHashChange)
})

onUnmounted(() => {
  observer?.disconnect()
  observer = null
  if (typeof window !== 'undefined') {
    window.cancelAnimationFrame(refreshFrame)
    cancelHashScroll()
    window.removeEventListener('popstate', onPopState)
    window.removeEventListener('hashchange', onHashChange)
  }
})
</script>

<style scoped>
.practice-filter {
  position: sticky;
  top: 48px;
  z-index: 10;
  margin: 1.25rem 0 1.5rem;
  padding: 0.6rem 0;
  background: color-mix(in srgb, var(--vp-c-bg) 94%, transparent);
  border-top: 1px solid var(--vp-c-divider);
  border-bottom: 1px solid var(--vp-c-divider);
  backdrop-filter: blur(8px);
}

@media (min-width: 960px) and (max-width: 1279px) {
  .practice-filter {
    top: calc(var(--vp-nav-height) + 48px);
  }
}

@media (min-width: 1280px) {
  .practice-filter {
    top: var(--vp-nav-height);
  }
}

.practice-filter-inner {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.practice-filter-title {
  flex: 0 0 auto;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--vp-c-text-2);
  letter-spacing: 0.04em;
}

.practice-filter-segmented {
  display: flex;
  min-width: 0;
  overflow-x: auto;
  scrollbar-width: thin;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
}

.practice-filter-button {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 0.45rem;
  min-height: 2rem;
  padding: 0.35rem 0.7rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  border: 0;
  border-right: 1px solid var(--vp-c-border);
  font-size: 0.78rem;
  line-height: 1.2;
  cursor: pointer;
  transition: color 0.15s ease, background-color 0.15s ease;
}

.practice-filter-button:last-child {
  border-right: 0;
}

.practice-filter-button:hover,
.practice-filter-button:focus-visible {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}

.practice-filter-button:focus-visible {
  outline: 2px solid var(--vp-c-text-1);
  outline-offset: -2px;
}

.practice-filter-button.is-active {
  color: var(--vp-c-bg);
  background: var(--vp-c-text-1);
}

.practice-filter-count {
  min-width: 1.2rem;
  padding: 0.05rem 0.25rem;
  border: 1px solid currentColor;
  border-radius: 999px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.7rem;
  text-align: center;
}

@media (max-width: 640px) {
  .practice-filter {
    margin-inline: -1rem;
    padding-inline: 1rem;
  }

  .practice-filter-inner {
    align-items: stretch;
    flex-direction: column;
    gap: 0.4rem;
  }

  .practice-filter-segmented {
    width: 100%;
  }
}
</style>
