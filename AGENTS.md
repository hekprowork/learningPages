# 學習筆記庫 (Learning Pages) - Multi-Subject Monorepo Guidelines & Rules

Welcome to the **多科目學習筆記與課程知識庫 (Learning Pages)** project! This repository hosts multiple engineering and science course materials, chapters, interactive simulations, and documentation built with **VitePress** and deployed to **GitHub Pages**.

---

## 🏗️ 多科目 Monorepo 架構 (Multi-Subject Monorepo Layout)

本專案採模組化目錄分治與路徑隔離架構：

```text
docs/
├── index.md                    # 跨學科門戶首頁 (Curriculum Portal Hub)
├── adr/                        # 架構決策記錄 (Architecture Decision Records)
│   ├── 0001-vitepress-github-pages-migration.md
│   └── 0002-multi-subject-monorepo-architecture.md
├── .vitepress/                 # 全域 VitePress 配置與主題
│   ├── config.mts              # 導航列、多科目側邊欄路由設定
│   └── theme/                  # 自定義主題樣式與全域 Vue 元件
├── solid-state/                # [科目] 固態電子導論 (Solid-State Electronics)
│   ├── AGENTS.md               # 科目專屬規則
│   ├── index.md                # 科目導讀與章節大綱首頁
│   ├── chapter1/               # 結晶學與材料基礎
│   ├── chapter2/               # 觀念筆記與公式推導
│   └── chapter3/               # 核心公式速查表
├── electronics/                # [科目] 電子學 (Electronics)
│   ├── AGENTS.md               # 科目專屬規則
│   ├── index.md                # 訊號與放大器基礎
│   ├── chapter1/ ~ chapter3/   # 課程、觀念筆記與速查表
│   └── assets/, learning-records/, lessons/, reference/
├── circuits/                   # [科目] 電路學 (Circuits)
│   ├── AGENTS.md               # 科目專屬規則
│   ├── index.md                # 電路分析與網路等效
│   ├── chapter1/ ~ chapter3/   # 課程、觀念筆記與速查表
│   └── assets/, practice/, learning-records/, lessons/, reference/
├── engineering-math/           # [科目] 工程數學 (Engineering Math)
│   ├── AGENTS.md               # 科目專屬規則
│   ├── index.md                # 常微分方程與實戰解法
│   ├── chapter1/ ~ chapter3/   # 課程、觀念筆記與速查表
│   └── assets/, practice/, learning-records/, lessons/, reference/
└── <new-subject>/              # [未來科目] 例如 comp-arch, electromagnetics
```

---

## 🚨 核心專案規範 (Core Project Rules)

### 1. Secret Token Protection
- **Never** commit API keys, personal access tokens, credentials, or `.env` secrets into the repository.
- Always use environment variables or local mock fallbacks for sensitive configurations.

### 2. Large PDF & `.gitignore` Management
- **Never** commit large binary files such as large textbooks or course PDFs (e.g., `*.pdf`) directly into Git.
- Ensure `.gitignore` properly excludes build outputs, dependency directories, environment files, and local PDF files.

### 3. 多科目路徑命名空間與章節命名規範
- 每個科目必須有自己的獨立目錄：`docs/<subject-slug>/`。
- 章節檔案必須遵循嚴格編號命名慣例：`000x-name.md`（例如 `0001-miller-indices.md`）。
- 內部超連結一律使用帶有科目路徑前綴的絕對路徑（如 `/solid-state/chapter1/0001-miller-indices`）。

### 4. 互動元件安全掛載 (Interactive Components & SSR Safety)
- 互動式 3D 模擬元件（如 Three.js `<CrystalViewer />`）或其他 DOM 依賴元件必須確保 client-side 渲染安全性（使用 `if (typeof window !== 'undefined')` 或 Vue `onMounted` 生命週期），以防止 VitePress build 時發生 SSR 錯誤。

### 5. KaTeX 數學公式自主檢查 (Autonomous KaTeX Syntax Validation)
- 行內公式使用 `$...$`，區塊公式使用 `$$...$$`。
- 自主驗證 LaTeX 語法，禁止在一般文字中出現未轉義的孤立 `$` 符號。
- 任何變更均須通過 `npx vitepress build docs` 檢查。

---

## ➕ 如何匯入 / 新增新科目 (How to Import a New Subject Folder)

當需要新增或匯入一門新學科時，請依照下列標準流程 (SOP)：

1. **建立科目目錄**：
   在 `docs/` 下建立專屬 slug 目錄，例如：
   ```bash
   mkdir -p docs/<subject-slug>
   ```

2. **建立科目首頁與專屬規範**：
   - 建立 `docs/<subject-slug>/index.md`：介紹該科目大綱、導航與主要章節連結。
   - 建立 `docs/<subject-slug>/AGENTS.md`：記錄該科目專屬的領域術語、互動元件規則與章節命名規範。

3. **放置章節內容**：
   - 建立 `chapter1/`、`chapter2/` 等子目錄。
   - 文件遵循 `000x-name.md` 命名。

4. **更新 VitePress 設定 (`docs/.vitepress/config.mts`)**：
   - 在 `themeConfig.nav` 的「📚 選擇科目」項目中追加新科目連結：
     ```ts
     { text: '新科目名稱', link: '/<subject-slug>/' }
     ```
   - 在 `themeConfig.sidebar` 註冊該科目的專屬側邊欄：
     ```ts
     '/<subject-slug>/': [
       {
         text: 'Chapter 1: ...',
         collapsed: false,
         items: [
           { text: '0001: ...', link: '/<subject-slug>/chapter1/0001-...' }
         ]
       }
     ]
     ```

5. **更新全域入口頁面 (`docs/index.md`)**：
   - 在首頁 features 或科目看板表格中登錄該科目的狀態與卡片連結。

6. **驗證與發布**：
   - 執行 `npx vitepress build docs` 確保無 broken links、SSR 錯誤與 KaTeX 語法問題。

---

## 🚀 部署流程 (Deployment Process)
- **Framework**: VitePress (`docs/` directory)
- **Base URL**: `base: '/learningPages/'`（對應 GitHub Pages 倉庫路徑）
- **CI/CD**: GitHub Actions workflow 在每次 push 至 `main` 分支時自動建置並部署至 GitHub Pages。
