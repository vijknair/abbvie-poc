# Full Block Catalog — AbbVie AEM Edge Delivery Services Migration

## Sites Analyzed

| # | Site | URL | Franchise | Audience | Indication(s) |
|---|---|---|---|---|---|
| 1 | botoxcervicaldystonia | botoxcervicaldystonia.com | Neuroscience | DTC Patient | Cervical Dystonia |
| 2 | botoxchronicmigraine | botoxchronicmigraine.com | Neuroscience | DTC Patient | Chronic Migraine |
| 3 | botoxoveractivebladder | botoxoveractivebladder.com | Urology | DTC Patient | Overactive Bladder |
| 4 | botoxspasticity | botoxspasticity.com | Neuroscience | DTC Patient | Spasticity |
| 5 | qulipta | qulipta.com | Neuroscience | DTC Patient | Episodic Migraine Prevention |
| 6 | creonhcp | creonhcp.com | GI | HCP | Exocrine Pancreatic Insufficiency |
| 7 | duopa | duopa.com | Neurology | DTC Patient | Advanced Parkinson's Disease |
| 8 | duopahcp | duopahcp.com | Neurology | HCP | Advanced Parkinson's Disease |
| 9 | epkinly | epkinly.com | Hematology | DTC Patient | DLBCL / FL |
| 10 | epkinlyHCP | epkinlyhcp.com | Hematology | HCP | DLBCL / FL |
| 11 | abbvieoncology | one.abbvieoncology.com | Hematology | HCP | CLL/SLL (VENCLEXTA) |
| 12 | ozurdex | ozurdex.com | Eyecare | DTC Patient | DME / RVO / Uveitis |
| 13 | rinvoq | rinvoq.com | Cross-Franchise | DTC Patient | RA, PsA, AD, AS, nr-axSpA, UC, CD, pJIA, JPsA |
| 14 | skyrizi | skyrizi.com | Cross-Franchise | DTC Patient | Plaque Psoriasis, PsA, Crohn's, UC |
| 15 | vraylar | vraylar.com | Mental Health | DTC Patient | Bipolar I / MDD |
| 16 | quliptahcp | quliptahcp.com | CNS | HCP | Episodic + Chronic Migraine Prevention |
| 17 | rinvoqhcp | rinvoqhcp.com | Cross-Franchise | HCP | RA, PsA, AS, nr-axSpA, GCA, AD, UC, CD, pJIA, JPsA |
| 18 | skyrizihcp | skyrizihcp.com | Cross-Franchise | HCP | Plaque Psoriasis, PsA, Crohn's, UC |
| 19 | skyrizilocator | skyrizilocator.com | Gastroenterology | HCP | SKYRIZI Infusion Center Finder (tool) |
| 20 | ubrelvy | ubrelvy.com | CNS | DTC Patient | Acute Migraine Treatment |
| 21 | venclexta | venclexta.com | Hematology | DTC Patient | CLL/SLL + AML (venetoclax) |
| 22 | vraylarhcp | vraylarhcp.com | Mental Health | HCP | MDD (adjunctive), Bipolar I, Schizophrenia |
| 23 | botoxone | botoxone.com | Cross-Franchise | HCP Practice Portal | BOTOX® (all therapeutic indications) |
| 24 | botox | botox.com | Cross-Franchise | DTC Patient | BOTOX® (all therapeutic indications, multi-indication hub) |
| 25 | abbvie-corporate | abbvie.com | Corporate | General Public / Investors / Media | Corporate homepage (pipeline, science, newsroom, careers) |

---

## Auto-Blocked Components

The following components are handled automatically by AEM Edge Delivery Services auto-blocking. They do **not** require custom block development.

| Component | How Auto-Blocked | Sites |
|---|---|---|
| **Eyebrow banner** (`abbv-slimEyebrow`) | Slim promotional bar above header — auto-blocked from its containing div | rinvoq, skyrizi, epkinly, epkinlyHCP |
| **Indication bar** (mobile indication text strip) | Mobile-only indication toggle bar — auto-blocked | epkinlyHCP |
| **Search box** (`abbv-search-util`) | Search input and toggle — auto-blocked from header utility div | All sites with search |
| **Cookie banner** (OneTrust) | Third-party consent overlay — auto-blocked / external script | All sites |

---

## Block 1: `header`

### Description
The global navigation bar present on every page. Contains the brand logo, primary navigation, utility navigation (PI links, HCP site toggle, ISI jump link), and mobile hamburger menu. All add-ons (eyebrow, search, indication bar) are **auto-blocked** separately.

### Variants
CSS class combinations drive visual differences — not separate JS implementations.

| Variant | CSS Classes | Characteristics | Sites |
|---|---|---|---|
| **v2-standard** | `abbv-header-v2 search-box-classic` | Full nav, search input inline, indication-specific nav items | botoxcervicaldystonia, botoxchronicmigraine, botoxoveractivebladder, botoxspasticity, qulipta, duopa, duopahcp, rinvoq |
| **v2-lite** | `abbv-header-v2 abbv-header-v2-lite search-box-lite` | Simplified nav, fewer utility links, lite search icon only | epkinly, epkinlyHCP, abbvieoncology, vraylar, quliptahcp, rinvoqhcp |
| **v2-slim** | `abbv-header-v2-lite header--slim abbv-search-hide search-box-lite` | Logo + hamburger only — no primary nav links. Navigation fully delegated to hero specialty-selector accordion. Unique to global HCP hubs where on-page nav IS the navigation. | skyrizihcp |
| **v1-lite** | `abbv-header abbv-header-lite` | Older V1 header component (not v2). Logo-only bar linking back to parent brand HCP site. No utility nav, no primary nav. Used on standalone tool micro-sites. | skyrizilocator |
| **v1-authenticated** | `abbv-header btxplus-header` | V1 header with full user authentication state management. Two UI states: logged-out (Sign In / Sign Up) and logged-in (My Dashboard / Manage Account / Sign Out). Deep 3-level primary nav. Quick-links utility bar. Practice portal pattern. | botoxone |
| **v2-authenticated** | `abbv-header-v2 search-box-classic` | V2 header with user auth state. Logged-out: "LOG IN" button. Logged-in: Dashboard / Profile / Log Out. Nav contains condition sub-menu linking out to separate indication microsites. | botox |
| **v2-siab** | `abbv-header-v2 abbv-siab search-box-classic` | Site-in-a-Box template variant, minimal utility nav | ozurdex |
| **v2-indication-nav** | `abbv-header-v2 search-box-classic` + condition submenu | Primary nav contains full indication list as dropdown/flat list | rinvoq (9 conditions), skyrizi (4 conditions), vraylar (2 conditions), epkinlyHCP (3 indications) |

### JS Required
Auto-blocked. Mobile hamburger toggle, sticky behavior, submenu expand/collapse handled by core EDS header JS.

### LCP Impact
**Medium.** Always loaded on every page. Lightweight but always in critical path. Logo image should have `fetchpriority="high"`.

### Affected Pages
All 15 analyzed sites.

---

## Block 2: `hero`

### Description
The static, full-bleed page hero section. Contains a background image (full-width photo or gradient), heading, optional body text, and 1–2 call-to-action buttons. No JavaScript required — rendered entirely via CSS. This is the most common hero pattern across condition-specific (single-indication) sites.

