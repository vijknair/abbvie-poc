export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 2) return;

  const titleRow = rows[0];
  titleRow.classList.add('indications-title');

  const linksRow = rows[1];
  linksRow.classList.add('indications-grid');

  const links = linksRow.querySelectorAll('a');
  const grid = document.createElement('div');
  grid.className = 'indications-cards';

  links.forEach((link) => {
    const card = document.createElement('a');
    card.href = link.getAttribute('href');
    card.className = 'indication-card';

    const text = link.textContent;
    const parts = text.split('|');

    const content = document.createElement('div');
    content.className = 'indication-card-content';

    const [first, second, third] = parts;

    if (parts.length >= 2) {
      const qualifier = document.createElement('span');
      qualifier.className = 'indication-qualifier';
      qualifier.textContent = first;
      content.appendChild(qualifier);

      const name = document.createElement('span');
      name.className = 'indication-name';
      name.textContent = second;
      content.appendChild(name);

      if (third) {
        const sub = document.createElement('span');
        sub.className = 'indication-sub';
        sub.textContent = third;
        content.appendChild(sub);
      }
    } else {
      const name = document.createElement('span');
      name.className = 'indication-name';
      name.textContent = first;
      content.appendChild(name);
    }

    const arrow = document.createElement('span');
    arrow.className = 'indication-arrow';
    arrow.textContent = '›';

    card.appendChild(content);
    card.appendChild(arrow);
    grid.appendChild(card);
  });

  linksRow.querySelector('div').replaceChildren(grid);
}
