# 固態電子導論 (Solid-State Electronics) - Subject Guidelines

This file defines the domain rules and conventions for the **固態電子導論 (Solid-State Electronics)** subject module within the Multi-Subject monorepo.

---

## 📚 模組定位與範圍 (Scope)
- 本模組位於 `docs/solid-state/`，專注於固態物理、晶體結構幾何學、半導體能帶理論、塊狀長晶製程與元件物理基礎。
- 所有講義與文檔均在 `/solid-state/` 路由命名空間下運作。

---

## 規範守則 (Subject Rules)

### 1. 章節命名與結構 (Chapter Conventions)
- 章節目錄結構：
  - `chapter1/`: 結晶學與材料基礎 (Crystallography & Materials)
  - `chapter2/`: 觀念筆記與公式推導 (Concept Notes & Derivations)
  - `chapter3/`: 核心公式速查表 (Reference Cheatsheets)
- 檔案命名必須遵循：`000x-name.md`（例如 `0001-miller-indices.md`），以保證側邊欄與文件序列的一致性。

### 2. 3D 互動晶格元件 (`<CrystalViewer />`)
- 晶格結構可視化採用 Three.js / WebGL 封裝之 `<CrystalViewer />` Vue 元件。
- 組件在 Client-side 掛載時必須確保 SSR 安全性（如 `typeof window !== 'undefined'` 或 Vue `onMounted` 生命週期），防止 VitePress SSR build 拋錯。

### 3. KaTeX 數學公式嚴格驗證
- 行內公式使用 `$...$`，區塊公式使用 `$$...$$`。
- 文本中嚴格禁止出現未轉義的孤立 `$` 符號（應使用 `\$` 或 backticks \`$\`）。
- 每次更動必須通過 `npx vitepress build docs` 確保無 KaTeX 語法錯誤。

### 4. 路由與超連結規範
- 模組內部所有超連結必須使用絕對路徑 `/solid-state/...`，禁止使用舊版根目錄 `/chapterX/...` 格式。
