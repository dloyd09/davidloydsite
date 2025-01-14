// Add delayed functionality here
// Lazy-load Bootstrap JavaScript
(function loadBootstrapJS() {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js';
  script.crossOrigin = 'anonymous';
  document.body.appendChild(script);

  // Load Font Awesome CSS
  const fontAwesomeLink = document.createElement('link');
  fontAwesomeLink.rel = 'stylesheet';
  fontAwesomeLink.href = 'https://kit.fontawesome.com/0d64d392b4.js';
  fontAwesomeLink.crossOrigin = 'anonymous';
  document.head.appendChild(fontAwesomeLink);
}());
