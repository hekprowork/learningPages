# Design — 學習筆記庫 (Learning Pages)

A locked design system for this app. Every page redesign reads this file before emitting code. Do not regenerate per page — extend or amend this file when the system needs to grow.

## Genre
`editorial` (Academic Monograph & Engineering Precision)

## Macrostructure family
Pick one base macrostructure for subject index portals, one for chapter lecture notes, one for interactive practice workbooks:
- **Subject Portals (`/solid-state/`, `/electronics/`, `/circuits/`, `/engineering-math/`)**: `Index-First & Modular Curriculum Matrix`
  - Hero: Discipline Identity & Authority Bar (Subject Slug, Dual-language title, textbook citation, key metric capsules)
  - Quick-jump & Curriculum Matrix: 4-quadrant layout (Lecture Series, Theoretical Foundations, Formula Reference Cards, Interactive Practice Workbooks)
  - Technical Pillars & Engineering Highlights: High-density structured breakdown
  - Pure Monochrome & Restrained Aesthetics: No colorful emojis; elegant typography labels (`[CORE]`, `[NOTE]`, `[REF]`, `[PRACTICE]`, `[LAB]`)
- **Chapter Lecture Pages**: `Long Document / Monograph` (Rigorous derivation, KaTeX inline & block math, co-located diagrams)
- **Practice & Workbook Pages**: `Interactive Workbook / PracticeCard Matrix` (Hallmark state-driven `<PracticeCard>` with search/filter)

## Theme
```css
:root {
  /* Paper (Light mode base) */
  --hub-paper: #f8fafc;
  --hub-paper-card: #ffffff;
  --hub-paper-muted: #f1f5f9;
  --hub-paper-hover: #e2e8f0;

  /* Ink (Typography) */
  --hub-ink-title: #0f172a;
  --hub-ink-primary: #1e293b;
  --hub-ink-secondary: #475569;
  --hub-ink-tertiary: #64748b;
  --hub-ink-muted: #94a3b8;

  /* Rule & Border */
  --hub-rule-light: #e2e8f0;
  --hub-rule-border: #cbd5e1;
  --hub-rule-dark: #334155;

  /* Monochrome Accent & Brand (Technical Monograph) */
  --hub-accent-primary: #0f172a;
  --hub-accent-subtle: #f8fafc;
  --hub-accent-border: #0f172a;
  --hub-accent-badge-bg: #0f172a;
  --hub-accent-badge-text: #ffffff;

  /* Focus & Focus-Visible */
  --hub-focus: #2563eb;

  /* Radii */
  --hub-radius-sm: 4px;
  --hub-radius-md: 8px;
  --hub-radius-lg: 12px;
  --hub-radius-pill: 9999px;

  /* Shadows (Restrained tactile) */
  --hub-shadow-sm: 0 1px 2px 0 rgba(15, 23, 42, 0.05);
  --hub-shadow-md: 0 4px 6px -1px rgba(15, 23, 42, 0.06), 0 2px 4px -2px rgba(15, 23, 42, 0.04);
}

.dark {
  /* Paper (Dark mode base) */
  --hub-paper: #0b0f17;
  --hub-paper-card: #131924;
  --hub-paper-muted: #1c2433;
  --hub-paper-hover: #263143;

  /* Ink (Typography) */
  --hub-ink-title: #f8fafc;
  --hub-ink-primary: #e2e8f0;
  --hub-ink-secondary: #94a3b8;
  --hub-ink-tertiary: #64748b;
  --hub-ink-muted: #475569;

  /* Rule & Border */
  --hub-rule-light: #1e293b;
  --hub-rule-border: #334155;
  --hub-rule-dark: #475569;

  /* Monochrome Accent */
  --hub-accent-primary: #f8fafc;
  --hub-accent-subtle: #1e293b;
  --hub-accent-border: #f8fafc;
  --hub-accent-badge-bg: #f8fafc;
  --hub-accent-badge-text: #0f172a;

  /* Shadows */
  --hub-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.4);
  --hub-shadow-md: 0 4px 8px -1px rgba(0, 0, 0, 0.5);
}
```

## Typography
- Display: System UI font stack with high legibility (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans TC", sans-serif`)
- Headers: Weight 700 / 600, Roman upright only (`font-style: normal`), strictly NO italic headers.
- Monospace / Technical labels: `ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace`
- Math: KaTeX (`\KaTeX`)

## Spacing
8-pt and 4-pt restrained scale:
- `4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`

## Motion
- Transitions: `all 0.15s cubic-bezier(0.16, 1, 0.3, 1)`
- Micro-interactions: Crisp card hover border shift and subtle elevation (`translateY(-2px)`).
- Reduced-motion: `prefers-reduced-motion: reduce` disables all transforms and transitions.

## Microinteractions stance
- Silent, tactile, responsive.
- Card click targets encompass the entire card area or explicit primary link.
- Keyboard navigation: Accessible `:focus-visible` with outline `2px solid var(--hub-focus)`.

## Per-page allowances
- Subject portal pages: Module cards, topic lists, badge tags, metrics capsule pills.
- Strictly forbidden: Colored emojis (⚛️, ⚡, 📐, 💎, 💡, 📌, 🧭), fabricated metrics, fake window frame chrome.

## What pages MUST share
- Subject identity banner structure: Slug label + Primary Title + Subtitle + Textbook citation.
- Metrics quick-stats row.
- 4-section curriculum layout:
  1. 核心課程講義 (Lecture Curriculum)
  2. 觀念筆記與推導 (Theory & Learning Records)
  3. 核心公式速查卡 (Formula Reference)
  4. 互動題庫與練習系統 (Practice Workbooks)
- 特色亮點工程矩陣 (Discipline Highlights & Deep Dives).
