import { createContext, useContext } from 'react';

export const LangContext = createContext(null);

// Devuelve { lang, setLang, t } donde t son los textos del idioma activo
export const useLang = () => useContext(LangContext);
