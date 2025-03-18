export default function decorate(block) {
  const rows = [...block.children];
  
  // Get content from the first row
  const heroContent = {
    image: rows[0]?.children[0]?.querySelector('img')?.getAttribute('src') || '',
    title: rows[0]?.children[1]?.querySelector('a')?.textContent?.trim() || rows[0]?.children[1]?.textContent?.trim() || '',
    description: rows[0]?.children[2]?.textContent?.trim() || '',
    link: rows[0]?.children[1]?.querySelector('a')?.href || ''
  };

  // Create hero structure
  const hero = document.createElement('div');
  hero.classList.add('projects-content-hero');

  // Add hero image
  if (heroContent.image) {
    const img = document.createElement('img');
    img.classList.add('projects-content-hero-image');
    img.src = heroContent.image;
    img.alt = heroContent.title;
    hero.appendChild(img);
  }

  // Add hero content
  const content = document.createElement('div');
  content.classList.add('projects-content-hero-content');

  if (heroContent.title) {
    const titleWrapper = document.createElement('div');
    titleWrapper.classList.add('projects-content-hero-title-wrapper');

    if (heroContent.link) {
      const titleLink = document.createElement('a');
      titleLink.href = heroContent.link;
      titleLink.classList.add('projects-content-hero-title-link');
      
      const title = document.createElement('h1');
      title.classList.add('projects-content-hero-title');
      title.textContent = heroContent.title;
      
      titleLink.appendChild(title);
      titleWrapper.appendChild(titleLink);
    } else {
      const title = document.createElement('h1');
      title.classList.add('projects-content-hero-title');
      title.textContent = heroContent.title;
      titleWrapper.appendChild(title);
    }
    
    content.appendChild(titleWrapper);
  }

  if (heroContent.description) {
    const description = document.createElement('p');
    description.classList.add('projects-content-hero-description');
    description.textContent = heroContent.description;
    content.appendChild(description);
  }

  hero.appendChild(content);
  block.replaceWith(hero);
} 