import cleanupTransform from './transformers/ozurdex-cleanup.js';
import sectionsTransform from './transformers/ozurdex-sections.js';
import parseHero from './parsers/hero.js';
import parseColumns from './parsers/columns.js';
import parseIsi from './parsers/isi.js';

const howitworksTemplate = {
  name: 'howitworks',
  blocks: [
    { name: 'hero', instances: ['.abbv-background-container.section-banner'] },
    { name: 'columns', instances: ['.ozure-hiw-tiny-implant', '.ozure-hiw-retina-images'] },
    { name: 'video', instances: ['.ozure-hiw-video-section'] },
    { name: 'isi', instances: ['.abbv-inline-use-isi'] },
  ],
  sections: [
    { id: 'hero', name: 'Hero Banner', selector: '.abbv-background-container.section-banner', style: null, blocks: ['hero'], defaultContent: [] },
    { id: 'what-is-ozurdex', name: 'What Is OZURDEX', selector: '.ozure-hiw-what-is-ozurdex', style: 'content-page, centered, accent-border-left', blocks: [], defaultContent: ['h2', 'p', 'ul'] },
    { id: 'implant-details', name: 'OZURDEX Is', selector: '.ozure-hiw-tiny-implant', style: null, blocks: ['columns'], defaultContent: [] },
    { id: 'what-does', name: 'What Does OZURDEX Do', selector: '.ozure-hiw-what-does', style: 'content-page, centered', blocks: [], defaultContent: ['h3', 'ul'] },
    { id: 'retina-images', name: 'Before/After Retina Images', selector: '.ozure-hiw-retina-images', style: 'before-after', blocks: [], defaultContent: ['h3', 'picture', 'p', 'h3', 'picture'] },
    { id: 'retina-callout', name: 'Clinical Studies Callout', selector: '.ozure-hiw-callout', style: 'retina-callout', blocks: [], defaultContent: ['p'] },
    { id: 'what-happens', name: 'What Happens to the Implant', selector: '.ozure-hiw-what-happens', style: 'content-page, centered', blocks: [], defaultContent: ['h3', 'ul'] },
    { id: 'video', name: 'Video', selector: '.ozure-hiw-video-section', style: null, blocks: ['video'], defaultContent: [] },
    { id: 'isi', name: 'Important Safety Information', selector: '.abbv-inline-use-isi', style: null, blocks: ['isi'], defaultContent: [] },
  ],
};

export default {
  template: howitworksTemplate,

  parsers: {
    hero: parseHero,
    columns: parseColumns,
    isi: parseIsi,
  },

  transformers: [cleanupTransform, sectionsTransform],

  preTransform(document, element) {
    const payload = { template: howitworksTemplate };
    this.transformers.forEach((t) => t('beforeTransform', element, payload));
  },

  postTransform(document, element) {
    const payload = { template: howitworksTemplate };
    this.transformers.forEach((t) => t('afterTransform', element, payload));
  },

  transform(document) {
    const main = document.querySelector('main') || document.body;

    this.preTransform(document, main);

    if (howitworksTemplate.blocks) {
      howitworksTemplate.blocks.forEach((block) => {
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
