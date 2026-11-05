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

## Exports

### Format 1 — `tokens.css`

```css
/* Hallmark · macrostructure: Asymmetric Desktop Workbench · genre: editorial · theme: Monograph
 * pre-emit critique: P5 H5 E5 S5 R5 V5 (provisional pending parent visual verification)
 * anchor: #0f172a (academic monochrome)
 */
:root {
  --color-agent-paper: var(--hub-paper, #f8fafc);
  --color-agent-surface: var(--hub-paper-card, #ffffff);
  --color-agent-surface-muted: var(--hub-paper-muted, #f1f5f9);
  --color-agent-surface-hover: var(--hub-paper-hover, #e2e8f0);
  --color-agent-ink-title: var(--hub-ink-title, #0f172a);
  --color-agent-ink-primary: var(--hub-ink-primary, #1e293b);
  --color-agent-ink-secondary: var(--hub-ink-secondary, #475569);
  --color-agent-ink-tertiary: var(--hub-ink-tertiary, #64748b);
  --color-agent-ink-muted: var(--hub-ink-muted, #94a3b8);
  --color-agent-rule-light: var(--hub-rule-light, #e2e8f0);
  --color-agent-rule-border: var(--hub-rule-border, #cbd5e1);
  --color-agent-rule-dark: var(--hub-rule-dark, #334155);
  --color-agent-control-border: var(--hub-ink-secondary, #475569);
  --color-agent-accent: var(--hub-accent-primary, #0f172a);
  --color-agent-accent-subtle: var(--hub-accent-subtle, #f8fafc);
  --color-agent-accent-ink: var(--hub-accent-badge-text, #ffffff);
  --color-agent-focus: var(--hub-focus, #2563eb);
  --color-agent-danger: var(--vp-c-danger-1, #dc2626);
  --color-agent-success: var(--vp-c-success-1, #16a34a);

  --font-agent-display: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans TC", sans-serif;
  --font-agent-body: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans TC", sans-serif;
  --font-agent-mono: ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;

  --space-agent-3xs: 4px;
  --space-agent-2xs: 8px;
  --space-agent-xs: 12px;
  --space-agent-sm: 16px;
  --space-agent-md: 24px;
  --space-agent-lg: 32px;
  --space-agent-xl: 48px;
  --space-agent-2xl: 64px;

  --radius-agent-sm: var(--hub-radius-sm, 4px);
  --radius-agent-md: var(--hub-radius-md, 8px);
  --radius-agent-lg: var(--hub-radius-lg, 12px);
  --radius-agent-pill: var(--hub-radius-pill, 9999px);

  --shadow-agent-sm: var(--hub-shadow-sm, 0 1px 2px 0 rgba(15, 23, 42, 0.05));
  --shadow-agent-md: var(--hub-shadow-md, 0 4px 6px -1px rgba(15, 23, 42, 0.06), 0 2px 4px -2px rgba(15, 23, 42, 0.04));

  --dur-agent-short: 150ms;
  --ease-agent-out: cubic-bezier(0.16, 1, 0.3, 1);
}

.dark {
  --color-agent-paper: var(--hub-paper, #0b0f17);
  --color-agent-surface: var(--hub-paper-card, #131924);
  --color-agent-surface-muted: var(--hub-paper-muted, #1c2433);
  --color-agent-surface-hover: var(--hub-paper-hover, #263143);
  --color-agent-ink-title: var(--hub-ink-title, #f8fafc);
  --color-agent-ink-primary: var(--hub-ink-primary, #e2e8f0);
  --color-agent-ink-secondary: var(--hub-ink-secondary, #94a3b8);
  --color-agent-ink-tertiary: var(--hub-ink-secondary, #94a3b8);
  --color-agent-ink-muted: var(--hub-ink-muted, #475569);
  --color-agent-rule-light: var(--hub-rule-light, #1e293b);
  --color-agent-rule-border: var(--hub-rule-border, #334155);
  --color-agent-rule-dark: var(--hub-rule-dark, #475569);
  --color-agent-control-border: var(--hub-ink-secondary, #94a3b8);
  --color-agent-accent: var(--hub-accent-primary, #f8fafc);
  --color-agent-accent-subtle: var(--hub-accent-subtle, #1e293b);
  --color-agent-accent-ink: var(--hub-accent-badge-text, #0f172a);
  --color-agent-focus: var(--hub-focus, #3b82f6);
}
```

