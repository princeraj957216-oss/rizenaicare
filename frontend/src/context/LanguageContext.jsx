import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../locales/en.json';
import hi from '../locales/hi.json';
import bn from '../locales/bn.json';
import ta from '../locales/ta.json';
import te from '../locales/te.json';
import mr from '../locales/mr.json';

const translations = { en, hi, bn, ta, te, mr };

export const languagesList = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
];

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('rizen_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('rizen_lang', currentLang);
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  const t = (path, fallback = '') => {
    if (!path) return fallback;
    const keys = path.split('.');
    let obj = translations[currentLang] || translations.en;
    for (const key of keys) {
      if (obj && obj[key] !== undefined) {
        obj = obj[key];
      } else {
        // Fallback to English
        let fallbackObj = translations.en;
        for (const fbKey of keys) {
          if (fallbackObj && fallbackObj[fbKey] !== undefined) {
            fallbackObj = fallbackObj[fbKey];
          } else {
            return fallback || path;
          }
        }
        return fallbackObj || fallback || path;
      }
    }
    return obj;
  };

  return (
    <LanguageContext.Provider value={{ currentLang, setLanguage: setCurrentLang, t, languagesList }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
