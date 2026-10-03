---
layout: home

hero:
  name: "跨學科學習知識庫"
  text: "現代化工程與科學數位講義平台"
  tagline: "集中託管固態物理、電子學、電路學與工程數學等多科目，具備互動視覺化與嚴謹數學推導"
  actions:
    - theme: brand
      text: ⚛️ 固態電子導論
      link: /solid-state/
    - theme: alt
      text: ⚡ 電子學
      link: /electronics/
    - theme: alt
      text: 🔌 電路學
      link: /circuits/
    - theme: alt
      text: 📐 工程數學
      link: /engineering-math/

features:
  - icon: ⚛️
    title: 固態電子導論
    details: 結晶學幾何、鑽石結構與原子密度推導、CZ 提拉長晶、偏析效應與現代矽晶圓工藝，內建 3D 互動晶格模擬。
    link: /solid-state/
    linkText: 進入科目
  - icon: ⚡
    title: 電子學 (Microelectronic Circuits)
    details: 訊號源等效模型、四大二埠受控源放大器組態、多級串接負載效應計算與單時間常數 (STC) 頻率響應波德圖。
    link: /electronics/
    linkText: 進入科目
  - icon: 🔌
    title: 電路學 (Electric Circuit Theory)
    details: 星形-三角形 (Y-Δ) 外端等效互換第一原理推導、平衡對稱與電導對偶性、超節點浮動電壓源分析與拘束方程式。
    link: /circuits/
    linkText: 進入科目
  - icon: 📐
    title: 工程數學 (Engineering Mathematics)
    details: 一階非正合 ODE Euler 正合檢驗、單變數積分因子生成原理、常見微分分組湊微分速算法與全微分勢函數構造。
    link: /engineering-math/
    linkText: 進入科目
---

<div class="portal-container">

## 🏛️ 多科目知識庫架構 (Multi-Subject Curriculum Hub)

本知識庫採用模組化多科目集中託管架構，每一學科擁有獨立的目錄命名空間、章節編排與側邊欄配置。

| 科目名稱 | 路由前綴 | 狀態 | 核心特色與內容 |
| :--- | :--- | :--- | :--- |
| **⚛️ 固態電子導論** | [`/solid-state/`](/solid-state/) | 🟢 已上線 (Active) | 3D WebGL 晶格視覺化、長晶製程、KaTeX 嚴密推導 |
| **⚡ 電子學** | [`/electronics/`](/electronics/) | 🟢 已上線 (Active) | 二埠等效模型、多級串接負載效應、STC 頻率響應 |
| **🔌 電路學** | [`/circuits/`](/circuits/) | 🟢 已上線 (Active) | Y-Δ 外端等效推導、超節點高斯面包絡、電導對偶性 |
| **📐 工程數學** | [`/engineering-math/`](/engineering-math/) | 🟢 已上線 (Active) | 一階 ODE 積分因子法、Euler 正合判定、湊微分速算 |

</div>

<style>
.portal-container {
  max-width: 960px;
  margin: 2rem auto;
  padding: 0 1.5rem;
}

:root {
  --vp-c-brand-1: #2563eb;
  --vp-c-brand-2: #3b82f6;
}
</style>
