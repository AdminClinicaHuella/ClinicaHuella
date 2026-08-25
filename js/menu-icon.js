import { createMorph } from '/js/vendor/morphicons/dom.js';

const MENU = 'M4 6l16 0 M4 12l16 0 M4 18l16 0';
const CERRAR = 'M18 6l-12 12 M6 6l12 12';
const MUELLE = 'snappy';

function iniciarIconoMenu() {
  const boton = document.getElementById('menu-toggle');
  if (!boton) return;

  const ruta = boton.querySelector('path');
  if (!ruta) return;

  let morph;
  try {
    morph = createMorph(ruta, MENU);
  } catch (error) {
    console.warn(`menu-icon: no se pudo preparar — ${error.message}`);
    return;
  }

  let abierto = false;

  const sincronizar = () => {
    const ahora = boton.getAttribute('aria-expanded') === 'true';
    if (ahora === abierto) return;
    abierto = ahora;
    morph.morphTo(abierto ? CERRAR : MENU, MUELLE);
  };

  new MutationObserver(sincronizar).observe(boton, {
    attributes: true,
    attributeFilter: ['aria-expanded'],
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', iniciarIconoMenu);
} else {
  iniciarIconoMenu();
}