### Variants
**CSS-only.** No JS path differences across variants.

| Variant | Description | Sites |
|---|---|---|
| **photo-bg** | Full-bleed background `<picture>` (mobile + desktop), H1, optional body text, 1–2 CTAs. Most common pattern. Also used mid-page as editorial banners (dark bg, H2 + CTA, reusing the same block structure). | botoxcervicaldystonia, botoxchronicmigraine, botoxoveractivebladder, botoxspasticity, qulipta, quliptahcp, creonhcp, ozurdex, ubrelvy, vraylarhcp |
| **hcp-brushstroke** | Dark bg with decorative brushstroke SVG overlays. No photography — CSS gradient + SVG shapes. H1 with `stroke--text` emphasis. Specialty badge image. Pure CSS, no photo LCP element. | rinvoqhcp |
| **video-bg** | Background `<video>` element (mp4) auto-playing instead of a background image. H1 + body text + single "Register" CTA. LCP element is the video poster/first frame. | botoxone |
| **split-carousel** | Two-column layout. Left: static H1 + bullet list + Sign Up CTA + Log In link. Right: OWL image-only carousel (4 lifestyle photos, no per-slide text). Content stays fixed; only the right photo panel rotates. This is fundamentally different from `hero-carousel` (where each slide has its own content). | botox |

### Typical Content Structure
- Full-bleed background `<picture>` or CSS gradient
- H1 (primary brand claim)
- Optional H2, body text, badge image
- 0–2 CTA buttons

### JS Required
**None.** Pure CSS layout.

### LCP Impact
**Lowest.** For photo-bg: single bg image preloadable. For hcp-brushstroke: SVG assets are tiny; text may be LCP element. No JS parse cost.

### Affected Pages
botoxcervicaldystonia, botoxchronicmigraine, botoxoveractivebladder, botoxspasticity, qulipta, quliptahcp, creonhcp, ozurdex, rinvoqhcp

---

## Block 3: `hero-carousel`

### Description
A rotating multi-slide hero section using the OWL Carousel library. Each slide has its own full-bleed background image, brand logo/illustration, and H1 headline. Includes previous/next arrow navigation, dot pagination, auto-rotate, and touch/swipe support. Used on multi-condition sites where each slide represents a different patient profile or condition message.

### Variants
**None** — isolated single purpose. Slide content varies but JS implementation is identical.

### Typical Content Structure (per slide)
- Full-bleed background `.jpg` image (condition-specific photo)
- Brand logo or "Relief" brushstroke SVG overlay image
- H1 headline (e.g. "See how RINVOQ helps tame symptoms in 9 conditions")
- Optional CTA button

### Confirmed Slides
| Site | Slides | Slide Content |
|---|---|---|
| duopahcp | 2 | Slide 1: DuoConnect system image + headline. Slide 2: Alternate patient image + headline. Both use text-as-image PNG overlays for handwriting-style callouts. |
| rinvoq | 2+ | Slide 1: RA condition (bg: rinvoq-for-ra hero jpg). Slide 2: PsA condition (bg: rinvoq-for-psa hero jpg). Each slide: RINVOQ logo + relief brushstroke SVG + H1. |

### JS Required
**High.** OWL Carousel library (or custom equivalent): slide management, auto-rotate timer, touch/swipe event handlers, dot pagination sync, arrow click handlers, CSS class toggling for active slide. Must fully parse and initialize before first slide is interactive.

### LCP Impact
**Critical.** This block is always in Section 1 (first visible viewport). The carousel JS must load and initialize before the first slide renders correctly. The first slide background image must have `fetchpriority="high"` to avoid LCP penalty. Carousel initialization delay directly adds to LCP time.

**Mitigation required:**
- Render first slide as static HTML (no JS dependency for first paint)
- Set `fetchpriority="high"` on first slide `<img>`
- Load carousel JS as deferred/async — only activate after first paint

### Affected Pages
duopahcp, rinvoq

---

## Block 4: `hero-indication`

### Description
Complex hero section used on multi-indication global home pages. The user is presented with indication-routing CTAs directly in the hero, allowing them to self-select their condition and navigate to the appropriate sub-site or page. Three distinct layout sub-variants exist, all sharing the same block name but driven by CSS classes.

### Variants

#### Variant A — `split` (Dual-column with product image)
Used on **duopa.com**. Two-column layout: left column has product image (DUOPA device or system), right column has headline + body text + single CTA. No indication routing — routes to one landing page.

#### Variant B — `dtc-selector` (Stacked indication CTA cards)
Used on **epkinly.com** and **venclexta.com**. Full-width background image. Center-aligned H1. Below: 2–3 arrow CTA buttons for each indication → routes to condition sub-pages. epkinly.com uses gradient bg images per CTA; venclexta.com uses plain arrow buttons. Content-only difference — same layout logic.

#### Variant C — `hcp-2col` (2-col flex with product shot)
Used on **epkinlyHCP.com**. Background image fills full section. Two-column flex layout: left = H1 + "Choose an indication" label + 3 gradient CTA buttons. Right = product/molecule `<picture>` element (responsive, large). Prominent product image on right requires `<link rel="preload">` for LCP.

#### Variant D — `global-selector` (Side-by-side with condition buttons)
Used on **skyrizi.com** and **rinvoq.com** (indication sub-pages). Two-column flex: left = "CHOOSE YOUR CONDITION" heading + stacked condition CTA buttons. Right = H1 brand claim + body text. Full-bleed background image behind both columns.

#### Variant E — `stacked-indication` (Hero above, CTAs below)
Used on **vraylar.com**. Two visual zones: top = full-bleed hero image with brand logo + text-as-image overlay (no text in DOM). Bottom = gradient-bg section with H1 + H2 + 2 condition CTAs + patient milestone badge + resource cards.

#### Variant F — `hcp-specialty-accordion` (Hero with embedded specialty selector)
Used on **skyrizihcp.com**. Full-bleed background image, H1 "DISCOVER WHAT'S POSSIBLE", H2. Below heading: a bordered box "SELECT YOUR SPECIALTY" containing 3 accordion blades (DERMATOLOGY / RHEUMATOLOGY / GASTROENTEROLOGY). Each blade expands inline to show indication CTAs + SKYRIZI Complete support link. Below accordion: SKYRIZI Complete logo + bullet list. The hero and navigation are fully integrated into one section — header only shows logo + hamburger (`v2-slim`). Shares accordion blade JS with the `accordion` block `blade` variant.

### JS Required
**Medium.** Flexbox column stacking for responsive behavior, indication state management (active indication tracking on indication sub-pages), CSS background image assignment per CTA. No heavy library required. Custom JS for responsive column collapse on mobile. Variant F additionally requires blade accordion JS (shared with `accordion` blade variant).

### LCP Impact
**High** for Variants C and E (product image or hero image in right column needs preload). **Medium** for Variants A, B, D, F (text is LCP element, single bg image preloadable).

