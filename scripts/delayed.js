// Add delayed functionality here
// Lazy-load Bootstrap JavaScript
(function loadBootstrapJS() {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js';
  script.integrity = 'sha384-kQtW33rZJAHjgefvhyyzcGF8Tx82fJb5hAKhuXW2iRFoZKUtD3r4LFp2kg53Ugf8';
  script.crossOrigin = 'anonymous';
  document.body.appendChild(script);
}());
