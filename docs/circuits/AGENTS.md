# 電路學 (Electric Circuit Theory) - Subject Guidelines

This file defines the domain rules and conventions for the **電路學 (Electric Circuit Theory)** subject module within the Multi-Subject monorepo.

---

## 📚 模組定位與範圍 (Scope)
- 本模組位於 `docs/circuits/`，專注於電阻網路等效化簡、星形-三角形轉換、節點與網孔分析法（超節點、超網孔）、運算放大器電路、一階/二階暫態響應、弦波穩態交流電路與三相平衡系統。
- 遵循 Alexander & Sadiku《Fundamentals of Electric Circuits》經典教材之標準符號與節點命名慣例。
- 所有講義與文檔均在 `/circuits/` 路由命名空間下運作。

---

## 規範守則 (Subject Rules)

### 1. 章節命名與結構 (Chapter Conventions)
- 章節目錄結構：
  - `chapter1/`: 電路分析與網路等效 (Circuit Analysis & Equivalences)
  - `chapter2/`: 觀念筆記與定理推導 (Concept Notes & Derivations)
  - `chapter3/`: 核心公式速查表 (Reference Cheatsheets)
- 檔案命名必須遵循：`000x-name.md`（例如 `0001-wye-delta-transformation.md`），以保證側邊欄與文件序列的一致性。

### 2. 符號與命名慣例 (Notation Standards)
- **星形 Y / T 網路**：
  - 三端點 $a, b, c$，中性點 $n$。
  - 分支電阻分別為 $R_1$（接 $a$）、$R_2$（接 $b$）、$R_3$（接 $c$）。
- **三角形 $\Delta / \Pi$ 網路**：
  - 三端點 $a, b, c$。
  - 電阻下標對應其正對面頂點：$R_a$（$b-c$ 間）、$R_b$（$a-c$ 間）、$R_c$（$a-b$ 間）。

### 3. KaTeX 數學公式嚴格驗證
- 行內公式使用 `$...$`，區塊公式使用 `$$...$$`。
- 文本中嚴格禁止出現未轉義的孤立 `$` 符號（應使用 `\$` 或 backticks \`$\`）。
- 每次更動必須通過 `npx vitepress build docs` 確保無 KaTeX 語法錯誤。

### 4. 路由與超連結規範
- 模組內部所有超連結必須使用絕對路徑 `/circuits/...`，禁止使用相對路徑逃逸。
