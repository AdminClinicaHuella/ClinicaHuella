(() => {
  const embedded = window.parent !== window && new URLSearchParams(location.search).get('embed') === '1';
  if (!embedded) return;
  document.documentElement.classList.add('tour-embedded');
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (!document.getElementById('roomsPanel').hidden) return;
    window.parent.postMessage({type:'huella-tour-close'}, location.origin);
  }, true);
})();
