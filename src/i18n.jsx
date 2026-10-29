import { useEffect, useState } from 'react';
import { content } from './data';
import { LangContext } from './lang';

function initialLang() {
  try {
    const saved = localStorage.getItem('lang');
    if (saved === 'es' || saved === 'en') return saved;
  } catch {
    // sin acceso a localStorage (modo privado, etc.)
  }
  return navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'es';
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang);
  const t = content[lang];

  useEffect(() => {
    document.documentElement.lang = t.meta.lang;
    document.title = t.meta.title;
    try {
      localStorage.setItem('lang', lang);
    } catch {
      // ignorar
    }
  }, [lang, t]);

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}