### Format 2 — Tailwind v4 `@theme`

```css
@theme {
  --color-agent-paper: var(--hub-paper, #f8fafc);
  --color-agent-surface: var(--hub-paper-card, #ffffff);
  --color-agent-surface-muted: var(--hub-paper-muted, #f1f5f9);
  --color-agent-surface-hover: var(--hub-paper-hover, #e2e8f0);
  --color-agent-ink-title: var(--hub-ink-title, #0f172a);
  --color-agent-ink-primary: var(--hub-ink-primary, #1e293b);
  --color-agent-ink-secondary: var(--hub-ink-secondary, #475569);
  --color-agent-rule-border: var(--hub-rule-border, #cbd5e1);
  --color-agent-accent: var(--hub-accent-primary, #0f172a);
  --color-agent-focus: var(--hub-focus, #2563eb);

  --font-agent-display: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans TC", sans-serif;
  --font-agent-body: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans TC", sans-serif;
  --font-agent-mono: ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;

  --spacing-agent-3xs: 4px;
  --spacing-agent-2xs: 8px;
  --spacing-agent-xs: 12px;
  --spacing-agent-sm: 16px;
  --spacing-agent-md: 24px;
  --spacing-agent-lg: 32px;
  --spacing-agent-xl: 48px;

  --radius-agent-sm: 4px;
  --radius-agent-md: 8px;
  --radius-agent-lg: 12px;
}
```

### Format 3 — DTCG `tokens.json`

```json
{
  "$schema": "https://design-tokens.github.io/community-group/format/",
  "color": {
    "agent": {
      "paper": { "$value": "#f8fafc", "$type": "color" },
      "surface": { "$value": "#ffffff", "$type": "color" },
      "surface-muted": { "$value": "#f1f5f9", "$type": "color" },
      "ink-title": { "$value": "#0f172a", "$type": "color" },
      "ink-primary": { "$value": "#1e293b", "$type": "color" },
      "ink-secondary": { "$value": "#475569", "$type": "color" },
      "rule-border": { "$value": "#cbd5e1", "$type": "color" },
      "accent": { "$value": "#0f172a", "$type": "color" },
      "focus": { "$value": "#2563eb", "$type": "color" }
    }
  },
  "font": {
    "agent": {
      "display": { "$value": "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans TC, sans-serif", "$type": "fontFamily" },
      "mono": { "$value": "ui-monospace, SF Mono, Menlo, Consolas, Liberation Mono, monospace", "$type": "fontFamily" }
    }
  },
  "space": {
    "agent": {
      "xs": { "$value": "12px", "$type": "dimension" },
      "sm": { "$value": "16px", "$type": "dimension" },
      "md": { "$value": "24px", "$type": "dimension" },
      "lg": { "$value": "32px", "$type": "dimension" }
    }
  }
}
```

### Format 4 — shadcn/ui CSS variables

```css
:root {
  --background: var(--hub-paper, #f8fafc);
  --foreground: var(--hub-ink-primary, #1e293b);
  --card: var(--hub-paper-card, #ffffff);
  --card-foreground: var(--hub-ink-title, #0f172a);
  --popover: var(--hub-paper-card, #ffffff);
  --popover-foreground: var(--hub-ink-title, #0f172a);
  --primary: var(--hub-accent-primary, #0f172a);
  --primary-foreground: var(--hub-accent-badge-text, #ffffff);
  --secondary: var(--hub-paper-muted, #f1f5f9);
  --secondary-foreground: var(--hub-ink-primary, #1e293b);
  --muted: var(--hub-paper-muted, #f1f5f9);
  --muted-foreground: var(--hub-ink-secondary, #475569);
  --accent: var(--hub-paper-hover, #e2e8f0);
  --accent-foreground: var(--hub-ink-title, #0f172a);
  --destructive: var(--vp-c-danger-1, #dc2626);
  --destructive-foreground: #ffffff;
  --border: var(--hub-rule-border, #cbd5e1);
  --input: var(--hub-rule-border, #cbd5e1);
  --ring: var(--hub-focus, #2563eb);
  --radius: var(--hub-radius-sm, 4px);
}
```
