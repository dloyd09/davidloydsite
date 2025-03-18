export default function decorate(block) {
  const content = document.createElement('div');
  content.classList.add('project-content');
  
  // Move all content from the block to the new container
  while (block.firstChild) {
    content.appendChild(block.firstChild);
  }
  
  block.replaceWith(content);
} 