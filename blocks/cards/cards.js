export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('cards-wrapper');

  const row = document.createElement('div');
  row.classList.add('row');

  [...block.children].forEach((card) => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');

    const img = card.querySelector('img');
    const link = card.querySelector('a');
    const text = card.querySelector('p:not(:first-child)');

    if (img) {
      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('card-image-wrapper');

      const imageLink = document.createElement('a');
      imageLink.classList.add('card-image-link');
      imageLink.href = link ? link.href : '#';

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

    if (link) {
      const title = document.createElement('h3');
      title.classList.add('card-title');
      title.textContent = link.textContent;
      cardBody.appendChild(title);
    }

    if (text) {
      const cardText = document.createElement('p');
      cardText.classList.add('card-text');
      cardText.textContent = text.textContent;
      cardBody.appendChild(cardText);
    }

    cardDiv.appendChild(cardBody);
    row.appendChild(cardDiv);
  });

  wrapper.appendChild(row);
  block.replaceWith(wrapper);
}
