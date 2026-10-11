# 0003: 教材題目與網頁題卡對帳報告

- **Status**: In progress
- **Date**: 2026-10-12

## 目的

本報告記錄本地教材 PDF 的題目清單、網頁 `<PracticeCard>` 覆蓋狀態，以及「直接可追溯到教材」與「課堂投影片整理」兩種來源標註的差異。

## 電路學：教材 Example / Practice Problem 對帳

來源為 [`docs/circuits/課本.pdf`](/circuits/)，以 PDF 閱讀頁碼為 `source="課本 p.N"` 的 `N`。盤點範圍是第 1–6 章正文中的 Example 與 Practice Problem，不包含章末 Review Questions。

| 章節 | 教材題數 | 網頁題卡 | 狀態 |
|:---|---:|---:|:---|
| Chapter 1 | 20 | 20 | 已補齊 |
| Chapter 2 | 34 | 34 | 已補齊 |
| Chapter 3 | 26 | 26 | 已補齊 |
| Chapter 4 | 36 | 36 | 已補齊 |
| Chapter 5 | 26 | 26 | 已補齊 |
| Chapter 6 | 30 | 30 | 已補齊 |

第 2、4、5 章原有的課堂投影片題卡保留不刪；本次新增或補正的教材題卡使用 `source="課本 p.N"`，並將題目引用的電路圖放在同一張題卡內。第 6 章原有 `Page N` 標註也已統一為教材 PDF 頁碼格式。

來源欄位審核顯示，電路學目前 175 張 PracticeCard 中有 122 張明確標註 `課本 p.N`，另 53 張明確標註為投影片、作業索引或其他課堂來源；後者不能僅因題號相似就宣稱是教科書原題。上表的「已補齊」只代表本次定義的教材 Example/Practice Problem 題號對帳，不代表每一張既有投影片題卡都已取得課本頁碼證據。

## 電子學

來源為 `docs/electronics/課本.pdf`（Sedra/Smith, 8th ed.）。正文 Example 已完整覆蓋 Chapter 1 的 1.1–1.5 與 Chapter 2 的 2.1–2.9；目前網站納入的 Chapter 1–2 教材範圍已全部逐題上網，共 274 張教材題卡：Chapter 1 Exercises 24/24、Chapter 2 Exercises 26/26，Chapter 1 Problems 83/83、Chapter 2 Problems 127/127。這是「目前網站 Chapter 1–2 範圍完成」，不宣稱整本 PDF 其他章節也已完成；完整題號與批次索引見 [`electronics/practice/0003-textbook-missing.md`](/electronics/practice/0003-textbook-missing)。

## 工程數學

工程數學沒有單一本與電子學/電路學相同的統一教科書；本地來源是課程講義、題庫、解答 PDF 與歷屆試題。既有題庫保留原來源標註，另新增 [`engineering-math/practice/0003-textbook-examples.md`](/engineering-math/practice/0003-textbook-examples)，補入正式教材第一、二章可辨識且逐題推導的 35 個例題。這些題卡標註為「正式教材」，不把講義/題庫題誤報成教科書題。

## 固態電子

來源為 `docs/solid-state/sspd-eee-swapnil.pdf`（Streetman & Banerjee, 7th ed.）。已建立 [`solid-state/practice/0001-textbook-problems.md`](/solid-state/practice/0001-textbook-problems)，放入 Chapter 1 Problems 1.1–1.19、Self Quiz 1–6，以及 Chapter 2 Problems 2.1–2.13、Self Quiz 1–6，共 44 張；題目引用的原圖已裁切並放在 `docs/solid-state/assets/images/` 同屏顯示。Problems 在教材答案頁沒有標準答案，題卡明確標註需自行解題；Self Quiz 則依答案頁對帳。

## 驗收規則

每次新增教材題卡後，必須通過：

1. `npm run check:katex`
2. `npx vitepress build docs`
3. 圖片路徑存在、題卡 ID 不重複、題幹引用的圖表與題卡同屏。
