/* =========================================================
   Huella · lógica de la web (vanilla JS)
   - Cambio de idioma ES/EN (lee data-es / data-en del HTML)
   - Menú móvil
   - Formulario de contacto
   No genera HTML: todo el contenido está escrito en index.html
   ========================================================= */

// ---- CONFIG: pega aquí tu endpoint de Formspree (Fase 2) ----
// Mientras esté vacío, el formulario funciona en "modo demo"
// (muestra el mensaje de éxito sin enviar nada).
const FORMSPREE_ENDPOINT = ""; // ej: "https://formspree.io/f/xxxxxxx"
// -------------------------------------------------------------

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

  // Estado visual del botón de idioma
  document.getElementById("lang-es").classList.toggle("active", lang === "es");
  document.getElementById("lang-en").classList.toggle("active", lang === "en");

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
  document.getElementById("year").textContent = new Date().getFullYear();

  const stored = localStorage.getItem(STORAGE_KEY);
  applyLang(stored === "en" || stored === "es" ? stored : "es");

  document.getElementById("lang-toggle").addEventListener("click", () => {
    applyLang(currentLang === "es" ? "en" : "es");
  });

  setupMenu();
  setupForm();
});
