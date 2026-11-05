<template>
  <form class="agent-prompt" @submit.prevent="copyPrompt">
    <div class="agent-prompt-fields">
      <label>科目<select v-model="request.subject"><option v-for="option in SUBJECT_OPTIONS" :key="option.value" :value="option.value">{{ option.label }}</option></select></label>
      <label class="agent-prompt-scope">章節或主題範圍<input v-model="request.scope" required :aria-invalid="touched.scope && !!errors.scope" aria-describedby="agent-scope-help" placeholder="例如：第四章；跨科請同時列出科目" @blur="touched.scope = true" /><span id="agent-scope-help" class="field-help">{{ touched.scope && errors.scope ? errors.scope : '跨章、跨科皆可，請寫出各科範圍。' }}</span></label>
      <label>題數<input v-model="request.count" type="number" min="1" max="100" step="1" required :aria-invalid="touched.count && !!errors.count" aria-describedby="agent-count-help" @blur="touched.count = true" /><span id="agent-count-help" class="field-help">{{ touched.count && errors.count ? errors.count : '1–100 題' }}</span></label>
      <label>作答時間（分鐘）<input v-model="request.minutes" type="number" min="1" max="480" step="1" required :aria-invalid="touched.minutes && !!errors.minutes" aria-describedby="agent-time-help" @blur="touched.minutes = true" /><span id="agent-time-help" class="field-help">{{ touched.minutes && errors.minutes ? errors.minutes : '1–480 分鐘，供 agent 分配時間。' }}</span></label>
      <fieldset class="question-types" :aria-invalid="!!typeSelection.error" aria-describedby="agent-type-help">
        <legend>題型</legend>
        <div class="question-type-options">
          <label v-for="option in TYPE_OPTIONS" :key="option.value"><input v-model="selectedTypes" type="checkbox" :value="option.value" />{{ option.label }}</label>
        </div>
        <span id="agent-type-help" class="field-help">{{ typeSelection.error || '可複選題型。' }}</span>
      </fieldset>
    </div>
    <div class="agent-prompt-actions">
      <button type="submit" :disabled="!valid || state === 'loading'" :aria-busy="state === 'loading'" :data-state="state">{{ state === 'loading' ? '正在複製…' : state === 'success' ? '已複製 Prompt' : '複製出題 Prompt' }}</button>
      <span role="status">{{ message }}</span>
    </div>
    <label class="prompt-preview-label">Prompt 預覽<textarea ref="preview" :value="prompt" readonly rows="14" aria-label="出題 Prompt 預覽" /></label>
  </form>
</template>
<script setup>
import { reactive, computed, ref, watch } from 'vue'
import { SUBJECT_OPTIONS, TYPE_OPTIONS, DEFAULT_TYPES, parseQuestionTypes, validateExamRequest, buildAgentExamPrompt } from './agent-exam-prompt.js'
const request = reactive({ subject: 'circuits', scope: '第四章', count: 5, minutes: 60, type: DEFAULT_TYPES })
const typeSelection = computed(() => parseQuestionTypes(request.type))
const selectedTypes = computed({
  get: () => typeSelection.value.types,
  set: values => { request.type = TYPE_OPTIONS.filter(option => values.includes(option.value)).map(option => option.value).join(',') }
})
const touched = reactive({ scope: false, count: false, minutes: false })
const errors = computed(() => validateExamRequest(request))
const valid = computed(() => !Object.values(errors.value).some(Boolean))
const prompt = computed(() => valid.value ? buildAgentExamPrompt(request) : '請先填寫完整的出題需求。')
const preview = ref(null)
const state = ref('idle')
const message = ref('複製後，貼給能讀取網址的個人 agent。')
watch(prompt, () => { if (state.value !== 'loading') state.value = 'idle'; message.value = '需求已更新，請重新複製。' })
async function copyPrompt() {
  if (!valid.value || state.value === 'loading') return
  const text = prompt.value
  state.value = 'loading'
  message.value = '正在複製…'
  try {
    await navigator.clipboard.writeText(text)
    state.value = prompt.value === text ? 'success' : 'idle'
    message.value = prompt.value === text ? '已複製，貼給你的 agent 即可。' : '需求已更新，請重新複製。'
  } catch {
    state.value = 'error'
    message.value = '無法自動複製，已選取下方文字，請長按複製或按 Ctrl/Cmd+C。'
    preview.value?.focus()
    preview.value?.select()
  }
}
</script>
<style scoped>
/* Hallmark · component: agent-prompt · genre: editorial · theme: Monograph
 * pre-emit critique: P4 H4 E4 S4 R4 V3
 * states: default · hover · focus · active · disabled · loading · error · success */
