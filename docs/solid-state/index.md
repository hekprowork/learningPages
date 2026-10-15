<!-- Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 -->
<!-- Hallmark · genre: editorial · macrostructure: Index-First Modular Curriculum Matrix · design-system: design.md · designed-as-app -->
<script setup>
import { withBase } from 'vitepress'
</script>

<div class="subject-hub">
<header class="hub-header">
  <div class="hub-slug-row">
    <span class="hub-slug">Solid-State Electronics // EE-PHYS-301</span>
    <span class="hub-badge-status">Status 已上線 · 44 題教材題庫</span>
  </div>
  <h1 class="hub-title">固態電子導論</h1>
  <div class="hub-subtitle">Solid-State Electronics & Semiconductor Physics</div>
  <p class="hub-lead">
    本課程知識庫專注於微觀固態物理、晶體幾何對稱性、半導體能帶結構、塊狀晶體生長（CZ / LEC / 偏析效應）與矽晶圓製程，結合 WebGL 3D 互動晶格模擬與嚴謹數學推導。
  </p>
  <div class="hub-meta-bar">
    <div class="hub-meta-item">
      <span class="hub-meta-label">權威教材</span>
      <span class="hub-meta-val">Streetman & Banerjee《Solid State Electronic Devices》</span>
    </div>
    <div class="hub-meta-item">
      <span class="hub-meta-label">涵蓋範圍</span>
      <span class="hub-meta-val">Chapter 1–3 · 晶格、量子基礎、能帶與載子</span>
    </div>
    <div class="hub-meta-item">
      <span class="hub-meta-label">核心技術</span>
      <span class="hub-meta-val">WebGL 3D Crystal Viewer / KaTeX Derivations</span>
    </div>
  </div>
</header>
<div class="hub-stats-grid">
  <div class="hub-stat-card">
    <span class="hub-stat-label">課程核心章節</span>
    <span class="hub-stat-number">03</span>
    <span class="hub-stat-sub">結晶學、原子與半導體載子</span>
  </div>
  <div class="hub-stat-card">
    <span class="hub-stat-label">正式講義單元</span>
    <span class="hub-stat-number">21</span>
    <span class="hub-stat-sub">涵蓋晶格、量子模型與能帶傳輸</span>
  </div>
  <div class="hub-stat-card">
    <span class="hub-stat-label">觀念筆記與速查</span>
    <span class="hub-stat-number">06</span>
    <span class="hub-stat-sub">3 篇推導回顧 + 3 張速查卡</span>
  </div>
  <div class="hub-stat-card">
    <span class="hub-stat-label">教材互動題卡</span>
    <span class="hub-stat-number">44</span>
    <span class="hub-stat-sub">Problems & Self Quiz</span>
  </div>
