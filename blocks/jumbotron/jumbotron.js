export default function decorate(block) {
  const rows = [...block.children]; // Get all rows in the block table
  const data = {};

  // Parse the table rows into a structured data object
  rows.forEach((row) => {
    const cells = [...row.children];
    const key = cells[0]?.textContent?.trim().toLowerCase(); // Use first cell as key
    const value = cells[1]?.textContent?.trim(); // Use second cell as value (if any)

    if (key === 'profile-image') {
      const img = cells[1]?.querySelector('img'); // Get the image element
      if (img) {
        data[key] = img.getAttribute('src'); // Store the image source
      }
    } else {
      data[key] = value;
    }
  });

  // Build the Jumbotron structure
  const section = document.createElement('section');
  section.classList.add('jumbotron', 'text-center');

  const container = document.createElement('div');
  container.classList.add('container');

  // Title
  if (data.title) {
    const title = document.createElement('h1');
    title.classList.add('jumbotron-heading');
    title.textContent = data.title;
    container.append(title);
  }

  // Text
  if (data.text) {
    const text = document.createElement('p');
    text.classList.add('lead', 'text-muted');
    text.textContent = data.text;
    container.append(text);
  }

  // Profile Image
  if (data['profile-image']) {
    const img = document.createElement('img');
    img.src = data['profile-image'];
    img.alt = 'Profile Image';
    img.classList.add('profile-image');
    container.append(img);
  }

  // Button
  //if (data['button-text']) {
  //  const button = document.createElement('a');
  //  button.href = '#'; // You can update this to a real link
  //  button.classList.add('btn', 'btn-primary', 'my-2');
  //  button.textContent = data['button-text'];
  //  container.append(button);
  //}

  // Append container to section and replace block content
  section.append(container);
  block.replaceWith(section);
}
