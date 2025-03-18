export default function decorate(block) {
  const rows = [...block.children];
  const cards = [];

  // Parse the table rows into a structured data array
  rows.forEach((row) => {
    const cells = [...row.children];
    const card = {
      image: cells[0]?.querySelector('img')?.getAttribute('src') || null,
      title: cells[1]?.textContent?.trim() || '',
      description: cells[2]?.textContent?.trim() || '',
      url: cells[3]?.textContent?.trim() || '',
    };
    cards.push(card);
  });

  // Build the card grid structure
  const wrapper = document.createElement('div');
  wrapper.classList.add('cards-wrapper');

  const row = document.createElement('div');
  row.classList.add('row');

  // Create each card
  cards.forEach((card) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');

    // Image with link
    if (card.image) {
      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('card-image-wrapper');
      
      if (card.url) {
        const link = document.createElement('a');
        link.href = card.url;
        link.classList.add('card-image-link');
        
        const img = document.createElement('img');
        img.classList.add('card-img-top');
        img.alt = card.title || 'Card image';
        img.src = card.image;
        
        link.appendChild(img);
        imageWrapper.appendChild(link);
      } else {
        const img = document.createElement('img');
        img.classList.add('card-img-top');
        img.alt = card.title || 'Card image';
        img.src = card.image;
        imageWrapper.appendChild(img);
      }
      
      cardElement.appendChild(imageWrapper);
    }

    // Card Body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    // Title
    if (card.title) {
      const title = document.createElement('h5');
      title.classList.add('card-title');
      title.textContent = card.title;
      cardBody.appendChild(title);
    }

    // Description
    if (card.description) {
      const description = document.createElement('p');
      description.classList.add('card-text');
      description.textContent = card.description;
      cardBody.appendChild(description);
    }

    cardElement.appendChild(cardBody);
    row.appendChild(cardElement);
  });

  wrapper.appendChild(row);
  block.replaceWith(wrapper);
}
