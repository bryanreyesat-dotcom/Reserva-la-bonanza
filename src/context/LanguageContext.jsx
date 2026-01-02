import React, { createContext, useState, useContext } from 'react';
import { translations } from '../components/data/translations'; // <--- IMPORTAMOS AQUÍ

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es');

  const switchLanguage = (langCode) => {
    if (translations[langCode]) {
      setLanguage(langCode);
    }
  };

  const t = (path) => {
    const keys = path.split('.');
    let value = translations[language];
    
    for (let key of keys) {
      if (value && value[key]) {
        value = value[key];
      } else {
        console.warn(`Translation missing for: ${path}`); // Log para depurar
        return path; 
      }
    }
    
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage debe ser usado dentro de un LanguageProvider');
  }
  return context;
};