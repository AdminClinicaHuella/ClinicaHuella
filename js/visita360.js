/* Independent host: no viewer, WebGL or panorama request before activation. */
(() => {
  const section = document.querySelector('[data-tour]');
  if (!section) return;
  const poster = section.querySelector('[data-tour-start]');
  const shell = section.querySelector('[data-tour-shell]');
  const slot = shell.querySelector('[data-tour-slot]');
  const dialog = document.querySelector('[data-tour-dialog]');
  let frame = null;
  let previousOverflow = '';

  function syncExpanded() {
    frame?.contentWindow?.postMessage({
      type: 'huella-tour-expanded',
      expanded: dialog.matches(':modal'),
    }, location.origin);
  }

  function enlarge() {
    if (!frame || dialog.matches(':modal')) return;
    previousOverflow = document.body.style.overflow;
    if (dialog.open) dialog.close();
    dialog.showModal();
    syncExpanded();
    document.body.style.overflow = 'hidden';
    poster.hidden = false;
    frame.focus({ preventScroll: true });
  }

  function minimize() {
    if (!frame || !dialog.matches(':modal')) return;
    dialog.close();
    dialog.show();
    document.body.style.overflow = previousOverflow;
    poster.hidden = true;
    syncExpanded();
    frame.focus({ preventScroll: true });
  }

  function restore() {
    frame?.remove();
    frame = null;
    shell.hidden = true;
    poster.hidden = false;
    poster.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('tour-active');
    document.body.style.overflow = previousOverflow;
    poster.focus({ preventScroll: true });
  }

  function close() {
    if (dialog.open) dialog.close();
    else restore();
  }

  poster.setAttribute('role', 'button');
  poster.setAttribute('aria-expanded', 'false');
  poster.addEventListener('keydown', (event) => {
    if (event.key === ' ') { event.preventDefault(); poster.click(); }
  });
  poster.addEventListener('click', (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (frame) return;
    previousOverflow = document.body.style.overflow;
    frame = document.createElement('iframe');
    frame.title = section.dataset.tourTitle;
    frame.src = poster.href + '?embed=1';
    frame.allow = 'fullscreen';
    frame.referrerPolicy = 'same-origin';
    frame.addEventListener('load', syncExpanded);
    slot.append(frame);
    shell.hidden = false;
    poster.hidden = true;
    poster.setAttribute('aria-expanded', 'true');
    document.body.classList.add('tour-active');
    dialog.show();
    frame.focus({ preventScroll: true });
  });
  dialog.addEventListener('close', () => { if (!dialog.open) restore(); });
  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    minimize();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && frame && !dialog.matches(':modal')) close();
  });
  window.addEventListener('message', (event) => {
    if (event.origin !== location.origin || !frame || event.source !== frame.contentWindow) return;
    if (event.data?.type === 'huella-tour-expand') enlarge();
    if (event.data?.type === 'huella-tour-minimize') minimize();
    if (event.data?.type === 'huella-tour-close') {
      if (dialog.matches(':modal')) minimize();
      else close();
    }
  });
})();
