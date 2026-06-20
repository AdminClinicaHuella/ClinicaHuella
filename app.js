/* =========================================================
   Huella · lógica de la web (vanilla JS)
   - Cambio de idioma ES/EN (lee data-es / data-en del HTML)
   - Menú móvil
   - Formulario de contacto
   Funciona tanto en index.html como en las subpáginas de /promos.
   Cada parte se ejecuta solo si sus elementos existen en la página.
   ========================================================= */

// ---- CONFIG: endpoint de Formspree ----
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xvznjdvb";
// ----------------------------------------

const STORAGE_KEY = "huella-lang";

// Textos del formulario (los únicos que el JS necesita conocer,
// porque cambian de estado: "Enviando...", "Enviado", error).
const formMessages = {
  es: {
    send: "Enviar mensaje",
    sending: "Enviando...",
    sent: "¡Mensaje enviado! Te contactaremos pronto.",
    error: "Hubo un problema al enviar. Inténtalo de nuevo o llámanos.",
  },
  en: {
    send: "Send message",
    sending: "Sending...",
    sent: "Message sent! We'll be in touch soon.",
    error: "Something went wrong. Please try again or call us.",
  },
};

let currentLang = "es";

/* ---------- Aplicar idioma ---------- */
function applyLang(lang) {
  currentLang = lang;

  // Cada elemento con data-es/data-en muestra el texto del idioma activo
  document.querySelectorAll("[data-es]").forEach((el) => {
    const val = el.getAttribute("data-" + lang);
    if (val !== null) el.textContent = val;
  });

  // Estado visual del botón de idioma (solo si existe)
  const esBtn = document.getElementById("lang-es");
  const enBtn = document.getElementById("lang-en");
  if (esBtn) esBtn.classList.toggle("active", lang === "es");
  if (enBtn) enBtn.classList.toggle("active", lang === "en");

  // Atributo lang del documento
  document.documentElement.lang = lang;

  localStorage.setItem(STORAGE_KEY, lang);
}

/* ---------- Formulario de contacto ---------- */
function setupForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("contact-status");
  const submitBtn = document.getElementById("contact-submit");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const m = formMessages[currentLang];
    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      message: form.message.value.trim(),
    };

    if (!data.name || !data.email || !data.message) return;

    status.hidden = true;
    submitBtn.disabled = true;
    submitBtn.textContent = m.sending;

    try {
      if (FORMSPREE_ENDPOINT) {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Network response not ok");
      } else {
        // Modo demo: sin endpoint configurado todavía
        await new Promise((r) => setTimeout(r, 600));
      }

      form.reset();
      status.textContent = m.sent;
      status.className = "form-status success";
    } catch (err) {
      status.textContent = m.error;
      status.className = "form-status error";
    } finally {
      status.hidden = false;
      submitBtn.disabled = false;
      submitBtn.textContent = m.send;
      setTimeout(() => { status.hidden = true; }, 5000);
    }
  });
}

/* ---------- Menú móvil ---------- */
function setupMenu() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-mobile");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  // Año del footer (solo si existe)
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Idioma: leer guardado y aplicarlo (heredado de la página principal)
  const stored = localStorage.getItem(STORAGE_KEY);
  applyLang(stored === "en" || stored === "es" ? stored : "es");

  // Botón de idioma (solo si existe)
  const langToggle = document.getElementById("lang-toggle");
  if (langToggle) {
    langToggle.addEventListener("click", () => {
      applyLang(currentLang === "es" ? "en" : "es");
    });
  }

  // Menú y formulario solo si están presentes en la página
  if (document.getElementById("menu-toggle")) setupMenu();
  if (document.getElementById("contact-form")) setupForm();
});