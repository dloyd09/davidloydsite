export default function decorate(block) {
  const rows = [...block.children];

  // Get content from the first row
  const content = {
    title: rows[0]?.children[0]?.textContent?.trim() || '',
    text: rows[0]?.children[1]?.textContent?.trim() || '',
    profileImage: rows[0]?.children[2]?.querySelector('img')?.getAttribute('src') || '',
    dynamictext: rows[0]?.children[3]?.textContent?.split(',').map((text) => text.trim()) || [],
  };

  // Create jumbotron structure
  const jumbotron = document.createElement('div');
  jumbotron.classList.add('jumbotron');

  // Add title
  if (content.title) {
    const title = document.createElement('h1');
    title.classList.add('jumbotron-title');
    title.textContent = content.title;
    jumbotron.appendChild(title);
  }

  // Add text
  if (content.text) {
    const text = document.createElement('p');
    text.classList.add('jumbotron-text');
    text.textContent = content.text;
    jumbotron.appendChild(text);
  }

  // Add profile image with rotating border
  if (content.profileImage) {
    const profileWrapper = document.createElement('div');
    profileWrapper.classList.add('profile-wrapper');

    const profileContainer = document.createElement('div');
    profileContainer.classList.add('profile-image-container');

    const img = document.createElement('img');
    img.classList.add('profile-image');
    img.src = content.profileImage;
    img.alt = 'Profile Image';
    
    profileContainer.appendChild(img);
    profileWrapper.appendChild(profileContainer);
    jumbotron.appendChild(profileWrapper);
  }

  // Add dynamic text with typing animation
  if (content.dynamictext.length > 0) {
    const dynamicTextWrapper = document.createElement('div');
    dynamicTextWrapper.classList.add('dynamic-text-wrapper');

    const dynamicText = document.createElement('span');
    dynamicText.classList.add('dynamic-text');
    dynamicTextWrapper.appendChild(dynamicText);

    jumbotron.appendChild(dynamicTextWrapper);

    let currentIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let deletingSpeed = 50;
    let pauseBeforeDelete = 2000;
    let pauseBeforeNextWord = 500;

    const animateText = async () => {
      const currentWord = content.dynamictext[currentIndex];
      const currentLength = dynamicText.textContent.length;

      if (isDeleting) {
        dynamicText.classList.remove('typing');
        dynamicText.classList.add('deleting');
        dynamicText.textContent = currentWord.substring(0, currentLength - 1);
        
        if (currentLength === 0) {
          isDeleting = false;
          dynamicText.classList.remove('deleting');
          currentIndex = (currentIndex + 1) % content.dynamictext.length;
          setTimeout(animateText, pauseBeforeNextWord);
          return;
        }
        
        setTimeout(animateText, deletingSpeed);
      } else {
        dynamicText.classList.add('typing');
        dynamicText.classList.remove('deleting');
        dynamicText.textContent = currentWord.substring(0, currentLength + 1);
        
        if (currentLength === currentWord.length) {
          isDeleting = true;
          setTimeout(animateText, pauseBeforeDelete);
          return;
        }
        
        setTimeout(animateText, typingSpeed);
      }
    };

    // Start the animation
    setTimeout(animateText, 500);
  }

  block.replaceWith(jumbotron);
}
