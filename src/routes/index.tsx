import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Stethoscope,
  Syringe,
  Scissors,
  Heart,
  Phone,
  Mail,
  MapPin,
  Clock,
  Menu,
  X,
  PawPrint,
  Smile,
  ShieldCheck,
  Sparkles,
  Award,
  Activity,
  Facebook,
  Instagram,
  Twitter,
  Bone,
} from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import heroImg from "@/assets/hero-vet.jpg";
import aboutImg from "@/assets/about-clinic.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Huella · Clínica Veterinaria" },
      { name: "description", content: "Clínica veterinaria Huella · Cuidamos a tu mejor amigo con cariño, experiencia y tecnología. Consultas, vacunas, cirugía y emergencias 24/7." },
      { property: "og:title", content: "Huella · Clínica Veterinaria" },
      { property: "og:description", content: "Cuidamos a tu mejor amigo. Veterinaria con corazón." },
    ],
  }),
  component: Index,
});

function Index() {
  const { lang, toggle, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "#inicio", label: t.nav.home },
    { href: "#servicios", label: t.nav.services },
    { href: "#sobre", label: t.nav.about },
    { href: "#equipo", label: t.nav.team },
    { href: "#contacto", label: t.nav.contact },
  ];

  const serviceIcons = [Stethoscope, Syringe, Activity, Bone, Heart, Scissors];
  const whyIcons = [Phone, Award, Sparkles, Smile];
  const valueIcons = [Heart, ShieldCheck, Award];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-18 items-center justify-between py-3">
            <a href="#inicio" className="flex items-center gap-2 group">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground transition-transform group-hover:scale-105">
                <PawPrint className="h-5 w-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight">Huella</span>
            </a>

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={toggle}
                className="flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold hover:border-primary hover:text-primary transition-colors"
                aria-label="Toggle language"
              >
                <span className={lang === "es" ? "text-primary" : "text-muted-foreground"}>ES</span>
                <span className="text-muted-foreground">/</span>
                <span className={lang === "en" ? "text-primary" : "text-muted-foreground"}>EN</span>
              </button>
              <a
                href="#contacto"
                className="hidden sm:inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] hover:opacity-90 transition-all hover:-translate-y-0.5"
              >
                {t.nav.cta}
              </a>
              <button
                className="lg:hidden grid h-10 w-10 place-items-center rounded-xl hover:bg-secondary"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menu"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
          {menuOpen && (
            <nav className="lg:hidden flex flex-col gap-1 pb-4">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-secondary"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contacto"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-lg bg-primary px-3 py-2.5 text-center text-sm font-semibold text-primary-foreground"
              >
                {t.nav.cta}
              </a>
            </nav>
          )}
        </div>
      </header>

      {/* Hero */}
      <section id="inicio" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cream via-background to-secondary" />
        <div className="absolute -top-24 -right-24 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 -z-10 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold text-secondary-foreground">
                <PawPrint className="h-3.5 w-3.5" /> {t.hero.eyebrow}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]">
                {t.hero.title}
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">{t.hero.subtitle}</p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a href="#contacto" className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] hover:-translate-y-0.5 transition-all">
                  {t.hero.cta}
                </a>
                <a href="#servicios" className="inline-flex items-center rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold hover:border-primary hover:text-primary transition-colors">
                  {t.hero.ctaSecondary}
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/10 rounded-[2.5rem] blur-2xl" />
              <img
                src={heroImg}
                alt="Veterinaria con cachorro"
                width={1536}
                height={1152}
                className="relative rounded-3xl shadow-[var(--shadow-soft)] w-full h-auto object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="servicios" className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader title={t.services.title} subtitle={t.services.subtitle} />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.services.items.map((s, i) => {
              const Icon = serviceIcons[i];
              return (
                <div key={i} className="group rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] hover:-translate-y-1 hover:border-primary/40 transition-all">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="sobre" className="py-20 lg:py-28 bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <img
                src={aboutImg}
                alt="Clínica Huella"
                width={1280}
                height={1024}
                loading="lazy"
                className="rounded-3xl shadow-[var(--shadow-soft)] w-full h-auto object-cover aspect-[5/4]"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider">{t.about.subtitle}</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">{t.about.title}</h2>
              <p className="text-lg text-muted-foreground">{t.about.body}</p>
              <div className="grid sm:grid-cols-3 gap-4 pt-2">
                {t.about.values.map((v, i) => {
                  const Icon = valueIcons[i];
                  return (
                    <div key={i} className="rounded-2xl bg-card p-4 border border-border">
                      <Icon className="h-5 w-5 text-primary" />
                      <p className="mt-2 font-bold text-sm">{v.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{v.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="equipo" className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader title={t.team.title} subtitle={t.team.subtitle} />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.team.members.map((m, i) => (
              <div key={i} className="group rounded-3xl bg-card border border-border overflow-hidden hover:shadow-[var(--shadow-soft)] transition-all">
                <div className="aspect-[4/5] bg-gradient-to-br from-secondary to-warm/40 grid place-items-center">
                  <div className="grid h-24 w-24 place-items-center rounded-full bg-primary/10 text-primary text-3xl font-bold">
                    {m.name.split(" ")[1]?.[0] ?? m.name[0]}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold">{m.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="py-20 lg:py-24 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-center">{t.why.title}</h2>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.why.items.map((w, i) => {
              const Icon = whyIcons[i];
              return (
                <div key={i} className="text-center">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary-foreground/15 backdrop-blur">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-bold">{w.title}</h3>
                  <p className="mt-1 text-sm opacity-80">{w.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader title={t.testimonials.title} />
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {t.testimonials.items.map((tt, i) => (
              <div key={i} className="rounded-3xl bg-card border border-border p-6 shadow-[var(--shadow-card)]">
                <div className="flex gap-0.5 text-accent">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Sparkles key={j} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-muted-foreground italic">&ldquo;{tt.quote}&rdquo;</p>
                <p className="mt-4 font-bold text-sm">— {tt.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <ContactSection t={t} />

      {/* Footer */}
      <footer className="bg-foreground text-background/80 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <div className="flex items-center gap-2">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-primary-foreground">
                  <PawPrint className="h-5 w-5" />
                </div>
                <span className="text-xl font-extrabold text-background">Huella</span>
              </div>
              <p className="mt-4 text-sm max-w-xs">{t.footer.tagline}</p>
            </div>
            <div>
              <p className="font-bold text-background mb-3">{t.footer.links}</p>
              <ul className="space-y-2 text-sm">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="hover:text-primary transition-colors">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-bold text-background mb-3">{t.footer.follow}</p>
              <div className="flex gap-3">
                {[Facebook, Instagram, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="grid h-10 w-10 place-items-center rounded-full bg-background/10 hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-background/10 text-xs text-center">
            © {new Date().getFullYear()} Huella. {t.footer.rights}
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      {subtitle && <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">{subtitle}</p>}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">{title}</h2>
    </div>
  );
}

function ContactSection({ t }: { t: ReturnType<typeof useLanguage>["t"] }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
    setForm({ name: "", email: "", phone: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const info = [
    { Icon: MapPin, label: t.contact.addressLabel, value: t.contact.address },
    { Icon: Phone, label: t.contact.phoneLabel, value: "+34 900 123 456" },
    { Icon: Mail, label: t.contact.emailLabel, value: "hola@huella.vet" },
    { Icon: Clock, label: t.contact.hoursLabel, value: t.contact.hours },
  ];

  return (
    <section id="contacto" className="py-20 lg:py-28 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t.contact.title} subtitle={t.contact.subtitle} />
        <div className="mt-12 grid lg:grid-cols-2 gap-8">
          <div className="rounded-3xl bg-card border border-border p-6 sm:p-8 shadow-[var(--shadow-card)]">
            <div className="space-y-4">
              <Field label={t.contact.name} value={form.name} onChange={update("name")} />
              <Field label={t.contact.email} type="email" value={form.email} onChange={update("email")} />
              <Field label={t.contact.phone} type="tel" value={form.phone} onChange={update("phone")} />
              <div>
                <label className="block text-sm font-semibold mb-1.5">{t.contact.message}</label>
                <textarea
                  value={form.message}
                  onChange={update("message")}
                  rows={4}
                  className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <button
                onClick={handleSend}
                className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] hover:-translate-y-0.5 transition-all"
              >
                {t.contact.send}
              </button>
              {sent && (
                <p className="text-sm text-primary font-semibold text-center">{t.contact.sent}</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {info.map(({ Icon, label, value }, i) => (
                <div key={i} className="rounded-2xl bg-card border border-border p-5">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
                  <p className="mt-1 text-sm font-medium">{value}</p>
                </div>
              ))}
            </div>
            <div className="rounded-3xl overflow-hidden border border-border h-64 bg-gradient-to-br from-secondary via-warm/30 to-accent/40 grid place-items-center">
              <div className="text-center">
                <MapPin className="h-10 w-10 text-primary mx-auto" />
                <p className="mt-2 text-sm font-semibold">{t.contact.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
      />
    </div>
  );
}
