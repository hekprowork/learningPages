# 工程數學 (Engineering Mathematics) - Subject Guidelines

This file defines the domain rules and conventions for the **工程數學 (Engineering Mathematics)** subject module within the Multi-Subject monorepo.

---

## 📚 模組定位與範圍 (Scope)
- 本模組位於 `docs/engineering-math/`，專注於常微分方程式（ODE）、線性代數、拉普拉斯轉換、向量微積分與偏微分方程式（PDE）等工程數學核心工具。
- 所有講義與文檔均在 `/engineering-math/` 路由命名空間下運作。

---

## 規範守則 (Subject Rules)

### 1. 章節命名與結構 (Chapter Conventions)
- 章節目錄結構：
  - `chapter1/`: 常微分方程與實戰解法 (Ordinary Differential Equations)
  - `chapter2/`: 觀念筆記與公式推導 (Concept Notes & Derivations)
  - `chapter3/`: 核心公式速查表 (Reference Cheatsheets)
- 檔案命名必須遵循：`000x-name.md`（例如 `0001-integrating-factor-method.md`），以保證側邊欄與文件序列的一致性。

### 2. KaTeX 數學公式嚴格驗證
- 行內公式使用 `$...$`，區塊公式使用 `$$...$$`。
- 文本中嚴格禁止出現未轉義的孤立 `$` 符號（應使用 `\$` 或 backticks \`$\`）。
- 每次更動必須通過 `npx vitepress build docs` 確保無 KaTeX 語法錯誤。

### 3. 路由與超連結規範
- 模組內部所有超連結必須使用絕對路徑 `/engineering-math/...`，禁止使用相對路徑逃逸或無前綴的路徑。


## 核心專案規範

### Rule: 禁止使用非黑白 ICON (Monochrome Icon Only)
- 嚴禁使用彩色 Emoji 或非黑白圖標。全站一律採用純黑白/單色 (Black & White / Monochrome) 圖標或純文字標籤，確保排版簡約專業一致。

### Rule: PDF 檔案為最高優先資料來源 (PDF-First as Primary Source)
- 撰寫、補充與推導所有課程講義、筆記、例題與速查表時，必須以本地課本/教材之原始 PDF 檔案為最優先、最高權威的第一手資料來源（Primary Source of Truth）。
