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

## 核心專案規範 (Core Project Principles)

### 1. 純黑白單色圖標原則 (Monochrome Icon Design)
- 採用純黑白與單色（Black & White / Monochrome）圖標或純文字標籤，確保全站視覺排版簡約專業且風格一致。

### 2. PDF 優先資料來源原則 (PDF-First as Primary Source of Truth)
- 撰寫、補充與推導所有課程講義、筆記、例題與速查表時，優先採用本地課本與教材之原始 PDF 檔案作為最高權威的第一手資料來源。

### 3. 高質量多媒體嵌入規範 (Strategic Video Embedding)
- **嵌入時機**：當遇到高度抽象、動態物理過程、3D 空間幾何或實驗量測時，適時嵌入高質量的教學或動畫影片以降低認知負荷。
- **排版與語法規範**：
  - 統一使用 16:9 響應式容器包覆 `iframe`，並優先採用無追蹤網址 `https://www.youtube-nocookie.com/embed/<VIDEO_ID>`。
  - 影片前後須附帶簡要導讀與重點時間標籤（Timestamps），作為文字說明的延伸與視覺強化。
  - 標準嵌入語法：
    ```html
    <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 1.5rem 0; border-radius: 8px;">
      <iframe src="https://www.youtube-nocookie.com/embed/VIDEO_ID" title="影片說明" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    ```

### 4. 資訊安全與版本控制防護 (Secret Token & Ignore Management)
- 嚴禁將 API 金鑰、個人存取權杖、認證憑證或 `.env` 機密檔案提交至版本控制庫中。
- 確實設定 `.gitignore` 以排除建置產物、依賴目錄、環境設定檔與機密 PDF 檔案。

### 5. 多科目路徑命名空間與章節命名規範 (Path & Chapter Naming)
- 每個科目維持獨立目錄：`docs/<subject-slug>/`。
- 章節檔案遵循嚴格編號命名慣例：`000x-name.md`（例如 `0001-miller-indices.md`）。
- 內部超連結統一使用帶有科目路徑前綴的絕對路徑（如 `/solid-state/chapter1/0001-miller-indices`）。

### 6. 互動元件安全掛載原則 (SSR Safety for Interactive Components)
- 互動式 3D 模擬元件（如 Three.js `<CrystalViewer />`）或其他 DOM 依賴元件確保 client-side 渲染安全性（透過 `if (typeof window !== 'undefined')` 或 Vue `onMounted` 生命週期），以防止 VitePress build 時發生 SSR 錯誤。

### 7. KaTeX 數學公式自主檢查與驗證 (KaTeX Validation & Build Check)
- 行內公式使用 `$...$`，區塊公式使用 `$$...$$`。
- 自主驗證 LaTeX 語法，避免未轉義的孤立 `$` 符號。
- **驗收檢查指令**：每次變更後必須執行 `npx vitepress build docs` 進行自動化建置與語法驗證。

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

### 📤 提交與推送 SOP（防止漏 `git add`）

> 本機 build 會讀到未追蹤檔案，因此「本機 build 通過 ≠ CI 通過」。必須依序完成以下三道檢查。

1. **按目錄加入，禁止逐檔列名**：
   ```bash
   git add -A docs/
   git status --porcelain   # 必須無輸出才可 push
   ```
2. **以乾淨副本模擬 CI 建置**（僅含已 commit 內容）：
   ```bash
   rm -rf /tmp/lp-check && git worktree add /tmp/lp-check HEAD \
     && (cd /tmp/lp-check && npm ci && npx vitepress build docs); \
     git worktree remove --force /tmp/lp-check
   ```
3. **推送後驗證 CI 與線上網址**：
   ```bash
   gh run watch --exit-status $(gh run list --limit 1 --json databaseId -q '.[0].databaseId')
   curl -s -o /dev/null -w "%{http_code}\n" https://hekprowork.github.io/learningPages/<新頁面路徑>.html   # 須為 200
   ```
- `.git/hooks/pre-push` 會自動阻擋 `docs/` 下有未追蹤 `.md` 的推送。
- 委派子代理推送時，Prompt 須明確要求執行上述三步並回報 CI 結果與 HTTP 狀態碼。
