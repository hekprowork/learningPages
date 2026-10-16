<!-- Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 -->
<!-- Hallmark · genre: editorial · macrostructure: Index-First Modular Curriculum Matrix · design-system: design.md · designed-as-app -->

<script setup>
import { withBase } from 'vitepress'
</script>
<div class="subject-hub">
<header class="hub-header">
  <div class="hub-slug-row">
    <span class="hub-slug">Engineering Mathematics // MATH-CORE-201</span>
    <span class="hub-badge-status">Status 已上線 · 106 題實戰題卡</span>
  </div>
  <h1 class="hub-title">工程數學</h1>
  <div class="hub-subtitle">Engineering Mathematics & Analytical Differential Equations</div>
  <p class="hub-lead">
    本模組聚焦於電機與工程科學領域之常微分方程式（ODE）、線性代數、拉普拉斯轉換與傅立葉分析，強調嚴謹解析解法、直觀幾何推導、微分運算子速解法與防呆口訣。
  </p>
  <div class="hub-meta-bar">
    <div class="hub-meta-item">
      <span class="hub-meta-label">涵蓋領域</span>
      <span class="hub-meta-val">一階 ODE、二階常係數、高階線性與電路暫態工程建模</span>
    </div>
    <div class="hub-meta-item">
      <span class="hub-meta-label">講義規模</span>
      <span class="hub-meta-val">17 篇正式講義 + 2 篇推導速查</span>
    </div>
    <div class="hub-meta-item">
      <span class="hub-meta-label">實戰題庫</span>
      <span class="hub-meta-val">106 題完整題卡（含 35 張正式教材例題卡）</span>
    </div>
  </div>
</header>
<div class="hub-stats-grid">
  <div class="hub-stat-card">
    <span class="hub-stat-label">課程核心章節</span>
    <span class="hub-stat-number">02</span>
    <span class="hub-stat-sub">一階 ODE 與二階高階 ODE</span>
  </div>
  <div class="hub-stat-card">
    <span class="hub-stat-label">正式講義單元</span>
    <span class="hub-stat-number">17</span>
    <span class="hub-stat-sub">可分離至柯西－尤拉方程式</span>
  </div>
  <div class="hub-stat-card">
    <span class="hub-stat-label">觀念推導與速查</span>
    <span class="hub-stat-number">02</span>
    <span class="hub-stat-sub">積分因子推導與速查卡</span>
  </div>
  <div class="hub-stat-card">
    <span class="hub-stat-label">實戰練習題卡</span>
    <span class="hub-stat-number">106</span>
    <span class="hub-stat-sub">教材例題與精選題庫</span>
  </div>
