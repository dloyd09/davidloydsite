class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.isDeleting = false;
    // Bind type to this instance to prevent context loss
    this.type = this.type.bind(this);
    this.type();
  }

  type() {
    const current = this.words[this.wordIndex];
    const fullTxt = current;

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    let typeSpeed = 300;
    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      // Use addition instead of increment operator
      this.wordIndex = (this.wordIndex + 1) % this.words.length;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

export default function decorate(block) {
  const rows = [...block.children];

  // Get content from the document structure
  const content = {
    title: [...rows].find((row) => row.children[0]?.textContent?.trim() === 'title')
      ?.children[1]?.textContent?.trim() || '',
    text: [...rows].find((row) => row.children[0]?.textContent?.trim() === 'text')
      ?.children[1]?.textContent?.trim() || '',
    profileImage: [...rows].find((row) => row.children[0]?.textContent?.trim() === 'profile-image')
      ?.children[1]?.querySelector('img')?.getAttribute('src') || '',
    dynamicText: [...rows].find((row) => row.children[0]?.textContent?.trim() === 'dynamicText')
      ?.children[1]?.textContent?.split('\n')
      .map((text) => text.trim())
      .filter((text) => text) || [],
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

  // Add dynamic text
  if (content.dynamicText.length > 0) {
    const dynamicTextWrapper = document.createElement('div');
    dynamicTextWrapper.classList.add('dynamic-text-wrapper');

    const txtType = document.createElement('span');
    txtType.classList.add('txt-type');
    txtType.setAttribute('data-wait', '3000');
    txtType.setAttribute('data-words', JSON.stringify(content.dynamicText));

    dynamicTextWrapper.appendChild(txtType);
    jumbotron.appendChild(dynamicTextWrapper);

    // Initialize typewriter and store on the element to prevent garbage collection
    txtType.typewriter = new TypeWriter(txtType, content.dynamicText, 2000);
  }

  block.replaceWith(jumbotron);
}
