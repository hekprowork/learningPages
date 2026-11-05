---
title: 給我的 Agent 出模考
sidebar: false
aside: false
---

<script setup>
import OfflineExamPrompt from './.vitepress/theme/components/OfflineExamPrompt.vue'
import AgentExamPrompt from './.vitepress/theme/components/AgentExamPrompt.vue'
</script>

# 給我的 Agent 出模考

選擇科目、章節與題型，網站會先篩選候選題，再產生可複製的 Prompt，讓你的 agent 自行挑題。

- **完整模式（預設）**：附候選 TSV 與原始 Markdown／LaTeX 題幹。由你的瀏覽器準備資料，agent 不需要讀取網站。
- **精簡模式**：只附候選 TSV、單題與 GitHub 原文連結。即使 agent 不能讀網址，仍可依索引選題，使用者到網站作答；不能宣稱已核對完整原題。
- **組卷網址**：要求 agent 用程式碼區塊輸出網址與 ID 清單。若可點擊連結被改成 Google 搜尋，複製程式碼內網址到瀏覽器；也可把 ID 貼回下方，讓網站核對並產生直接連結。

每批模考 1–10 題；候選題數獨立設定，留空使用全部符合條件的候選題，也可指定不小於模考題數的正整數。網站顯示實際備妥數量，載入失敗或無圖條件可能使數量減少。文字超過容量時，請減少候選題數或改用精簡模式，內容不會被截斷。圖像題可在網站看圖作答；需要 agent 解讀圖片時，請同時提供候選題 PDF。

<OfflineExamPrompt />

## 其他範圍：連網出題

跨章、跨科或自訂主題可使用以下連網 Prompt；此模式需要 agent 自行讀取原題，沒有內嵌候選集。

<AgentExamPrompt />

[直接瀏覽原題目錄](/question-reader/index.html)：每題皆有靜態 HTML，agent 可在本站完成選題，通常無需開啟 GitHub。

完整模式只需要你的瀏覽器能連到本站，模型可直接讀你貼上的完整題目。GitHub 連結只作為補充來源，不保證每個 agent 都能存取。Prompt 不會自動傳送給任何 AI 服務；請自行貼上使用。貼回選題結果只檢查 ID、題數與順序，不代表已驗證動態題卡載入。

[閱讀公開出題指引](/agent-guide) · [純文字指引](/agent-guide.txt) · [公開題目索引](/question-index)

[查看格式與模型相容性說明](/model-reading)