</div>
<section class="hub-section">
  <div class="hub-section-header">
    <span class="hub-section-index">01 / Curriculum Matrix</span>
    <h2 class="hub-section-title">課程結構與導航</h2>
    <p class="hub-section-desc">常微分方程式解析體系，由一階基礎建模延伸至高階線性算子法。</p>
  </div>
  <div class="hub-card-grid">
    <!-- Chapter 1 Card -->
    <div class="hub-card">
      <div class="hub-card-top">
        <div class="hub-card-badge-row">
          <span class="hub-tag hub-tag-accent">Chapter 01</span>
          <span class="hub-card-count">8 單元</span>
        </div>
        <h3 class="hub-card-title">
          <a :href="withBase('/engineering-math/chapter1/0001-ode-fundamentals.html')">一階常微分方程式 (First-Order ODEs)</a>
        </h3>
        <p class="hub-card-desc">
          解析解法、存在唯一性定理、可分離變數、一階線性、正合判定、積分因子求解技術、特殊非線性代換與 RL/RC 暫態建模。
        </p>
        <ul class="hub-lesson-list">
          <li class="hub-lesson-item">
            <span class="hub-lesson-code">0001–0003</span>
            <a class="hub-lesson-link" :href="withBase('/engineering-math/chapter1/0001-ode-fundamentals.html')">基本概念、解的本質/初值問題與可分離變數法</a>
          </li>
          <li class="hub-lesson-item">
            <span class="hub-lesson-code">0004–0006</span>
            <a class="hub-lesson-link" :href="withBase('/engineering-math/chapter1/0004-first-order-linear-odes.html')">一階線性、正合微分方程位勢函數與積分因子法</a>
          </li>
          <li class="hub-lesson-item">
            <span class="hub-lesson-code">0007–0008</span>
            <a class="hub-lesson-link" :href="withBase('/engineering-math/chapter1/0007-nonlinear-odes-bernoulli-riccati.html')">齊次/白努利/黎卡提與 RL/RC 電路暫態應用</a>
          </li>
        </ul>
      </div>
      <div class="hub-card-footer">
        <a class="hub-btn-link" :href="withBase('/engineering-math/chapter1/0001-ode-fundamentals.html')">進入 Chapter 1 講義 →</a>
      </div>
    </div>
    <!-- Chapter 2 Card -->
    <div class="hub-card">
      <div class="hub-card-top">
        <div class="hub-card-badge-row">
          <span class="hub-tag hub-tag-accent">Chapter 02</span>
          <span class="hub-card-count">9 單元</span>
        </div>
        <h3 class="hub-card-title">
          <a :href="withBase('/engineering-math/second-order/0001-second-order-ode-concepts.html')">二階與高階常微分方程式 (Second-Order & Higher)</a>
        </h3>
        <p class="hub-card-desc">
          二階常係數齊次線性 ODE、特徵方程、待定係數法、微分運算子逆算子、參數變異法、柯西－尤拉方程與降階法。
        </p>
        <ul class="hub-lesson-list">
          <li class="hub-lesson-item">
            <span class="hub-lesson-code">0001–0003</span>
            <a class="hub-lesson-link" :href="withBase('/engineering-math/second-order/0001-second-order-ode-concepts.html')">二階線性概念、朗斯基行列式與特徵方程式</a>
          </li>
          <li class="hub-lesson-item">
            <span class="hub-lesson-code">0004–0006</span>
            <a class="hub-lesson-link" :href="withBase('/engineering-math/second-order/0004-higher-order-linear-odes.html')">高階常係數、待定係數法與微分逆運算子法</a>
          </li>
          <li class="hub-lesson-item">
            <span class="hub-lesson-code">0007–0009</span>
            <a class="hub-lesson-link" :href="withBase('/engineering-math/second-order/0007-variation-of-parameters.html')">參數變異法、柯西－尤拉方程與降階法</a>
          </li>
        </ul>
      </div>
      <div class="hub-card-footer">
        <a class="hub-btn-link" :href="withBase('/engineering-math/second-order/0001-second-order-ode-concepts.html')">進入 Chapter 2 講義 →</a>
      </div>
    </div>
    <!-- Learning Records Card -->
    <div class="hub-card">
      <div class="hub-card-top">
        <div class="hub-card-badge-row">
          <span class="hub-tag">Theory & Notes</span>
          <span class="hub-card-count">1 篇推導基線</span>
        </div>
        <h3 class="hub-card-title">
          <a :href="withBase('/engineering-math/chapter2/0001-integrating-factors.html')">觀念筆記與推導基線 (Learning Records)</a>
        </h3>
        <p class="hub-card-desc">
          探討積分因子幾何意義、對稱勢函數連續性條件與全微分存在性證明。
        </p>
        <ul class="hub-lesson-list">
          <li class="hub-lesson-item">
            <span class="hub-lesson-code">0001</span>
            <a class="hub-lesson-link" :href="withBase('/engineering-math/chapter2/0001-integrating-factors.html')">建立積分因子法學習基線與幾何架構</a>
          </li>
        </ul>
      </div>
      <div class="hub-card-footer">
        <a class="hub-btn-link" :href="withBase('/engineering-math/chapter2/0001-integrating-factors.html')">閱讀推導筆記 →</a>
      </div>
    </div>
    <!-- Cheatsheet Card -->
    <div class="hub-card">
      <div class="hub-card-top">
        <div class="hub-card-badge-row">
          <span class="hub-tag">Reference</span>
          <span class="hub-card-count">1 張速查卡</span>
        </div>
        <h3 class="hub-card-title">
          <a :href="withBase('/engineering-math/chapter3/001-integrating-factors-cheatsheet.html')">核心公式速查表 (Reference Cheatsheets)</a>
        </h3>
        <p class="hub-card-desc">
          高密度解題公式速查卡，收錄積分因子判別式、微分算子特解表與特徵根型態。
        </p>
        <ul class="hub-lesson-list">
          <li class="hub-lesson-item">
            <span class="hub-lesson-code">001</span>
            <a class="hub-lesson-link" :href="withBase('/engineering-math/chapter3/001-integrating-factors-cheatsheet.html')">一階 ODE 積分因子與正合法速查卡</a>
          </li>
        </ul>
      </div>
      <div class="hub-card-footer">
        <a class="hub-btn-link" :href="withBase('/engineering-math/chapter3/001-integrating-factors-cheatsheet.html')">開啟速查手冊 →</a>
      </div>
    </div>
  </div>
