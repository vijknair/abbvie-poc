export default function transform(document) {
  // Remove hidden elements
  document.querySelectorAll('.abbv-hide, .abbv-dimmer, .abbv-back-to-top, .newpar, .par.iparys_inherited').forEach((el) => el.remove());

  // Remove duplicate nav references inside content
  document.querySelectorAll('.admp-reference, .ozurdex-page-nav').forEach((el) => el.remove());

  // Remove cookie consent and tracking
  document.querySelectorAll('#onetrust-consent-sdk, [class*="onetrust"]').forEach((el) => el.remove());

  // Clean up empty divs
  document.querySelectorAll('.abbv-clear, .newpar').forEach((el) => el.remove());

  // Fix superscript registered marks
  document.querySelectorAll('sup').forEach((sup) => {
    if (sup.textContent.trim() === '®') {
      sup.textContent = '®';
    }
  });

  return document;
}
