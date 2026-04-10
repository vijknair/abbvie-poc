# AEM Edge Delivery Services — Prompt Library

A living reference of prompts used for AEM EDS page analysis, content modeling, and block development across the AbbVie migration POC. Add new prompts as the project evolves.

---

## Table of Contents

1. [Prompt Conventions](#prompt-conventions)
2. [Phase 1 — Discovery & Analysis](#phase-1--discovery--analysis)
   - [1.1 — Scrape a Page](#11--scrape-a-page)
   - [1.2 — Analyze a Commercial Site (standard)](#12--analyze-a-commercial-site-standard)
   - [1.3 — Analyze a Commercial Site + update block-catalog.md](#13--analyze-a-commercial-site--update-block-catalogmd)
   - [1.4 — Analyze Corporate Site with Repo Decision](#14--analyze-corporate-site-with-repo-decision)
3. [Phase 2 — Content Modeling](#phase-2--content-modeling)
   - [2.1 — Model a Single Block](#21--model-a-single-block)
4. [Phase 3 — Content Driven Development (CDD)](#phase-3--content-driven-development-cdd)
   - [3.1 — Full CDD Workflow](#31--full-cdd-workflow)
   - [3.2 — Build a New Block](#32--build-a-new-block)
   - [3.3 — Modify an Existing Block](#33--modify-an-existing-block)
5. [Catalog Review Prompts](#catalog-review-prompts)

---

## Prompt Conventions

- **`[SITE_URL]`** — replace with the target URL (e.g. `https://www.botoxchronicmigraine.com/`)
- **`[SCRAPE_DIR]`** — replace with the local path to the scraped output (e.g. `./import-work-botoxchronicmigraine/`)
- **`[BLOCK_NAME]`** — replace with the block being built (e.g. `hero-carousel`)
- **`[SCRAPE_DIR/cleaned.html]`** — reference to the HTML file inside the scrape output directory

All prompts activate one or more of the installed AEM EDS Claude skills:
`scrape-webpage` · `identify-page-structure` · `page-decomposition` · `block-inventory` · `content-modeling` · `content-driven-development` · `building-blocks`

---

## Phase 1 — Discovery & Analysis

### 1.1 — Scrape a Page

Use when you have a URL but no local scrape output yet.

```
Scrape https://[SITE_URL]/ and save the output to ./[SCRAPE_DIR]/
```

**What it does:** Launches headless Chromium, captures full-page screenshot, extracts cleaned HTML, downloads and converts all images, saves metadata.json. Output: `screenshot.png`, `cleaned.html`, `metadata.json`, `images/`.

**Notes:**
- Some sites (e.g. abbvie.com) block headless scrapers via Cloudflare WAF. If blocked, the user can run the scraper manually: `! node .claude/skills/scrape-webpage/scripts/analyze-webpage.js "[URL]" --output ./[SCRAPE_DIR]`
- Images are converted from WebP/SVG/AVIF to PNG during scrape.

---

### 1.2 — Analyze a Commercial Site (standard)

Use for a fresh page analysis that does NOT need to update the block catalog yet.

```
I'm migrating [SITE_URL] to AEM Edge Delivery Services.
The page has already been scraped to [SCRAPE_DIR].

1. Identify section boundaries using identify-page-structure — read the screenshot and cleaned.html
2. Run page-decomposition on each section to identify content sequences
3. Compile a block candidates report: block name, new/existing/Block Collection,
   and which pages it appears on

Scrape output: [SCRAPE_DIR]
```

**What it does:**
- Reads `screenshot.png` for visual layout
- Reads `cleaned.html` for DOM structure
- Identifies top-level sections by visual breaks, background changes, thematic shifts
- Identifies content sequences within each section (neutral descriptions, no block names yet)
- Produces a block candidates table

**Output:** Section boundaries table + block candidates report.

---

### 1.3 — Analyze a Commercial Site + update block-catalog.md

The standard production prompt used throughout the POC. Analyzes the page AND keeps the running catalog current.

```
I'm migrating [SITE_URL] to AEM Edge Delivery Services.
The page has already been scraped to [SCRAPE_DIR]/

1. Identify section boundaries using identify-page-structure — read the screenshot and cleaned.html
2. Run page-decomposition on each section to identify content sequences
3. Compile a block candidates report: block name, new/existing/Block Collection,
   and which pages it appears on. Then update ./block-catalog.md:
   - Add the site to the Sites Analyzed table
   - For any new block variant found: add it to that block's Variants table
   - For any entirely new block: add a full block section
   - Update Affected Pages for existing blocks that appear on this site
   - Update the Summary Table counts and affected sites column

Scrape output: [SCRAPE_DIR]/
```

**What it does:** Full analysis + catalog maintenance in one pass.

**Important:** Run this prompt for every new site analyzed. Do not run multiple sites at once — the catalog update from each site must complete before the next begins.

**Sites analyzed with this prompt:**
| Site | Import Dir |
|---|---|
| botoxcervicaldystonia.com | `import-work-botoxcervicaldystonia/` |
| botoxchronicmigraine.com | `import-work-botoxchronicmigraine/` |
| botoxoveractivebladder.com | `import-work-botoxoveractivebladder/` |
| botoxspasticity.com | `import-work-botoxspasticity/` |
| qulipta.com | `import-work-qulipta/` |
| quliptahcp.com | `import-work-quliptahcp/` |
| creonhcp.com | `import-work-creonhcp/` |
| duopa.com | `import-work-duopa/` |
| duopahcp.com | `import-work-duopahcp/` |
| epkinly.com | `import-work-epkinly/` |
| epkinlyhcp.com | `import-work-epkinlyhcp/` |
| one.abbvieoncology.com | `import-work-abbvieoncology/` |
| ozurdex.com | `import-work-ozurdex-home/` |
| rinvoq.com | `import-work-rinvoq-home/` |
| rinvoqhcp.com | `import-work-rinvoqhcp/` |
| skyrizi.com | `import-work-skyrizi-home/` |
| skyrizihcp.com | `import-work-skyrizihcp/` |
| skyrizilocator.com | `import-work-skyrizilocator/` |
| ubrelvy.com | `import-work-ubrelvy/` |
| venclexta.com | `import-work-venclexta/` |
| vraylar.com | `import-work-vraylar-home/` |
| vraylarhcp.com | `import-work-vraylarhcp/` |
| botoxone.com | `import-work-botoxone/` |
| botox.com | `import-work-botox/` |

---

### 1.4 — Analyze Corporate Site with Repo Decision

Use when analyzing a corporate/enterprise site that may require a different block strategy or separate repository.

```
I'm analyzing [SITE_URL] (corporate website) for AEM Edge Delivery Services migration.

The page has already been scraped to [SCRAPE_DIR]/ (or scrape it first if not present).

1. Identify section boundaries using identify-page-structure — read the screenshot and cleaned.html
2. Run page-decomposition on each section to identify content sequences
3. Compile a block candidates report: for each block, determine:
   - Is this block IDENTICAL to one in block-catalog.md? → mark as SHARED
   - Is this a NEW VARIANT of an existing block? → mark as VARIANT (describe the delta)
   - Is this a NEW BLOCK not seen on any commercial site? → mark as CORPORATE-ONLY
4. Update ./block-catalog.md:
   - Add a new dedicated section "## Corporate Website — [DOMAIN]" AFTER the existing
     commercial catalog
   - List every block with its classification (SHARED / VARIANT / CORPORATE-ONLY)
   - For VARIANT blocks, describe specifically what differs from the commercial version
   - For CORPORATE-ONLY blocks, write a full block entry

   Also add a row in the Sites Analyzed table.

5. After the block analysis, add a new section "## Repository Decision" to block-catalog.md
   that captures:
   - Pros and cons of a SHARED REPOSITORY (corporate + commercial in one repo)
   - Pros and cons of a SEPARATE REPOSITORY for corporate only
   - A recommended approach with rationale
   - Any blocks that are strong candidates for extraction into a shared component library
     if a multi-repo strategy is chosen

Scrape output: [SCRAPE_DIR]/
```

**What it does:** Performs the standard analysis AND compares every block to the existing commercial catalog, classifying each as SHARED, VARIANT, or CORPORATE-ONLY. Adds a repository decision analysis section.

**Used for:** abbvie.com (corporate)

---

## Phase 2 — Content Modeling

### 2.1 — Model a Single Block

Use when you have identified a block and need to define its authoring structure before implementation.

```
Model the content structure for a [BLOCK_NAME] block based on the [SITE_URL] implementation.

Context:
- The block appears on [AFFECTED_PAGES]
- Visual pattern: [DESCRIBE WHAT THE BLOCK LOOKS LIKE]
- Author inputs needed: [HEADINGS / TEXT / IMAGES / LINKS / etc]

Design the table structure (rows, columns, semantic formatting) that an author would
create in a Google Doc or SharePoint document to produce this block. Follow the
4-cells-per-row maximum and EDS block table conventions. Include any variant
examples if the block has multiple modes.
```

**What it does:** Invokes the `content-modeling` skill to design the block table structure. Output is a document table definition with examples.

---

## Phase 3 — Content Driven Development (CDD)

The CDD workflow always starts with content, not code. Never write or modify a block without a test content URL.

### 3.1 — Full CDD Workflow

Use to build a new block or a substantial feature end-to-end.

```
I need to implement the [BLOCK_NAME] block for the AbbVie EDS project.

Context from block-catalog.md:
- Variants: [LIST VARIANTS]
- Pages it appears on: [AFFECTED PAGES]
- JS complexity: [LOW / MEDIUM / HIGH]
- LCP impact: [NONE / LOW / MEDIUM / HIGH / CRITICAL]

Follow the content-driven-development workflow:
1. Start dev server if not running
2. Analyze and define acceptance criteria
3. Design the content model (table structure)
4. Identify or create test content at a URL
5. Implement the block (JS + CSS)
6. Lint and test
7. Final validation against acceptance criteria
8. Create PR with preview link
```

**Notes:**
- Never start coding before test content exists at a URL.
- For LCP-critical blocks (`hero-carousel`, `video`) — the first step in implementation is ensuring the first-paint content renders without JS.

---

### 3.2 — Build a New Block

Use after content modeling, when you have a test URL and are ready to implement.

```
Build the [BLOCK_NAME] block for the AbbVie EDS project.

Content model: [PASTE TABLE STRUCTURE FROM CONTENT MODELING STEP]
Test content URL: [URL]
Variant(s) to support: [LIST VARIANTS]
LCP classification: [NONE / LOW / MEDIUM / HIGH / CRITICAL]

Requirements:
- Mobile-first responsive CSS
- No JS for static variants
- [Any specific requirements from block-catalog.md]

Implement using the building-blocks skill workflow.
```

---

### 3.3 — Modify an Existing Block

Use when adding a variant to an already-implemented block.

```
Add a new [VARIANT_NAME] variant to the existing [BLOCK_NAME] block.

Current implementation: blocks/[BLOCK_NAME]/
New variant description: [DESCRIBE WHAT IS DIFFERENT]
Test content URL: [URL] (or create test content first if none exists)

Ensure the new variant:
- Does not break any existing variants
- Does not add JS to pages that only use the static variants
- Is authored via a new table row/column pattern (describe what author adds)

Use the content-driven-development workflow.
```

---

## Catalog Review Prompts

### Summarize the catalog

```
Summarize block-catalog.md as a one-table overview showing: block name, variant count,
JS complexity, and LCP risk. Keep it under 30 rows. Flag any blocks with
Critical or High LCP risk in bold.
```

### Cross-check sites against catalog

```
We have analyzed the following sites: [LIST].
Cross-check against the Sites Analyzed table in block-catalog.md and report:
- Which sites are fully analyzed (both screenshot and cleaned.html read)
- Which sites have import-work directories but have not been analyzed yet
- Which sites are missing entirely
```

**Used version of this prompt:**
```
we have analyzed so far
[paste list of URLs]
please cross check
```

### Update the catalog after hero split decision

```
I would split [BLOCK_NAME] into [N] separate blocks.
Based on the block-catalog.md analysis, propose the groupings with:
- Suggested new block names
- Which original variants fall into each group
- Which pages use each new block
- LCP and JS rationale for the split
```

**Used version:**
> "I would split hero to three separate blocks."
> → Led to the split into `hero`, `hero-carousel`, `hero-indication`

---

## Tips & Known Issues

| Situation | Resolution |
|---|---|
| Site blocked by Cloudflare (e.g. abbvie.com) | User must run scraper with real browser: `! node .claude/skills/scrape-webpage/scripts/analyze-webpage.js "[URL]" --output ./[DIR]` |
| Context window full mid-analysis | Claude auto-summarizes. Previous section outputs are still accessible. Continue from where analysis stopped by naming the last site analyzed. |
| Very large HTML file (>500KB) | Read in chunks of 300 lines at a time using offset + limit parameters |
| New block discovered mid-catalog update | Add it as a new `## Block N:` section before the Summary Table, then update the Summary Table row and variant count |
| Block variant count gets stale | Use the summary prompt above to regenerate a clean count from the current catalog state |
| Hero split LCP rationale | See block-catalog.md `### Hero Split (Confirmed)` section — do not re-litigate this decision per-analysis |
