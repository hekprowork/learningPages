# ⚛️ 固態電子導論 (Solid-State Electronics)

歡迎來到**固態電子導論**課程知識庫。本模組涵蓋微觀固態物理、晶體幾何學、半導體材料特性、塊狀晶體生長（CZ / LEC / 偏析效應）以及現代矽晶圓製程，並結合 WebGL 3D 互動晶格模擬與嚴謹數學推導。

---

## 🧭 課程結構與導航 (Curriculum Overview)

### 📌 [Chapter 1: 結晶學與材料基礎 (Crystallography)](/solid-state/chapter1/0001-miller-indices)
*深入探索晶體結構的幾何對稱性、晶向與晶面系統及塊狀晶體長晶技術。*
- [0001: 密勒指數與晶格幾何 (Miller Indices & Lattice Geometry)](/solid-state/chapter1/0001-miller-indices)
- [0002: 鑽石結構與矽原子密度推導 (Diamond Lattice & Si Density)](/solid-state/chapter1/0002-diamond-lattice-density)
- [0003: 塊狀晶體生長與矽晶圓製備 (Bulk Crystal Growth & Wafer Prep)](/solid-state/chapter1/0003-bulk-crystal-growth)

### 📌 [Chapter 2: 原子與電子 (Atoms and Electrons)](/solid-state/chapter2/)
*由光電效應與原子光譜建立量子化證據，再以薛丁格方程式、原子軌域與電子組態連接半導體材料。*
- [0001: 物理模型與量子觀念的起點](/solid-state/chapter2/0001-physical-models)
- [0002: 光電效應與光子的能量](/solid-state/chapter2/0002-photoelectric-effect)
- [0003: 原子光譜與能階指紋](/solid-state/chapter2/0003-atomic-spectra)
- [0004: 波耳氫原子模型](/solid-state/chapter2/0004-bohr-model)
- [0005: 機率詮釋與不確定原理](/solid-state/chapter2/0005-probability-and-uncertainty)
- [0006: 薛丁格波動方程式](/solid-state/chapter2/0006-schrodinger-equation)
- [0007: 一維無限深位能井](/solid-state/chapter2/0007-potential-well)
- [0008: 量子穿隧效應](/solid-state/chapter2/0008-quantum-tunneling)
- [0009: 氫原子與四個量子數](/solid-state/chapter2/0009-hydrogen-atom)
- [0010: 週期表、電子組態與半導體鍵結](/solid-state/chapter2/0010-periodic-table)

### 📌 [學習紀錄與延伸筆記 (Learning Records)](/solid-state/learning-records/0001-bandgap-and-valence-electrons)
*保留學習過程中的摘要、推導回顧與延伸觀察；完整教學內容請先閱讀 Chapter 2。*
- [0001: 基礎半導體材料分類與價電子結構 (Semiconductor Classification)](/solid-state/learning-records/0001-bandgap-and-valence-electrons)
- [0002: 密勒指數晶面求法與面間距幾何 (Interplanar Spacing)](/solid-state/learning-records/0002-interplanar-spacing-definition)
- [0003: 塊狀晶體生長與偏析效應 (Segregation Coefficient & Scheil Equation)](/solid-state/learning-records/0003-bulk-crystal-growth)

### 📌 [核心公式速查表 (Reference Cheatsheets)](/solid-state/reference/001-miller-indices-cheatsheet)
*考試、複習與研究必備之高密度速查卡。*
- [001: 密勒指數快速速查表 (Miller Indices Cheatsheet)](/solid-state/reference/001-miller-indices-cheatsheet)
- [002: 鑽石與閃鋅礦結構幾何速查表 (Diamond Lattice Cheatsheet)](/solid-state/reference/002-diamond-lattice-cheatsheet)
- [003: 塊狀晶體生長與晶圓製程速查表 (Crystal Growth Cheatsheet)](/solid-state/reference/003-bulk-crystal-growth-cheatsheet)

---

## 💎 特色亮點

1. **3D 晶格互動引擎 (`<CrystalViewer />`)**：
   - 即時渲染立方晶胞、FCC、鑽石與閃鋅礦結構。
   - 動態剖切 $(100)$、$(110)$、$(111)$ 等高對稱晶面與截面原子排列。
2. **嚴謹數學推導 (LaTeX / KaTeX)**：
   - 晶體原子充填率 (Packing Fraction)、矽原子體密度推導 ($5.0 \times 10^{22}\text{ cm}^{-3}$)。
   - 雜質偏析方程式 $C_s = k_0 C_0 (1-f)^{k_0-1}$ 完整推導與極限行為分析。
3. **實務製程工藝結合**：
   - 柴氏提拉法 (CZ)、浮區法 (FZ)、液封柴氏法 (LEC) 等材料工程分析。
