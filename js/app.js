/* =========================================================
   HUELLA · Lógica de la web (JavaScript sin dependencias)

   El sitio es estático y bilingüe por RUTA, no por JavaScript:
     · Español  →  /            /galeria/   /planes/...   /legal/...
     · Inglés   →  /en/         /en/gallery/  /en/plans/...  /en/legal/...
   Cada página es HTML completo en su idioma, así que aquí NO hay
   ninguna lógica de traducción: solo los textos que cambian de
   estado en tiempo de ejecución (el formulario) necesitan idioma,
   y se deduce del atributo lang del <html>.

   Todos los bloques comprueban si sus elementos existen, de modo que
   este mismo fichero puede cargarse en cualquier página del sitio.
   ========================================================= */

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xvznjdvb";

/* Idioma de la página actual, leído del <html lang="..."> */
const LANG = document.documentElement.lang.toLowerCase().startsWith("en") ? "en" : "es";

/* Únicos textos que el JS necesita conocer: los que cambian de estado */
const TEXTS = {
  es: {
    send: "Enviar mensaje",
    sending: "Enviando...",
    sent: "¡Mensaje enviado! Te contactaremos pronto.",
    error: "Hubo un problema al enviar. Inténtalo de nuevo o llámanos.",
    consent: "Debes aceptar la política de privacidad.",
    photo: "Foto",
  },
  en: {
    send: "Send message",
    sending: "Sending...",
    sent: "Message sent! We'll be in touch soon.",
    error: "Something went wrong. Please try again or call us.",
    consent: "You must accept the privacy policy.",
    photo: "Photo",
  },
}[LANG];

/* ---------- Utilidades ---------- */

/* Mantiene el foco dentro de un diálogo abierto (accesibilidad) */
function trapFocus(container, event) {
  if (event.key !== "Tab") return;
  const focusables = container.querySelectorAll(
    'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
  );
  const visible = Array.from(focusables).filter((el) => el.offsetParent !== null);
  if (visible.length === 0) return;

  const first = visible[0];
  const last = visible[visible.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

/* ---------- Menú móvil ---------- */
function setupMenu() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-mobile");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });

  // Al pulsar cualquier enlace, el menú se cierra
  nav.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

/* ---------- Formulario de contacto ---------- */
function setupForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const status = document.getElementById("contact-status");
  const submitBtn = document.getElementById("contact-submit");
  const consent = document.getElementById("f-consent");

  // El botón solo se activa cuando el formulario está completo
  function checkFormValid() {
    const ok =
      form.name.value.trim() &&
      form.email.value.trim() &&
      form.message.value.trim() &&
      (!consent || consent.checked);
    submitBtn.disabled = !ok;
  }

  form.addEventListener("input", checkFormValid);
  form.addEventListener("change", checkFormValid);
  checkFormValid();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      message: form.message.value.trim(),
      // Para saber en qué idioma escribió quien nos contacta
      language: LANG,
    };

    if (!data.name || !data.email || !data.message) return;

    if (consent && !consent.checked) {
      status.textContent = TEXTS.consent;
      status.className = "form-status error";
      status.hidden = false;
      return;
    }

    status.hidden = true;
    submitBtn.disabled = true;
    submitBtn.textContent = TEXTS.sending;

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Network response not ok");

      form.reset();
      status.textContent = TEXTS.sent;
      status.className = "form-status success";
    } catch (err) {
      status.textContent = TEXTS.error;
      status.className = "form-status error";
    } finally {
      status.hidden = false;
      submitBtn.textContent = TEXTS.send;
      checkFormValid();
      setTimeout(() => { status.hidden = true; }, 5000);
    }
  });
}

/* ---------- Carrusel de la portada (flechas + puntos) ---------- */
function setupGallery() {
  const gallery = document.querySelector("[data-gallery]");
  if (!gallery) return;

  const track = gallery.querySelector("[data-gallery-track]");
  const prevBtn = gallery.querySelector("[data-gallery-prev]");
  const nextBtn = gallery.querySelector("[data-gallery-next]");
  const dotsWrap = document.querySelector("[data-gallery-dots]");
  const items = Array.from(track.children);
  let index = 0;
  let lastDotCount = -1;

  // Cuántas fotos se ven a la vez según el ancho (coincide con el CSS: 639 / 900)
  function perView() {
    if (window.innerWidth <= 639) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  }

  function maxIndex() {
    return Math.max(0, items.length - perView());
  }

  function buildDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = "";
    for (let i = 0; i <= maxIndex(); i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "gallery-dot";
      dot.setAttribute("aria-label", TEXTS.photo + " " + (i + 1));
      dot.addEventListener("click", () => { index = i; update(); });
      dotsWrap.appendChild(dot);
    }
  }

  function updateDots() {
    if (!dotsWrap) return;
    Array.from(dotsWrap.children).forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  function update() {
    if (index > maxIndex()) index = maxIndex();

    const dotCount = maxIndex() + 1;
    if (dotCount !== lastDotCount) {
      buildDots();
      lastDotCount = dotCount;
    }

    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const step = items[0].getBoundingClientRect().width + gap;
    track.style.transform = `translateX(${-index * step}px)`;

    prevBtn.disabled = index <= 0;
    nextBtn.disabled = index >= maxIndex();
    updateDots();
  }

  prevBtn.addEventListener("click", () => { index = Math.max(0, index - 1); update(); });
  nextBtn.addEventListener("click", () => { index = Math.min(maxIndex(), index + 1); update(); });

  // Un solo recálculo por ciclo de repintado al redimensionar
  let resizePending = false;
  window.addEventListener("resize", () => {
    if (resizePending) return;
    resizePending = true;
    requestAnimationFrame(() => {
      resizePending = false;
      update();
    });
  });

  update();
}

