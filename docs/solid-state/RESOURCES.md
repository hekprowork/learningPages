# 固態電子導論 (Solid State Electronic Devices) Resources

## Knowledge

- [Textbook: _Solid State Electronic Devices_ — Ben G. Streetman & Sanjay Kumar Banerjee](https://www.pearson.com)
  半導體物理經典教材。包含晶格幾何、能帶理論、載子傳輸、p-n 接面、BJT、MOSFET 與光電元件。
- [Local textbook PDF: _Solid State Electronic Devices_, 7th Global Edition (`sspd-eee-swapnil.pdf`)](./sspd-eee-swapnil.pdf)
  本地教材副本的 PDF metadata 對應 Pearson 第七版全球版，實際檔案位於 `docs/solid-state/sspd-eee-swapnil.pdf`；內容涵蓋材料分類、晶格幾何、CZ 單晶生長、摻雜與磊晶技術。
- [Lecture Notes: _Principles of Semiconductor Devices_ — Bart Van Zeghbroeck (University of Colorado Boulder)](https://ecee.colorado.edu/~bart/book/)
  提供極為清晰的能帶與晶格圖解、載子分佈推導與經典元件計算。

## Chapter 2 Source Map

教學網頁依本地教材原生 Chapter 2「Atoms and Electrons」的章節順序製作。以下頁碼採 PDF 閱讀器顯示頁碼：

| 專案頁面 | 教材對照 | PDF 閱讀頁碼 |
| :--- | :--- | :---: |
| [0001：物理模型](/solid-state/chapter2/0001-physical-models) | §2.1 Introduction to Physical Models | 54–55 |
| [0002：光電效應](/solid-state/chapter2/0002-photoelectric-effect) | §2.2.1 Photoelectric Effect | 55–57 |
| [0003：原子光譜](/solid-state/chapter2/0003-atomic-spectra) | §2.2.2 Atomic Spectra | 57–58 |
| [0004：波耳模型](/solid-state/chapter2/0004-bohr-model) | §2.3 Bohr Model | 58–62 |
| [0005：機率與不確定原理](/solid-state/chapter2/0005-probability-and-uncertainty) | §2.4.1 Probability and Uncertainty Principle | 62–64 |
| [0006：薛丁格方程式](/solid-state/chapter2/0006-schrodinger-equation) | §2.4.2 Schrödinger Wave Equation | 64–66 |
| [0007：位能井問題](/solid-state/chapter2/0007-potential-well) | §2.4.3 Potential Well Problem | 66–69 |
| [0008：量子穿隧](/solid-state/chapter2/0008-quantum-tunneling) | §2.4.4 Tunneling | 69–70 |
| [0009：氫原子](/solid-state/chapter2/0009-hydrogen-atom) | §2.5.1 Hydrogen Atom | 71–73 |
| [0010：週期表](/solid-state/chapter2/0010-periodic-table) | §2.5.2 Periodic Table | 73–78 |

頁碼以 PDF 閱讀器頁碼為準；教材印刷頁碼通常比 PDF 閱讀頁碼少 1。

## Local Workspace Inventory

本次掃描 `docs/solid-state/` 全目錄後，確認固態電子專區目前包含：

- `sspd-eee-swapnil.pdf`：本地教材 PDF 與 Chapter 2 主要對照來源。
- `index.md`：VitePress 固態電子科目首頁；`index.html` 是既有的獨立靜態入口頁。
- `chapter1/`：3 篇 VitePress 教學頁，主題為密勒指數、鑽石結構與矽晶圓製備。
- `chapter2/`：1 篇章節導讀與 10 篇「Atoms and Electrons」VitePress 教學頁。
- `learning-records/`：3 篇材料、晶面與晶體生長的學習摘要及推導紀錄。
- `lessons/`：3 篇既有獨立 HTML 課程頁，對應 Chapter 1 的三個主題。
- `reference/`：3 組密勒指數、鑽石晶格與晶體生長速查表；每組包含 Markdown，並保留既有獨立 HTML 版本。
- `assets/`：晶格互動展示頁、JavaScript 檢視器與共用樣式表。
- `MISSION.md`：科目目標、完成條件與內容範圍；`NOTES.md`：學習偏好與既有進度。
- `AGENTS.md`：本專區的文件結構、術語、路由與公式規範。

注意：專案 `.gitignore` 目前以 `*.pdf` 排除 PDF，因此這份教材雖然存在於本機工作區，仍不會被 Git 提交或自動部署到網站。若要讓 CI 與線上網站也能下載，必須另外決定是否對此檔案建立明確的例外規則。

## Wisdom (Communities)

- [r/ECE (Reddit)](https://www.reddit.com/r/ECE/)
  電子與計算機工程社群，適合討論半導體物理、元件設計與學術疑難。
- [Stack Exchange: Physics & Electrical Engineering](https://physics.stackexchange.com/)
  針對晶格幾何計算、量子力學模型與能帶推導等深入概念的最佳提問平台。
