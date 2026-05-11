# Site Migration Prompts Playbook

Prompts developers can use to migrate a site to AEM Edge Delivery Services. Execute these in order for a new brand/site migration.

---

## Phase 1: Site Analysis

### Analyze site structure and identify page templates

```
Analyze the site at https://www.{brand}.com/ — identify unique page templates,
URL patterns, shared components (header, footer, ISI), and content structure.
Create page templates with names, URLs, and descriptions.
```

### Analyze a specific page

```
Analyze the page at https://www.{brand}.com/{page} — identify sections,
blocks needed, content structure, and authoring decisions. Produce cleaned HTML
and block variant recommendations.
```

---

## Phase 2: Design & Theme Setup

### Extract and set up the design system

```
Extract the design system from https://www.{brand}.com/ — colors, typography,
spacing, and layout tokens. Create the brand theme file at styles/themes/{brand}.css
with token overrides following our multi-brand theming architecture.
```

### Set up header and footer

```
Migrate the header from https://www.{brand}.com/ — analyze the navigation structure,
create the nav content fragment, and style the header block with body.{brand} overrides.
```

```
Migrate the footer from https://www.{brand}.com/ — analyze footer structure,
create the footer content fragment, and add body.{brand} CSS overrides.
```

---

## Phase 3: Block Development

### Develop a new block

```
Create a {blockname} block based on the section at https://www.{brand}.com/{page}.
Follow EDS block standards — create the JS decoration, CSS styling with brand-neutral
base and body.{brand} overrides, and content model.
```

### Critique and fix a block against live site

```
Critique the {blockname} block. Compare the preview against the live site at
https://www.{brand}.com/{page}. Fix CSS differences to match the live site.
```

---

## Phase 4: Content Migration

### Migrate a single page

```
Migrate the page at https://www.{brand}.com/{page} — create the content HTML
file using the blocks we have available. Set up metadata with theme, nav, and
footer references.
```

### Set up a fragment

```
Create a content fragment for {description} that will be shared across pages.
The fragment should be referenced via the fragment block from the main page.
```

---

## Phase 5: Refinement & QA

### Critique a full page

```
Critique the full page at the preview. Compare against the live site at
https://www.{brand}.com/{page} and fix visual differences.
```

### Fix a specific section

```
Critique the {section} section. Check screenshots for live and preview.
Issues to fix: {describe the visual differences you see}.
```

### Fix horizontal overflow / layout issues

```
There's a horizontal scrollbar on the {brand} page. Investigate what's causing
overflow and fix it.
```

### Multi-brand regression check

```
Verify that changes for {brand} haven't broken the {other-brand} pages.
Check header, footer, and ISI rendering for both brands.
```

---

## Common Fix Patterns

### Content not loading from fragment

```
Content below {description} is not showing on the page. It's loading from
a fragment — check if there's a section break (<hr>) splitting the fragment
into multiple sections. The fragment loader only loads the first section.
```

### Block styling doesn't match live site

```
Critique the {block} on the {brand} page. Screenshots attached for live and
preview. {Describe what's different — padding, colors, alignment, font, etc.}
```

### Theme styles bleeding between brands

```
Changes for {brand} are breaking {other-brand} pages. Review the CSS to ensure
all brand-specific styles use body.{brand} selectors and aren't applied globally.
```

---

## Metadata Template

Every page needs this metadata block at the end:

```html
<div class="metadata">
  <div>
    <div>theme</div>
    <div>{brand}</div>
  </div>
  <div>
    <div>nav</div>
    <div>/{brand}/nav</div>
  </div>
  <div>
    <div>footer</div>
    <div>/{brand}/footer</div>
  </div>
</div>
```

---

## Tips

- Always check both brands after making CSS changes to shared blocks
- Use `body.{brand}` prefix for all brand-specific block CSS — never write unscoped overrides
- Theme files (`styles/themes/`) should only contain `:root` token overrides and minimal global layout
- Fragment content must be in a single section (no `<hr>` tags) since the fragment loader takes only the first section
- Test at multiple viewport widths — carousel and full-bleed sections often break at extremes
