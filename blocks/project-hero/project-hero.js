export default function decorate(block) {
  const rows = [...block.children];
  const content = {
    title: rows[0]?.children[0]?.textContent?.trim() || '',
    text: rows[0]?.children[1]?.textContent?.trim() || '',
    image: rows[0]?.children[2]?.querySelector('img')?.getAttribute('src') || '',
  };

  const hero = document.createElement('div');
  hero.classList.add('project-hero');

  if (content.title) {
    const title = document.createElement('h1');
    title.classList.add('project-hero-title');
    title.textContent = content.title;
    hero.appendChild(title);
  }

  if (content.text) {
    const text = document.createElement('p');
    text.classList.add('project-hero-text');
    text.textContent = content.text;
    hero.appendChild(text);
  }

  if (content.image) {
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('project-hero-image-wrapper');

    const img = document.createElement('img');
    img.classList.add('project-hero-image');
    img.src = content.image;
    img.alt = 'Project Hero Image';
    imageWrapper.appendChild(img);

    hero.appendChild(imageWrapper);
  }

  block.replaceWith(hero);
}
