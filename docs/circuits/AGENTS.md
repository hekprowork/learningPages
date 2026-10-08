# 電路學 (Electric Circuit Theory) - Subject Guidelines

> **Context Pointer**: 請參閱根目錄 AGENTS.md 以了解全域核心規範（Monorepo 架構、純黑白圖標原則、PDF 優先來源、多媒體嵌入規範與建置驗證指令）。

---

## 📚 模組定位與範圍 (Scope)
- 本模組位於 `docs/circuits/`，專注於電阻網路等效化簡、星形-三角形轉換、節點與網孔分析法（超節點、超網孔）、運算放大器電路、一階/二階暫態響應、弦波穩態交流電路與三相平衡系統。
- 遵循 Alexander & Sadiku《Fundamentals of Electric Circuits》經典教材之標準符號與節點命名慣例。
- 所有講義與文檔均在 `/circuits/` 路由命名空間下運作。

---

## 規範守則 (Subject Rules)

### 1. 章節命名與結構 (Chapter Conventions)
- 章節目錄結構（對應課程 pptx 與原文書章節）：
  - `chapter1/`: Chapter 1 基本概念 (Basic Concepts)
  - `chapter2/`: Chapter 2 基本定律 (Basic Laws)
  - `chapter3/`: Chapter 3 分析方法 (Methods of Analysis)
  - `chapter4/`: Chapter 4 電路定理 (Circuit Theorems)
  - `chapter5/`: Chapter 5 運算放大器 (Operational Amplifiers)
  - `chapter6/`: Chapter 6 電容與電感 (Capacitors and Inductors)
  - `learning-records/`: 觀念筆記與定理推導 (Concept Notes & Derivations)
  - `reference/`: 核心公式速查表 (Reference Cheatsheets)
  - `practice/`: 互動式題庫練習系統 (Interactive Practice Workbooks)
- 檔案命名必須遵循：`000x-name.md`（例如 `0001-wye-delta-transformation.md`），以保證側邊欄與文件序列的一致性。

### 2. 符號與命名慣例 (Notation Standards)
- **星形 Y / T 網路**：
  - 三端點 $a, b, c$，中性點 $n$。
  - 分支電阻分別為 $R_1$（接 $a$）、$R_2$（接 $b$）、$R_3$（接 $c$）。
- **三角形 $\Delta / \Pi$ 網路**：
  - 三端點 $a, b, c$。
  - 電阻下標對應其正對面頂點：$R_a$（$b-c$ 間）、$R_b$（$a-c$ 間）、$R_c$（$a-b$ 間）。

### 3. KaTeX 數學公式驗證與建置檢查
- 行內公式使用 `$...$`，區塊公式使用 `$$...$$`。
- 文本中避免未轉義的孤立 `$` 符號（應使用 `\$` 或 backticks \`$\`）。
- 每次更動後必須執行 `npx vitepress build docs` 確保無 KaTeX 語法與建置錯誤。

### 4. 路由與超連結規範
- 模組內部所有超連結必須使用絕對路徑 `/circuits/...`。

### 5. 頁面產生流程 (Page Generation)

所有頁面一律是 `.md` + 主題 Vue 元件；不產出獨立 `.html`（不會被 VitePress 部署）。

| 使用者說 | 產出 | 流程 |
|---|---|---|
| **例題網頁**（例題、Example、Practice Problem、題庫） | `practice/000x-chapterN-examples.md`，每題一張 `<PracticeCard>` | 讀取並遵循 `extract-course-problems` skill（`~/.gemini/config/skills/extract-course-problems/SKILL.md`） |
| **教學網頁**（教學、講義、觀念、lesson） | `chapterX/000x-<topic>.md` (對應課本章節) | 下列步驟 |

教學網頁步驟：
1. 以課本 PDF 為來源，依序寫：直覺動機 → 定義 → 推導 → 1–2 個示範例題 → 常見錯誤。
2. 抽象或可調參數的觀念（分壓、Y-Δ、暫態）用 Vue 互動元件嵌入，放 `docs/.vitepress/theme/components/`，DOM/canvas 存取只寫在 `onMounted`。
3. 同步新增 `reference/` 速查卡條目與 sidebar、`index.md` 連結。
4. 完成條件：
   - **語意層（對帳）**：通過第 6 節「數值與方程式對帳查核」（拘束式方向核對、回代驗算、與課本標準答案 1:1 吻合）。
   - **語法層（建置）**：`rm -rf docs/.vitepress/dist && npx vitepress build docs` 通過，推送後線上網址 HTTP 200 可正常瀏覽。

---

### 6. 數值與方程式對帳查核 (Ground-Truth Reconciliation SOP)

為杜絕方向性筆誤（如電流源拘束式方向倒置）與數值偏差，推導與解題必須執行**閉環對帳 (Closed-Loop Reconciliation)**：

1. **支路方向與拘束式對帳**：
   - 檢視電流源 / 受控源之箭頭與參考極性標示。
   - 若為兩相鄰網孔共用支路，依各網孔電流之環行方向，明確判定同向與反向分量：
     $$i_{\text{同向}} - i_{\text{反向}} = I_{\text{source}}$$
   - 嚴禁憑相鄰下標大小（如直覺套用 $i_1 - i_2$）推斷，必以支路實際流向為唯一依據。

2. **代數推導與回代驗算 (Algebraic Legwork)**：
   - 矩陣行列式（如克拉瑪法則 $\Delta, \Delta_k$）或消去法保留完整展開算式。
   - 求出各未知數後，執行回代檢驗：全數代入未參與消去之原始 KVL / KCL 方程式，等式兩端殘差必須為零（Residual = 0）。

3. **教材答案對帳 (PDF Answer Check)**：
   - 終端數值、正負號與量綱單位必須與教材原始 PDF 之標準解答進行 1:1 逐項對帳。
   - **完成判準 (Completion Criterion)**：拘束式流向驗證成立、回代殘差為零，且數值與教材 Answer 完全一致；任一項不符即屬未完成，嚴禁強行改寫答案欄位。
