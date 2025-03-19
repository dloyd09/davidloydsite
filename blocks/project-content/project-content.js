export default function decorate(block) {
  // Get all rows from the block
  const rows = [...block.children];
  
  const projectContent = document.createElement('div');
  projectContent.classList.add('project-content');

  // Skip the header row (project-content) and get content from next row
  if (rows.length > 0) {
    const contentRow = rows[0];  // Get the first row
    if (contentRow && contentRow.children.length > 0) {
      const text = contentRow.children[0].textContent;  // Get text from first column
      
      // Split into paragraphs and create elements
      const paragraphs = text.split('\n').filter(p => p.trim());
      paragraphs.forEach(paragraph => {
        const p = document.createElement('p');
        p.textContent = paragraph.trim();
        projectContent.appendChild(p);
      });
    }
  }

  block.replaceWith(projectContent);
}
