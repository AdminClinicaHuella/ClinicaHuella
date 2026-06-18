/* =========================================================
   Huella · lógica de la web (vanilla JS)
   ========================================================= */

// ---- CONFIG: pega aquí tu endpoint de Formspree (Fase 2) ----
// Mientras esté vacío, el formulario funciona en "modo demo"
// (muestra el mensaje de éxito sin enviar nada).
const FORMSPREE_ENDPOINT = ""; // ej: "https://formspree.io/f/xxxxxxx"
// -------------------------------------------------------------

const STORAGE_KEY = "huella-lang";

// Iconos SVG inline (sustituyen a lucide-react)
const icons = {
  stethoscope: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 2v2"/><path d="M5 2v2"/><path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"/><path d="M8 15a6 6 0 0 0 6 6 5 5 0 0 0 5-5v-1.7"/><circle cx="20" cy="10" r="2"/></svg>',
  syringe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 2 4 4"/><path d="m17 7 3-3"/><path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5"/><path d="m9 11 4 4"/><path d="m5 19-3 3"/><path d="m14 4 6 6"/></svg>',
  activity: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
  bone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
  scissors: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><path d="M20 4 8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92"/></svg>',
  award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/></svg>',
  sparkles: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>',
  smile: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>',
  mapPin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
};

const serviceIcons = [icons.stethoscope, icons.syringe, icons.activity, icons.bone, icons.heart, icons.scissors];
const whyIcons = [icons.phone, icons.award, icons.sparkles, icons.smile];
const valueIcons = [icons.heart, icons.shield, icons.award];

let currentLang = "es";

/* ---------- Helpers ---------- */
// Devuelve el valor de "a.b.c" dentro de un objeto
function getPath(obj, path) {
  return path.split(".").reduce((o, k) => (o ? o[k] : undefined), obj);
}

/* ---------- Render de secciones dinámicas ---------- */
function renderDynamic(t) {
  // Servicios
  document.getElementById("services-grid").innerHTML = t.services.items
    .map((s, i) => `
      <div class="card">
        <div class="card-icon">${serviceIcons[i]}</div>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
      </div>`).join("");

  // Valores (about)
  document.getElementById("about-values").innerHTML = t.about.values
    .map((v, i) => `
      <div class="value-card">
        ${valueIcons[i]}
        <p class="value-title">${v.title}</p>
        <p class="value-desc">${v.desc}</p>
      </div>`).join("");

  // Equipo
  document.getElementById("team-grid").innerHTML = t.team.members
    .map((m) => {
      const initial = (m.name.split(" ")[1]?.[0]) ?? m.name[0];
      return `
        <div class="team-card">
          <div class="team-photo"><div class="team-avatar">${initial}</div></div>
          <div class="team-info"><h3>${m.name}</h3><p>${m.role}</p></div>
        </div>`;
    }).join("");

  // Why
  document.getElementById("why-grid").innerHTML = t.why.items
    .map((w, i) => `
      <div class="why-item">
        <div class="why-icon">${whyIcons[i]}</div>
        <h3>${w.title}</h3>
        <p>${w.desc}</p>
      </div>`).join("");

  // Testimonios
  const fiveStars = Array.from({ length: 5 }).map(() => icons.sparkles).join("");
  document.getElementById("testimonials-grid").innerHTML = t.testimonials.items
    .map((tt) => `
      <div class="testimonial">
        <div class="stars">${fiveStars}</div>
        <p class="quote">&ldquo;${tt.quote}&rdquo;</p>
        <p class="author">— ${tt.author}</p>
      </div>`).join("");

  // Info de contacto
  const info = [
    { icon: icons.mapPin, label: t.contact.addressLabel, value: t.contact.address },
    { icon: icons.phone, label: t.contact.phoneLabel, value: "+34 900 123 456" },
    { icon: icons.mail, label: t.contact.emailLabel, value: "hola@huella.vet" },
    { icon: icons.clock, label: t.contact.hoursLabel, value: t.contact.hours },
  ];
  document.getElementById("contact-info-grid").innerHTML = info
    .map((it) => `
      <div class="info-card">
        <div class="info-icon">${it.icon}</div>
        <p class="info-label">${it.label}</p>
        <p class="info-value">${it.value}</p>
      </div>`).join("");
}

/* ---------- Aplicar idioma ---------- */
function applyLang(lang) {
  currentLang = lang;
  const t = translations[lang];

  // Texto estático vía data-i18n
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const val = getPath(t, el.getAttribute("data-i18n"));
    if (typeof val === "string") el.textContent = val;
  });

  // Secciones dinámicas
  renderDynamic(t);

  // Estado del botón de idioma
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
    const t = translations[currentLang];
    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      message: form.message.value.trim(),
    };

    if (!data.name || !data.email || !data.message) return;

    status.hidden = true;
    submitBtn.disabled = true;
    submitBtn.textContent = t.contact.sending;

    try {
      if (FORMSPREE_ENDPOINT) {
        // Envío real (Fase 2)
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
      status.textContent = t.contact.sent;
      status.className = "form-status success";
    } catch (err) {
      status.textContent = t.contact.error;
      status.className = "form-status error";
    } finally {
      status.hidden = false;
      submitBtn.disabled = false;
      submitBtn.textContent = t.contact.send;
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
  // Cerrar al hacer clic en un enlace
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
