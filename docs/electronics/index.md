<!-- Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 -->
<!-- Hallmark · genre: editorial · macrostructure: Index-First Modular Curriculum Matrix · design-system: design.md · designed-as-app -->

<script setup>
import { withBase } from 'vitepress'
</script>
<div class="subject-hub">
<header class="hub-header">
  <div class="hub-slug-row">
    <span class="hub-slug">Microelectronic Circuits // EE-CORE-201</span>
    <span class="hub-badge-status">Status 已上線 · 274 題教材題卡</span>
  </div>
  <h1 class="hub-title">電子學</h1>
  <div class="hub-subtitle">Microelectronic Circuits & Analog Signal Processing</div>
  <p class="hub-lead">
    本模組以經典教材 Sedra & Smith《Microelectronic Circuits》為基礎，涵蓋訊號源與放大器模型、單時間常數頻率響應，以及運算放大器的閉迴路組態、非理想效應與大訊號限制。
  </p>
  <div class="hub-meta-bar">
    <div class="hub-meta-item">
      <span class="hub-meta-label">權威教材</span>
      <span class="hub-meta-val">Sedra & Smith《Microelectronic Circuits》</span>
    </div>
    <div class="hub-meta-item">
      <span class="hub-meta-label">涵蓋範圍</span>
      <span class="hub-meta-val">Chapter 1–2 (Signals, Amplifiers & Op-Amps)</span>
    </div>
    <div class="hub-meta-item">
      <span class="hub-meta-label">題卡規模</span>
      <span class="hub-meta-val">274 題全自包含題卡與 KaTeX 詳解</span>
    </div>
  </div>
</header>
<div class="hub-stats-grid">
  <div class="hub-stat-card">
    <span class="hub-stat-label">課程核心章節</span>
    <span class="hub-stat-number">02</span>
    <span class="hub-stat-sub">訊號放大器與運算放大器</span>
  </div>
  <div class="hub-stat-card">
    <span class="hub-stat-label">正式講義單元</span>
    <span class="hub-stat-number">14</span>
    <span class="hub-stat-sub">Chapter 1–2 完整教學路徑</span>
  </div>
  <div class="hub-stat-card">
    <span class="hub-stat-label">觀念推導與速查</span>
    <span class="hub-stat-number">02</span>
    <span class="hub-stat-sub">二埠等效模型與速查手冊</span>
  </div>
  <div class="hub-stat-card">
    <span class="hub-stat-label">實戰練習題卡</span>
    <span class="hub-stat-number">274</span>
    <span class="hub-stat-sub">Examples, Exercises, Problems</span>
  </div>