### Affected Pages
| Variant | Sites |
|---|---|
| split | duopa |
| dtc-selector | epkinly, venclexta |
| hcp-2col | epkinlyHCP |
| global-selector | skyrizi, rinvoq (global home) |
| stacked-indication | vraylar |
| hcp-specialty-accordion | skyrizihcp |

---

## Block 5: `isi`

### Description
The Inline Important Safety Information block, present on every AbbVie DTC and HCP page. Renders as a persistent expandable/collapsible section above the footer containing FDA-required safety information. Composed of two structural HTML slots: `abbv-inline-use` (indication/usage statement) and `abbv-inline-safety` (full safety text). All variants share one JavaScript implementation — differences are **content-only**.

### Variants
All variants use identical JS. Content structure differs by regulatory requirement.

| Variant | Description | Sites |
|---|---|---|
| **standard** | Indication summary in `abbv-inline-use` + ISI in `abbv-inline-safety`. No Boxed Warning. | botoxcervicaldystonia, botoxoveractivebladder, ozurdex, qulipta, creonhcp, skyrizihcp, skyrizilocator |
| **dtc-standard** | Empty `abbv-inline-use` slot. Consumer-language ISI in `abbv-inline-safety` — no clinical endpoints. Starts with "Do not take..." contraindication. PI link → Patient Information (not full PI). | ubrelvy |
| **dtc-boxed-warning** | "Uses" in `abbv-inline-use`. Consumer-language ISI in `abbv-inline-safety` with a Boxed Warning. PI link → Medication Guide (patient-facing). venclexta: TLS warning. botox: spread-of-effect warning. | venclexta, botox |
| **boxed-warning** | Adds FDA Boxed Warning section (bold bordered box) above the standard ISI in `abbv-inline-safety`. | botoxchronicmigraine, botoxspasticity, duopa, duopahcp, rinvoq, skyrizi, vraylar, rinvoqhcp, vraylarhcp |
| **extended** | Multi-level H3 subsection hierarchy (Contraindications → Warnings → Adverse Reactions → Drug Interactions) with bold `<b>` paragraphs and bullet lists. Longer than standard. | duopahcp, rinvoq |
| **inverted** | Unique to epkinlyHCP: `abbv-inline-use` contains the Boxed Warning (CRS + ICANS), `abbv-inline-safety` contains detailed clinical sections + Indications at end. Reversed order from all other sites. | epkinlyHCP |
| **co-brand** | PI and MedGuide links point to `genmab-pi.com` instead of `rxabbvie.com`. Genmab phone number included. Otherwise standard structure. | epkinly, epkinlyHCP |
| **2-col-css** | Desktop layout renders ISI in 2 visual columns via CSS `flexbox` on `abbv-inline-safety`. HTML is linear — purely a CSS variant. | epkinlyHCP |

### JS Required
**One implementation — zero additional JS per variant.** Expand/collapse toggle, sticky ISI behavior, scroll-into-view on ISI jump link click.

### LCP Impact
**None.** ISI is never in Section 1. Always deferred below the fold. No LCP relevance.

### Affected Pages
All 18 analyzed sites. rinvoqhcp uses `boxed-warning` + `extended` variants; skyrizihcp uses `standard` with a `<table>` layout in `abbv-inline-use` (multi-indication table format — unique to skyrizihcp).

---

## Block 6: `footer`

### Description
The global page footer containing legal navigation links, copyright notice, regulatory code (epass number), AbbVie logo, and privacy/cookie controls (Privacy Choices icon). Rendered as two rows: primary nav row (ISI link, PI, MedGuide, AbbVie.com) and secondary row (Accessibility, Contact, Terms, Privacy, Cookie Settings, Privacy Choices).

### Variants

| Variant | Description | Sites |
|---|---|---|
| **standard** | Single AbbVie logo. Copyright "©[year] AbbVie Inc." Regulatory code from epassnumber meta. | Most sites |
| **co-brand-genmab** | Dual logos: AbbVie + Genmab. Copyright "©[year] Genmab A/S and AbbVie." EPKINLY/EPCORE trademarks line. PI links → genmab-pi.com. | epkinly, epkinlyHCP |
| **co-brand-genentech** | Triple logos: Genentech (WOL modal trigger) + AbbVie + VENCLEXTA brand. Copyright "©[year] AbbVie Inc. and Genentech, Inc." WOL modals co-branded. Genentech patient access link (`genentech-access.com`). | venclexta |

### JS Required
**Auto-blocked.** Minimal JS for cookie settings button, Privacy Choices link behavior.

### LCP Impact
**None.** Footer is below the fold.

### Affected Pages
All 15 analyzed sites.

---

## Block 7: `columns`

### Description
Flexible two-column or three-column layout block for presenting paired content — typically an image alongside text, or a logo alongside body copy and a CTA. The most commonly used layout block across all sites for mid-page content sections.

### Variants

| Variant | Description | Sites |
|---|---|---|
| **2-col image-left** | Left: photo or product image. Right: H2, body text, CTA button. | duopa, ozurdex, botoxspasticity |
| **2-col image-right** | Left: H2, body text, CTA. Right: photo or product image. Text-first reading order. | duopahcp, creonhcp |
| **2-col icon-text** | Left: logo or icon image (e.g. DuoConnect Complete logo). Right: H2 + body + phone number or CTA. Used for support/resource sections. | duopahcp, duopa |
| **3-col icon-descriptors** | Three equal columns, each with a small icon/SVG and short text descriptor. Used for "How It Works" feature highlights. | ozurdex, creonhcp |

### JS Required
**None.** Pure CSS flexbox layout. Block Collection implementation.

### LCP Impact
**None.** Columns sections are always below Section 1. No LCP relevance.

### Affected Pages
duopa, duopahcp, ozurdex, botoxspasticity, creonhcp, abbvieoncology

---

## Block 8: `cards`

### Description
A repeating grid of content items, each card containing an image, heading, optional category tag, body text, and/or link. Used for feature highlights, article grids, and resource listings.

### Variants

| Variant | Description | Sites |
|---|---|---|
| **icon-cards** | Grid of 4–8 items. Each: small SVG icon + short descriptor text. Compact, no image photo. | creonhcp, qulipta, ubrelvy (3 outlined pods, icon+H4+body) |
| **savings-cards** | 2-col bordered outlined cards: heading, body, arrow CTA. One card green-filled (savings), one white (challenge offer). | ubrelvy |
| **image-cards** | Grid of 3–4 items. Each: photo image + category eyebrow tag + H3 heading + description + "Read more" link. Blog/article format. | botoxchronicmigraine |
| **feature-cards** | Grid of 2–3 items. Each: large illustration or SVG + H3 + body paragraph + CTA button. Used for resource/support sections. | vraylar (Save on VRAYLAR, Talk to HCP, Patient Handout cards) |
| **clinical-pillars** | 3-column gradient cards for HCP clinical evidence. Each pillar: category heading (MOA / Efficacy / Tolerability) + clinical claim paragraph + 1–2 CTAs. High-density clinical text. | vraylarhcp |

### JS Required
**Minimal.** Block Collection implementation. No custom JS required for basic layout. Optional: lazy-load images, equal height balancing.

### LCP Impact
**Low.** Cards sections are always below Section 1 on analyzed pages.

### Affected Pages
creonhcp, qulipta, botoxchronicmigraine, vraylar

