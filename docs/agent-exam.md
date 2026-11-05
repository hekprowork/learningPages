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

能讀取網站的 agent：填寫需求並複製下方連網 Prompt。若模型不能連網或工具拒絕本站，改用「免連網出題」，由你的瀏覽器備妥完整原題，再貼給模型；圖像題需附 PDF。

[模型讀不到網址？使用免連網模式](#offline-mode)

<AgentExamPrompt />

<OfflineExamPrompt />

[直接瀏覽原題目錄](/question-reader/index.html)：每題皆有靜態 HTML，agent 可在本站完成選題，通常無需開啟 GitHub。

連網模式需要 agent 能讀取公開網址；免連網模式只需要你的瀏覽器能連到本站，模型可直接讀你貼上的完整題目。Prompt 不會自動傳送給任何 AI 服務；請自行貼上使用。

[閱讀公開出題指引](/agent-guide) · [純文字指引](/agent-guide.txt) · [公開題目索引](/question-index)

[查看格式與模型相容性說明](/model-reading)
