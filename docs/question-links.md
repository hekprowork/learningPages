---
title: 用網址指定練習題
---

# 用網址指定練習題

LLM 可從題庫 TSV 索引取得 `repo_path` 與 `id`，產生只顯示指定題目的連結。

在原練習頁網址後加上 `?ids=題目ID1,題目ID2`。例如：

[電路學第四章：Example 4.1 與 Practice 4.1](/circuits/practice/0004-chapter4-examples?ids=ch4-ex-4-1,ch4-pr1)

```text
https://hekprowork.github.io/learningPages/circuits/practice/0004-chapter4-examples.html?ids=ch4-ex-4-1,ch4-pr1
```

- `id` 必須與索引完全相符；也接受 `?ids=ID1&ids=ID2`。
- 連結只篩選目前頁面的題目；跨頁選題須依 `repo_path` 分組，每頁產生一個連結。
- `repo_path` 去掉開頭的 `docs/`，將 `.md` 換成 `.html`，即可組成網頁路徑。使用 `URLSearchParams` 編碼參數。
- 題目依原頁面順序顯示；分類按鈕在指定題目內繼續篩選。
- 空的 `ids=` 顯示零題；找不到的 ID 會列出提示，不會自動顯示全部。
- 詳解預設收合，點選「查看詳解」即可開啟。
- 「顯示本頁全部題目」會移除 `ids`；瀏覽器上一頁可回到選題結果。

這是靜態網站的 GET 網址參數，由瀏覽器載入後套用。純文字抓取工具若不執行 JavaScript，仍會讀到原頁全部題目；LLM 讀取原題時應依索引 ID 定位。
