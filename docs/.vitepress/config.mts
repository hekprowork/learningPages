import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '學習筆記庫',
  description: 'Multi-Subject Engineering & Science Learning Portal',
  base: '/learningPages/',
  head: [
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css' }],
    ['meta', { name: 'theme-color', content: '#3b82f6' }]
  ],
  markdown: {
    math: true
  },
  themeConfig: {
    siteTitle: '📚 學習筆記庫',
    nav: [
      { text: '首頁', link: '/' },
      {
        text: '📚 選擇科目',
        items: [
          { text: '⚛️ 固態電子導論 (Solid-State)', link: '/solid-state/' }
        ]
      },
      { text: 'GitHub', link: 'https://github.com/hekprowork/learningPages' }
    ],
    sidebar: {
      '/solid-state/': [
        {
          text: 'Chapter 1: 結晶學與材料基礎 (Crystallography)',
          collapsed: false,
          items: [
            { text: '0001: 密勒指數與晶格幾何', link: '/solid-state/chapter1/0001-miller-indices' },
            { text: '0002: 鑽石結構與矽原子密度推導', link: '/solid-state/chapter1/0002-diamond-lattice-density' },
            { text: '0003: 塊狀晶體生長與矽晶圓製備', link: '/solid-state/chapter1/0003-bulk-crystal-growth' }
          ]
        },
        {
          text: 'Chapter 2: 觀念筆記與公式推導 (Learning Records)',
          collapsed: false,
          items: [
            { text: '0001: 基礎半導體材料分類與價電子結構', link: '/solid-state/chapter2/0001-bandgap-and-valence-electrons' },
            { text: '0002: 密勒指數晶面求法與面間距幾何', link: '/solid-state/chapter2/0002-interplanar-spacing-definition' },
            { text: '0003: 塊狀晶體生長與偏析效應', link: '/solid-state/chapter2/0003-bulk-crystal-growth' }
          ]
        },
        {
          text: 'Chapter 3: 核心公式速查表 (Reference Cheatsheets)',
          collapsed: false,
          items: [
            { text: '001: 密勒指數快速速查表', link: '/solid-state/chapter3/001-miller-indices-cheatsheet' },
            { text: '002: 鑽石與閃鋅礦結構幾何速查表', link: '/solid-state/chapter3/002-diamond-lattice-cheatsheet' },
            { text: '003: 塊狀晶體生長與晶圓製程速查表', link: '/solid-state/chapter3/003-bulk-crystal-growth-cheatsheet' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/hekprowork/learningPages' }
    ],
    footer: {
      message: '多科目學習知識庫 (Multi-Subject Learning Hub)',
      copyright: 'Copyright © 2026'
    }
  }
})
