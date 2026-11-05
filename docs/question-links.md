---
title: 用網址指定練習題
---

# 用網址指定練習題

LLM 從[公開題庫 TSV 索引](/question-index)選好題目後，可將 `id` 放入同一個組卷網址，直接混合跨章、跨科題目。

[跨科範例：電路學第四章、工程數學第三章、固態電子第三章](/exam?ids=ch4-ex-4-1,math-ch3-prob-1,ss-ch3-p3-1)

```text
https://hekprowork.github.io/learningPages/exam.html?ids=ch4-ex-4-1,math-ch3-prob-1,ss-ch3-p3-1
```

- 題目按網址中的順序顯示，重複 ID 只顯示一次，也接受 `?ids=ID1&ids=ID2`。
- ID 與 TSV 索引一致；若未來有科目共用 ID，可寫成 `circuits:題目ID` 等 `科目:ID` 形式。
- 缺少或空的 `ids` 不會列出整個題庫；未知 ID、原頁載入失敗、找不到題卡會逐題提示，可點「重新載入」。
- 題幹、圖片、公式與詳解取自已發布的原頁。詳解預設收合，每題有「查看原頁」連結。
- 完成勾選沿用原題紀錄；網址分享的是題目清單，不會分享個人的完成紀錄。
- LLM 組網址時應使用 `URLSearchParams` 編碼 ID。此頁需執行 JavaScript，純文字抓取工具應依 TSV 的 `repo_path` 及 `id` 讀取原題。

## 篩選單一原頁

原頁仍支援 `?ids=`，例如：

[電路學第四章：Example 4.1 與 Practice 4.1](/circuits/practice/0004-chapter4-examples?ids=ch4-ex-4-1,ch4-pr1)

此模式只篩選該原頁。需要跨頁時請使用上方 `/exam.html`；原頁內的題型分類、進度統計與重設會限制在指定題目內。