</div>
<section class="hub-section">
  <div class="hub-section-header">
    <span class="hub-section-index">01 / Curriculum Matrix</span>
    <h2 class="hub-section-title">課程結構與導航</h2>
    <p class="hub-section-desc">依授課單元、理論推導與速查卡分類之完整知識體系。</p>
  </div>
  <div class="hub-card-grid">
    <!-- Chapter 1 Card -->
    <div class="hub-card">
      <div class="hub-card-top">
        <div class="hub-card-badge-row">
          <span class="hub-tag hub-tag-accent">Chapter 01</span>
          <span class="hub-card-count">6 單元</span>
        </div>
        <h3 class="hub-card-title">
          <a :href="withBase('/solid-state/chapter1/0001-miller-indices.html')">結晶學與材料基礎 (Crystallography)</a>
        </h3>
        <p class="hub-card-desc">
          深入探索晶體結構的幾何對稱性、晶向與晶面系統及塊狀晶體長晶技術。
        </p>
        <ul class="hub-lesson-list">
          <li class="hub-lesson-item">
            <span class="hub-lesson-code">0001</span>
            <a class="hub-lesson-link" :href="withBase('/solid-state/chapter1/0001-miller-indices.html')">密勒指數與晶格幾何 (Miller Indices & Lattice Geometry)</a>
          </li>
          <li class="hub-lesson-item">
            <span class="hub-lesson-code">0002</span>
            <a class="hub-lesson-link" :href="withBase('/solid-state/chapter1/0002-diamond-lattice-density.html')">鑽石結構與矽原子密度推導 (Diamond Lattice & Si Density)</a>
          </li>
          <li class="hub-lesson-item">
            <span class="hub-lesson-code">0003</span>
            <a class="hub-lesson-link" :href="withBase('/solid-state/chapter1/0003-bulk-crystal-growth.html')">塊狀晶體生長與矽晶圓製備 (Bulk Crystal Growth & Wafer Prep)</a>
          </li>
                    <li class="hub-lesson-item">
            <span class="hub-lesson-code">0004</span>
            <a class="hub-lesson-link" :href="withBase('/solid-state/chapter1/0004-materials-and-lattices.html')">半導體材料、晶格與晶胞</a>
          </li>
          <li class="hub-lesson-item">
            <span class="hub-lesson-code">0005</span>
            <a class="hub-lesson-link" :href="withBase('/solid-state/chapter1/0005-epitaxial-growth.html')">磊晶生長、晶格匹配與缺陷</a>
          </li>
          <li class="hub-lesson-item">
            <span class="hub-lesson-code">0006</span>
            <a class="hub-lesson-link" :href="withBase('/solid-state/chapter1/0006-waves-in-crystals.html')">週期晶體中的波與布里淵區</a>
          </li>
        </ul>
      </div>
      <div class="hub-card-footer">
        <a class="hub-btn-link" :href="withBase('/solid-state/chapter1/0001-miller-indices.html')">進入章節 →</a>
      </div>
    </div>
    <!-- Chapter 2 Card -->
    <div class="hub-card">
      <div class="hub-card-top">
        <div class="hub-card-badge-row">
          <span class="hub-tag hub-tag-accent">Chapter 02</span>
          <span class="hub-card-count">10 單元</span>
        </div>
        <h3 class="hub-card-title">
          <a :href="withBase('/solid-state/chapter2/')">原子與電子 (Atoms and Electrons)</a>
        </h3>
        <p class="hub-card-desc">
          由光電效應與原子光譜建立量子化證據，以薛丁格方程式、原子軌域與電子組態連接半導體材料特性。
        </p>
        <ul class="hub-lesson-list">
                    <li class="hub-lesson-item">
            <span class="hub-lesson-code">0001</span>
            <a class="hub-lesson-link" :href="withBase('/solid-state/chapter2/0001-physical-models.html')">物理模型與量子觀念的起點</a>
          </li>
          <li class="hub-lesson-item">
            <span class="hub-lesson-code">0002</span>
            <a class="hub-lesson-link" :href="withBase('/solid-state/chapter2/0002-photoelectric-effect.html')">光電效應與光子的能量</a>
          </li>
          <li class="hub-lesson-item">
            <span class="hub-lesson-code">0003</span>
            <a class="hub-lesson-link" :href="withBase('/solid-state/chapter2/0003-atomic-spectra.html')">原子光譜與能階指紋</a>
          </li>
          <li class="hub-lesson-item">
            <span class="hub-lesson-code">0004</span>
            <a class="hub-lesson-link" :href="withBase('/solid-state/chapter2/0004-bohr-model.html')">波耳氫原子模型</a>
          </li>
                    <li class="hub-lesson-item">
            <span class="hub-lesson-code">0005</span>
            <a class="hub-lesson-link" :href="withBase('/solid-state/chapter2/0005-probability-and-uncertainty.html')">機率詮釋與不確定原理</a>
          </li>
          <li class="hub-lesson-item">
            <span class="hub-lesson-code">0006</span>
            <a class="hub-lesson-link" :href="withBase('/solid-state/chapter2/0006-schrodinger-equation.html')">薛丁格波動方程式</a>
          </li>
          <li class="hub-lesson-item">
            <span class="hub-lesson-code">0007</span>
            <a class="hub-lesson-link" :href="withBase('/solid-state/chapter2/0007-potential-well.html')">一維無限深位能井</a>
          </li>
          <li class="hub-lesson-item">
            <span class="hub-lesson-code">0008</span>
            <a class="hub-lesson-link" :href="withBase('/solid-state/chapter2/0008-quantum-tunneling.html')">量子穿隧效應</a>
          </li>
                    <li class="hub-lesson-item">
            <span class="hub-lesson-code">0009</span>
            <a class="hub-lesson-link" :href="withBase('/solid-state/chapter2/0009-hydrogen-atom.html')">氫原子與四個量子數</a>
          </li>
          <li class="hub-lesson-item">
            <span class="hub-lesson-code">0010</span>
            <a class="hub-lesson-link" :href="withBase('/solid-state/chapter2/0010-periodic-table.html')">週期表、電子組態與半導體鍵結</a>
          </li>
        </ul>
      </div>
      <div class="hub-card-footer">
        <a class="hub-btn-link" :href="withBase('/solid-state/chapter2/')">進入章節目錄 →</a>
      </div>
    </div>
    <!-- Chapter 3 Card -->
    <div class="hub-card">
      <div class="hub-card-top">
        <div class="hub-card-badge-row">
          <span class="hub-tag hub-tag-accent">Chapter 03</span>
          <span class="hub-card-count">5 單元</span>
        </div>
        <h3 class="hub-card-title"><a :href="withBase('/solid-state/chapter3/')">半導體能帶與載子</a></h3>
        <p class="hub-card-desc">從共價鍵與能帶圖出發，練習有效質量、費米分布、載子濃度、漂移電流、霍爾效應與熱平衡能階。</p>
        <ul class="hub-lesson-list">
                    <li class="hub-lesson-item">
            <span class="hub-lesson-code">0001</span>
            <a class="hub-lesson-link" :href="withBase('/solid-state/chapter3/0001-energy-bands.html')">鍵結、能帶與能隙</a>
          </li>
          <li class="hub-lesson-item">
            <span class="hub-lesson-code">0002</span>
            <a class="hub-lesson-link" :href="withBase('/solid-state/chapter3/0002-carriers-and-effective-mass.html')">電子、電洞、摻雜與有效質量</a>
          </li>
          <li class="hub-lesson-item"><span class="hub-lesson-code">0003</span><a class="hub-lesson-link" :href="withBase('/solid-state/chapter3/0003-carrier-concentrations.html')">費米分布與平衡載子濃度</a></li>
          <li class="hub-lesson-item"><span class="hub-lesson-code">0004</span><a class="hub-lesson-link" :href="withBase('/solid-state/chapter3/0004-drift-and-hall.html')">漂移、遷移率、電阻與霍爾效應</a></li>
          <li class="hub-lesson-item"><span class="hub-lesson-code">0005</span><a class="hub-lesson-link" :href="withBase('/solid-state/chapter3/0005-equilibrium-fermi-level.html')">熱平衡下費米能階不變</a></li>
        </ul>
      </div>
      <div class="hub-card-footer"><a class="hub-btn-link" :href="withBase('/solid-state/chapter3/')">進入章節目錄 →</a></div>
    </div>
    <!-- Learning Records Card -->
    <div class="hub-card">
      <div class="hub-card-top">
        <div class="hub-card-badge-row">
          <span class="hub-tag">Theory & Notes</span>
          <span class="hub-card-count">3 篇筆記</span>
        </div>
        <h3 class="hub-card-title">
          <a :href="withBase('/solid-state/learning-records/0001-bandgap-and-valence-electrons.html')">觀念筆記與延伸推導 (Learning Records)</a>
        </h3>
        <p class="hub-card-desc">
          保留學習過程中的摘要、推導回顧與延伸觀察；完整教學內容請先閱讀 Chapter 2。
        </p>
        <ul class="hub-lesson-list">
          <li class="hub-lesson-item">
            <span class="hub-lesson-code">0001</span>
            <a class="hub-lesson-link" :href="withBase('/solid-state/learning-records/0001-bandgap-and-valence-electrons.html')">基礎半導體材料分類與價電子結構</a>
          </li>
          <li class="hub-lesson-item">
            <span class="hub-lesson-code">0002</span>
            <a class="hub-lesson-link" :href="withBase('/solid-state/learning-records/0002-interplanar-spacing-definition.html')">密勒指數晶面求法與面間距幾何推導</a>
          </li>
          <li class="hub-lesson-item">
            <span class="hub-lesson-code">0003</span>
            <a class="hub-lesson-link" :href="withBase('/solid-state/learning-records/0003-bulk-crystal-growth.html')">塊狀晶體生長與偏析效應 (Scheil Equation)</a>
          </li>
        </ul>
      </div>
      <div class="hub-card-footer">
        <a class="hub-btn-link" :href="withBase('/solid-state/learning-records/0001-bandgap-and-valence-electrons.html')">瀏覽觀念筆記 →</a>
      </div>
    </div>
    <!-- Cheatsheets Card -->
    <div class="hub-card">
      <div class="hub-card-top">
        <div class="hub-card-badge-row">
          <span class="hub-tag">Reference</span>
          <span class="hub-card-count">3 張速查卡</span>
        </div>
        <h3 class="hub-card-title">
          <a :href="withBase('/solid-state/reference/001-miller-indices-cheatsheet.html')">核心公式速查表 (Reference Cheatsheets)</a>
        </h3>
        <p class="hub-card-desc">
          考試、複習與研究必備之高密度速查卡，彙整幾何參數與物理常數。
        </p>
        <ul class="hub-lesson-list">
          <li class="hub-lesson-item">
            <span class="hub-lesson-code">001</span>
            <a class="hub-lesson-link" :href="withBase('/solid-state/reference/001-miller-indices-cheatsheet.html')">密勒指數快速速查表 (Miller Indices Cheatsheet)</a>
          </li>
          <li class="hub-lesson-item">
            <span class="hub-lesson-code">002</span>
            <a class="hub-lesson-link" :href="withBase('/solid-state/reference/002-diamond-lattice-cheatsheet.html')">鑽石與閃鋅礦結構幾何速查表 (Diamond Cheatsheet)</a>
          </li>
          <li class="hub-lesson-item">
            <span class="hub-lesson-code">003</span>
            <a class="hub-lesson-link" :href="withBase('/solid-state/reference/003-bulk-crystal-growth-cheatsheet.html')">塊狀晶體生長與晶圓製程速查表 (Growth Cheatsheet)</a>
          </li>
        </ul>
      </div>
      <div class="hub-card-footer">
        <a class="hub-btn-link" :href="withBase('/solid-state/reference/001-miller-indices-cheatsheet.html')">查閱速查手冊 →</a>
      </div>
    </div>
  </div>
