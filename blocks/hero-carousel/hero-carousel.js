export default function decorate(block) {
  const slides = [...block.children];
  if (slides.length < 2) return;

  slides.forEach((slide, i) => {
    slide.classList.add('hero-carousel-slide');
    if (i === 0) slide.classList.add('active');

    const cols = [...slide.children];
    if (cols[0]) cols[0].classList.add('hero-carousel-image');
    if (cols[1]) cols[1].classList.add('hero-carousel-content');
  });

  // Navigation arrows
  const nav = document.createElement('div');
  nav.className = 'hero-carousel-nav';

  const prevBtn = document.createElement('button');
  prevBtn.className = 'hero-carousel-prev';
  prevBtn.setAttribute('aria-label', 'Previous slide');
  prevBtn.textContent = '‹';

  const nextBtn = document.createElement('button');
  nextBtn.className = 'hero-carousel-next';
  nextBtn.setAttribute('aria-label', 'Next slide');
  nextBtn.textContent = '›';

  nav.appendChild(prevBtn);
  nav.appendChild(nextBtn);
  block.appendChild(nav);

  // Dot indicators
  const dots = document.createElement('div');
  dots.className = 'hero-carousel-dots';
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = `hero-carousel-dot${i === 0 ? ' active' : ''}`;
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dots.appendChild(dot);
  });
  block.appendChild(dots);

  // Carousel logic
  let current = 0;
  let interval = null;

  function goTo(index) {
    const previous = current;
    current = (index + slides.length) % slides.length;
    slides[previous].classList.remove('active');
    slides[previous].classList.add('exiting');
    dots.children[previous].classList.remove('active');
    slides[current].classList.add('active');
    dots.children[current].classList.add('active');
    setTimeout(() => {
      slides[previous].classList.add('resetting');
      slides[previous].classList.remove('exiting');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          slides[previous].classList.remove('resetting');
        });
      });
    }, 650);
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startAutoRotate() {
    interval = setInterval(next, 6000);
  }

  function stopAutoRotate() {
    if (interval) clearInterval(interval);
  }

  prevBtn.addEventListener('click', () => { stopAutoRotate(); prev(); });
  nextBtn.addEventListener('click', () => { stopAutoRotate(); next(); });

  dots.querySelectorAll('.hero-carousel-dot').forEach((dot, i) => {
    dot.addEventListener('click', () => { stopAutoRotate(); goTo(i); });
  });

  // Pause on hover
  block.addEventListener('mouseenter', stopAutoRotate);
  block.addEventListener('mouseleave', startAutoRotate);

  // Start auto-rotate
  startAutoRotate();

  // Pause when not visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) startAutoRotate();
      else stopAutoRotate();
    });
  }, { threshold: 0.3 });
  observer.observe(block);
}
