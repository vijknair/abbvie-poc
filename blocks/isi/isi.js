/**
 * ISI Block — Important Safety Information
 * Per block-catalog.md + live site analysis:
 *
 * Sticky bar structure:
 *   [GREEN BAR — full width, 30px] "IMPORTANT SAFETY INFORMATION" (white) + "SEE MORE +" (right)
 *   [CONTENT AREA] Sub-headings (green) + body text (gray), scrollable
 *   [FADE GRADIENT at bottom when collapsed]
 *
 * Behaviors:
 * - Collapsed: ~150px, green title bar + preview of safety content + fade
 * - Expanded: ~75vh, full scrollable ISI content
 * - Auto-hide: disappears when inline ISI scrolls into view
 */

export default function decorate(block) {
  block.id = 'isi-content';

  // Create the sticky bar
  const stickyBar = document.createElement('div');
  stickyBar.className = 'isi-sticky-bar';
  stickyBar.setAttribute('aria-expanded', 'false');

  // Green title bar with heading + toggle
  const titleBar = document.createElement('div');
  titleBar.className = 'isi-sticky-title-bar';

  const titleText = document.createElement('span');
  titleText.className = 'isi-sticky-title';
  titleText.textContent = 'IMPORTANT SAFETY INFORMATION';

  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'isi-sticky-toggle';
  toggleBtn.setAttribute('aria-label', 'Expand Safety Information');
  toggleBtn.textContent = 'SEE MORE +';

  titleBar.appendChild(titleText);
  titleBar.appendChild(toggleBtn);

  // Content area — clone the ISI content (skip the first "Approved Uses" section,
  // start from "IMPORTANT SAFETY INFORMATION" which is what the live site shows)
  const contentArea = document.createElement('div');
  contentArea.className = 'isi-sticky-content';

  // Get the safety info section (second row of the ISI block)
  const safetyRow = block.children[1];
  if (safetyRow) {
    // Clone everything after the first h3 (skip "IMPORTANT SAFETY INFORMATION" heading
    // since it's already in the title bar)
    const safetyContent = safetyRow.querySelector('div');
    if (safetyContent) {
      const clone = safetyContent.cloneNode(true);
      // Remove the first h3 ("IMPORTANT SAFETY INFORMATION") — it's in the green bar
      const firstH3 = clone.querySelector('h3');
      if (firstH3) firstH3.remove();
      contentArea.appendChild(clone);
    }
  }

  // Fade gradient (visible in collapsed state)
  const fadeOverlay = document.createElement('div');
  fadeOverlay.className = 'isi-sticky-fade';

  // Assemble
  stickyBar.appendChild(titleBar);
  stickyBar.appendChild(contentArea);
  stickyBar.appendChild(fadeOverlay);
  document.body.appendChild(stickyBar);

  // Toggle expand/collapse
  toggleBtn.addEventListener('click', () => {
    const expanded = stickyBar.getAttribute('aria-expanded') === 'true';
    stickyBar.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    toggleBtn.textContent = expanded ? 'SEE MORE +' : 'SEE LESS −';
    toggleBtn.setAttribute(
      'aria-label',
      expanded ? 'Expand Safety Information' : 'Collapse Safety Information',
    );
  });

  // Hide sticky bar when inline ISI is visible
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          stickyBar.classList.add('isi-sticky-hidden');
        } else {
          stickyBar.classList.remove('isi-sticky-hidden');
        }
      });
    },
    { threshold: 0 },
  );
  observer.observe(block);

  // Handle jump links — scroll to ISI when clicked
  document.querySelectorAll('a[href*="isi"], a[href*="safety"], a[href*="use_statement"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      block.scrollIntoView({ behavior: 'smooth' });
    });
  });
}
