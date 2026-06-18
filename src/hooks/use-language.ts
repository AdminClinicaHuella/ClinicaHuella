import { useEffect, useState } from "react";
import { translations, type Lang } from "@/lib/translations";

const KEY = "huella-lang";

export function useLanguage() {
  const [lang, setLang] = useState<Lang>("es");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? (localStorage.getItem(KEY) as Lang | null) : null;
    if (stored === "es" || stored === "en") setLang(stored);
  }, []);

  const change = (l: Lang) => {
    setLang(l);
    if (typeof window !== "undefined") localStorage.setItem(KEY, l);
  };

  const toggle = () => change(lang === "es" ? "en" : "es");

  return { lang, setLang: change, toggle, t: translations[lang] };
}
