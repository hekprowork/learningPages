# 0002: 多科目集中託管架構與自動匯入規範

- **Status**: Accepted
- **Date**: 2026-10-03

## Context
本知識庫最初僅針對「固態電子導論」單一學科設計，所有章節目錄直接散落於 `docs/chapter1/`、`docs/chapter2/` 等根目錄下。隨著學習範疇擴展，後續將加入電子學、計算機組織、電磁學等多門核心工程與科學學科。若繼續維持平鋪單一科目架構，將導致側邊欄過長難以閱讀、章節檔名衝突、以及不同學科間的互動元件規範難以獨立維護。

## Decision
我們決定將 VitePress 重構為 **多科目集中託管架構 (Multi-Subject Monorepo Architecture)**：

1. **模組化命名空間與目錄隔離**：
   - 每個學科建立專屬資料夾於 `docs/<subject-slug>/`（例如：`docs/solid-state/`）。
   - 將既有章節移入該命名空間下（如 `docs/solid-state/chapter1/`、`chapter2/`、`chapter3/`）。
   - 每個學科必備 `index.md` 作為該學科之導讀總覽與章節目錄首頁。
2. **多路徑側邊欄隔離 (Multi-Path Sidebar Routing)**：
   - 在 `docs/.vitepress/config.mts` 中使用 VitePress 依路徑切換側邊欄的機制：
     ```ts
     sidebar: {
       '/solid-state/': [ /* 固態電子導論章節 */ ],
       // 未來新科目擴充範例：
       // '/circuits/': [ /* 電子學章節 */ ]
     }
     ```
   - 頂部導航列 (`nav`) 提供「📚 選擇科目」下拉選單，支援跨科目快速切換。
3. **入口入口網站 (Curriculum Portal Hub)**：
   - 根目錄 `docs/index.md` 升級為多學科入口總覽頁面，提供科目卡片導航、學科狀態看板與未來規劃預留欄位。
4. **分層代理規範 (Hierarchical AGENTS.md)**：
   - 根目錄 `AGENTS.md`：定義 Monorepo 架構、安全守則、全域規範與新科目引入流程 (SOP)。
   - 學科目錄 `docs/<subject-slug>/AGENTS.md`：定義該科目專屬的物理公式推導、專業命名、特定 Vue 互動元件（如 `<CrystalViewer />`）與細部驗證守則。
5. **部署設定統一**：
   - 設定 `base: '/learningPages/'` 以符合 GitHub Pages 託管與專案命名。

## Consequences
- **Positive (正面效益)**：
  - **模組擴展性強**：新增任何新學科無需更動既有學科檔案，僅需新增資料夾並在 `config.mts` 註冊路由。
  - **使用者體驗純粹**：讀者進入特定學科時，側邊欄僅呈現該學科相關章節，避免資訊過載。
  - **AI Agent Context 隔離**：子代理可鎖定單一學科子目錄執行任務，降低 Token 消耗並提升程式碼品質。
- **Negative (負面影響 / 代價)**：
  - 各章節之絕對路由必須帶入學科前綴（例如 `/solid-state/chapter1/...`），既有靜態連結需配合遷移。
