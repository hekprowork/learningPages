# 固態電子導論 (Solid-State Electronics) - Subject Guidelines

> **Context Pointer**: 請參閱根目錄 AGENTS.md 以了解全域核心規範（Monorepo 架構、純黑白圖標原則、PDF 優先來源、多媒體嵌入規範與建置驗證指令）。

---

## 📚 模組定位與範圍 (Scope)
- 本模組位於 `docs/solid-state/`，專注於固態物理、晶體結構幾何學、半導體能帶理論、塊狀長晶製程與元件物理基礎。
- 所有講義與文檔均在 `/solid-state/` 路由命名空間下運作。

---

## 規範守則 (Subject Rules)

### 1. 章節命名與結構 (Chapter Conventions)
- 章節目錄結構：
  - `chapter1/`: 結晶學與材料基礎 (Crystallography & Materials)
  - `chapter2/`: 原子與電子 (Atoms and Electrons)
  - `learning-records/`: 學習進度與延伸紀錄 (Learning Records)
  - `reference/`: 核心公式速查表 (Reference Cheatsheets)
- 檔案命名必須遵循：`000x-name.md`（例如 `0001-miller-indices.md`），以保證側邊欄與文件序列的一致性。

### 2. 固態電子專業術語與互動元件規範 (Terminology & SSR Safety)
- **核心術語**：米勒指數（Miller Indices）、晶格常數、能帶彎曲（Band Bending）、能隙（Bandgap）、載子擴散與漂移。
- **3D 互動晶格元件 (`<CrystalViewer />`)**：
  - 晶格結構可視化採用 Three.js / WebGL 封裝之 `<CrystalViewer />` Vue 元件。
  - 組件在 Client-side 掛載時必須確保 SSR 安全性（如 `if (typeof window !== 'undefined')` 或 Vue `onMounted` 生命週期），防止 VitePress SSR build 拋錯。

### 3. KaTeX 數學公式驗證與建置檢查
- 行內公式使用 `$...$`，區塊公式使用 `$$...$$`。
- 文本中避免未轉義的孤立 `$` 符號（應使用 `\$` 或 backticks \`$\`）。
- 每次更動後必須執行 `npx vitepress build docs` 確保無 KaTeX 語法與建置錯誤。

### 4. 路由與超連結規範
- 模組內部所有超連結必須使用絕對路徑 `/solid-state/...`。
