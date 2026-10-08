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
    siteTitle: 'Library 學習筆記庫',
    nav: [
      { text: '首頁', link: '/' },
      {
        text: 'Library 選擇科目',
        items: [
          { text: 'Solid-State 固態電子導論 (Solid-State)', link: '/solid-state/' },
          { text: 'Electronics 電子學 (Electronics)', link: '/electronics/' },
          { text: 'Circuits 電路學 (Circuits)', link: '/circuits/' },
          { text: 'Math 工程數學 (Engineering Math)', link: '/engineering-math/' }
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
      ],
      '/electronics/': [
        {
          text: 'Chapter 1: 訊號與放大器基礎 (Signals & Amplifiers)',
          collapsed: false,
          items: [
            { text: '0001: 訊號、放大器模型與頻率響應', link: '/electronics/chapter1/0001-signals-and-amplifiers' }
          ]
        },
        {
          text: 'Chapter 2: 觀念筆記與電路推導 (Learning Records)',
          collapsed: false,
          items: [
            { text: '0001: 訊號模型與四大放大器等效電路核心思維', link: '/electronics/chapter2/0001-signals-and-amplifiers-foundations' }
          ]
        },
        {
          text: 'Chapter 3: 核心公式速查表 (Reference Cheatsheets)',
          collapsed: false,
          items: [
            { text: '001: 放大器模型、增益計算與頻率響應速查手冊', link: '/electronics/chapter3/001-amplifier-models-and-frequency-response' }
          ]
        },
        {
          text: '互動式題庫練習系統 (Interactive Practice Workbooks)',
          collapsed: false,
          items: [
            { text: 'Chapter 1: 互動式範例與練習題庫', link: '/electronics/practice/0001-chapter1-examples' },
            { text: 'Chapter 2: 互動式範例與練習題庫', link: '/electronics/practice/0002-chapter2-examples' }
          ]
        }
      ],
      '/circuits/': [
        {
          text: 'Chapter 2: 基本定律 (Basic Laws)',
          collapsed: false,
          items: [
            { text: '0001: 星形 (Y) 與等效三角形 (Δ) 網路互換原理與推導', link: '/circuits/chapter2/0001-wye-delta-transformation' }
          ]
        },
        {
          text: 'Chapter 3: 分析方法 (Methods of Analysis)',
          collapsed: false,
          items: [
            { text: '0001: 超節點分析法 (Supernode Analysis) 的原理與實戰破解', link: '/circuits/chapter3/0001-supernode-analysis' },
            { text: '0002: 網孔分析法 (Mesh Analysis) 與超網孔的原理與實戰破解', link: '/circuits/chapter3/0002-mesh-analysis' },
            { text: '0003: 觀察法分析 (Nodal and Mesh Analysis by Inspection) 的原理與實戰破解', link: '/circuits/chapter3/0003-inspection-analysis' }
          ]
        },
        {
          text: '觀念筆記與定理推導 (Learning Records)',
          collapsed: false,
          items: [
            { text: '0001: 星形與三角形網路等效互換原理與幾何對偶', link: '/circuits/learning-records/0001-wye-delta-transformation-principle' },
            { text: '0002: 開路測試在三端網路等效推導中的數學與物理合法性', link: '/circuits/learning-records/0002-open-circuit-terminal-equivalence-validity' },
            { text: '0003: 超節點分析法的物理包絡原理與拘束方程式架構', link: '/circuits/learning-records/0003-supernode-nodal-analysis-principle' },
            { text: '0004: 網孔電流法的平面拓撲本質與超網孔迴路獨立性推導', link: '/circuits/learning-records/0004-mesh-supermesh-principle' }
          ]
        },
        {
          text: '核心公式速查表 (Reference Cheatsheets)',
          collapsed: false,
          items: [
            { text: '001: 星形 (Y) 與三角形 (Δ) 網路等效互換速查手冊', link: '/circuits/reference/001-wye-delta-reference' },
            { text: '002: 超節點分析法 (Supernode Analysis) 核心速查手冊', link: '/circuits/reference/002-supernode-reference' },
            { text: '003: 網孔分析法 (Mesh Analysis) 與超網孔核心速查手冊', link: '/circuits/reference/003-mesh-reference' },
            { text: '004: 觀察法分析 (Inspection Analysis) 核心速查手冊', link: '/circuits/reference/004-inspection-reference' }
          ]
        },
        {
          text: '互動式題庫練習系統 (Interactive Practice Workbooks)',
          collapsed: false,
          items: [
            { text: 'Chapter 1: 互動式範例與練習題庫', link: '/circuits/practice/0001-chapter1-examples' },
            { text: 'Chapter 2: 互動式範例與練習題庫', link: '/circuits/practice/0002-chapter2-examples' },
            { text: 'Chapter 3: 互動式範例與練習題庫', link: '/circuits/practice/0003-chapter3-examples' },
            { text: 'Chapter 4: 互動式範例與練習題庫 (電路定理)', link: '/circuits/practice/0004-chapter4-examples' },
            { text: 'Chapter 5: 互動式範例與練習題庫 (運算放大器)', link: '/circuits/practice/0005-chapter5-examples' },
            { text: 'Chapter 6: 互動式範例與練習題庫 (電容與電感)', link: '/circuits/practice/0006-chapter6-examples' }
          ]
        }
      ],
      '/engineering-math/': [
        {
          text: 'Chapter 1: 一階常微分方程式 (First-Order ODEs)',
          collapsed: false,
          items: [
            { text: '0001: 一階常微分方程基本概念與分類', link: '/engineering-math/chapter1/0001-ode-fundamentals' },
            { text: '0002: 解的本質、初值問題與存在唯一性', link: '/engineering-math/chapter1/0002-types-of-solutions' },
            { text: '0003: 可分離變數方程式 (Separable ODEs)', link: '/engineering-math/chapter1/0003-separable-equations' },
            { text: '0004: 一階線性常微分方程式 (Linear ODEs)', link: '/engineering-math/chapter1/0004-first-order-linear-odes' },
            { text: '0005: 正合微分方程式與位勢函數 (Exact ODEs)', link: '/engineering-math/chapter1/0005-exact-differential-equations' },
            { text: '0006: 積分因子法（非正合轉正合方程式）', link: '/engineering-math/chapter1/0006-integrating-factor-methods' },
            { text: '0007: 特殊非線性 ODE（齊次、白努利與黎卡提）', link: '/engineering-math/chapter1/0007-nonlinear-odes-bernoulli-riccati' },
            { text: '0008: 工程應用：RL 與 RC 電路暫態分析', link: '/engineering-math/chapter1/0008-engineering-applications-circuits' },
            { text: '觀念推導: 積分因子法學習基線與幾何架構', link: '/engineering-math/chapter2/0001-integrating-factors' },
            { text: '核心速查: 一階 ODE 積分因子與正合法速查卡', link: '/engineering-math/chapter3/001-integrating-factors-cheatsheet' },
            { text: '實戰題庫: Chapter 1 互動式範例與精選題庫 (56 題)', link: '/engineering-math/practice/0001-chapter1-examples' }
          ]
        },
        {
          text: 'Chapter 2: 二階與高階常微分方程式 (Second-Order & Higher ODEs)',
          collapsed: false,
          items: [
            { text: '0001: 二階線性 ODE 基本概念、存在唯一性與疊加原理', link: '/engineering-math/second-order/0001-second-order-ode-concepts' },
            { text: '0002: 線性獨立、朗斯基行列式與齊次通解結構', link: '/engineering-math/second-order/0002-linear-independence-wronskian' },
            { text: '0003: 二階常係數齊次線性 ODE 與特徵方程式', link: '/engineering-math/second-order/0003-homogeneous-constant-coefficients' },
            { text: '0004: 高階常係數齊次線性 ODE (特徵根四大分類)', link: '/engineering-math/second-order/0004-higher-order-linear-odes' },
            { text: '0005: 待定係數法與共振修正規則 (Method of Undetermined Coefficients)', link: '/engineering-math/second-order/0005-undetermined-coefficients' },
            { text: '0006: 微分運算子法與逆運算子快速求特解 (Differential Operator Method)', link: '/engineering-math/second-order/0006-differential-operators' },
            { text: '0007: 參數變異法 (Variation of Parameters)', link: '/engineering-math/second-order/0007-variation-of-parameters' },
            { text: '0008: 柯西－尤拉方程式 (Euler-Cauchy Equations)', link: '/engineering-math/second-order/0008-euler-cauchy-equations' },
            { text: '0009: 降階法求第二個線性獨立解 (Reduction of Order)', link: '/engineering-math/second-order/0009-reduction-of-order' },
            { text: '實戰題庫: Chapter 2 互動式範例與精選題庫 (15 題)', link: '/engineering-math/practice/0002-chapter2-examples' }
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
