export default function decorate(block) {
  const row = block.firstElementChild;
  const cell = row?.querySelector('div');
  if (!cell) return;

  const text = cell.textContent;
  const accountMatch = text.match(/Account\s+(\d+)/);
  const videoMatch = text.match(/Video\s+ID\s+(\d+)/);

  if (!accountMatch || !videoMatch) return;

  const accountId = accountMatch[1];
  const videoId = videoMatch[1];

  block.textContent = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'video-wrapper';

  const playerEl = document.createElement('video-js');
  playerEl.setAttribute('data-account', accountId);
  playerEl.setAttribute('data-player', 'default');
  playerEl.setAttribute('data-embed', 'default');
  playerEl.setAttribute('data-video-id', videoId);
  playerEl.setAttribute('controls', '');
  playerEl.className = 'vjs-fluid';

  wrapper.appendChild(playerEl);
  block.appendChild(wrapper);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          const script = document.createElement('script');
          script.src = `https://players.brightcove.net/${accountId}/default_default/index.min.js`;
          script.async = true;
          document.head.appendChild(script);
        }
      });
    },
    { rootMargin: '200px' },
  );
  observer.observe(block);
}
