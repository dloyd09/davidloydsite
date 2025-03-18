export default function decorate(block) {
  const rows = [...block.children];
  
  // Get content from the first row
  const heroContent = {
    image: rows[0]?.children[0]?.querySelector('img')?.getAttribute('src') || '',
    title: rows[0]?.children[1]?.textContent?.trim() || '',
    description: rows[0]?.children[2]?.textContent?.trim() || '',
  };

  // Create hero structure
  const hero = document.createElement('div');
  hero.classList.add('project-hero');

  // Add hero image
  if (heroContent.image) {
    const img = document.createElement('img');
    img.classList.add('project-hero-image');
    img.src = heroContent.image;
    img.alt = heroContent.title;
    hero.appendChild(img);
  }

  // Add hero content
  const content = document.createElement('div');
  content.classList.add('project-hero-content');

  if (heroContent.title) {
    const title = document.createElement('h1');
    title.classList.add('project-hero-title');
    title.textContent = heroContent.title;
    content.appendChild(title);
  }

  if (heroContent.description) {
    const description = document.createElement('p');
    description.classList.add('project-hero-description');
    description.textContent = heroContent.description;
    content.appendChild(description);
  }

  hero.appendChild(content);
  block.replaceWith(hero);
} 