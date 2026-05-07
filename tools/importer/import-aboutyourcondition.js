import cleanupTransform from './transformers/ozurdex-cleanup.js';
import sectionsTransform from './transformers/ozurdex-sections.js';
import parseHero from './parsers/hero.js';
import parseColumns from './parsers/columns.js';
import parseIsi from './parsers/isi.js';

const aboutyourconditionTemplate = {
  name: 'aboutyourcondition',
  blocks: [
    { name: 'hero', instances: ['.abbv-background-container.section-banner'] },
    { name: 'teaser', instances: ['.visual-acuity .abbv-image-text-v2.img1-dv', '.decreased-visual-acuity', "[class*='about-dme']", "[class*='about-rvo']", "[class*='about-uveitis']"] },
    { name: 'cards', instances: ['.abbv-symptoms-mid-image'] },
    { name: 'columns', instances: ['.ozure-ayc-brvo-crvo'] },
    { name: 'isi', instances: ['.abbv-inline-use-isi'] },
  ],
  sections: [
    { id: 'hero', name: 'Hero Banner', selector: '.abbv-background-container.section-banner', style: null, blocks: ['hero'], defaultContent: [] },
    { id: 'intro', name: 'How Does Your Condition Impact Your Vision', selector: '.ozure-ayc-heading', style: 'content-page, centered, accent-border-left', blocks: [], defaultContent: ['h2', 'p', 'a'] },
    { id: 'visual-acuity', name: 'Visual Acuity', selector: '.visual-acuity', style: 'light', blocks: ['teaser'], defaultContent: [] },
    { id: 'retina-callout', name: 'Healthy Retina Callout', selector: '.ozure-ayc-retina-callout', style: 'retina-callout', blocks: [], defaultContent: ['p'] },
    { id: 'dme', name: 'Diabetic Macular Edema (DME)', selector: '.ozure-ayc-dme-section', style: 'content-page, centered', blocks: [], defaultContent: ['h2', 'ul', 'picture', 'hr', 'picture', 'p'] },
    { id: 'dme-symptoms', name: 'DME Symptoms', selector: '.symptoms-container:nth-of-type(1)', style: 'light', blocks: ['cards', 'teaser'], defaultContent: ['h2', 'ul'] },
    { id: 'rvo', name: 'Retinal Vein Occlusion (RVO)', selector: '.ozure-ayc-rvo-section', style: 'content-page, centered', blocks: ['columns'], defaultContent: ['h2', 'ul', 'hr', 'p'] },
    { id: 'rvo-symptoms', name: 'RVO Symptoms', selector: '.symptoms-container:nth-of-type(2)', style: 'light', blocks: ['cards', 'teaser'], defaultContent: ['h2', 'ul'] },
    { id: 'uveitis', name: 'Noninfectious Uveitis', selector: '.ozure-ayc-uveitis-section', style: 'content-page, centered', blocks: [], defaultContent: ['h2', 'ul', 'picture', 'p'] },
    { id: 'uveitis-symptoms', name: 'Uveitis Symptoms', selector: '.ozure-ayc-uveitis-symptoms', style: 'light', blocks: ['teaser'], defaultContent: ['h2', 'ul'] },
    { id: 'isi', name: 'Important Safety Information', selector: '.abbv-inline-use-isi', style: null, blocks: ['isi'], defaultContent: [] },
  ],
};

export default {
  template: aboutyourconditionTemplate,

  parsers: {
    hero: parseHero,
    columns: parseColumns,
    isi: parseIsi,
    // TODO: teaser parser not yet available
    // TODO: cards parser not yet available
  },

  transformers: [cleanupTransform, sectionsTransform],

  preTransform(document, element) {
    const payload = { template: aboutyourconditionTemplate };
    this.transformers.forEach((t) => t('beforeTransform', element, payload));
  },

  postTransform(document, element) {
    const payload = { template: aboutyourconditionTemplate };
    this.transformers.forEach((t) => t('afterTransform', element, payload));
  },

  transform(document) {
    const main = document.querySelector('main') || document.body;

    this.preTransform(document, main);

    if (aboutyourconditionTemplate.blocks) {
      aboutyourconditionTemplate.blocks.forEach((block) => {
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