</section>
<section class="hub-section">
  <div class="hub-section-header">
    <span class="hub-section-index">02 / Practice & Assessment</span>
    <h2 class="hub-section-title">互動式教材題庫</h2>
    <p class="hub-section-desc">全題目自包含與同屏顯式題卡系統，附有逐步推導詳解與自我檢測機制。</p>
  </div>
  <div class="hub-card" style="padding: 1.5rem 1.75rem;">
    <div class="hub-card-top">
      <div class="hub-card-badge-row">
        <span class="hub-tag hub-tag-accent">Textbook Problems</span>
        <span class="hub-card-count">第 1–3 章各章獨立題頁</span>
      </div>
      <h3 class="hub-card-title" style="margin: 0.5rem 0;">
        <a :href="withBase('/solid-state/practice/0001-textbook-problems.html')">Chapter 1 Problems & Self Quiz（25 題）</a>
      </h3>
      <p class="hub-card-desc">
        依章節整理教材 Problems 與 Self Quiz；每題提供中文與英文敘述。
      </p>
      <p class="hub-card-desc"><a :href="withBase('/solid-state/practice/0003-chapter2-problems.html')">Chapter 2 題目（19 題）→</a>　<a :href="withBase('/solid-state/practice/0004-chapter3-problems.html')">Chapter 3 題目（34 題）→</a></p>
      <p class="hub-card-desc"><a :href="withBase('/solid-state/practice/0002-chapter1-3-exam-review.html')">開啟第 1–3 章考前概念總檢核與跨章計算 →</a></p>
    </div>
    <div class="hub-card-footer" style="margin-top: 1.5rem;">
      <a class="hub-btn-link" :href="withBase('/solid-state/practice/0001-textbook-problems.html')">開啟題庫工作區 →</a>
    </div>
  </div>
