import { createMorph } from '/js/vendor/morphicons/dom.js';

const CICLOS = {
  catFriendly: [
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-fish-bone">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M16.69 7.44a6.973 6.973 0 0 0 -1.69 4.56a6.97 6.97 0 0 0 1.699 4.571c1.914 -.684 3.691 -2.183 5.301 -4.565c-1.613 -2.384 -3.394 -3.883 -5.312 -4.565" />
      <path d="M2 9.504a40.73 40.73 0 0 0 2.422 2.504a39.679 39.679 0 0 0 -2.422 2.498" />
      <path d="M18 11v.01" />
      <path d="M4.422 12h10.578" />
      <path d="M7 10v4" />
      <path d="M11 8v8" />
    </svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-yarn">
	    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M7.5 19.794a9 9 0 1 0 9 -15.588a9 9 0 0 0 -9 15.588" />
      <path d="M20.997 12a9 9 0 0 0 -8.997 9" />
      <path d="M9.662 12.778a9 9 0 0 0 -6.643 -.27" />
      <path d="M19.527 7.078a14 14 0 0 0 -12.45 12.458" />
      <path d="M13.503 9.18a14 14 0 0 0 -9.033 -2.097" />
    </svg>`,
  ],
  equipoExperimentado: [
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-clipboard-search">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h4.5m7.5 -10v-4a2 2 0 0 0 -2 -2h-2" />
      <path d="M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2" />
      <path d="M15 18a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      <path d="M20.2 20.2l1.8 1.8" />
    </svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-certificate">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 15a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      <path d="M13 17.5v4.5l2 -1.5l2 1.5v-4.5" />
      <path d="M10 19h-5a2 2 0 0 1 -2 -2v-10c0 -1.1 .9 -2 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -1 1.73" />
      <path d="M6 9l12 0" />
      <path d="M6 12l3 0" />
      <path d="M6 15l2 0" />
    </svg>`,
  ],
  equipoModerno: [
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-device-desktop-analytics">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 5a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1l0 -10" />
      <path d="M7 20h10" />
      <path d="M9 16v4" />
      <path d="M15 16v4" />
      <path d="M9 12v-4" />
      <path d="M12 12v-1" />
      <path d="M15 12v-2" />
      <path d="M12 12v-1" />
    </svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-stars">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M17.8 19.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138" />
      <path d="M6.2 19.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138" />
      <path d="M12 9.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138" />
    </svg>`,
  ],
  tratoConAmor: [
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-mood-wink-2">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 21a9 9 0 1 1 0 -18a9 9 0 0 1 0 18" />
      <path d="M9 10h-.01" />
      <path d="M14.5 15a3.5 3.5 0 0 1 -5 0" />
      <path d="M15.5 8.5l-1.5 1.5l1.5 1.5" />
    </svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-user-heart">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
      <path d="M6 21v-2a4 4 0 0 1 4 -4h.5" />
      <path d="M18 22l3.35 -3.284a2.143 2.143 0 0 0 .005 -3.071a2.242 2.242 0 0 0 -3.129 -.006l-.224 .22l-.223 -.22a2.242 2.242 0 0 0 -3.128 -.006a2.143 2.143 0 0 0 -.006 3.071l3.355 3.296" />
    </svg>`,
  ],
};

const INTERVALO_MS = 2000;
const MUELLE = 'smooth';
const VISIBILIDAD_MINIMA = 0.2;
const RECUADRO_VACIO = 'M0 0h24v24H0z';

function aRutaSvg(entrada) {
  if (typeof entrada !== 'string') return null;

  const texto = entrada.trim();
  if (/^[Mm][\s\d.,-]/.test(texto)) return texto;

  const rutas = [...texto.matchAll(/\sd="([^"]+)"/g)]
    .map((coincidencia) => coincidencia[1].trim())
    .filter((d) => d && d !== RECUADRO_VACIO);

  return rutas.length > 0 ? rutas.join(' ') : null;
}

function iniciarIconosMorfables() {
  const rejilla = document.querySelector('.why-grid');
  if (!rejilla) return;

  const animables = [];

  for (const contenedor of rejilla.querySelectorAll('[data-morph]')) {
    const clave = contenedor.dataset.morph;
    const ruta = contenedor.querySelector('path');
    const adicionales = CICLOS[clave];

    if (!ruta || !adicionales) continue;

    const secuencia = [ruta.getAttribute('d'), ...adicionales].map(aRutaSvg);
    const fallo = secuencia.indexOf(null);

    if (fallo !== -1) {
      if (!String(adicionales[fallo - 1]).startsWith('SUSTITUIR')) {
        console.warn(`why-icons: "${clave}" tiene un icono no válido en la posición ${fallo + 1}. Pega el SVG completo o su atributo d, y usa iconos de trazo (no rellenos).`);
      }
      continue;
    }

    try {
      animables.push({ morph: createMorph(ruta, secuencia[0]), secuencia });
    } catch (error) {
      console.warn(`why-icons: "${clave}" no se pudo preparar — ${error.message}`);
    }
  }

  if (animables.length === 0) return;

  let paso = 0;
  let temporizador = null;
  let enPantalla = false;

  const avanzar = () => {
    paso += 1;
    for (const { morph, secuencia } of animables) {
      morph.morphTo(secuencia[paso % secuencia.length], MUELLE);
    }
  };

  const sincronizar = () => {
    const debeAnimar = enPantalla && !document.hidden;
    if (debeAnimar && temporizador === null) {
      temporizador = setInterval(avanzar, INTERVALO_MS);
    } else if (!debeAnimar && temporizador !== null) {
      clearInterval(temporizador);
      temporizador = null;
    }
  };

  new IntersectionObserver(
    ([entrada]) => {
      enPantalla = entrada.isIntersecting;
      sincronizar();
    },
    { threshold: VISIBILIDAD_MINIMA },
  ).observe(rejilla);

  document.addEventListener('visibilitychange', sincronizar);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', iniciarIconosMorfables);
} else {
  iniciarIconosMorfables();
}