---

## Block 9: `tabs`

### Description
A tabbed interface that organizes related content into switchable panels. Users click a tab label to reveal the corresponding content panel while hiding others. Used for indication-specific content (different clinical data per indication) and generic content organization.

### Variants

| Variant | Description | Sites |
|---|---|---|
| **indication-tabs** | Each tab represents a distinct indication. Tab click loads full content panel for that indication (clinical data, dosing, adverse reactions). | epkinlyHCP (3L+ DLBCL / 2L+ FL / 3L+ FL tabs) |
| **content-tabs** | Generic tabbed content organization — not indication-driven. Used for organizing related information (e.g. symptom types, treatment phases). | creonhcp |

### JS Required
**Low.** Tab switching: active state toggling, aria-selected attribute management, content panel show/hide, keyboard navigation (arrow keys). Standard accessible tab pattern. Never in Section 1.

### LCP Impact
**Low.** Tabs are always mid-page or lower.

### Affected Pages
epkinlyHCP, creonhcp

---

## Block 10: `accordion`

### Description
An expandable/collapsible section list. Each item has a visible label/question that, when clicked, reveals hidden body content. Used for FAQs, drug interaction details, and multi-question education sections.

### Variants

| Variant | Description | Sites |
|---|---|---|
| **standard** | Vertical expand/collapse Q&A or FAQ sections. Single label row, content expands below. Traditional disclosure pattern. | creonhcp, botoxspasticity, duopa |
| **blade** | Horizontal blade layout (`accordion-home abbv-accordion-blade`). 4 blades sit side-by-side. Each blade: short vertical label + expand arrow icon. On click, a full-width content panel opens below all blades. Each panel has clinical claim, supporting data, and a CTA. Used as the primary homepage content driver on HCP sites. | quliptahcp |
| **references** | Collapsible references list at bottom of page (`accordion-references`). Single blade, label="References", opens to numbered reference list. | quliptahcp |

### JS Required
**Low for standard/references.** Toggle open/close, aria-expanded. Block Collection implementation.
**Medium for blade.** Additional logic needed for 4-blade horizontal layout: active blade tracking, panel width calculation, responsive collapse to vertical on mobile.

### LCP Impact
**Low.** Accordion sections are always below the fold.

### Affected Pages
creonhcp, botoxspasticity, duopa (standard); quliptahcp (blade, references)

---

## Block 11: `video`

### Description
An embedded Brightcove video player. Brightcove's `video.js` library (~200KB+) is required. The player supports playback controls, closed captions, responsive sizing, and quality selection. Two implementation patterns were found: responsive inline (mobile + desktop variants toggled by CSS) and modal-triggered (video plays in overlay lightbox).

> **⚠️ Critical Rule:** This block must **never** be placed in Section 1. Brightcove `video.js` is large and will delay LCP significantly if loaded eagerly. Always place in Section 2 or below.

### Variants

| Variant | Description | Sites |
|---|---|---|
| **responsive-inline** | Two `<video-js>` player instances (same video ID) rendered in the DOM — one for mobile, one for desktop. CSS shows/hides the appropriate instance. Both players initialize on page load. | duopahcp (30:52 "Quick Connect On Demand" video, ID: 6233806903001) |
| **modal-trigger** | Video player is not initialized until user clicks a CTA button. Player renders in a modal/lightbox overlay. Brightcove JS loads on demand (lighter initial load). | duopa |

### JS Required
**Critical — Brightcove `video.js` (~200KB+ minified).** Player initialization, playback controls, quality switching, caption track loading. For the responsive-inline variant, both player instances initialize on page load even if only one is visible — double initialization cost.

### LCP Impact
**Critical if placed in Section 1.** Even in Section 2+, Brightcove JS competes for main thread bandwidth. For responsive-inline: consider lazy initialization (IntersectionObserver trigger). For modal-trigger: load Brightcove JS only on button click.

### Affected Pages
duopahcp (responsive-inline), duopa (modal-trigger)

---

## Block 12: `testimonial`

### Description
A patient or physician testimonial display. Shows a quote, patient/doctor name, optional photo, and optional attribution details. Two display patterns: a static single quote and a rotating carousel of multiple testimonials.

### Variants

| Variant | Description | Sites |
|---|---|---|
| **carousel** | 3 patient testimonials rotating in a carousel with prev/next arrows and dot pagination. Each: patient photo, pull quote, patient name + condition context. | botoxspasticity, botox (multi-item, 2-3 cards visible at once) |
| **static-quote** | Single testimonial — quote text, patient name, condition note. No carousel JS. | botoxchronicmigraine, duopa |
| **image-quote** | 50/50 split: full photo left, quote icon + pull quote + patient name + attribution + CTA right. Larger editorial format. | ubrelvy |

### JS Required
**Medium for carousel variant.** Carousel JS (can share utility code with `hero-carousel`). Touch/swipe, auto-rotate optional. **None for static-quote.**

### LCP Impact
**Low.** Testimonials are always mid-page or lower. Patient photos can be lazy-loaded.

### Affected Pages
botoxspasticity (carousel), botoxchronicmigraine (static-quote), duopa (static-quote)

---

## Block 13: `modal`

### Description
An overlay dialog box triggered by user action (link click, page load, external navigation). Implements focus trapping, click-outside-to-dismiss, keyboard escape to close, and aria-modal accessibility attributes. One JavaScript implementation drives all modal types via data attributes — not separate JS files per modal type.

### Variants

| Variant | Trigger | Description | Sites |
|---|---|---|---|
| **wol-exit** | Click any external link | "Warning: You Are Leaving [Site]" — alerts user they are navigating away. Two buttons: Continue / Stay. | All sites |
| **terms-conditions** | Click "Terms and Conditions" link in form | Legal terms for use of the locator tool. Contains scrollable T&C text + checkbox accept + Close button. Required to be accepted before search results display. | skyrizilocator |
| **hcp-gate** | Page load (first visit) | "Are you a Healthcare Professional?" gating modal. Yes = proceed / No = redirect to DTC site. | epkinlyHCP, duopahcp |
| **indication-select** | Page load or link click | Indication selection overlay — routes user to appropriate condition page. | abbvieoncology, some HCP sites |
| **pi-medguide** | Click PI/MedGuide link | Opens PI or Medication Guide — may link to rxabbvie.com PDF or display inline. Co-brand variant links to genmab-pi.com. | epkinly, epkinlyHCP |
| **npi-lookup** | Click NPI link | Redirects to NPI registry for physician lookup. | epkinlyHCP |

### JS Required
**Low — one implementation.** Modal open/close animation, focus trap (tab cycling within modal), click-outside listener, ESC key listener, aria-modal toggle. All variants share identical JS; modal type is determined by `data-modal-type` attribute or class name.

### LCP Impact
**Low.** Modals are triggered by user action, not on initial render. The `hcp-gate` modal fires on page load but is a lightweight overlay — no images, minimal HTML.

### Affected Pages
All sites (wol-exit universal); hcp-gate on epkinlyHCP and duopahcp; others site-specific.

---

## Block 14: `form`

### Description
An embedded form component for HCP lead capture, registration, or patient enrollment. Uses Adobe Forms (AEM Forms) with reCAPTCHA v3 for bot protection.

