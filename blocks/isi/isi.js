/**
 * ISI Block — Important Safety Information
 * Per block-catalog.md: One JS implementation across all AbbVie sites.
 * Behaviors:
 * - Collapsed: ~176px sticky bar at bottom showing ISI text preview with fade
 * - Expanded: ~75vh overlay with full scrollable ISI content
 * - Auto-hide: disappears when inline ISI section scrolls into view
 * - Jump links: scrolls to inline ISI on click
 */

export default function decorate(block) {
  block.id = 'isi-content';

  // Create the sticky bar
  const stickyBar = document.createElement('div');
  stickyBar.className = 'isi-sticky-bar';
  stickyBar.setAttribute('aria-expanded', 'false');

  // Toggle button row
  const toggleRow = document.createElement('div');
  toggleRow.className = 'isi-sticky-toggle-row';

  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'isi-sticky-toggle';
  toggleBtn.setAttribute('aria-label', 'Expand Safety Information');
  toggleBtn.innerHTML = '<span class="isi-sticky-icon">+</span>';

  toggleRow.appendChild(toggleBtn);

  // Fade gradient overlay (visible in collapsed state)
  const fadeOverlay = document.createElement('div');
  fadeOverlay.className = 'isi-sticky-fade';

  // Content area — clone the full ISI content from the inline block
  const contentArea = document.createElement('div');
  contentArea.className = 'isi-sticky-content';
  contentArea.innerHTML = block.innerHTML;

  // Assemble: toggle row at top-right, fade at top of content, content below
  stickyBar.appendChild(toggleRow);
  stickyBar.appendChild(fadeOverlay);
  stickyBar.appendChild(contentArea);
  document.body.appendChild(stickyBar);

  // Toggle expand/collapse
  toggleBtn.addEventListener('click', () => {
    const expanded = stickyBar.getAttribute('aria-expanded') === 'true';
    stickyBar.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    toggleBtn.querySelector('.isi-sticky-icon').textContent = expanded ? '+' : '−';
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
