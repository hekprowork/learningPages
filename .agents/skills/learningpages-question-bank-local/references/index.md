# 題庫路由

快照：2026-11-05；基準版本 e31a9d52268839e66b32a1e3c5871d967ac92175（包含本機尚未提交的 CH7–8 題庫更新）。

共 1,233 張唯一題卡。本次新增的 CH7、CH8 題卡及其圖表引用已逐卡核對；未重新驗證全題庫的所有解答。

TSV 欄位：chapter、id、title、type、topic、source、repo_path。用 `rg` 搜尋候選題，按命中列的 `repo_path` 讀 GitHub 原始題卡；同一來源檔只讀一次。索引只用於定位，不可直接依導航文字出題。

## 電路學

參考檔：circuits.tsv

- CH1：59 題
- CH2：117 題
- CH3：119 題
- CH4：134 題
- CH5：35 題
- CH6：30 題
- CH7：123 題
- CH8：111 題

## 電子學

參考檔：electronics.tsv

- CH1：112 題
- CH2：162 題
- CH3：47 題

## 工程數學

參考檔：engineering-math.tsv

- CH1：76 題
- CH2：30 題

## 固態電子導論

參考檔：solid-state.tsv

- CH1：25 題
- CH2：19 題
- CH3：34 題

## 原始檔

- 電路學：docs/circuits/practice/0001–0008（CH1–8）。
- 電子學：docs/electronics/practice-source/ 是題卡，practice 工作簿整合／導向頁不重複計入；CH1 112、CH2 162、CH3 47 張。
- 工數：docs/engineering-math/practice/0001-chapter1-examples.md、0002-chapter2-examples.md，0003-textbook-examples.md 跨 CH1–2。
- 固態：docs/solid-state/practice/0001-textbook-problems.md（CH1）、0003-chapter2-problems.md（CH2）、0004-chapter3-problems.md（CH3）。

GitHub：https://github.com/hekprowork/learningPages/blob/main/<repo_path>。
網站路徑：移除 docs/，.md 改 .html；電子學 practice-source 改 practice，CH3 以 chapter3-workbook 為整合入口。

例：找電子學 Example 1.3 時查 electronics.tsv 的 source 欄；找電路學 Problem 2.55 時查 circuits.tsv 題名／來源；找工數積分因子時查 engineering-math.tsv 主題／題名。讀取內容分頁後再出題。