### Variants

| Variant | Description | Sites |
|---|---|---|
| **hcp-registration** | Multi-field HCP registration form: name, specialty, NPI, institution, email. Adobe Forms embed with reCAPTCHA v3. Template: `apigee-hds-hcp-registration`. | abbvieoncology (VENCLEXTA HCP lead capture) |

### JS Required
**High.** Adobe Forms SDK + reCAPTCHA v3 badge script. Conditional field logic, validation, form submission handling. May be better implemented as a `fragment` linking to a standalone form page rather than an inline block.

### LCP Impact
**Low.** Forms are always below the fold. reCAPTCHA badge script should be deferred.

### Affected Pages
abbvieoncology

---

## Block 15: `fragment`

### Description
A reusable content section that can be embedded across multiple pages without duplication. In EDS, a fragment is a reference to another document whose content is rendered inline. Used for shared ISI content, shared modals, shared header/footer elements, and shared promotional banners that appear on multiple indication sub-pages.

### Variants
**None.** Structural wrapper only — content is authored in the referenced fragment document.

### JS Required
**None.** EDS framework handles fragment loading/rendering.

### LCP Impact
**None.** Fragments are content containers — LCP impact depends on what's inside.

### Affected Pages
Applicable across all sites for shared content (ISI, modals, promotional banners on indication sub-pages).

---

## Block 16: `brand-explorer`

### Description
A cross-brand navigation overlay exclusive to multi-indication HCP portfolios (immunology). A persistent bottom bar shows an AbbVie logo + "Immunology Therapies" toggle button. Clicking it slides open a full-width panel containing 3 side-by-side brand cards: RINVOQ, SKYRIZI, HUMIRA. Each brand card shows the brand logo, safety disclaimer, and a list of indication links routing to the respective brand's HCP site.

This is an AbbVie portfolio-level navigation tool — it lets HCPs switch between brands/indications without returning to AbbVie.com.

### Variants

| Variant | Description | Sites |
|---|---|---|
| **immunology-3brand** | 3 brand panels: RINVOQ (9 indications) + SKYRIZI (4 indications) + HUMIRA (7 indications). Fixed at bottom of viewport as a collapsible bar. Same HTML structure confirmed on both sites — global shared component. | rinvoqhcp, skyrizihcp |

### JS Required
**Medium.** Panel open/close animation, brand accordion expand/collapse, fixed-position bar management.

### LCP Impact
**Low.** The bar sits fixed at the bottom — does not affect LCP element. JS initializes on page load but is lightweight.

### Affected Pages
rinvoqhcp, skyrizihcp (confirmed); likely humirapro (not yet analyzed)

---

## Block 17: `indication-hub`

### Description
A below-hero section that provides specialty-organized indication navigation for HCP multi-indication sites. Three or more specialty cards (Rheumatology / Dermatology / Gastroenterology) each list applicable indications as arrow CTAs. Replaces the need for a mega-menu by putting the full indication routing directly on the homepage body.

This block is conceptually related to `hero-indication` but placed in its own section below the hero rather than in the hero itself. The hero on these pages is a simple static block.

### Variants

| Variant | Description | Sites |
|---|---|---|
| **specialty-brush-cards** | 3 flex cards with brushstroke heading styling. Each card: H3 specialty name + indication links with circle-arrow icon + brief qualifying text. Desktop: side-by-side. Mobile: stacked. | rinvoqhcp |

### JS Required
**Low.** Responsive flex layout collapse only. No active state management needed — CTAs are direct links.

### LCP Impact
**Low.** Positioned below the fold. Card images are small SVG icons, not photos.

### Affected Pages
rinvoqhcp, skyrizihcp (confirmed); likely humirapro (not yet analyzed)

---

## Block 18: `promo-drawer`

### Description
A sticky promotional drawer that floats at the edge of the viewport (right side on desktop, bottom on mobile). A visible tab handle labelled with a short headline stays visible at all times. Clicking the handle slides open a content panel containing a promo message and a CTA button. Two instances exist in the HTML (one desktop, one mobile), toggled by CSS breakpoints. This pattern is used to surface a persistent secondary call-to-action without interrupting the main page flow.

### Variants

| Variant | Description | Sites |
|---|---|---|
| **sticky-right** | Desktop: fixed-position drawer on the right edge. Handle shows short promo label. Panel slides left to reveal full content + CTA. | quliptahcp ("HEAD-TO-HEAD STUDY VS TOPIRAMATE" → Contact a Rep) |
| **sticky-bottom** | Mobile: same content, rendered as a bottom slide-up drawer. Separate HTML instance, toggled visible via CSS breakpoint. | quliptahcp (same content, mobile counterpart) |

### JS Required
**Medium.** Drawer open/close animation, handle click handler, close button, panel visibility toggle. Two DOM instances (desktop + mobile) must be kept in sync. Position management for fixed overlay vs page scroll behavior.

### LCP Impact
**Low.** Drawer is sticky/overlay — does not affect page layout or LCP image loading. However, JS must initialize on page load to register click handlers, so keep implementation lightweight.

### Affected Pages
quliptahcp

---

## Block 19: `decision-tree`

### Description
An interactive multi-step question tool that routes users to personalized content based on their self-reported situation. Displayed as a question heading + a set of clickable button options. Selecting an option reveals a personalized response with 2 relevant links and a back/reset button. Used to address multiple patient scenarios from one page section.

### Variants

| Variant | Description | Sites |
|---|---|---|
| **multi-choice** | Single question, 5 button options. Each button reveals a pre-authored response panel (heading + 2 link+description pairs). "Back to options" button resets. No external API or data fetch. | ubrelvy ("WHEN IT COMES TO MIGRAINE ATTACKS, ARE YOU…") |

### JS Required
**Medium.** Button click handlers, show/hide response panels, reset functionality. All content is pre-authored (no AJAX). Relatively lightweight.

### LCP Impact
**Low.** Always positioned below Section 1.

### Affected Pages
ubrelvy

---

## Block 20: `brand-footer`

### Description
A fully custom branded footer that sits above the standard `abbv-footer` legal strip. Distinct from the standard `abbv-footer` component — contains brand logo, Migraine Mode toggle, a multi-column sitemap navigation, brand contact phone number, and social media icons. Only seen on sites with deep consumer engagement (multiple social platforms).

### Variants

| Variant | Description | Sites |
|---|---|---|
| **ubrelvy-social** | Brand logo + Migraine Mode toggle (top row) + 3-col sitemap (Why Ubrelvy / Resources & Savings / Contact) + UBRELVY Complete phone number + social icons (Instagram, Facebook, TikTok, YouTube, Twitter, Reddit) | ubrelvy |

### JS Required
**Low.** Social links are plain anchors. Migraine Mode toggle JS shared with header toggle.

### LCP Impact
**None.** Below fold.

### Affected Pages
ubrelvy

---

## Block 21: `locator`

### Description
A full-featured interactive provider/facility finder tool. Embedded directly inside a background-image hero section. The user enters search criteria (facility name or ZIP code + distance radius), accepts Terms & Conditions, then submits to receive a result list with an interactive map. Results support pagination and a map/list toggle. Used for HCPs to find nearby infusion centers stocking SKYRIZI for Crohn's Disease/UC patients (IV infusion therapy route).

