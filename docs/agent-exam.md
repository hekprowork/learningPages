---
title: 給我的 Agent 出模考
sidebar: false
aside: false
pageClass: agent-exam-page
---

<script setup>
import './.vitepress/theme/agent-exam.css'
import { withBase } from 'vitepress'
import OfflineExamPrompt from './.vitepress/theme/components/OfflineExamPrompt.vue'
import AgentExamPrompt from './.vitepress/theme/components/AgentExamPrompt.vue'
</script>

# 給我的 Agent 出模考

<p class="agent-exam-lead">選擇科目、章節與題型，網站先篩選候選題並備妥題幹，產生可直接複製的出題 Prompt 給你的個人 Agent。</p>

<details class="agent-exam-details exam-mode-guide">
  <summary class="agent-exam-summary">使用說明</summary>
  <div class="exam-details-body">
    <p><strong>出題模式與使用說明（完整模式／精簡模式／組卷網址）：</strong></p>
    <ul>
      <li><strong>完整模式（預設）</strong>：附候選 TSV 與原始 Markdown／LaTeX 題幹。由你的瀏覽器準備資料，agent 不需要讀取網站。</li>
      <li><strong>精簡模式</strong>：只附候選 TSV、單題與 GitHub 原文連結。即使 agent 不能讀網址，仍可依索引選題，使用者到網站作答；不能宣稱已核對完整原題。</li>
      <li><strong>組卷網址</strong>：要求 agent 用程式碼區塊輸出網址與 ID 清單。若可點擊連結被改成 Google 搜尋，複製程式碼內網址到瀏覽器；也可把 ID 貼回下方，讓網站核對並產生直接連結。</li>
    </ul>
    <p>每批模考 1–10 題；候選題數獨立設定，留空使用全部符合條件的候選題，也可指定不小於模考題數的正整數。網站顯示實際備妥數量，載入失敗或無圖條件可能使數量減少。文字超過容量時，請減少候選題數或改用精簡模式，內容不會被截斷。圖像題可在網站看圖作答；需要 agent 解讀圖片時，請同時提供候選題 PDF。</p>
  </div>
</details>

<OfflineExamPrompt />

<details class="agent-exam-details online-exam-details">
  <summary class="agent-exam-summary">跨章與自訂出題</summary>
  <div class="exam-details-body">
    <p class="field-help">其他範圍：連網出題。跨章、跨科或自訂主題可使用以下連網 Prompt；此模式需要 agent 自行讀取原題，沒有內嵌候選集。</p>
    <AgentExamPrompt />
  </div>
</details>

<footer class="agent-exam-footer">
  <p><a :href="withBase('/question-reader/index.html')">直接瀏覽原題目錄</a>：每題皆有靜態 HTML，agent 可在本站完成選題，通常無需開啟 GitHub。</p>
  <p class="field-help">完整模式只需要你的瀏覽器能連到本站，模型可直接讀你貼上的完整題目。GitHub 連結只作為補充來源，不保證每個 agent 都能存取。Prompt 不會自動傳送給任何 AI 服務；請自行貼上使用。貼回選題結果只檢查 ID、題數與順序，不代表已驗證動態題卡載入。</p>
  <nav class="agent-exam-links" aria-label="參考連結">
    <a :href="withBase('/agent-guide')">閱讀公開出題指引</a>
    <span class="rule-divider">·</span>
    <a :href="withBase('/agent-guide.txt')">純文字指引</a>
    <span class="rule-divider">·</span>
    <a :href="withBase('/question-index')">公開題目索引</a>
    <span class="rule-divider">·</span>
    <a :href="withBase('/model-reading')">相容性說明</a>
  </nav>
</footer>
