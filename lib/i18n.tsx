"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Lang, Localized } from "@/data/magnusData";

const STORAGE_KEY = "magnus-lang";
const HTML_LANG: Record<Lang, string> = { sr: "sr-Latn", en: "en" };

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** Vraća tekst na izabranom jeziku */
  t: (value: Localized) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Server uvek renderuje srpski; sačuvani izbor se primenjuje posle hidratacije.
  const [lang, setLangState] = useState<Lang>("sr");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "sr" || stored === "en") setLangState(stored);
    } catch {
      // localStorage nije dostupan (privatni režim) — ostaje podrazumevani jezik.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang];
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Izbor važi do kraja posete.
    }
  }, []);

  const t = useCallback((value: Localized) => value[lang], [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLang mora da se koristi unutar <LanguageProvider>.");
  }
  return context;
}