</section>
<section class="hub-section">
  <div class="hub-section-header">
    <span class="hub-section-index">03 / Engineering Highlights</span>
    <h2 class="hub-section-title">特色亮點與工程核心</h2>
    <p class="hub-section-desc">結合 3D 視覺化模擬、嚴謹第一原理數學推導與實務半導體製程工藝。</p>
  </div>
  <div class="hub-highlight-grid">
    <div class="hub-highlight-card">
      <span class="hub-highlight-num">[01] 互動模擬</span>
      <h3 class="hub-highlight-title">3D 晶格互動引擎 (&lt;CrystalViewer /&gt;)</h3>
      <p class="hub-highlight-body">
        內建 Three.js WebGL 晶格視覺化核心，支援任意視角旋轉、縮放與截面剖切：
      </p>
      <ul class="hub-highlight-list">
        <li>即時渲染立方晶胞、FCC、鑽石與閃鋅礦 (Zinc Blende) 晶體結構。</li>
        <li>動態剖切 <InlineMath tex="(100)" />、<InlineMath tex="(110)" />、<InlineMath tex="(111)" /> 高對稱晶面與截面原子二維幾何排列。</li>
      </ul>
    </div>
    <div class="hub-highlight-card">
      <span class="hub-highlight-num">[02] 理論閉環</span>
      <h3 class="hub-highlight-title">第一原理數學推導 (First-Principles)</h3>
      <p class="hub-highlight-body">
        所有幾何參數與物理常數皆具備清晰的閉環代數推導與物理依據：
      </p>
      <ul class="hub-highlight-list">
        <li>原子充填率 (Packing Fraction) 與矽原子體密度 (<InlineMath tex="5.0 \times 10^{22}\text{ cm}^{-3}" />) 精確解析。</li>
        <li>雜質偏析方程式 <InlineMath tex="C_s = k_0 C_0 (1-f)^{k_0-1}" /> 完整推導與極限行為邊界分析。</li>
      </ul>
    </div>
    <div class="hub-highlight-card">
      <span class="hub-highlight-num">[03] 實務工藝</span>
      <h3 class="hub-highlight-title">半導體材料製程 (Semiconductor Fab)</h3>
      <p class="hub-highlight-body">
        銜接微電子晶圓廠現代製程規範與冶金工程原理：
      </p>
      <ul class="hub-highlight-list">
        <li>柴氏提拉長晶法 (CZ)、無坩堝浮區熔煉法 (FZ) 及液封柴氏法 (LEC)。</li>
        <li>晶圓切割滾圓、CMP 化學機械研磨與晶向主切面 (Flat / Notch) 標定規範。</li>
      </ul>
    </div>
  </div>
</section>
</div>
