// Contenido bilingüe de Huella (ES / EN)
const translations = {
  es: {
    nav: { home: "Inicio", services: "Servicios", about: "Sobre nosotros", team: "Equipo", contact: "Contacto", cta: "Pedir Cita" },
    hero: {
      eyebrow: "Huella",
      title: "Cuidamos a tu mejor amigo",
      subtitle: "Atención veterinaria con corazón. Más de 10 años brindando salud, cariño y confianza a tu mascota.",
      cta: "Pedir Cita",
      ctaSecondary: "Nuestros Servicios",
    },
    services: {
      title: "Nuestros Servicios",
      subtitle: "Todo lo que tu mascota necesita, en un solo lugar",
      items: [
        { title: "Consulta General", desc: "Revisiones completas para mantener a tu mascota saludable." },
        { title: "Vacunación", desc: "Plan completo de vacunas para perros, gatos y exóticos." },
        { title: "Cirugía", desc: "Quirófano equipado con tecnología moderna y monitoreo." },
        { title: "Odontología", desc: "Limpieza, extracciones y cuidado dental profesional." },
        { title: "Emergencias 24/7", desc: "Atención urgente cuando más lo necesitas." },
        { title: "Peluquería", desc: "Baño, corte y estética para que luzcan increíbles." },
      ],
    },
    about: {
      title: "Sobre Huella",
      subtitle: "Más que una clínica, una familia",
      body: "En Huella creemos que cada mascota merece el mejor cuidado. Nuestro equipo combina experiencia, tecnología y un trato cercano para que tu compañero peludo se sienta como en casa.",
      values: [
        { title: "Cuidado", desc: "Trato amoroso y respetuoso con cada paciente." },
        { title: "Confianza", desc: "Transparencia en cada diagnóstico y tratamiento." },
        { title: "Experiencia", desc: "Profesionales certificados con años de práctica." },
      ],
    },
    team: {
      title: "Conoce a nuestro equipo",
      subtitle: "Veterinarios apasionados por los animales",
      members: [
        { name: "Víctor Zomeño", role: "Director · Cirujano Veterinario" },
        { name: "Cristina XXXXX", role: "Auxiliar veterinaria" },
        /*{ name: "Dra. Laura Méndez", role: "Dermatología y Felinos" },
        { name: "Dr. Andrés Soto", role: "Emergencias y Cuidados Críticos" },*/
      ],
    },
    why: {
      title: "¿Por qué elegirnos?",
      items: [
        { title: "Emergencias 24/7", desc: "Disponibles cuando nos necesites." },
        { title: "Equipo experimentado", desc: "Veterinarios certificados y empáticos." },
        { title: "Equipo moderno", desc: "Tecnología de última generación." },
        { title: "Trato con amor", desc: "Tu mascota como prioridad." },
      ],
    },
    testimonials: {
      title: "Lo que dicen nuestros clientes",
      items: [
        { quote: "Cuidaron a mi gata como si fuera suya. Profesionales y muy cariñosos.", author: "Ana Pérez" },
        { quote: "La mejor clínica de la ciudad. Salvaron a mi perro en una emergencia.", author: "Luis Martín" },
        { quote: "Atención excepcional, ambiente cálido y precios justos. Súper recomendada.", author: "Sofía Romero" },
      ],
    },
    contact: {
      title: "Contáctanos",
      subtitle: "Estamos aquí para ayudarte",
      name: "Nombre",
      email: "Correo electrónico",
      phone: "Teléfono",
      message: "Mensaje",
      send: "Enviar mensaje",
      sending: "Enviando...",
      sent: "¡Mensaje enviado! Te contactaremos pronto.",
      error: "Hubo un problema al enviar. Inténtalo de nuevo o llámanos.",
      address: "Av. Bautista Soler y Crespo 49, Turís, Valencia, 46389",
      hours: "Lunes – Viernes: 10:00 – 20:00 · Sábados: 10:00 - 14:00",
      hoursLabel: "Horario",
      addressLabel: "Dirección",
      phoneLabel: "Teléfono",
      emailLabel: "Email",
    },
    footer: { tagline: "Cuidando a tu mejor amigo desde 2026.", links: "Enlaces rápidos", follow: "Síguenos", rights: "Todos los derechos reservados." },
  },









  en: {
    nav: { home: "Home", services: "Services", about: "About us", team: "Team", contact: "Contact", cta: "Book Appointment" },
    hero: {
      eyebrow: "Huella",
      title: "We care for your best friend",
      subtitle: "Veterinary care with heart. Over 10 years providing health, love and trust for your pet.",
      cta: "Book Appointment",
      ctaSecondary: "Our Services",
    },
    services: {
      title: "Our Services",
      subtitle: "Everything your pet needs, in one place",
      items: [
        { title: "General Consultation", desc: "Complete checkups to keep your pet healthy." },
        { title: "Vaccinations", desc: "Full vaccination plans for dogs, cats and exotics." },
        { title: "Surgery", desc: "Modern operating room with full monitoring." },
        { title: "Dental Care", desc: "Cleaning, extractions and professional dental care." },
        { title: "24/7 Emergencies", desc: "Urgent care when you need it most." },
        { title: "Grooming", desc: "Bath, haircut and styling to look amazing." },
      ],
    },
    about: {
      title: "About Huella",
      subtitle: "More than a clinic, a family",
      body: "At Huella we believe every pet deserves the best care. Our team blends experience, technology and a personal touch so your furry friend feels right at home.",
      values: [
        { title: "Care", desc: "Loving, respectful treatment for every patient." },
        { title: "Trust", desc: "Transparency in every diagnosis and treatment." },
        { title: "Experience", desc: "Certified professionals with years of practice." },
      ],
    },
    team: {
      title: "Meet Our Team",
      subtitle: "Veterinarians passionate about animals",
      members: [
        { name: "Víctor Zomeño", role: "Surgeon Veterinary" },
        { name: "Cristina XXXXX", role: "Clinical assistant" },
        /*{ name: "Dr. Laura Méndez", role: "Dermatology & Felines" },
        { name: "Dr. Andrés Soto", role: "Emergency & Critical Care" },*/
      ],
    },
    why: {
      title: "Why choose us?",
      items: [
        { title: "24/7 Emergencies", desc: "Available whenever you need us." },
        { title: "Experienced team", desc: "Certified and empathetic vets." },
        { title: "Modern equipment", desc: "Latest generation technology." },
        { title: "Loving care", desc: "Your pet is our priority." },
      ],
    },
    testimonials: {
      title: "What our families say",
      items: [
        { quote: "They cared for my cat like their own. Professional and so warm.", author: "Ana Pérez" },
        { quote: "Best clinic in town. They saved my dog in an emergency.", author: "Luis Martín" },
        { quote: "Exceptional care, warm atmosphere and fair prices. Highly recommended.", author: "Sofía Romero" },
      ],
    },
    contact: {
      title: "Contact Us",
      subtitle: "We're here to help",
      name: "Name",
      email: "Email",
      phone: "Phone",
      message: "Message",
      send: "Send message",
      sending: "Sending...",
      sent: "Message sent! We'll be in touch soon.",
      error: "Something went wrong. Please try again or call us.",
      address: "Av. Bautista Soler y Crespo 49, Turís, Valencia, 46389",
      hours: "Lunes – Viernes: 10:00 – 20:00 · Sábados: 10:00 - 14:00",
      hoursLabel: "Hours",
      addressLabel: "Address",
      phoneLabel: "Phone",
      emailLabel: "Email",
    },
    footer: { tagline: "Caring for your best friend since 2026.", links: "Quick links", follow: "Follow us", rights: "All rights reserved." },
  },
};
