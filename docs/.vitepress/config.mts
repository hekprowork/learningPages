import { defineConfig } from 'vitepress'
// @ts-ignore
import markdownItKatex from 'markdown-it-katex'

export default defineConfig({
  title: '固態電子導論',
  description: 'Introduction to Solid-State Devices & Crystallography',
  base: '/learningPages/',
  head: [
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css' }],
    ['meta', { name: 'theme-color', content: '#3b82f6' }]
  ],
  markdown: {
    config: (md) => {
      md.use(markdownItKatex)
    }
  },
  themeConfig: {
    siteTitle: '固態電子導論',
    nav: [
      { text: '首頁', link: '/' },
      { text: 'Chapter 1: 結晶學基礎', link: '/chapter1/0001-miller-indices' },
      { text: 'Chapter 2: 觀念筆記', link: '/chapter2/0001-bandgap-and-valence-electrons' },
      { text: 'Chapter 3: 公式速查表', link: '/chapter3/001-miller-indices-cheatsheet' }
    ],
    sidebar: [
      {
        text: 'Chapter 1: 結晶學與材料基礎 (Crystallography)',
        collapsed: false,
        items: [
          { text: '0001: 密勒指數與晶格幾何', link: '/chapter1/0001-miller-indices' },
          { text: '0002: 鑽石結構與矽原子密度推導', link: '/chapter1/0002-diamond-lattice-density' },
          { text: '0003: 塊狀晶體生長與矽晶圓製備', link: '/chapter1/0003-bulk-crystal-growth' }
        ]
      },
      {
        text: 'Chapter 2: 觀念筆記與公式推導 (Learning Records)',
        collapsed: false,
        items: [
          { text: '0001: 基礎半導體材料分類與價電子結構', link: '/chapter2/0001-bandgap-and-valence-electrons' },
          { text: '0002: 密勒指數晶面求法與面間距幾何', link: '/chapter2/0002-interplanar-spacing-definition' },
          { text: '0003: 塊狀晶體生長與偏析效應', link: '/chapter2/0003-bulk-crystal-growth' }
        ]
      },
      {
        text: 'Chapter 3: 核心公式速查表 (Reference Cheatsheets)',
        collapsed: false,
        items: [
          { text: '001: 密勒指數快速速查表', link: '/chapter3/001-miller-indices-cheatsheet' },
          { text: '002: 鑽石與閃鋅礦結構幾何速查表', link: '/chapter3/002-diamond-lattice-cheatsheet' },
          { text: '003: 塊狀晶體生長與晶圓製程速查表', link: '/chapter3/003-bulk-crystal-growth-cheatsheet' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/' }
    ],
    footer: {
      message: '固態電子導論 (Solid-State Electronics & Crystallography)',
      copyright: 'Copyright © 2026'
    }
  }
})