This is the most JS-intensive block in the catalog — requires geolocation API or ZIP geocoding, a map SDK (likely Google Maps or similar), AJAX search calls to a backend provider database, and reCAPTCHA v2 bot protection.

### Variants

| Variant | Description | Sites |
|---|---|---|
| **infusion-finder** | Search by facility name OR ZIP + distance (5/10/25/50 mi). T&C checkbox required before search. Results: list/map split view, pagination, "Search Again" reset. ISN providers listed first. reCAPTCHA v2. | skyrizilocator |
| **physician-finder** | Search by ZIP + radius (miles). Results: map + list of BOTOX® Specialists. Embedded in page below a 2-col callout section (doctor image + benefit bullets). No T&C required. | botox |

### JS Required
**Very High.** Map SDK initialization (Google Maps or equivalent), geocoding API (ZIP→coordinates), AJAX search to provider database, result rendering, pagination, map pin management, reCAPTCHA v2 challenge, terms modal trigger, form validation, map/list view toggle.

### LCP Impact
**Low for initial load.** Hero background image is LCP element — map and results do not render until user submits a search. Map SDK should be loaded lazily (only after form submit, not on page load).

### Affected Pages
skyrizilocator

---

## Block 22: `stats`

### Description
A horizontal display of large key numbers (clinical trial counts, patient milestones, prescriber counts, coverage percentages) used as social proof for HCP audiences. Each stat is a visually prominent large number + short label. Used to convey brand credibility at a glance.

### Variants

| Variant | Description | Sites |
|---|---|---|
| **milestone-trio** | 3 large numbers in a row: "12 Clinical Trials / 1.7M Patients / 100K Prescribers". Styled with gradient gradient text/colors. White container. | vraylarhcp |
| **affordability-stat** | Single large percentage "94%" with body text and CTA. Affordability/access proof point. | vraylarhcp |

### JS Required
**None.** Static HTML/CSS. Numbers are authored content — no live counters.

### LCP Impact
**Low.** Always below fold.

### Affected Pages
vraylarhcp

---

## Summary Table

| Block | Variants | New/Existing/BC | JS Complexity | LCP Impact | Affected Sites |
|---|---|---|---|---|---|
| `header` | 8 (CSS-only) | Custom | Auto-blocked | Medium | All 24 |
| `hero` | 4 (photo-bg, hcp-brushstroke, video-bg, split-carousel) | Extend existing | None–Medium | **Lowest–High** | botoxcervicaldystonia, botoxchronicmigraine, botoxoveractivebladder, botoxspasticity, qulipta, quliptahcp, creonhcp, ozurdex, rinvoqhcp, ubrelvy, vraylarhcp (photo-bg/brushstroke); botoxone (video-bg); botox (split-carousel) |
| `hero-carousel` | None | New custom | High — OWL carousel | **Critical** | duopahcp, rinvoq |
| `hero-indication` | 6 sub-layouts | New custom | Medium–Low | **High–Medium** | duopa, epkinly, epkinlyHCP, skyrizi, vraylar, abbvieoncology, skyrizihcp, venclexta |
| `isi` | 9 (content-only) | Custom | One impl / zero extra | None | All 24 |
| `footer` | 3 (standard, co-brand-genmab, co-brand-genentech) | Custom | Auto-blocked | None | All 24 |
| `columns` | 4 | Block Collection | None | None | duopa, duopahcp, ozurdex, botoxspasticity, creonhcp, abbvieoncology, venclexta, botoxone, botox |
| `cards` | 6 (icon, image, feature, savings, image-quote, clinical-pillars) | Block Collection + custom | Minimal–Low | Low | creonhcp, qulipta, botoxchronicmigraine, vraylar, rinvoqhcp, ubrelvy, vraylarhcp, botox |
| `tabs` | 2 | Block Collection | Low | Low | epkinlyHCP, creonhcp |
| `accordion` | 3 (standard, blade, references) | Block Collection + custom blade | Low–Medium | Low | creonhcp, botoxspasticity, duopa (standard); quliptahcp, skyrizihcp (blade) |
| `video` | 2 | New custom | **Critical — Brightcove** | **Critical if Section 1** | duopahcp, duopa |
| `testimonial` | 3 (carousel, static-quote, image-quote) | New custom | Medium / None | Low | botoxspasticity, botoxchronicmigraine, duopa, ubrelvy, botox |
| `modal` | 6 (data-driven) | Custom | Low — one impl | Low | All 24 |
| `form` | 1 | Custom | High — Adobe Forms | Low | abbvieoncology, botoxone |
| `fragment` | None | Block Collection | None | None | All sites (shared content) |
| `promo-drawer` | 2 (desktop sticky-right, mobile sticky-bottom) | New custom | Medium | Low | quliptahcp, botoxone |
| `brand-explorer` | 1 (immunology-3brand) | New custom | Medium | Low | rinvoqhcp, skyrizihcp |
| `indication-hub` | 1 (specialty-brush-cards) | New custom | Low | Low | rinvoqhcp |
| `decision-tree` | 1 (multi-choice) | New custom | Medium | Low | ubrelvy |
| `brand-footer` | 1 (ubrelvy-social) | New custom | Low | None | ubrelvy |
| `stats` | 2 (milestone-trio, affordability-stat) | New custom | None | Low | vraylarhcp, botox |
| `locator` | 2 (infusion-finder, physician-finder) | New custom | **Very High** — map SDK, geocoding, AJAX | Low (map lazy-loaded) | skyrizilocator, botox |

**Total: 22 blocks / ~65 variants**

---

## LCP Risk Register

| Risk Level | Block | Reason | Mitigation |
|---|---|---|---|
| **Critical** | `hero-carousel` | Carousel JS must parse before first slide renders; always Section 1 | Render first slide as static HTML; load carousel JS deferred; `fetchpriority="high"` on first slide image |
| **Critical** | `video` (if in Section 1) | Brightcove ~200KB+; eager load blocks LCP | **Hard rule: never place video in Section 1.** Use IntersectionObserver or modal-trigger pattern |
| **High** | `hero-indication` (hcp-2col, stacked-indication) | Right-column product image or top hero image needs preload | `<link rel="preload">` for right-col product shot; ensure LCP image is in `<head>` preload chain |
| **Medium** | `header` | Always loaded, sticky behavior JS in critical path | Already lightweight in EDS boilerplate; keep header JS minimal |
| **Low** | `cards`, `tabs`, `testimonial`, `modal` | Never in Section 1 on analyzed pages | Lazy-load images within these blocks |
| **None** | `hero` (static), `isi`, `footer`, `columns`, `accordion`, `fragment` | No JS / deferred / below fold | No action required |

---

## Key Architectural Decisions

### Hero Split (Confirmed)
The hero block is intentionally split into three separate blocks (`hero`, `hero-carousel`, `hero-indication`) to ensure:
- Pages using a simple static hero load **zero carousel or indication routing JS**
- Carousel JS ships only to 2 sites (duopahcp, rinvoq) that actually need it
- Indication routing JS ships only to 6 sites (duopa, epkinly, epkinlyHCP, skyrizi, vraylar, abbvieoncology)
- quliptahcp uses standard static hero — zero extra JS on that page
- LCP score protection for the majority of pages