</section>
<section class="hub-section">
  <div class="hub-section-header">
    <span class="hub-section-index">02 / Interactive Workbooks</span>
    <h2 class="hub-section-title">互動式題庫練習系統 (106 題)</h2>
    <p class="hub-section-desc">全題目自包含題卡與 KaTeX 嚴謹推導詳解，覆蓋課本例題、課堂練習與精選範例。</p>
  </div>
  <div class="hub-practice-table-wrap">
    <table class="hub-table">
      <thead>
        <tr>
          <th>題庫模組</th>
          <th>收錄內容與主題</th>
          <th>題數規模</th>
          <th>快速操作</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Chapter 1 互動範例與精選題庫</strong></td>
          <td>一階 ODE 各種解析解法、積分因子實戰與電路工程應用</td>
          <td>56 題</td>
          <td><a class="hub-lesson-link" :href="withBase('/engineering-math/practice/0001-chapter1-examples.html')">練習題卡 →</a></td>
        </tr>
        <tr>
          <td><strong>Chapter 1–2 正式教材例題</strong></td>
          <td>教材正規例題逐題解析，附完整來源標註與題目對帳</td>
          <td>35 題</td>
          <td><a class="hub-lesson-link" :href="withBase('/engineering-math/practice/0003-textbook-examples.html')">練習題卡 →</a></td>
        </tr>
        <tr>
          <td><strong>Chapter 2 互動範例與精選題庫</strong></td>
          <td>二階常係數齊次/非齊次、微分算子法、參數變異與尤拉方程</td>
          <td>15 題</td>
          <td><a class="hub-lesson-link" :href="withBase('/engineering-math/practice/0002-chapter2-examples.html')">練習題卡 →</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</section>
<section class="hub-section">
  <div class="hub-section-header">
    <span class="hub-section-index">03 / Engineering Highlights</span>
    <h2 class="hub-section-title">特色亮點與解題架構</h2>
    <p class="hub-section-desc">結合第一原理推導與工程快速解題技巧，提升解析熟練度。</p>
  </div>
  <div class="hub-highlight-grid">
    <div class="hub-highlight-card">
      <span class="hub-highlight-num">[01] 第一原理推導</span>
      <h3 class="hub-highlight-title">Euler 正合性與勢函數構造</h3>
      <p class="hub-highlight-body">
        嚴謹推導全微分正合條件與單變數積分因子判別式：
      </p>
      <ul class="hub-highlight-list">
        <li>Euler 正合性檢驗 <InlineMath tex="\frac{\partial M}{\partial y} = \frac{\partial N}{\partial x}" /> 與勢函數 <InlineMath tex="\phi(x,y)=C" /> 的構造原理。</li>
        <li>單變數積分因子判別式 <InlineMath tex="\mu(x) = \exp\left(\int \frac{M_y - N_x}{N}\,dx\right)" /> 的生成推導。</li>
      </ul>
    </div>
    <div class="hub-highlight-card">
      <span class="hub-highlight-num">[02] 湊微分口訣</span>
      <h3 class="hub-highlight-title">常用分組湊微分原形 (30 秒速解)</h3>
      <p class="hub-highlight-body">
        熟練常見全微分原形，破局無須冗長繁複代換：
      </p>
      <ul class="hub-highlight-list">
        <li><InlineMath tex="x\,dy + y\,dx = d(xy)" /></li>
        <li><InlineMath tex="\frac{x\,dy - y\,dx}{x^2} = d\left(\frac{y}{x}\right)" />，<InlineMath tex="\frac{y\,dx - x\,dy}{y^2} = d\left(\frac{x}{y}\right)" /></li>
        <li><InlineMath tex="\frac{x\,dy - y\,dx}{x^2 + y^2} = d\left(\arctan\frac{y}{x}\right)" /></li>
      </ul>
    </div>
    <div class="hub-highlight-card">
      <span class="hub-highlight-num">[03] 逆運算子法</span>
      <h3 class="hub-highlight-title">微分算子法與共振特解</h3>
      <p class="hub-highlight-body">
        利用多項式算子 <InlineMath tex="D = \frac{d}{dx}" /> 與逆算子 <InlineMath tex="\frac{1}{P(D)}" /> 快速求解特定非齊次項：
      </p>
      <ul class="hub-highlight-list">
        <li>指數位移定理：<InlineMath tex="\frac{1}{P(D)} [e^{ax} V(x)] = e^{ax} \frac{1}{P(D+a)} V(x)" /></li>
        <li>共振項分母為零時，自動套用微分階數修正規則。</li>
      </ul>
    </div>
  </div>
</section>
</div>
