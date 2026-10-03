---
layout: home

hero:
  name: "跨學科學習知識庫"
  text: "現代化工程與科學數位講義平台"
  tagline: "集中託管固態物理、電子工程與計算機科學等多科目，具備 3D 互動視覺化與嚴謹數學推導"
  actions:
    - theme: brand
      text: ⚛️ 探索固態電子導論
      link: /solid-state/
    - theme: alt
      text: 📚 查看所有科目
      link: /solid-state/

features:
  - icon: ⚛️
    title: 固態電子導論
    details: 結晶學幾何、鑽石晶格與原子密度推導、CZ 提拉長晶、偏析效應與現代矽晶圓工藝，內建 3D 互動晶格模擬。
    link: /solid-state/
    linkText: 進入科目
  - icon: ⚡
    title: 電子學與電路分析
    details: 涵蓋二極體、BJT、MOSFET 小訊號模型、頻率響應分析、運算放大器與負回授電路設計。（籌備中 / Coming Soon）
  - icon: 💻
    title: 計算機組織與結構
    details: RISC-V 指令集架構、管線化 (Pipelining) 危害處理、快取記憶體階層架構與虛擬記憶體技術。（籌備中 / Coming Soon）
  - icon: 📡
    title: 電磁學與波動理論
    details: 馬克士威方程式推導、平面電磁波傳播、傳輸線阻抗匹配與史密斯圖工程應用。（籌備中 / Coming Soon）
---

<div class="portal-container">

## 🏛️ 多科目知識庫架構 (Multi-Subject Curriculum Hub)

本知識庫採用模組化多科目集中託管架構，每一學科擁有獨立的目錄命名空間、章節編排與側邊欄配置。

| 科目名稱 | 路由前綴 | 狀態 | 核心特色 |
| :--- | :--- | :--- | :--- |
| **⚛️ 固態電子導論** | `/solid-state/` | 🟢 已上線 (Active) | 3D WebGL 晶格視覺化、長晶製程、KaTeX 嚴密推導 |
| **⚡ 電子學與電路分析** | `/circuits/` *(規劃中)* | 🟡 籌備中 | SPICE 電路動態波形模擬、頻率響應波德圖 |
| **💻 計算機組織與結構** | `/comp-arch/` *(規劃中)* | 🟡 籌備中 | RISC-V 視覺化指令管線、快取命中模擬器 |
| **📡 電磁學與傳輸線** | `/electromagnetics/` *(規劃中)* | 🟡 籌備中 | 3D 電磁場向量場渲染、互動史密斯圖 |

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