</div>
<section class="hub-section">
  <div class="hub-section-header">
    <span class="hub-section-index">01 / Curriculum Matrix</span>
    <h2 class="hub-section-title">課程結構與導航</h2>
    <p class="hub-section-desc">涵蓋基礎理論、受控源二埠等效模型與核心公式速查手冊。</p>
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
          <a :href="withBase('/electronics/chapter1/0002-signals.html')">訊號與放大器基礎 (Signals & Amplifiers)</a>
        </h3>
        <p class="hub-card-desc">
          深入探索微小感測訊號的二埠等效模型、受控源放大器分類、級聯負載效應與單時間常數頻率響應。
        </p>
        <ul class="hub-lesson-list">
          <li class="hub-lesson-item">
            <span class="hub-lesson-code">0002</span>
            <a class="hub-lesson-link" :href="withBase('/electronics/chapter1/0002-signals.html')">訊號源模型與負載效應</a>
          </li>
          <li class="hub-lesson-item">
            <span class="hub-lesson-code">0003–0004</span>
            <a class="hub-lesson-link" :href="withBase('/electronics/chapter1/0003-frequency-spectrum-of-signals.html')">訊號頻譜與類比/數位訊號分類</a>
          </li>
          <li class="hub-lesson-item">
            <span class="hub-lesson-code">0005–0007</span>
            <a class="hub-lesson-link" :href="withBase('/electronics/chapter1/0005-amplifiers.html')">放大器概念、電路模型與 STC 頻率響應</a>
          </li>
        </ul>
      </div>
      <div class="hub-card-footer">
        <a class="hub-btn-link" :href="withBase('/electronics/chapter1/0002-signals.html')">進入 Chapter 1 講義 →</a>
      </div>
    </div>
    <!-- Chapter 2 Card -->
    <div class="hub-card">
      <div class="hub-card-top">
        <div class="hub-card-badge-row">
          <span class="hub-tag hub-tag-accent">Chapter 02</span>
          <span class="hub-card-count">8 單元 · 46 張重繪圖表</span>
        </div>
        <h3 class="hub-card-title">
          <a :href="withBase('/electronics/chapter2/0001-ideal-op-amp.html')">運算放大器 (Operational Amplifiers)</a>
        </h3>
        <p class="hub-card-desc">
          從理想運放兩大分析規則出發，完整推導反相、非反相、差動、儀表放大器、積分與微分電路，並納入直流誤差、有限頻寬及大訊號限制。
        </p>
        <ul class="hub-lesson-list">
          <li class="hub-lesson-item">
            <span class="hub-lesson-code">0001–0003</span>
            <a class="hub-lesson-link" :href="withBase('/electronics/chapter2/0001-ideal-op-amp.html')">理想模型與兩種基本閉迴路組態</a>
          </li>
          <li class="hub-lesson-item">
            <span class="hub-lesson-code">0004–0006</span>
            <a class="hub-lesson-link" :href="withBase('/electronics/chapter2/0004-difference-amplifiers.html')">差動應用、動態運算與直流非理想效應</a>
          </li>
          <li class="hub-lesson-item">
            <span class="hub-lesson-code">0007–0008</span>
            <a class="hub-lesson-link" :href="withBase('/electronics/chapter2/0007-finite-gain-and-bandwidth.html')">頻寬、飽和、輸出電流與轉換速率</a>
          </li>
        </ul>
      </div>
      <div class="hub-card-footer">
        <a class="hub-btn-link" :href="withBase('/electronics/chapter2/0001-ideal-op-amp.html')">進入 Chapter 2 講義 →</a>
      </div>
    </div>
    <!-- Learning Records Card -->
    <div class="hub-card">
      <div class="hub-card-top">
        <div class="hub-card-badge-row">
          <span class="hub-tag">Theory & Notes</span>
          <span class="hub-card-count">1 篇深度筆記</span>
        </div>
        <h3 class="hub-card-title">
          <a :href="withBase('/electronics/learning-records/0001-signals-and-amplifiers-foundations.html')">觀念筆記與電路推導 (Learning Records)</a>
        </h3>
        <p class="hub-card-desc">
          深入探討戴維寧/諾頓訊號源、二埠阻抗匹配極限、多級放大器負載效應推導與工作點物理意涵。
        </p>
        <ul class="hub-lesson-list">
          <li class="hub-lesson-item">
            <span class="hub-lesson-code">0001</span>
            <a class="hub-lesson-link" :href="withBase('/electronics/learning-records/0001-signals-and-amplifiers-foundations.html')">建立訊號模型與四大放大器等效電路核心思維</a>
          </li>
        </ul>
      </div>
      <div class="hub-card-footer">
        <a class="hub-btn-link" :href="withBase('/electronics/learning-records/0001-signals-and-amplifiers-foundations.html')">閱讀理論推導 →</a>
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
          <a :href="withBase('/electronics/reference/001-amplifier-models-and-frequency-response.html')">核心公式速查表 (Reference Cheatsheets)</a>
        </h3>
        <p class="hub-card-desc">
          考試、複習與電路設計必備之高密度速查卡，彙整電壓/電流/轉導/轉阻四大組態轉換參數。
        </p>
        <ul class="hub-lesson-list">
          <li class="hub-lesson-item">
            <span class="hub-lesson-code">001</span>
            <a class="hub-lesson-link" :href="withBase('/electronics/reference/001-amplifier-models-and-frequency-response.html')">放大器模型、增益計算與頻率響應速查手冊</a>
          </li>
        </ul>
      </div>
      <div class="hub-card-footer">
        <a class="hub-btn-link" :href="withBase('/electronics/reference/001-amplifier-models-and-frequency-response.html')">開啟速查手冊 →</a>
      </div>
    </div>
  </div>
