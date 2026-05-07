/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-whattoexpect.js
  var import_whattoexpect_exports = {};
  __export(import_whattoexpect_exports, {
    default: () => import_whattoexpect_default
  });

  // tools/importer/transformers/ozurdex-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        "#onetrust-consent-sdk",
        '[class*="onetrust"]',
        ".abbv-modal.cookieSettings"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".abbv-dimmer"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".newpar",
        ".par.iparys_inherited"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".admp-reference",
        ".ozurdex-page-nav"
      ]);
      WebImporter.DOMUtils.remove(element, [".abbv-clear"]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "header.abbv-header-v2",
        ".header-v2.parbase",
        ".abbv-sticky-anchor"
      ]);
      WebImporter.DOMUtils.remove(element, [
        "footer.abbv-footer",
        ".footer.parbase"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".ozurdex-banner-nav-cont",
        ".abbv-header-v2-primary-navigation",
        ".abbv-header-v2-utility-navigation"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".abbv-skip-to-main-content",
        ".abbv-back-to-top"
      ]);
      WebImporter.DOMUtils.remove(element, ["iframe", "noscript", "link"]);
    }
  }

  // tools/importer/transformers/ozurdex-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const template = payload && payload.template;
      if (!template || !template.sections || template.sections.length < 2) {
        return;
      }
      const document = element.ownerDocument;
      const sections = template.sections;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionEl = element.querySelector(section.selector);
        if (!sectionEl) {
          continue;
        }
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          if (sectionEl.nextSibling) {
            sectionEl.parentNode.insertBefore(sectionMetadata, sectionEl.nextSibling);
          } else {
            sectionEl.parentNode.appendChild(sectionMetadata);
          }
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.parentNode.insertBefore(hr, sectionEl);
        }
      }
    }
  }

  // tools/importer/parsers/hero.js
  function parseHero(element, document) {
    const cells = [["Hero"]];
    const bgImg = element.querySelector(".abbv-background-container-display img, .abbv-image-content-container-v2 img");
    if (bgImg) {
      const img = document.createElement("img");
      img.src = bgImg.src;
      img.alt = bgImg.alt || "";
      cells.push([img]);
    }
    const contentCell = document.createElement("div");
    const headline = element.querySelector(".headline, h1, h2");
    if (headline) {
      const h = document.createElement("h1");
      h.innerHTML = headline.innerHTML.replace(/<br\s*\/?>/g, " ");
      contentCell.appendChild(h);
    }
    const cta = element.querySelector("a[href]:not(.abbv-skip-to-main-content)");
    if (cta && cta.textContent.trim()) {
      const p = document.createElement("p");
      const a = document.createElement("a");
      a.href = cta.href;
      a.textContent = cta.textContent.trim();
      p.appendChild(a);
      contentCell.appendChild(p);
    }
    if (contentCell.children.length) {
      cells.push([contentCell]);
    }
    return cells;
  }

  // tools/importer/parsers/columns.js
  function parseColumns(element, document) {
    const cells = [["Columns"]];
    const row = [];
    const cols = element.querySelectorAll(".abbv-col");
    if (cols.length) {
      cols.forEach((col) => {
        const cell = document.createElement("div");
        const img = col.querySelector('img[src]:not([src=""])');
        if (img) {
          const imgEl = document.createElement("img");
          imgEl.src = img.src;
          imgEl.alt = img.alt || "";
          cell.appendChild(imgEl);
        }
        const heading = col.querySelector("h2, h3");
        if (heading) {
          const h = document.createElement("h2");
          h.innerHTML = heading.innerHTML;
          cell.appendChild(h);
        }
        const richText = col.querySelector(".abbv-rich-text");
        if (richText) {
          const paragraphs = richText.querySelectorAll("p");
          paragraphs.forEach((p) => {
            if (p.textContent.trim()) {
              const pEl = document.createElement("p");
              pEl.innerHTML = p.innerHTML;
              cell.appendChild(pEl);
            }
          });
          const lists = richText.querySelectorAll("ul, ol");
          lists.forEach((list) => {
            const listEl = document.createElement(list.tagName.toLowerCase());
            list.querySelectorAll("li").forEach((li) => {
              const liEl = document.createElement("li");
              liEl.textContent = li.textContent.trim();
              listEl.appendChild(liEl);
            });
            cell.appendChild(listEl);
          });
        }
        const cta = col.querySelector('.abbv-button-primary, a[class*="button"]');
        if (cta) {
          const p = document.createElement("p");
          const a = document.createElement("a");
          a.href = cta.href;
          a.textContent = cta.textContent.trim();
          p.appendChild(a);
          cell.appendChild(p);
        }
        const caption = col.querySelector(".ozur-liberty-head, .abbv-background-container-content-block-display div");
        if (caption && !heading && caption.textContent.trim()) {
          const p = document.createElement("p");
          p.innerHTML = caption.innerHTML;
          cell.appendChild(p);
        }
        row.push(cell);
      });
    } else {
      const cell = document.createElement("div");
      const img = element.querySelector(".abbv-image-content-container-v2 img[alt]");
      if (img) {
        const imgEl = document.createElement("img");
        imgEl.src = img.src;
        imgEl.alt = img.alt || "";
        cell.appendChild(imgEl);
      }
      const heading = element.querySelector("h2");
      if (heading) {
        const h = document.createElement("h2");
        h.innerHTML = heading.innerHTML;
        cell.appendChild(h);
      }
      const text = element.querySelector(".abbv-stretched-card-body p, .box-borderbox p");
      if (text) {
        const p = document.createElement("p");
        p.innerHTML = text.innerHTML;
        cell.appendChild(p);
      }
      const cta = element.querySelector("a.abbv-button-primary, a.abbv-image-text-link");
      if (cta) {
        const p = document.createElement("p");
        const a = document.createElement("a");
        a.href = cta.href;
        a.textContent = cta.textContent.trim();
        p.appendChild(a);
        cell.appendChild(p);
      }
      row.push(cell);
    }
    if (row.length) cells.push(row);
    return cells;
  }

  // tools/importer/parsers/isi.js
  function parseIsi(element, document) {
    const cells = [["ISI"]];
    const content = document.createElement("div");
    const useSection = element.querySelector(".abbv-inline-use .abbv-rich-text");
    if (useSection) {
      const innerDiv = useSection.querySelector("div > div") || useSection.querySelector("div");
      if (innerDiv) {
        Array.from(innerDiv.children).forEach((child) => {
          if (child.textContent.trim()) {
            const el = document.createElement(child.tagName.toLowerCase());
            el.innerHTML = child.innerHTML;
            content.appendChild(el);
          }
        });
      }
    }
    const safetySection = element.querySelector(".abbv-inline-safety .abbv-rich-text");
    if (safetySection) {
      const innerDiv = safetySection.querySelector("div > div") || safetySection.querySelector("div");
      if (innerDiv) {
        Array.from(innerDiv.children).forEach((child) => {
          if (child.textContent.trim()) {
            const el = document.createElement(child.tagName.toLowerCase());
            el.innerHTML = child.innerHTML;
            content.appendChild(el);
          }
        });
      }
    }
    cells.push([content]);
    return cells;
  }

  // tools/importer/import-whattoexpect.js
  var whattoexpectTemplate = {
    name: "whattoexpect",
    blocks: [
      { name: "hero", instances: [".abbv-background-container.section-banner", ".during-procedure-hero"] },
      { name: "columns", instances: [".ozure-wte-before-pro", ".ozure-wte-after-pro"] },
      { name: "isi", instances: [".abbv-inline-use-isi"] }
    ],
    sections: [
      { id: "hero", name: "Hero Banner", selector: ".abbv-background-container.section-banner", style: null, blocks: ["hero"], defaultContent: [] },
      { id: "intro", name: "What Should I Expect", selector: ".ozure-wte-heading", style: "content-page, centered, accent-border-left", blocks: [], defaultContent: ["h2", "p", "a"] },
      { id: "before", name: "Before the Procedure", selector: ".ozure-wte-before-pro", style: null, blocks: ["columns"], defaultContent: [] },
      { id: "during-hero", name: "During Procedure Banner", selector: ".during-procedure-hero", style: null, blocks: ["hero"], defaultContent: [] },
      { id: "during-text", name: "During the Procedure", selector: ".ozure-duringthe-proc-contain", style: "content-page, centered", blocks: [], defaultContent: ["h2", "ul"] },
      { id: "after", name: "After the Procedure", selector: ".ozure-wte-after-pro", style: null, blocks: ["columns"], defaultContent: [] },
      { id: "isi", name: "Important Safety Information", selector: ".abbv-inline-use-isi", style: null, blocks: ["isi"], defaultContent: [] }
    ]
  };
  var import_whattoexpect_default = {
    template: whattoexpectTemplate,
    parsers: {
      hero: parseHero,
      columns: parseColumns,
      isi: parseIsi
    },
    transformers: [transform, transform2],
    preTransform(document, element) {
      const payload = { template: whattoexpectTemplate };
      this.transformers.forEach((t) => t("beforeTransform", element, payload));
    },
    postTransform(document, element) {
      const payload = { template: whattoexpectTemplate };
      this.transformers.forEach((t) => t("afterTransform", element, payload));
    },
    transform(document) {
      const main = document.querySelector("main") || document.body;
      this.preTransform(document, main);
      if (whattoexpectTemplate.blocks) {
        whattoexpectTemplate.blocks.forEach((block) => {
          const parser = this.parsers[block.name];
          if (!parser) return;
          block.instances.forEach((selector) => {
            const el = main.querySelector(selector);
            if (!el) return;
            const cells = parser(el, document);
            if (cells && cells.length > 1) {
              const blockTable = WebImporter.Blocks.createBlock(document, {
                name: cells[0][0],
                cells: cells.slice(1)
              });
              el.replaceWith(blockTable);
            }
          });
        });
      }
      this.postTransform(document, main);
      return main;
    }
  };
  return __toCommonJS(import_whattoexpect_exports);
})();
