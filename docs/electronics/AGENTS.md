# 電子學 (Microelectronic Circuits) - Subject Guidelines

> **Context Pointer**: 請參閱根目錄 AGENTS.md 以了解全域核心規範（Monorepo 架構、純黑白圖標原則、PDF 優先來源、多媒體嵌入規範與建置驗證指令）。

---

## 📚 模組定位與範圍 (Scope)
- 本模組位於 `docs/electronics/`，專注於類比與微電子電路分析、運算放大器、二極體、BJT 與 MOSFET 小訊號模型、頻率響應與回授放大器。
- 遵循 Sedra & Smith《Microelectronic Circuits》經典教材標準命名法與符號慣例。
- 所有講義與文檔均在 `/electronics/` 路由命名空間下運作。

---

## 規範守則 (Subject Rules)

### 1. 章節命名與結構 (Chapter Conventions)
- 章節目錄結構：
  - `chapter1/`: 訊號與放大器基礎 (Signals & Amplifiers)
  - `chapter2/`: 運算放大器 (Operational Amplifiers)
  - `learning-records/`: 觀念筆記與電路推導 (Concept Notes & Derivations)
  - `reference/`: 核心公式速查表 (Reference Cheatsheets)
  - `practice/`: 互動式範例與練習題庫 (Interactive Practice Workbooks)
- 檔案命名必須遵循：`000x-name.md`（例如 `0001-signals-and-amplifiers.md`），以保證側邊欄與文件序列的一致性。

### 2. 微電子學變數命名與符號慣例 (Notation Standards)
- **總瞬時量**：小寫字母 + 大寫下標（例如 $v_A(t), i_C(t)$）。
- **直流偏壓值**：大寫字母 + 大寫下標（例如 $V_A, I_C, V_{CC}$）。
- **交流小訊號量**：小寫字母 + 小寫下標（例如 $v_a(t), i_c(t)$）。
- **相量振幅**：大寫字母 + 小寫下標（例如 $V_a, I_c$）。
- **核心元件分析標準**：二極體非線性大信號與小信號模型、BJT/MOSFET 直流工作點計算與混合 $\pi$ / T 型小訊號參數推導。

### 3. KaTeX 數學公式驗證與建置檢查
- 行內公式使用 `$...$`，區塊公式使用 `$$...$$`。
- 文本中避免未轉義的孤立 `$` 符號（應使用 `\$` 或 backticks \`$\`）。
- 每次更動後必須執行 `npx vitepress build docs` 確保無 KaTeX 語法與建置錯誤。

### 4. 路由與超連結規範
- 模組內部所有超連結必須使用絕對路徑 `/electronics/...`。