</section>
<section class="hub-section">
  <div class="hub-section-header">
    <span class="hub-section-index">02 / Interactive Workbooks</span>
    <h2 class="hub-section-title">互動式題庫練習系統 (274 題)</h2>
    <p class="hub-section-desc">搭載 Hallmark 狀態驅動題卡、KaTeX 數學公式與同屏顯式電路圖解之各章題庫與範例練習。</p>
  </div>
  <div class="hub-practice-table-wrap">
    <table class="hub-table">
      <thead>
        <tr>
          <th>題庫模組</th>
          <th>章節與題型分類</th>
          <th>題數規模</th>
          <th>快速操作</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Chapter 1 統一互動題庫</strong></td>
          <td>範例、Exercises、Problems 1.1–1.83</td>
          <td>112 題</td>
          <td><a class="hub-lesson-link" :href="withBase('/electronics/practice/0001-chapter1-workbook.html')">開啟題庫 →</a></td>
        </tr>
        <tr>
          <td><strong>Chapter 2 統一互動題庫</strong></td>
          <td>範例、Exercises、Problems 2.1–2.127</td>
          <td>162 題</td>
          <td><a class="hub-lesson-link" :href="withBase('/electronics/practice/0002-chapter2-workbook.html')">開啟題庫 →</a></td>
        </tr>
        <tr>
          <td><strong>教材題卡盤點總覽</strong></td>
          <td>Chapter 1 & 2 教材題目覆蓋與對帳報告</td>
          <td>盤點總覽</td>
          <td><a class="hub-lesson-link" :href="withBase('/electronics/practice/0003-textbook-missing.html')">查閱報告 →</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</section>
<section class="hub-section">
  <div class="hub-section-header">
    <span class="hub-section-index">03 / Engineering Highlights</span>
    <h2 class="hub-section-title">特色亮點與工程核心</h2>
    <p class="hub-section-desc">掌握微電子電路設計與解析的核心思維架構。</p>
  </div>
  <div class="hub-highlight-grid">
    <div class="hub-highlight-card">
      <span class="hub-highlight-num">[01] 二埠模型</span>
      <h3 class="hub-highlight-title">二埠受控源模型 (Two-Port Models)</h3>
      <p class="hub-highlight-body">
        釐清四類受控源之極限輸入/輸出阻抗條件與轉換關係：
      </p>
      <ul class="hub-highlight-list">
        <li>電壓放大器 (<InlineMath tex="A_{vo}" />): <InlineMath tex="R_i = \infty" />, <InlineMath tex="R_o = 0" /></li>
        <li>電流放大器 (<InlineMath tex="A_{is}" />): <InlineMath tex="R_i = 0" />, <InlineMath tex="R_o = \infty" /></li>
        <li>轉導放大器 (<InlineMath tex="G_m" />): <InlineMath tex="R_i = \infty" />, <InlineMath tex="R_o = \infty" /></li>
        <li>轉阻放大器 (<InlineMath tex="R_m" />): <InlineMath tex="R_i = 0" />, <InlineMath tex="R_o = 0" /></li>
      </ul>
    </div>
    <div class="hub-highlight-card">
      <span class="hub-highlight-num">[02] 級聯演算法</span>
      <h3 class="hub-highlight-title">多級級聯負載效應 (Loading Effects)</h3>
      <p class="hub-highlight-body">
        解決工程實務中後級輸入阻抗對前級輸出阻抗的下拉分壓問題：
      </p>
      <ul class="hub-highlight-list">
        <li>建立「由後往前求負載阻抗、由前往後求節點增益」的標準解題 SOP。</li>
        <li>精確解析整體電壓增益 <InlineMath tex="A_v = v_L / v_I" /> 與訊號源增益 <InlineMath tex="A_{vs} = v_L / v_{sig}" /> 之本質區別。</li>
      </ul>
    </div>
    <div class="hub-highlight-card">
      <span class="hub-highlight-num">[03] 頻響分析</span>
      <h3 class="hub-highlight-title">STC 頻率響應與波德圖 (Bode Plot)</h3>
      <p class="hub-highlight-body">
        低通與高通單時間常數網路之轉移函數 <InlineMath tex="T(s)" /> 解析：
      </p>
      <ul class="hub-highlight-list">
        <li>3-dB 截止頻率 <InlineMath tex="\omega_0 = 1/RC" />、高低頻漸近線斜率（<InlineMath tex="-20\text{ dB/decade}" />）。</li>
        <li>轉折頻率處相位變化（<InlineMath tex="\pm 45^\circ" />）與多極點級聯頻寬收縮效應。</li>
      </ul>
    </div>
  </div>
</section>
</div>
