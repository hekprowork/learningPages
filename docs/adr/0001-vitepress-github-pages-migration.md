# 0001: 遷移至 VitePress 與 GitHub Pages 支援 3D Canvas 互動教學

- **Status**: Accepted
- **Date**: 2026-10-03

## Context
本專案原先評估使用 GitBook 作為課程講義與文件托管平台。然而，GitBook 在嵌入自定義互動式 3D Canvas 網頁元件（如 Three.js 晶格結構視覺化 `<CrystalViewer />`）以及高度客製化數學公式排版、章節自動化側邊欄上存在諸多限制，且缺乏免費且靈活的開源 CI/CD 靜態網頁部署自由度。

## Decision
我們決定全面遷移至 **VitePress** 作為核心文件與教學平台，並結合 **GitHub Pages** 進行免費且自動化的靜態網站部署。
- **前端框架**：VitePress（基於 Vue 3 與 Vite，具備極佳的效能與 Markdown 擴充能力）。
- **互動元件**：支援原生 Vue 3 3D Canvas 元件（Three.js），提供沉浸式固態電子晶格與能帶互動教學。
- **數學支援**：整合 Markdown KaTeX 數學公式渲染。
- **發布流程**：透過 GitHub Actions 實現自動化建置與 GitHub Pages 部署。

## Consequences
- **Positive (正面效益)**：
  - 完整支援無限制的互動式 3D 模擬與圖形化教學元件。
  - $0 伺服器維護成本，託管於 GitHub Pages。
  - 支援極速的 Vite 熱更新預覽與靈活的 Markdown 擴充。
  - 統一的 `000x-name.md` 章節命名與側邊欄導航規範。
- **Negative (負面影響 / 代價)**：
  - 需要團隊成員熟悉 Markdown 與 VitePress 配置結構。
