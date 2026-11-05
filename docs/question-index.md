---
title: 公開題目索引
---

<script setup>
import { data as indexVersion } from './question-index.data.js'
</script>

# 公開題目索引

<p>本次發布來源版本（source_commit）：<code>{{ indexVersion.source_commit || 'unavailable' }}</code>。也可讀取<a href="/learningPages/question-index/version.txt">純文字版本資訊</a>。</p>

任何人都能直接 GET 下列 UTF-8 TSV，無需登入 GitHub 或使用 API。檔案隨網站建置自動從原始索引發布，每次部署都檢查內容完全一致。

| 科目 | TSV 直連 |
| --- | --- |
| 電路學 | [circuits.tsv](/question-index/circuits.tsv) |
| 電子學 | [electronics.tsv](/question-index/electronics.tsv) |
| 工程數學 | [engineering-math.tsv](/question-index/engineering-math.tsv) |
| 固態電子導論 | [solid-state.tsv](/question-index/solid-state.tsv) |

JSON 與 SHA-256 為可選的程式校驗資訊，讀不到 JSON 或無法計算雜湊仍可直接使用上方 TSV 出題。

[manifest.json：檔案清單、各科題量、SHA-256 與來源版本](/question-index/manifest.json)

[Agent 直接讀原題：科目章節目錄與單題 HTML](/question-reader/index.html)

## 外部程式讀取

```python
import csv
import io
from urllib.request import urlopen

url = "https://hekprowork.github.io/learningPages/question-index/circuits.tsv"
with urlopen(url) as response:
    rows = list(csv.DictReader(io.StringIO(response.read().decode("utf-8")), delimiter="\t"))
```

索引欄位：`chapter`、`id`、`title`、`type`、`topic`、`source`、`repo_path`。`repo_path` 是 GitHub Repository 內的原題檔案路徑，並非直接對應的網站網址；電子學原始題卡由工作簿整合發布。

[讓我的 Agent 出模考：填寫需求並複製 Prompt](/agent-exam)

## 用索引組卷

依科目、章節、題型與主題選好 ID 後，使用同一個 [指定題目練習頁](/exam) 出題，支援跨章、跨科。

```text
https://hekprowork.github.io/learningPages/exam.html?ids=ch4-ex-4-1,math-ch3-prob-1
```

題目依 `ids` 順序顯示。詳細格式見[網址選題說明](/question-links)。TSV 是定位資料，不包含完整題幹；核對題目與圖表時請讀原頁或依 `repo_path` 讀原始檔。

這些 TSV 代表最近一次成功部署的版本；GitHub 尚未部署的更新不會立即出現在此處。需要確認下載內容時，將檔案 SHA-256 與 `manifest.json` 對照。