/* ---------- Lightbox (portada y galería completa) ---------- */
function setupLightbox() {
  const lightbox = document.querySelector("[data-lightbox]");
  const lightboxImg = document.querySelector("[data-lightbox-img]");
  const lightboxClose = document.querySelector("[data-lightbox-close]");
  const prevBtn = document.querySelector("[data-lightbox-prev]");
  const nextBtn = document.querySelector("[data-lightbox-next]");
  const items = Array.from(document.querySelectorAll(".gallery-item, .full-gallery-item"));
  if (!lightbox || !lightboxImg || items.length === 0) return;

  let current = 0;
  let lastFocused = null;

  function show(i) {
    // Navegación circular: después de la última vuelve a la primera, y viceversa
    current = (i + items.length) % items.length;
    const img = items[current].querySelector("img");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
  }

  function openLightbox(i) {
    lastFocused = document.activeElement;
    show(i);
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = "";
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  items.forEach((btn, i) => btn.addEventListener("click", () => openLightbox(i)));

  if (prevBtn) prevBtn.addEventListener("click", () => show(current - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => show(current + 1));

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
    trapFocus(lightbox, e);
  });
}

/* ---------- Mapa de Google bajo consentimiento ----------
   El iframe está dentro de un <template>, que el navegador no descarga:
   hasta que alguien pulsa "Cargar mapa" no hay ninguna petición a Google
   ni cookies de terceros (LSSI art. 22.2 / RGPD).
   La decisión se recuerda en localStorage (no es una cookie y no sale del
   navegador) para no volver a preguntar en cada visita. */
function setupMapConsent() {
  const wrap = document.querySelector("[data-map-embed]");
  if (!wrap) return;

  const template = wrap.querySelector("[data-map-iframe]");
  const loadBtn = wrap.querySelector("[data-map-load]");
  if (!template || !loadBtn) return;

  const STORAGE_KEY = "huella-maps-consent";

  // El modo incógnito de algunos navegadores lanza al tocar localStorage
  function readConsent() {
    try {
      return localStorage.getItem(STORAGE_KEY) === "1";
    } catch (err) {
      return false;
    }
  }

  function saveConsent() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch (err) {
      /* sin almacenamiento disponible: se preguntará en la próxima visita */
    }
  }

  function loadMap() {
    wrap.replaceChildren(template.content.cloneNode(true));
  }

  loadBtn.addEventListener("click", () => {
    saveConsent();
    loadMap();
  });

  if (readConsent()) loadMap();
}

/* ---------- Modal de equipo (biografía extensa) ---------- */
function setupTeamModal() {
  const modal = document.querySelector("[data-team-modal]");
  if (!modal) return;

  const card = modal.querySelector(".team-modal-card");
  const closeBtn = modal.querySelector("[data-team-modal-close]");
  const panels = modal.querySelectorAll("[data-team-panel]");
  const triggers = document.querySelectorAll("[data-team-target]");
  let lastFocused = null;

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const target = trigger.getAttribute("data-team-target");
      panels.forEach((panel) => {
        panel.hidden = panel.getAttribute("data-team-panel") !== target;
      });
      lastFocused = trigger;
      modal.hidden = false;
      document.body.style.overflow = "hidden";
      if (card) card.scrollTop = 0;
      closeBtn.focus();
    });
  });

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (modal.hidden) return;
    if (e.key === "Escape") closeModal();
    trapFocus(modal, e);
  });
}

/* ---------- Aviso de inauguración (temporal) ---------- */
function setupAviso() {
  const aviso = document.querySelector("[data-aviso]");
  if (!aviso) return;

  const STORAGE_KEY = "huella-aviso-inauguracion";
  const cierres = aviso.querySelectorAll("[data-aviso-close]");
  const primerCierre = aviso.querySelector(".aviso-close");

  // Algunos navegadores en modo incógnito lanzan al tocar sessionStorage
  function yaVisto() {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch (e) {
      return false;
    }
  }

  function recordar() {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch (e) {
      /* sin persistencia: se volverá a mostrar, no es grave */
    }
  }

  function cerrar() {
    aviso.hidden = true;
    document.body.style.overflow = "";
    recordar();
  }

  if (yaVisto()) return;

  aviso.hidden = false;
  document.body.style.overflow = "hidden";
  if (primerCierre) primerCierre.focus();

  cierres.forEach((el) => el.addEventListener("click", cerrar));
  aviso.addEventListener("click", (e) => {
    if (e.target === aviso) cerrar();
  });
  document.addEventListener("keydown", (e) => {
    if (aviso.hidden) return;
    if (e.key === "Escape") cerrar();
    trapFocus(aviso, e);
  });
}

/* ---------- Arranque ---------- */
document.addEventListener("DOMContentLoaded", () => {
  // Año del pie de página (el HTML ya trae un año de reserva por si falla el JS)
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  setupMenu();
  setupForm();
  setupGallery();
  setupLightbox();
  setupMapConsent();
  setupTeamModal();
  setupAviso();
});
