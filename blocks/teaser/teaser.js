export default function decorate(block) {
  const rows = [...block.children];
  rows.forEach((row) => {
    const cols = [...row.children];
    cols.forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        col.classList.add('teaser-image');
      } else {
        col.classList.add('teaser-content');
      }
    });
  });
}
