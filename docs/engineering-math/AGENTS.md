# 工程數學 (Engineering Mathematics) - Subject Guidelines

> **Context Pointer**: 請參閱根目錄 AGENTS.md 以了解全域核心規範（Monorepo 架構、純黑白圖標原則、PDF 優先來源、多媒體嵌入規範與建置驗證指令）。

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

### 2. 符號標準與公式推導排版規範 (Notation & Derivation Standards)
- **微分算子與符號**：使用標準數學符號（如 $y', y'', \frac{dy}{dx}, \nabla, \mathcal{L}\{f(t)\}$）。
- **核心主題公式標準**：
  - 常微分方程（ODE）：分離變數法、齊次/非齊次線性 ODE、參數變異法、高階常係數 ODE。
  - 線性代數：矩陣運算、行列式、特徵值與特徵向量、對角化。
  - 拉普拉斯轉換與偏微分方程式（PDE）：初值問題求解、分離變數法解熱傳方程式與波動方程式。
- **排版要求**：複雜運算過程與多行公式推導一律使用 `$$\begin{aligned} ... \end{aligned}$$` 進行對齊與排版。

### 3. KaTeX 數學公式驗證與建置檢查
- 行內公式使用 `$...$`，區塊公式使用 `$$...$$`。
- 文本中避免未轉義的孤立 `$` 符號（應使用 `\$` 或 backticks \`$\`）。
- 每次更動後必須執行 `npx vitepress build docs` 確保無 KaTeX 語法與建置錯誤。

### 4. 路由與超連結規範
- 模組內部所有超連結必須使用絕對路徑 `/engineering-math/...`。