### ISI Zero-Cost Variants
ISI has 6 content variants but **one JS implementation**. Content differences (Boxed Warning, inverted structure, co-brand links) are handled in authoring — not in code. This is the model to follow for all blocks where possible.

### Modal Single Implementation
5 modal types share one JS file via data attributes. Adding a new modal type requires zero new JS — only content authoring.

### Video Placement Rule
Brightcove `video.js` is a hard constraint. Site authors must be trained that video blocks cannot be placed in Section 1. Consider adding a validation step or authoring hint to enforce this.

---

## Corporate Website — abbvie.com

> **Note on scraping:** abbvie.com is protected by Cloudflare WAF, which blocked both the headless Chromium scraper and WebFetch during analysis. The structural analysis below is based on the known public sitemap (`abbvie.com/content/abbvie-com2/us/en/site-map.html`) and documented page patterns. It should be validated against live HTML once a bypass method is available (real browser session, authenticated scrape, or HTML export from WYSIWYG editor).

### Site Overview

| Property | Value |
|---|---|
| URL | https://www.abbvie.com/ |
| Audience | General Public, Investors, Media, Prospective Employees |
| Purpose | Corporate brand, investor relations, pipeline, newsroom, careers |
| Franchise | Cross-portfolio (not product-specific) |
| Key difference | **No ISI, no age-gate, no HCP gate, no modals.** Corporate content only. |

### Corporate Site Navigation Structure

**Primary nav:** About AbbVie · Science · Pipeline · Patients · Newsroom · Careers · Investors

Each top-level item opens a **mega-menu** with 2–4 sub-columns — more complex than any commercial site's single-level dropdowns.

| Nav Item | Sub-sections |
|---|---|
| About AbbVie | Who We Are, Leadership, History, Global Presence, Corporate Responsibility, ESG |
| Science | Our Science, Therapeutic Areas (6), R&D, Clinical Trials |
| Pipeline | Full clinical pipeline table (Phase 1/2/3 + Regulatory) |
| Patients | Patient Resources, Access & Reimbursement |
| Newsroom | Press Releases, Media Library, Stories |
| Careers | Job Search, Life at AbbVie, Early Careers |
| Investors | Financial Results, Annual Reports, Pipeline, Corporate Governance |

### Corporate Homepage Page Decomposition

| # | Section | Content Description |
|---|---|---|
| — | **Header** | Corporate mega-menu nav, ABBV stock price widget, Search, Language/Country selector, Sign In (investor portal) |
| 1 | **Hero** | Full-bleed brand video or mission photo. H1 mission tagline. H2 supporting statement. 1-2 CTAs. No indication routing, no ISI. |
| 2 | **Therapeutic Areas** | 6-7 icon/illustration cards: Immunology / Oncology / Neuroscience / Eye Care / Gastroenterology / Aesthetics / Hematology. Each links to a science sub-page. |
| 3 | **Corporate Statement** | Wide editorial 2-col: impactful pull-quote + patient/scientist photo + brief body + CTA "See Our Pipeline" |
| 4 | **News / Our Stories** | H2 + 3 article cards with date, headline, excerpt, "Read More". Category filter tabs. |
| 5 | **Pipeline Teaser** | Mini table or summary stat (e.g. "50+ compounds in clinical development") + "See Full Pipeline" CTA |
| 6 | **ESG / Responsibility** | Metrics (e.g., 90%+ patients on access program) + editorial text + CTA |
| 7 | **Careers Callout** | Photo + H2 "Make Your Mark" + short body + "Explore Opportunities" CTA |
| 8 | **Investors Bar** | Stock ticker (ABBV) + key financial metric + "Investor Relations" CTA link |
| — | **Footer** | 6-column sitemap footer. No ISI. Includes: About/Science/Pipeline/Patients/Newsroom/Careers/Investors nav columns + social icons + Legal/Privacy/Accessibility links + AbbVie logo + copyright |

---

### Block Classification — Corporate vs Commercial

| Block | Classification | Delta from Commercial |
|---|---|---|
| `header` | **VARIANT** | Corporate adds: mega-menu (3-col dropdown sub-nav), country/language selector, stock ticker widget, prominent search. No ISI jump link, no HCP modal trigger. |
| `hero` | **SHARED** | Same `video-bg` or `photo-bg` variant. No indication CTAs, no ISI eyebrow. Simpler content. |
| `cards` (article cards) | **SHARED** | Uses existing `image-cards` variant. Date + category tag + headline + excerpt + link. |
| `cards` (therapeutic area) | **VARIANT** | Icon or illustrated cards, no patient data, links to science sub-pages rather than treatment info. |
| `columns` | **SHARED** | 2-col editorial layout identical to commercial use. |
| `tabs` | **SHARED** | Used for news category filtering. Same block, content-only difference. |
| `accordion` | **SHARED** | FAQ / pipeline sub-details. Standard variant. |
| `testimonial` | **SHARED** | Static patient quote card. No Boxed Warning context. |
| `stats` | **SHARED** | Corporate uses same large-number stat pattern (pipeline count, patient count, employee count). |
| `fragment` | **SHARED** | Reusable shared content. |
| `modal` | **SHARED** | Exit modal for external links. No HCP gate, no ISI modal. |
| `footer` | **VARIANT** | Completely different footer: 6-col sitemap nav, AbbVie logo, social icons, standard legal links. **No ISI, no PI/MedGuide, no regulatory code.** Similar HTML structure but different content model. |
| **`news-feed`** | **CORPORATE-ONLY** | Press release / stories listing. Filterable by category (press release / story / award). Date-sorted. Paginated. Pulls from AEM content tree or external news API. No commercial equivalent. |
| **`pipeline-table`** | **CORPORATE-ONLY** | Clinical pipeline table: drug name, indication, phase (1/2/3/Regulatory), partner. Filterable by therapeutic area. New data-driven block. No commercial equivalent. |
| **`mega-nav`** | **CORPORATE-ONLY** | Multi-column fly-out navigation. 2–4 column sub-menu with headings, links, and optional featured image/article. Far beyond the commercial dropdowns. |
| **`stock-ticker`** | **CORPORATE-ONLY** | Real-time ABBV stock price widget (NYSE: ABBV). Price + change + volume. Likely third-party iframe or API widget. |
| **`careers`** | **CORPORATE-ONLY** | Job search widget: keyword input + location + job category filter. Lists featured roles. Links to careers.abbvie.com. |
| **`country-selector`** | **CORPORATE-ONLY** | Popup/dropdown to select country/region and language. Routes to localized corporate sub-site. |

### Corporate-Only Block Details

#### `news-feed`
Real-time, filterable press release and editorial article listing. Pulls from an AEM content repository or CMS feed. Supports: category tabs (Press Releases / Patient Stories / Awards), date range display, pagination, card format (date + category + headline + excerpt + Read More link).

**JS Required:** Medium–High — filter state management, pagination, optional live fetch from search API.
**LCP Impact:** Low — always below fold.

