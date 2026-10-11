export const PRACTICE_CARD_TYPES = [
  'example',
  'exercise',
  'practice',
  'homework',
  'exam'
] as const

export type PracticeCardType = (typeof PRACTICE_CARD_TYPES)[number]
export type PracticeFilterType = 'all' | PracticeCardType

export const PRACTICE_FILTER_TYPES = ['all', ...PRACTICE_CARD_TYPES] as const

export const PRACTICE_TYPE_LABELS: Record<PracticeFilterType, { zh: string; en: string }> = {
  all: { zh: '全部', en: 'All' },
  example: { zh: '範例', en: 'Example' },
  exercise: { zh: '習題', en: 'Exercise' },
  practice: { zh: '練習', en: 'Practice' },
  homework: { zh: '作業', en: 'Homework' },
  exam: { zh: '考題', en: 'Exam' }
}

/**
 * Public browser event consumed by PracticeProgress.
 * `detail.type` is the active category; `detail.counts` contains all cards
 * currently rendered for each category, including `all`.
 */
export const PRACTICE_FILTER_CHANGE_EVENT = 'practice-filter-change'

export interface PracticeFilterChangeDetail {
  type: PracticeFilterType
  counts: Record<PracticeFilterType, number>
  total: number
}

export const isPracticeCardType = (value: unknown): value is PracticeCardType =>
  typeof value === 'string' && (PRACTICE_CARD_TYPES as readonly string[]).includes(value)

export const isPracticeFilterType = (value: unknown): value is PracticeFilterType =>
  value === 'all' || isPracticeCardType(value)

export const createPracticeCounts = (): Record<PracticeFilterType, number> => ({
  all: 0,
  example: 0,
  exercise: 0,
  practice: 0,
  homework: 0,
  exam: 0
})
