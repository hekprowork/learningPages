# 電子學 (Microelectronic Circuits) - Subject Guidelines

This file defines the domain rules and conventions for the **電子學 (Microelectronic Circuits)** subject module within the Multi-Subject monorepo.

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
  - `chapter2/`: 觀念筆記與電路推導 (Concept Notes & Derivations)
  - `chapter3/`: 核心公式速查表 (Reference Cheatsheets)
- 檔案命名必須遵循：`000x-name.md`（例如 `0001-signals-and-amplifiers.md`），以保證側邊欄與文件序列的一致性。

### 2. 符號與命名慣例 (Notation Standards)
- **總瞬時量**：小寫字母 + 大寫下標（例如 $v_A(t), i_C(t)$）。
- **直流偏壓值**：大寫字母 + 大寫下標（例如 $V_A, I_C, V_{CC}$）。
- **交流小訊號量**：小寫字母 + 小寫下標（例如 $v_a(t), i_c(t)$）。
- **相量振幅**：大寫字母 + 小寫下標（例如 $V_a, I_c$）。

### 3. KaTeX 數學公式嚴格驗證
- 行內公式使用 `$...$`，區塊公式使用 `$$...$$`。
- 文本中嚴格禁止出現未轉義的孤立 `$` 符號（應使用 `\$` 或 backticks \`$\`）。
- 每次更動必須通過 `npx vitepress build docs` 確保無 KaTeX 語法錯誤。

### 4. 路由與超連結規範
- 模組內部所有超連結必須使用絕對路徑 `/electronics/...`，禁止使用相對路徑逃逸。


## 核心專案規範

### Rule: 禁止使用非黑白 ICON (Monochrome Icon Only)
- 嚴禁使用彩色 Emoji 或非黑白圖標。全站一律採用純黑白/單色 (Black & White / Monochrome) 圖標或純文字標籤，確保排版簡約專業一致。

### Rule: PDF 檔案為最高優先資料來源 (PDF-First as Primary Source)
- 撰寫、補充與推導所有課程講義、筆記、例題與速查表時，必須以本地課本/教材之原始 PDF 檔案為最優先、最高權威的第一手資料來源（Primary Source of Truth）。
