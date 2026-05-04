/**
 * ISI Block — Important Safety Information
 * Per block-catalog.md: One JS implementation across all AbbVie sites.
 * Behaviors: expand/collapse toggle, sticky bar, scroll-into-view on jump link.
 */

export default function decorate(block) {
  // Mark the inline ISI section with an ID for jump-link targeting
  block.id = 'isi-content';

  // Get the first heading for the sticky bar preview
  const safetyRow = block.children[1];
  const firstHeading = safetyRow?.querySelector('h3');
  const previewTitle = firstHeading
    ? firstHeading.textContent.trim()
    : 'IMPORTANT SAFETY INFORMATION';

  // Get a preview snippet from the first paragraph of the safety section
  const firstParagraph = safetyRow?.querySelector('p');
  const previewText = firstParagraph
    ? firstParagraph.textContent.trim().substring(0, 150)
    : '';

  // Create the sticky bar
  const stickyBar = document.createElement('div');
  stickyBar.className = 'isi-sticky-bar';
  stickyBar.setAttribute('aria-expanded', 'false');

  // Toggle button
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'isi-sticky-toggle';
  toggleBtn.setAttribute('aria-label', 'Expand Safety Information');
  toggleBtn.innerHTML = `<span class="isi-sticky-title">${previewTitle}</span><span class="isi-sticky-icon">+</span>`;

  // Expandable preview content
  const previewContent = document.createElement('div');
  previewContent.className = 'isi-sticky-content';
  if (previewText) {
    const p = document.createElement('p');
    p.textContent = `${previewText}...`;
    previewContent.appendChild(p);
  }

  stickyBar.appendChild(toggleBtn);
  stickyBar.appendChild(previewContent);
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
