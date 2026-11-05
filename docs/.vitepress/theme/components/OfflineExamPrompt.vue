<template>
  <section id="offline-mode" class="offline-model">
    <div class="offline-controls">
      <h2>模型讀不到網站？免連網出題</h2>
      <p>由你的瀏覽器備妥候選原題，再將完整文字貼給模型；圖像題另存成 PDF 上傳。模型本身不用讀網址。</p>
      <div class="offline-fields">
        <label>科目<select v-model="request.subject"><option v-for="q in subjects" :key="q.value" :value="q.value">{{ q.label }}</option></select></label>
        <label>章節<select v-model="request.chapter"><option v-for="chapter in chapters" :key="chapter" :value="chapter">Chapter {{ chapter }}</option></select></label>
        <label>模考題數（1–10）<input v-model="request.count" type="number" min="1" max="10" /></label>
        <label>作答時間（分鐘）<input v-model="request.minutes" type="number" min="1" /></label>
        <label>題型<select v-model="request.type"><option v-for="q in TYPE_OPTIONS" :key="q.value" :value="q.value">{{ q.label }}</option></select></label>
      </div>
      <label class="offline-checkbox"><input v-model="request.textOnly" type="checkbox" />模型無法讀圖：只選無圖題</label>
      <button :disabled="busy" @click="prepare">{{ busy ? '正在備妥原題…' : '準備候選原題' }}</button>
      <p role="status">{{ message }}</p>
      <template v-if="bundle">
        <p>已備妥 {{ bundle.entries.length }} 題候選供模型選題。<strong v-if="bundle.entries.some(q=>q.hasFigures)">含圖像題：請同時上傳下方候選題 PDF。</strong></p>
        <button @click="copy">複製完整題目 Prompt</button>
        <button @click="print">列印／存成 PDF</button>
        <label>完整原題 Prompt<textarea ref="preview" :value="bundle.prompt" readonly rows="12" /></label>
      </template>
    </div>
    <div v-if="bundle" class="offline-print">
      <h2>模擬考候選原題（{{ bundle.entries.length }} 題）</h2>
      <article v-for="(q,i) in bundle.entries" :key="q.id" class="offline-question">
        <h3>候選 {{ i+1 }}：{{ q.subject }}:{{ q.id }} — {{ q.title }}</h3>
        <div v-html="q.statement" />
      </article>
    </div>
  </section>
</template>
<script setup>
import {ref,reactive,computed,watch} from 'vue'
import {withBase} from 'vitepress'
import {data as catalog} from './question-catalog.data.js'
import {SUBJECT_OPTIONS,TYPE_OPTIONS} from './agent-exam-prompt.js'
import {prepareOfflineExam} from './offline-exam.js'
const subjects=SUBJECT_OPTIONS.filter(q=>q.value!=='mixed')
const request=reactive({subject:'circuits',chapter:'4',count:5,minutes:60,type:'example,practice',textOnly:false})
const chapters=computed(()=>[...new Set(catalog.filter(q=>q.subject===request.subject).map(q=>q.chapter))].sort((a,b)=>Number(a)-Number(b)))
const bundle=ref(null),busy=ref(false),message=ref('每次準備最多 20 題候選，模型再依需求選出模考題。'),preview=ref(null)
watch(()=>request.subject,()=>{request.chapter=chapters.value[0]||''})
watch(request,()=>{bundle.value=null;message.value='條件已變更，請重新準備原題。'})
let generation=0
async function prepare(){
 if(busy.value)return
 const current=++generation;const snapshot={...request};busy.value=true;bundle.value=null;message.value='正在從本站讀取原題；這一步由你的瀏覽器執行。'
 try{const result=await prepareOfflineExam(catalog,snapshot,window.fetch.bind(window),DOMParser,new URL(withBase('/'),location.origin).href);if(current===generation&&JSON.stringify(request)===JSON.stringify(snapshot)){bundle.value=result;message.value=result.failures.length?'部分來源未載入，已使用其餘符合條件的原題；可重試。':'原題已備妥，請複製完整 Prompt。'}else message.value='條件已變更，請重新準備原題。'}catch(error){message.value=error.message}finally{busy.value=false}
}
async function copy(){try{await navigator.clipboard.writeText(bundle.value.prompt);message.value='已複製完整題目。含圖像題時，請把 PDF 一起上傳給模型。'}catch{preview.value?.focus();preview.value?.select();message.value='自動複製失敗，已選取文字，請手動複製。'}}
function print(){const images=[...document.querySelectorAll('.offline-print img')];if(images.some(image=>!image.complete||!image.naturalWidth)){message.value='仍有圖片尚未載入，請稍候再列印；若持續失敗請重新準備原題。';return}window.print()}
</script>
<style scoped>
.offline-model{margin-block:2rem;min-width:0}.offline-fields{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem}.offline-controls label{display:flex;flex-direction:column;gap:.4rem;margin-block:.75rem}.offline-controls input,.offline-controls select,.offline-controls textarea{font:inherit;font-size:1rem;padding:.6rem;border:1px solid var(--vp-c-border);border-radius:4px;min-width:0;background:var(--vp-c-bg);color:var(--vp-c-text-1)}.offline-controls textarea{resize:vertical;line-height:1.6;white-space:pre-wrap;overflow-wrap:anywhere}.offline-controls .offline-checkbox{flex-direction:row;align-items:center}.offline-controls button{padding:.6rem .8rem;min-height:44px;margin:.3rem .5rem .3rem 0;border:1px solid var(--vp-c-border);border-radius:4px;white-space:nowrap}.offline-controls button:disabled{opacity:.5;cursor:progress}.offline-controls :focus-visible{outline:2px solid var(--hub-focus);outline-offset:2px}.offline-print :deep(img),.offline-print :deep(svg){max-width:100%;height:auto}.offline-question{margin-block:2rem}@media(max-width:480px){.offline-fields{grid-template-columns:minmax(0,1fr)}}
@media print{:global(body:has(.offline-print)) :global(.VPNav),:global(body:has(.offline-print)) :global(.VPLocalNav),:global(body:has(.offline-print)) :global(.VPSidebar),:global(body:has(.offline-print)) :global(.VPFooter),:global(body:has(.offline-print)) :global(.VPDocFooter),:global(body:has(.offline-print)) :global(.vp-doc>div>:not(.offline-model)){display:none!important}.offline-controls{display:none!important}.offline-question{break-before:page}.offline-question:first-of-type{break-before:auto}:global(body:has(.offline-print)) :global(.VPContent){padding:0!important}}
</style>