#### `pipeline-table`
Tabular display of AbbVie's clinical drug pipeline. Rows = drug compounds. Columns = Therapeutic Area, Compound Name, Indication, Phase, Partner. Filterable by therapeutic area. Not a data-live widget (manually authored or CMS-managed).

**JS Required:** Low–Medium — filter/sort client-side. No live API needed if content is authored.
**LCP Impact:** Low — below fold.

#### `mega-nav`
Multi-column dropdown triggered on hover/click for primary nav items. Each column has a heading + list of links. Some columns contain a featured card (image + short text). Full keyboard navigation and ARIA support required.

**JS Required:** Medium — open/close, focus management, escape key, mobile adaptation.
**LCP Impact:** Medium — nav is always in critical path, but megamenu overlay doesn't affect main content LCP.

#### `stock-ticker`
ABBV stock price badge with real-time data. NYSE symbol, current price, daily change ($ and %), volume. Typically a third-party financial data embed (e.g., Refinitiv, Bloomberg Terminal embed, or custom API widget).

**JS Required:** High — live data fetch on page load + auto-refresh. Alternatively can be deferred widget.
**LCP Impact:** Low if deferred. **High if blocking** — must defer this script or it will delay parse.

#### `careers`
Job search module: keyword input + location + filter dropdowns → returns matched roles from careers.abbvie.com API. Optional featured roles section below. "View All Jobs" CTA.

**JS Required:** High — search form, API call to careers system, result rendering.
**LCP Impact:** Low — section 6+ on homepage.

#### `country-selector`
A modal or dropdown presenting all countries/regions where AbbVie operates, organized by geography. Used to route users to the correct regional site. Appears in header utility bar.

**JS Required:** Low — toggle open/close. Country links are plain anchors.
**LCP Impact:** Low — header utility item only, does not affect page content.

---

## Repository Decision

### Context
AbbVie is considering whether to house the **corporate website (abbvie.com)** in the **same EDS repository** as the 24+ commercial drug microsites, or in a **dedicated separate repository**.

---

### Option A — Shared Repository (all sites in one repo)

**Pros:**
- Single source of truth for all blocks — a bug fix in `modal`, `hero`, or `columns` propagates to all sites at once
- Lower overhead: one CI/CD pipeline, one linting config, one test suite setup
- Easier to identify block reuse — all sites are visible in context
- AEM authoring can reference a single block collection, reducing author confusion
- CSS design tokens (colours, typography) shared at root level automatically apply to corporate and commercial

**Cons:**
- **Release cadence conflict** — corporate has an independent publishing rhythm from commercial. A single breaking change in a shared block blocks all sites from shipping simultaneously.
- **Regulatory blast radius** — ISI, Boxed Warning, or HCP gate changes on commercial blocks must not affect corporate deploy cycles. A shared `footer` block change would require regulatory review on all 24+ commercial sites.
- **Bundle bloat risk** — corporate-only blocks (`pipeline-table`, `news-feed`, `stock-ticker`, `careers`, `mega-nav`) would exist in the same block library and be an unnecessary JS presence on commercial pages if not carefully scoped.
- **Governance ambiguity** — who owns a shared `header` block when AbbVie Corporate branding team wants to change it in a way that breaks 24 commercial sites?
- **Team autonomy blocked** — commercial brand teams and corporate digital teams would need to coordinate every release branch.

---

### Option B — Separate Repository (corporate-only repo)

**Pros:**
- **Full deploy autonomy** — corporate can ship on its own schedule, with no impact on any drug site
- **Zero regulatory entanglement** — no risk of corporate changes triggering commercial regulatory review cycles
- **Leaner bundles** — corporate-only blocks (`pipeline-table`, `stock-ticker`, `mega-nav`) never ship to commercial pages
- **Cleaner ownership** — AbbVie Corporate Digital team owns the corporate repo; individual brand teams (or shared services) own commercial repos
- **Security scope isolation** — if the corporate site has different compliance requirements (e.g., investor regulations), its security posture can be managed independently

**Cons:**
- **Bug duplication risk** — a fix in `modal` or `columns` must be applied twice (corporate repo + commercial repo) unless extracted to a shared package
- **Two CI/CD pipelines** to maintain
- **Potential for divergence** — over time, two copies of the same `modal` block may evolve differently if teams aren't coordinating
- **Initial cost** — extracting shared blocks into a package requires upfront investment

---

### Recommended Approach

**Separate corporate repository + shared Block Collection package**

1. **Create a dedicated corporate EDS repo** (`aem-abbvie-corporate`) with its own deploy pipeline and authoring environment. This gives corporate digital full autonomy.

2. **Extract the 6 most shared blocks** into a private internal npm package (`@abbvie/eds-blocks-shared`) versioned with semantic versioning:
   - `hero` (photo-bg + video-bg variants)
   - `columns`
   - `accordion`
   - `modal`
   - `fragment`
   - `cards` (icon-cards, image-cards variants)

3. **Both repos consume `@abbvie/eds-blocks-shared`** as a dependency. Bug fixes are applied once and distributed via npm version bump. Teams can pin to specific versions.

4. **Commercial repo keeps** ISI-specific blocks (`isi`, `hero-indication`, `hero-carousel`) and therapeutic blocks that have no corporate use.

5. **Corporate repo adds** all corporate-only blocks (`news-feed`, `pipeline-table`, `mega-nav`, `stock-ticker`, `careers`, `country-selector`) that commercial sites would never need.

---

### Shared Block Candidates for Component Library

These blocks appear on **both corporate and commercial** sites with minimal delta — strong candidates for the shared npm package:

| Block | Shared Variants | Corporate Delta |
|---|---|---|
| `hero` | `photo-bg`, `video-bg` | No indication routing, no ISI eyebrow |
| `columns` | 2-col, 3-col | None — identical |
| `accordion` | standard, references | None — identical |
| `modal` | wol-exit | No HCP-gate or ISI variants needed |
| `cards` | icon-cards, image-cards, feature-cards | Article date/category tag differs |
| `fragment` | — | None — identical |
| `stats` | milestone-trio | None — identical |
| `footer` | standard | ISI-slot absent on corporate; otherwise similar HTML structure |

### Blocks That Must Stay Commercial-Only

These contain pharmaceutical regulatory requirements and have no corporate parallel:

| Block | Reason |
|---|---|
| `isi` | FDA-mandated ISI — strictly commercial |
| `hero-indication` | Indication routing — strictly commercial |
| `hero-carousel` | OWL carousel with pharma content — strictly commercial |
| `promo-drawer` | Pharma promotional feature — commercial only |
| `brand-explorer` | Cross-brand immunology nav — commercial HCP only |
| `video` (Brightcove) | Pharma ISI-adjacent video — commercial only |

### Blocks That Must Stay Corporate-Only

| Block | Reason |
|---|---|
| `news-feed` | Live editorial/press release feed — corporate only |
| `pipeline-table` | Clinical pipeline data — corporate only |
| `mega-nav` | 3-column dropdown — corporate complexity not needed on drug sites |
| `stock-ticker` | ABBV financial widget — corporate only |
| `careers` | Job search integration — corporate only |
| `country-selector` | Global region routing — corporate only |
