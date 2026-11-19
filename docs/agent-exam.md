---
title: Agent 找相似練習
sidebar: false
aside: false
pageClass: agent-exam-page
---

<script setup>
import './.vitepress/theme/agent-exam.css'
import { withBase } from 'vitepress'
import SimilarPracticePrompt from './.vitepress/theme/components/SimilarPracticePrompt.vue'
import OfflineExamPrompt from './.vitepress/theme/components/OfflineExamPrompt.vue'
import AgentExamPrompt from './.vitepress/theme/components/AgentExamPrompt.vue'
</script>

<header class="agent-masthead">
  <span class="agent-slug">AGENT WORKFLOW · PERSISTENT CONTEXT</span>
  <h1 class="agent-title">給我的 Agent 找相似練習</h1>
  <p class="agent-exam-lead">先把完整題庫資料包加入你常用 AI 的專案或 Agent 指示。之後直接在同一個 Agent 對話貼錯題，不必每次回本頁填表或生成 Prompt；它會自行搜尋題庫並一次帶你練一題。</p>
</header>

<section class="agent-context-setup" aria-labelledby="agent-context-title">
  <div class="setup-primary">
    <h2 id="agent-context-title">設定一次，之後直接問你的 Agent</h2>
    <p class="setup-desc">下載資料包並附加到支援專案檔案或持續指示的 AI。它整合補救練習流程、完整題庫索引、章節統計和原題連結。</p>
    <p class="field-help">完成設定後，直接把錯題貼到該 AI 對話即可；作答步驟選填。Agent 會自行找相似候選並核對原題與圖表。若該 AI 無法連網，還需提供對應的離線章節檔；資料包本身不含題幹和圖片。</p>
    <div class="agent-context-actions">
      <a class="btn-primary" :href="withBase('/agent-context.txt')" download>下載 Agent context pack</a>
      <a class="btn-secondary-link" :href="withBase('/agent-context.txt')" target="_blank" rel="noreferrer">線上開啟資料包</a>
      <a class="text-arrow-link" :href="withBase('/exam.html')">前往指定題目練習 →</a>
    </div>
  </div>

  <ol class="setup-steps" aria-label="持續型 Agent 使用步驟">
    <li>
      <span class="setup-step-num">01</span>
      <div>
        <strong>附加資料包</strong>
        <span>將 <code>agent-context.txt</code> 加入專案知識或自訂指示。</span>
      </div>
    </li>
    <li>
      <span class="setup-step-num">02</span>
      <div>
        <strong>直接貼上錯題</strong>
        <span>可貼題目文字、ID 或網址；附上作答步驟能獲得針對性回饋。</span>
      </div>
    </li>
    <li>
      <span class="setup-step-num">03</span>
      <div>
        <strong>逐題練習或組卷</strong>
        <span>Agent 一次帶一題；需要多題測驗時可開出 <code>exam.html?ids=...</code>。</span>
      </div>
    </li>
  </ol>
</section>

<div class="agent-disclosures">
  <details class="agent-exam-details exam-mode-guide">
    <summary class="agent-exam-summary">使用說明</summary>
    <div class="exam-details-body">
      <p><strong>使用方式</strong></p>
      <ul>
        <li>一個欄位可貼題目文字、唯一題庫 ID、科目:ID 或 learningPages 題目網址。系統會識別已知題目 ID；同 ID 有歧義時會請你補科目。</li>
        <li>作答步驟選填；提供後 Agent 才能針對你的實際做法回饋，未提供時不應推測錯因。</li>
        <li>持續型 Agent：先下載上方資料包並加入 AI 專案或 Agent 指示；完成後直接在該 Agent 對話貼錯題，不用回來填表或重貼流程。</li>
        <li>單次聊天或需要限制搜尋範圍：展開下方 Prompt 表單。預設搜尋完整題庫與所有題型；Example 和 Exercise 只在相似程度相同時優先。</li>
        <li>資料包包含所有題目 metadata、章節題型數量及原題路由，不內嵌題幹。Agent 需核對索引完整性，再讀取可能相似題的完整題目、圖表與來源。</li>
        <li>練習一次一題，持續互動直到你掌握或停止；完整解法只在你要求或再次嘗試後提供。</li>
      </ul>
    </div>
  </details>

  <details class="agent-exam-details prompt-generator">
    <summary class="agent-exam-summary">單次聊天或需要限制搜尋範圍？生成 Prompt</summary>
    <div class="exam-details-body">
      <SimilarPracticePrompt />
    </div>
  </details>

  <details id="offline-mode" class="agent-exam-details online-exam-details">
    <summary class="agent-exam-summary">建立模考（次要功能）</summary>
    <div class="exam-details-body">
      <p class="field-help">要建立多題模考時，可使用原有的完整候選題工作台或跨章自訂出題 Prompt。原模考與試卷網址流程仍可使用。</p>
      <OfflineExamPrompt />
      <section class="freeform-prompt-section" aria-labelledby="freeform-prompt-title">
        <header class="panel-header">
          <h3 id="freeform-prompt-title" class="panel-title">跨科自由範圍出題 Prompt（純文字需求）</h3>
          <p class="panel-subtitle">適合一次混合多科、直接描述章節或主題文字，由 Agent 自行查閱公開索引與指引組卷。</p>
        </header>
        <AgentExamPrompt />
      </section>
    </div>
  </details>
</div>

<footer class="agent-exam-footer">
  <p><a :href="withBase('/question-reader/index.html')">直接瀏覽原題目錄</a>：每題皆有靜態 HTML，agent 可在本站完成選題，通常無需開啟 GitHub。</p>
  <p class="field-help">Prompt 不會自動傳送給任何 AI 服務；請自行貼到你信任的 Agent。題庫來源或圖表讀取失敗時，Agent 應說明限制，不得聲稱已核實。</p>
  <nav class="agent-exam-links" aria-label="參考連結">
    <a :href="withBase('/agent-guide')">閱讀公開出題指引</a>
    <a :href="withBase('/agent-guide.txt')">純文字指引</a>
    <a :href="withBase('/question-index')">公開題目索引</a>
    <a :href="withBase('/model-reading')">相容性說明</a>
    <a :href="withBase('/exam')">指定題目練習頁</a>
  </nav>
</footer>
