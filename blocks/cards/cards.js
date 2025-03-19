export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('cards-wrapper');

  const row = document.createElement('div');
  row.classList.add('row');

  [...block.children].forEach((card) => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');

    const img = card.querySelector('img');
    const url = card.children[3]?.textContent?.trim() || '#';
    const title = card.children[1]?.textContent?.trim() || '';
    const description = card.children[2]?.textContent?.trim() || '';

    if (img) {
      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('card-image-wrapper');

      const imageLink = document.createElement('a');
      imageLink.classList.add('card-image-link');
      imageLink.href = url;

      const cardImage = document.createElement('img');
      cardImage.classList.add('card-img-top');
      cardImage.src = img.src;
      cardImage.alt = img.alt || 'Card image';

      imageLink.appendChild(cardImage);
      imageWrapper.appendChild(imageLink);
      cardDiv.appendChild(imageWrapper);
    }

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    if (title) {
      const titleElement = document.createElement('h3');
      titleElement.classList.add('card-title');
      titleElement.textContent = title;
      const titleLink = document.createElement('a');
      titleLink.href = url;
      titleLink.appendChild(titleElement);
      cardBody.appendChild(titleLink);
    }

    if (description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.classList.add('card-text');
      descriptionElement.textContent = description;
      cardBody.appendChild(descriptionElement);
    }

    cardDiv.appendChild(cardBody);
    row.appendChild(cardDiv);
  });

  wrapper.appendChild(row);
  block.replaceWith(wrapper);
}
