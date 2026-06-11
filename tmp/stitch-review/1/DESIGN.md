---
name: Prode Mundial
colors:
  surface: '#f7fafc'
  surface-dim: '#d7dadc'
  surface-bright: '#f7fafc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4f6'
  surface-container: '#ebeef0'
  surface-container-high: '#e5e9eb'
  surface-container-highest: '#e0e3e5'
  on-surface: '#181c1e'
  on-surface-variant: '#44474c'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eef1f3'
  outline: '#74777d'
  outline-variant: '#c4c6cd'
  surface-tint: '#4f6073'
  primary: '#041627'
  on-primary: '#ffffff'
  primary-container: '#1a2b3c'
  on-primary-container: '#8192a7'
  inverse-primary: '#b7c8de'
  secondary: '#3b6934'
  on-secondary: '#ffffff'
  secondary-container: '#b9eeab'
  on-secondary-container: '#3f6d38'
  tertiary: '#211200'
  on-tertiary: '#ffffff'
  tertiary-container: '#38260b'
  on-tertiary-container: '#a88c69'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d2e4fb'
  primary-fixed-dim: '#b7c8de'
  on-primary-fixed: '#0b1d2d'
  on-primary-fixed-variant: '#38485a'
  secondary-fixed: '#bcf0ae'
  secondary-fixed-dim: '#a1d494'
  on-secondary-fixed: '#002201'
  on-secondary-fixed-variant: '#23501e'
  tertiary-fixed: '#feddb5'
  tertiary-fixed-dim: '#e1c29b'
  on-tertiary-fixed: '#281802'
  on-tertiary-fixed-variant: '#584326'
  background: '#f7fafc'
  on-background: '#181c1e'
  surface-variant: '#e0e3e5'
typography:
  display-score:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  data-mono:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
---

## Brand & Style
The design system is engineered for high-performance sports analytics and tournament management. It prioritizes utility and speed, evoking a professional "war room" atmosphere for sports fans and analysts. The visual language is sober and objective, utilizing a corporate-modern aesthetic that favors data density over decorative elements. 

The focus is on clarity, scannability, and rhythmic structure, ensuring users can process complex match data, league standings, and prediction deadlines at a glance. It avoids the loudness of typical betting platforms, opting instead for a refined, institutional sports-journalism feel.

## Colors
The palette is rooted in **Deep Navy** for authority and **Pitch Green** for a subtle connection to the field of play. **Clean White** surfaces provide the necessary contrast for deep data tables, while **Light Gray** backgrounds distinguish the canvas from functional containers.

Status colors are crucial for feedback:
- **Emerald** for successful predictions and active matches.
- **Rose** for errors or missed deadlines.
- **Amber** for pending results or upcoming windows.
- **Slate** for locked matches or historical data that can no longer be edited.

## Typography
This design system utilizes **Inter** for its exceptional legibility and neutral tone. To handle the high density of numerical data, we leverage `tabular-nums` (tnum) for all match scores and statistics, ensuring vertical alignment across rows.

- **Headlines:** Used for tournament titles and major section headers.
- **Display Score:** A high-impact weight specifically for match results.
- **Data Mono:** Used for tabular data to ensure numbers are easily comparable.
- **Label Caps:** Reserved for metadata, table headers, and secondary timestamps to provide contrast without occupying excessive space.

## Layout & Spacing
The layout follows a 12-column fluid grid for desktop, transitioning to a single-column stack for mobile. A strict 8px (0.5rem) spacing rhythm is applied to maintain visual balance.

- **Desktop:** 12 columns, 16px gutters, 32px side margins. Large data tables should span at least 8 columns.
- **Tablet:** 8 columns, 16px gutters, 24px side margins.
- **Mobile:** 4 columns, 12px gutters, 16px side margins. 

Spacing is intentionally tight to allow for maximum information visibility above the fold, minimizing the need for excessive scrolling during live match days.

## Elevation & Depth
In line with a sober, product-focused approach, this design system avoids heavy shadows. Depth is communicated primarily through **Low-contrast outlines** and **Tonal layers**.

- **Level 0 (Canvas):** #F4F7F9 background.
- **Level 1 (Card/Container):** #FFFFFF background with a 1px border in a muted gray (#E2E8F0). No shadow.
- **Level 2 (Active/Hover):** A subtle, ultra-diffused shadow (0px 4px 12px rgba(26, 43, 60, 0.05)) to indicate interactivity.
- **Modals:** Use a semi-transparent Deep Navy overlay (80% opacity) to focus attention, with a solid white container.

## Shapes
A consistent 8px (0.5rem) corner radius is applied to all primary UI elements, including cards, input fields, and action buttons. This "Rounded" setting provides a modern feel while remaining professional and structured. Small UI components like status tags or chips use a tighter radius (4px) to maintain their geometric integrity when placed inside larger containers.

## Components
- **Buttons:** Primary buttons use Deep Navy with White text. Secondary actions use a Pitch Green outline. High-priority "Predict" buttons can use a solid Pitch Green background to draw the eye.
- **Match Cards:** Use a three-column layout (Home Team | VS/Score | Away Team). Borders are thin (1px) and consistent. 
- **Data Tables:** Zebra-striping is avoided; use subtle 1px horizontal dividers instead. Headers are sticky and use the `label-caps` style in Deep Navy.
- **Status Chips:** Small, low-profile labels with a light tinted background and dark text (e.g., Success uses light emerald background with dark emerald text).
- **Input Fields:** Predictions use centered text within fields, with a distinct "Locked" state that changes the border to a dashed line and the background to Slate-light.
- **Deadlines:** Always accompanied by a clock icon and displayed in the `label-caps` style to emphasize urgency.