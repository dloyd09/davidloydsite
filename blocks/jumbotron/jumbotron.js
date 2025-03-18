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

      let currentIndex = 0;
      let isDeleting = false;
      let isAnimating = false;
      
      const animateText = async () => {
        if (isAnimating) return;
        isAnimating = true;
        
        const words = data.dynamictext;
        const currentWord = words[currentIndex];
        
        if (!isDeleting) {
          // Set the text content but keep it hidden initially
          dynamicText.textContent = currentWord;
          dynamicText.classList.remove('deleting');
          dynamicText.classList.add('typing');
          
          // Wait for typing animation
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Pause at the end of the word
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          isDeleting = true;
        } else {
          dynamicText.classList.remove('typing');
          dynamicText.classList.add('deleting');
          
          // Wait for delete animation
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Prepare for next word
          currentIndex = (currentIndex + 1) % words.length;
          isDeleting = false;
          
          // Small pause before next word
          await new Promise(resolve => setTimeout(resolve, 200));
        }
        
        isAnimating = false;
        // Schedule next animation
        requestAnimationFrame(animateText);
      };

      // Start the animation
      requestAnimationFrame(animateText);
    }

    container.append(profileWrapper);
  }

  // Append container to section and replace block content
  section.append(container);
  block.replaceWith(section);
}
