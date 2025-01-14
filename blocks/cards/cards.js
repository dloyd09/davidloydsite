export default function decorate(block) {
  const rows = [...block.children]; // Get all rows in the block table
  const cards = [];

  // Parse the table rows into a structured data array
  rows.forEach((row) => {
    const cells = [...row.children];
    const card = {
      // text: cells[0]?.textContent?.trim() || '',
      text: cells[1]?.textContent?.trim() || '',
      image: cells[0]?.querySelector('img')?.getAttribute('src') || null,
    };
    cards.push(card);
  });

  // Build the card grid structure
  const container = document.createElement('div');
  container.classList.add('container');

  const row = document.createElement('div');
  row.classList.add('row');

  // Create each card
  cards.forEach((card) => {
    const col = document.createElement('div');
    col.classList.add('col-md-4');

    const cardElement = document.createElement('div');
    cardElement.classList.add('card', 'mb-4', 'box-shadow');

    // Image
    if (card.image) {
      const img = document.createElement('img');
      img.classList.add('card-img-top');
      img.alt = 'Thumbnail';
      img.src = card.image;
      cardElement.appendChild(img);
    }

    // Card Body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    // Text
    if (card.text) {
      const cardText = document.createElement('p');
      cardText.classList.add('card-text');
      cardText.textContent = card.text;
      cardBody.appendChild(cardText);
    }

    // Footer
    // const cardFooter = document.createElement('div');
    // cardFooter.classList.add('d-flex', 'justify-content-between', 'align-items-center');

    //// Buttons
    //  const btnGroup = document.createElement('div');
    //  btnGroup.classList.add('btn-group');

    //  const viewBtn = document.createElement('button');
    //  viewBtn.type = 'button';
    //  viewBtn.classList.add('btn', 'btn-sm', 'btn-outline-secondary');
    //  viewBtn.textContent = 'View';
  
    //  const editBtn = document.createElement('button');
    //  editBtn.type = 'button';
    //  editBtn.classList.add('btn', 'btn-sm', 'btn-outline-secondary');
    //  editBtn.textContent = 'Edit';
  
    //  btnGroup.appendChild(viewBtn);
    //  btnGroup.appendChild(editBtn);
    //  cardFooter.appendChild(btnGroup);
  
    //   Time
    //  if (card.time) {
    //    const smallText = document.createElement('small');
    //    smallText.classList.add('text-muted');
    //    smallText.textContent = card.time;
    //    cardFooter.appendChild(smallText);
    //  }
  
    //  cardBody.appendChild(cardFooter);
    cardElement.appendChild(cardBody);
    col.appendChild(cardElement);
    row.appendChild(col);
  });

  container.appendChild(row);

  // Replace block content with the generated cards
  block.replaceWith(container);
}