.agent-prompt { min-width: 0; margin-block: 1rem; }
.agent-prompt-fields { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
.agent-prompt label { display: flex; flex-direction: column; gap: .375rem; font-size: .875rem; font-weight: 600; min-width: 0; color: var(--color-agent-ink-title); }
.agent-prompt-scope { grid-column: 1 / -1; }
.agent-prompt input, .agent-prompt select, .agent-prompt textarea { width: 100%; min-width: 0; border: 1px solid var(--color-agent-control-border); border-radius: var(--radius-agent-sm); background: var(--color-agent-surface); color: var(--color-agent-ink-primary); padding: .625rem .75rem; font: inherit; font-size: 1rem; font-weight: 400; box-sizing: border-box; }
.agent-prompt input, .agent-prompt select, .agent-prompt button { min-height: 44px; }
.agent-prompt textarea { resize: vertical; line-height: 1.6; overflow-wrap: anywhere; white-space: pre-wrap; font-family: var(--font-agent-mono); font-size: .875rem; }
.agent-prompt input:focus-visible, .agent-prompt select:focus-visible, .agent-prompt textarea:focus-visible, .agent-prompt button:focus-visible { outline: 2px solid var(--color-agent-focus); outline-offset: 2px; }
.agent-prompt [aria-invalid="true"] { border-color: var(--color-agent-danger); }
.field-help { min-height: 1.5em; font-size: .75rem; font-weight: 400; color: var(--color-agent-ink-tertiary); }
.question-types { grid-column: 1 / -1; min-width: 0; margin: 0; padding: .75rem; border: 1px solid var(--color-agent-control-border); border-radius: var(--radius-agent-sm); }
.question-types legend { padding-inline: .25rem; font-size: .875rem; font-weight: 600; color: var(--color-agent-ink-title); }
.question-type-options { display: flex; flex-wrap: wrap; gap: .25rem 1rem; }
.question-types .question-type-options label { display: flex; flex-direction: row; align-items: center; min-height: 44px; margin: 0; gap: .5rem; cursor: pointer; font-weight: 400; color: var(--color-agent-ink-primary); }
.question-types .question-type-options input { width: 1rem; height: 1rem; min-height: 0; padding: 0; accent-color: var(--color-agent-accent); }
.question-types[aria-invalid="true"] { border-color: var(--color-agent-danger); }
.agent-prompt-actions { display: flex; align-items: center; flex-wrap: wrap; gap: .75rem; margin-block: 1.25rem; }
.agent-prompt button { background: var(--color-agent-accent); color: var(--color-agent-accent-ink); padding: .625rem 1.25rem; border: 1px solid var(--color-agent-accent); border-radius: var(--radius-agent-sm); font-weight: 600; cursor: pointer; white-space: nowrap; transition: background-color var(--dur-agent-short) var(--ease-agent-out); }
.agent-prompt button:active:not(:disabled) { transform: translateY(1px); }
.agent-prompt button:disabled { opacity: .5; cursor: not-allowed; }
.agent-prompt button[data-state="loading"] { cursor: progress; }
.agent-prompt button[data-state="error"] { outline: 2px solid var(--color-agent-danger); outline-offset: 2px; }
.agent-prompt button[data-state="success"] { border-color: var(--color-agent-ink-secondary); }
.agent-prompt [role="status"] { font-size: .8125rem; color: var(--color-agent-ink-secondary); }
@media (hover: hover) { .agent-prompt button:hover:not(:disabled) { background: var(--color-agent-ink-secondary); } .agent-prompt input:hover, .agent-prompt select:hover, .agent-prompt textarea:hover { background: var(--color-agent-surface-hover); } }
@media (max-width: 480px) { .agent-prompt-fields { grid-template-columns: minmax(0, 1fr); } }
</style>
