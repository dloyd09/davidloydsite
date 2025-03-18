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

  // Add profile image
  if (content.profileImage) {
    const profileWrapper = document.createElement('div');
    profileWrapper.classList.add('profile-wrapper');

    const img = document.createElement('img');
    img.classList.add('profile-image');
    img.src = content.profileImage;
    img.alt = 'Profile Image';
    profileWrapper.appendChild(img);

    jumbotron.appendChild(profileWrapper);
  }

  // Add dynamic text
  if (content.dynamictext.length > 0) {
    const dynamicTextWrapper = document.createElement('div');
    dynamicTextWrapper.classList.add('dynamic-text-wrapper');

    const dynamicText = document.createElement('span');
    dynamicText.classList.add('dynamic-text');
    dynamicTextWrapper.appendChild(dynamicText);

    jumbotron.appendChild(dynamicTextWrapper);

    let currentIndex = 0;
    let isDeleting = false;

    const animateText = async () => {
      const currentWord = content.dynamictext[currentIndex];
      const currentLength = dynamicText.textContent.length;

      if (isDeleting) {
        dynamicText.textContent = currentWord.substring(0, currentLength - 1);
        if (currentLength === 0) {
          isDeleting = false;
          currentIndex = (currentIndex + 1) % content.dynamictext.length;
          setTimeout(() => {}, 200);
        }
      } else {
        dynamicText.textContent = currentWord.substring(0, currentLength + 1);
        if (currentLength === currentWord.length) {
          isDeleting = true;
          setTimeout(() => {}, 1000);
        }
      }

      requestAnimationFrame(() => animateText());
    };

    animateText();
  }

  block.replaceWith(jumbotron);
}
