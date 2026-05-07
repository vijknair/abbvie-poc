/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: ozurdex site-wide cleanup.
 * Removes non-authorable content (header, footer, nav, cookie consent, etc.)
 * Selectors verified from captured DOM (migration-work/cleaned.html).
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove cookie consent overlay (blocks parsing) - found: #onetrust-consent-sdk, .onetrust-pc-dark-filter
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      '[class*="onetrust"]',
      '.abbv-modal.cookieSettings',
    ]);

    // Remove hidden elements that may block parsing - found: .abbv-hide, .abbv-dimmer
    WebImporter.DOMUtils.remove(element, [
      '.abbv-dimmer',
    ]);

    // Remove empty structural elements - found: .newpar, .par.iparys_inherited
    WebImporter.DOMUtils.remove(element, [
      '.newpar',
      '.par.iparys_inherited',
    ]);

    // Remove duplicate nav references inside content - found: .admp-reference, .ozurdex-page-nav
    WebImporter.DOMUtils.remove(element, [
      '.admp-reference',
      '.ozurdex-page-nav',
    ]);

    // Remove clear divs - found: .abbv-clear
    WebImporter.DOMUtils.remove(element, ['.abbv-clear']);
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove non-authorable site chrome
    // Header - found: header.abbv-header-v2, .header-v2.parbase
    WebImporter.DOMUtils.remove(element, [
      'header.abbv-header-v2',
      '.header-v2.parbase',
      '.abbv-sticky-anchor',
    ]);

    // Footer - found: footer.abbv-footer, .footer.parbase
    WebImporter.DOMUtils.remove(element, [
      'footer.abbv-footer',
      '.footer.parbase',
    ]);

    // Navigation elements - found: .ozurdex-banner-nav-cont, .abbv-header-v2-primary-navigation
    WebImporter.DOMUtils.remove(element, [
      '.ozurdex-banner-nav-cont',
      '.abbv-header-v2-primary-navigation',
      '.abbv-header-v2-utility-navigation',
    ]);

    // Skip to content link and back to top - found: .abbv-skip-to-main-content, .abbv-back-to-top
    WebImporter.DOMUtils.remove(element, [
      '.abbv-skip-to-main-content',
      '.abbv-back-to-top',
    ]);

    // Remove iframes and noscript - safe cleanup
    WebImporter.DOMUtils.remove(element, ['iframe', 'noscript', 'link']);
  }
}
