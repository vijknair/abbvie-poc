# Multi-Brand Theming Guide

Reference: [AEM Multi-Brand Theming](https://main--helix-website--adobe.aem.page/drafts/ravuthu/multi-brand-theming)

## Architecture Overview

```
styles/styles.css          → Layer 1: Global tokens (shared across all brands)
styles/themes/{brand}.css  → Layer 2: Brand token overrides
blocks/{name}/{name}.css   → Layer 3: Block styles (brand-neutral base + body.{brand} overrides)
```

The theme is determined at runtime, adds a class to `<body>`, and loads the corresponding CSS file. All brand-specific styling keys off `body.{brand}` selectors.

---

## Theme Resolution

Defined in `scripts/scripts.js`:

```js
async function loadTheme() {
  let theme = getMetadata('theme');           // 1. Page metadata
  if (!theme) {
    const hostThemes = {
      'www.ozurdex.com': 'ozurdex',           // 2. Hostname fallback
      'www.rinvoq.com': 'rinvoq',
    };
    theme = hostThemes[window.location.hostname];
  }
  if (theme) {
    document.body.classList.add(theme);       // Adds body.rinvoq or body.ozurdex
    await loadCSS(`/styles/themes/${theme}.css`);
  }
}
```

**Priority order:**
1. Page-level `metadata` block → `theme: rinvoq`
2. Hostname mapping (production domains)

---

## How Metadata Drives Theme

Each page declares its theme in the metadata block:

```html
<div class="metadata">
  <div>
    <div>theme</div>
    <div>rinvoq</div>
  </div>
</div>
```

This adds `class="rinvoq"` to `<body>` and loads `styles/themes/rinvoq.css`.

---

## Global Tokens (Layer 1)

`styles/styles.css` defines the shared foundation:

```css
:root {
  --brand-primary: #071D49;       /* AbbVie navy — default */
  --brand-accent: #071D49;
  --text-color: #000;
  --link-color: var(--brand-primary);
  --heading-font-family: roboto, sans-serif;
  --body-font-family: roboto, sans-serif;
  --footer-bg: #071D49;
  --isi-heading-color: var(--brand-accent);
  /* ... */
}
```

These tokens are consumed by all blocks. Brand themes override them.

---

## Brand Theme File (Layer 2)

Location: `styles/themes/{brand}.css`

Each file contains **only** `:root` variable overrides and minimal global layout rules. No block-specific styling.

**`styles/themes/ozurdex.css`:**
```css
:root {
  --brand-primary: #00335B;
  --brand-accent: #ABB920;
  --heading-font-family: futura-pt, sans-serif;
  --body-font-family: futura-pt, sans-serif;
  --footer-bg: #00335B;
  --footer-text: #fff;
}
```

**`styles/themes/rinvoq.css`:**
```css
:root {
  --brand-primary: #25282A;
  --brand-accent: #90124A;
  --heading-font-family: "Neue Haas Grotesk Disp W0595Bl", sans-serif;
  --body-font-family: "Helvetica Neue LT W05_55 Roman", sans-serif;
  --footer-bg: #F3F3F3;
  --footer-text: #25282A;
}
```

---

## Block CSS: Brand-Specific Overrides (Layer 3)

Each block CSS file follows this structure:

```
1. Brand-neutral base (uses CSS variables, works for any brand)
2. body.ozurdex overrides
3. body.rinvoq overrides
```

**Example from `blocks/footer/footer.css`:**

```css
/* Brand-neutral base */
footer {
  font-family: var(--body-font-family);
  font-size: 12px;
}

/* OZURDEX — dark navy, reversed layout */
body.ozurdex footer {
  background-color: var(--footer-bg, #00335b);
  color: var(--footer-text, #fff);
  border-top: 4px solid var(--brand-accent);
}

/* RINVOQ — light gray, 3-column grid */
body.rinvoq footer {
  background-color: #f4f4f4;
  color: #333;
}
```

**Key rule:** Block-specific brand styling lives in the block's own CSS file, not in the theme file. This keeps themes lightweight and blocks self-contained.

---

## Block JavaScript: Brand Adaptations

When a block needs different behavior per brand, check the body class:

```js
export default function decorate(block) {
  const isOzurdex = document.body.classList.contains('ozurdex');

  const title = document.createElement('span');
  title.textContent = isOzurdex
    ? 'IMPORTANT SAFETY INFORMATION'
    : 'IMPORTANT SAFETY INFORMATION & USES';

  const toggleBtn = document.createElement('button');
  toggleBtn.textContent = isOzurdex ? 'SEE MORE +' : '+';
}
```

Use this pattern sparingly — prefer CSS-only differences where possible.

---

## Override Hierarchy

| Level | Mechanism | Example |
|-------|-----------|---------|
| **Site** | Hostname mapping in `scripts.js` | `www.rinvoq.com` → always loads rinvoq theme |
| **Page** | `metadata` block with `theme` key | Override theme on a specific page |
| **Section** | `section-metadata` with `style` key | `style: highlight` adds a gray background section |
| **Block** | Block variant class | `columns yellow-white` triggers variant styles |

**Site-level** (hostname) is the broadest — every page on that domain gets the theme automatically.

**Page-level** metadata overrides the hostname default. Useful during development or for one-off pages that need a different theme.

**Section/block level** use standard EDS mechanisms (section-metadata, block variants) and aren't theme-specific — they work within any theme.

---

## Adding a New Brand

1. **Create theme file** at `styles/themes/{newbrand}.css` with `:root` overrides
2. **Add hostname mapping** in `scripts/scripts.js` (if the brand has a production domain)
3. **Add `body.{newbrand}` overrides** in each block CSS that needs brand-specific styling
4. **Set metadata** on content pages: `theme: newbrand`
5. **Test** that existing brands still render correctly

---

## Quick Reference

| What | Where |
|------|-------|
| Global tokens | `styles/styles.css` |
| Brand tokens | `styles/themes/{brand}.css` |
| Block brand styles | `blocks/{name}/{name}.css` under `body.{brand}` selectors |
| Theme loader | `scripts/scripts.js` → `loadTheme()` |
| Page theme config | Metadata block: `theme: {brand}` |
| JS brand check | `document.body.classList.contains('{brand}')` |
