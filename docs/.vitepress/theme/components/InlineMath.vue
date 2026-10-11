<script setup lang="ts">
import { computed } from 'vue'
import katex from 'katex'

const props = defineProps<{
  tex: string
  display?: boolean
}>()

const renderedMath = computed(() =>
  katex.renderToString(props.tex, {
    displayMode: props.display ?? false,
    output: 'htmlAndMathml',
    strict: 'ignore',
    throwOnError: false
  })
)
</script>

<template>
  <span class="inline-math" v-html="renderedMath"></span>
</template>
