import cleanupTransform from './transformers/ozurdex-cleanup.js';
import sectionsTransform from './transformers/ozurdex-sections.js';
import parseHero from './parsers/hero.js';
import parseColumns from './parsers/columns.js';
import parseIsi from './parsers/isi.js';

const whattoexpectTemplate = {
  name: 'whattoexpect',
  blocks: [
    { name: 'hero', instances: ['.abbv-background-container.section-banner', '.during-procedure-hero'] },
    { name: 'columns', instances: ['.ozure-wte-before-pro', '.ozure-wte-after-pro'] },
    { name: 'isi', instances: ['.abbv-inline-use-isi'] },
  ],
  sections: [
    { id: 'hero', name: 'Hero Banner', selector: '.abbv-background-container.section-banner', style: null, blocks: ['hero'], defaultContent: [] },
    { id: 'intro', name: 'What Should I Expect', selector: '.ozure-wte-heading', style: 'content-page, centered, accent-border-left', blocks: [], defaultContent: ['h2', 'p', 'a'] },
    { id: 'before', name: 'Before the Procedure', selector: '.ozure-wte-before-pro', style: null, blocks: ['columns'], defaultContent: [] },
    { id: 'during-hero', name: 'During Procedure Banner', selector: '.during-procedure-hero', style: null, blocks: ['hero'], defaultContent: [] },
    { id: 'during-text', name: 'During the Procedure', selector: '.ozure-duringthe-proc-contain', style: 'content-page, centered', blocks: [], defaultContent: ['h2', 'ul'] },
    { id: 'after', name: 'After the Procedure', selector: '.ozure-wte-after-pro', style: null, blocks: ['columns'], defaultContent: [] },
    { id: 'isi', name: 'Important Safety Information', selector: '.abbv-inline-use-isi', style: null, blocks: ['isi'], defaultContent: [] },
  ],
};

export default {
  template: whattoexpectTemplate,

  parsers: {
    hero: parseHero,
    columns: parseColumns,
    isi: parseIsi,
  },

  transformers: [cleanupTransform, sectionsTransform],

  preTransform(document, element) {
    const payload = { template: whattoexpectTemplate };
    this.transformers.forEach((t) => t('beforeTransform', element, payload));
  },

  postTransform(document, element) {
    const payload = { template: whattoexpectTemplate };
    this.transformers.forEach((t) => t('afterTransform', element, payload));
  },

  transform(document) {
    const main = document.querySelector('main') || document.body;

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
              cells: cells.slice(1),
            });
            el.replaceWith(blockTable);
          }
        });
      });
    }

    this.postTransform(document, main);

    return main;
  },
};
