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
    } else if (key === 'dynamictext') {
      data[key] = value.split('\n').map((item) => item.trim()); // Split into an array of items
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

  // Profile Wrapper (Profile Image + Dynamic Text)
  if (data['profile-image'] || data.dynamictext?.length) {
    const profileWrapper = document.createElement('div');
    profileWrapper.classList.add('profile-wrapper');

    // Profile Image
    if (data['profile-image']) {
      const img = document.createElement('img');
      img.src = data['profile-image'];
      img.alt = 'Profile Image';
      img.classList.add('profile-image');
      profileWrapper.append(img);
    }

    // Dynamic Text
    if (data.dynamictext && data.dynamictext.length) {
      const dynamicTextWrapper = document.createElement('div');
      dynamicTextWrapper.classList.add('dynamic-text-wrapper');
      const dynamicText = document.createElement('span');
      dynamicText.classList.add('dynamic-text');
      dynamicTextWrapper.append(dynamicText);
      profileWrapper.append(dynamicTextWrapper);

      // JavaScript to handle typing animation
      let index = 0;
      const typeText = () => {
        const currentWord = data.dynamictext[index];
        const wordLength = currentWord.length;

        // Dynamically calculate animation duration and steps
        const animationDuration = wordLength * 0.2; // 0.2s per character

        // reset animation
        dynamicText.style.animation = 'none';
        const height = dynamicText.offsetHeight;
        dynamicText.style.animation = `typing ${animationDuration}s steps(${wordLength}, end), blink 0.5s step-end infinite`;

        // Set the new word
        dynamicText.textContent = currentWord;

        // Increment index for the next word
        index = (index + 1) % data.dynamictext.length;
      };

      typeText();
      setInterval(typeText, 3000); // Change text every 2 seconds
    }

    container.append(profileWrapper);
  }

  // Append container to section and replace block content
  section.append(container);
  block.replaceWith(section);
}
