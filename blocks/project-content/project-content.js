export default function decorate(block) {
  const rows = [...block.children];
  const content = {
    title: rows[0]?.children[0]?.textContent?.trim() || '',
    text: rows[0]?.children[1]?.textContent?.trim() || '',
  };

  const projectContent = document.createElement('div');
  projectContent.classList.add('project-content');

  if (content.title) {
    const title = document.createElement('h2');
    title.classList.add('project-content-title');
    title.textContent = content.title;
    projectContent.appendChild(title);
  }

  if (content.text) {
    const text = document.createElement('p');
    text.classList.add('project-content-text');
    text.textContent = content.text;
    projectContent.appendChild(text);
  }

  block.replaceWith(projectContent);
}
