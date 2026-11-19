# 學習筆記庫 (Learning Pages) 專案規範

本庫以 VitePress 建置多科目工程與科學教材，部署至 GitHub Pages。`docs/index.md` 是入口，`docs/.vitepress/config.mts` 管理導覽與側邊欄，`docs/adr/` 記錄架構決策。每科目位於 `docs/<subject-slug>/`，有自己的 `AGENTS.md` 與 `index.md`；現有科目為 `solid-state`、`electronics`、`circuits`、`engineering-math`。修改科目內容前，先讀取該科目的 `AGENTS.md`。

## 核心專案規範

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

### 7. KaTeX 數學公式驗證
- **語法排版標準**：行內公式使用 `$...$`，區塊公式使用 `$$...$$`；文本中避免未轉義的孤立 `$` 符號（應使用 `\$` 或 backticks \`$\`）。
- **VitePress 靜默盲區警示**：`npx vitepress build docs` 遇到 LaTeX 語法錯誤（如未轉義字元、未閉合括號）預設僅於 HTML 渲染錯誤節點，建置退出碼仍為 0，**絕不可單獨作為公式語法正確之判準**。
- **強制檢查**：任何內容變更驗收或 build 前，先執行：
  ```bash
  npm run check:katex
  ```
- **雙重驗收門檻**：
  1. `npm run check:katex` 必須回傳退出碼 0（無任何 KaTeX 語法解析錯誤）。
  2. `npx vitepress build docs` 必須回傳退出碼 0（無任何 SSR 渲染或 broken links 錯誤）。
  兩道檢查均通過，才算語法驗證完成。

### 8. 數值與推導對帳
- **語法通過 ≠ 內容正確**：建置只檢查語法結構與連結，不能證明數值或推導正確。
- **雙向對帳流程 (Dual-Reconciliation SOP)**：
  1. **符號與拘束式對帳**：電路源流向、極性與邊界拘束式，必須直接對照原始 PDF 圖表逐項核定，嚴禁憑相鄰下標直覺推論。
  2. **代數回代驗算 (Back-Substitution)**：聯立方程式之解，必須全數代入原始守恆方程式（如 KCL/KVL/邊界條件）驗算，殘差必須為零（Residual = 0）。
  3. **終端數值對帳 (PDF Answer Check)**：各變數數值、正負號與量綱單位必須與教材原始 Answer 進行 1:1 窮盡對帳。
- **完成條件 (Completion Criterion)**：僅當「拘束式方向相符」、「回代殘差為零」且「終端數值與原始教材完全一致」時，推導與題目始算完成。

### 9. 題目自包含與圖表同屏
- **核心理念**：每張 `<PracticeCard>` 必須是**完全自包含 (Self-Contained)** 的獨立練習單元。讀者在作答該題時，不應為了獲取已知條件而被迫跨頁滾動、跳轉或翻閱實體教材。
- **同屏顯式規範 (Co-Location Rules)**：
  1. **圖表/表格引用顯式化**：凡題目陳述中直接提及課本圖表、電路模型或數據表格（如「如圖 1.1 所示」、「參考 Table 1.1」、「依據圖 1.25 之電路」），**必須在該題題幹中一併嵌入對應裁切圖片或電路圖**。
  2. **跨題/例題引用同屏化**：凡練習題依託其他例題之電路架構或變更條件（如「在 Example 1.3 的級聯電路中，若移除第三級...」、「針對 Example 1.3 電路，求各節點電壓...」），**必須在該練習題內直接再次顯示原例題之電路圖**，確保元件參數（電阻值、增益係數、電源極性）一目了然。
- **完成條件 (Completion Criterion)**：
  - 窮盡檢查該頁面中每一道題目題幹：凡出現圖表編號（Fig/Figure/Table）或例題參照（Example/Ex）之文字，該 `<PracticeCard>` 內必須 100% 包含對應的 Markdown 圖片標籤（`![...](...)`）。未嵌入者視為未完成，禁止交付。

---

## 新增科目

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

6. **驗證**：依第 7 節執行 KaTeX 與 VitePress 雙重檢查。

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
2. **以乾淨副本模擬 CI 建置**（僅含已 commit 內容，且嚴格執行 KaTeX 語法與 VitePress 雙重驗證）：
   ```bash
   rm -rf /tmp/lp-check && git worktree add /tmp/lp-check HEAD \
     && (cd /tmp/lp-check && npm ci && npm run check:katex && npx vitepress build docs); \
     git worktree remove --force /tmp/lp-check
   ```
3. **推送後驗證 CI 與線上網址**：
   ```bash
   gh run watch --exit-status $(gh run list --limit 1 --json databaseId -q '.[0].databaseId')
   curl -s -o /dev/null -w "%{http_code}\n" https://hekprowork.github.io/learningPages/<新頁面路徑>.html   # 須為 200
   ```
- `.git/hooks/pre-push` 會自動阻擋 `docs/` 下有未追蹤 `.md` 的推送。
- 委派子代理推送時，Prompt 須明確要求執行上述三步並回報 CI 結果與 HTTP 狀態碼。
