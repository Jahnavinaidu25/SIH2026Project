import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppLanguage } from '../types';
import { translations, Translations, getTranslation } from '../translations';

export type TextSizeLevel = 'sm' | 'base' | 'lg' | 'xl';

interface LanguageContextType {
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  t: Translations;
  isLanguageModalOpen: boolean;
  openLanguageModal: () => void;
  closeLanguageModal: () => void;
  textSize: TextSizeLevel;
  setTextSize: (size: TextSizeLevel) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{
  children: React.ReactNode;
  initialLanguage?: AppLanguage;
  onLanguageChange?: (lang: AppLanguage) => void;
}> = ({ children, initialLanguage = 'en', onLanguageChange }) => {
  const [language, setLanguageState] = useState<AppLanguage>(() => {
    const saved = localStorage.getItem('craftbridge_language') as AppLanguage;
    if (saved && ['en', 'hi', 'te', 'ta', 'kn', 'ml'].includes(saved)) {
      return saved;
    }
    return initialLanguage;
  });

  const [textSize, setTextSizeState] = useState<TextSizeLevel>(() => {
    const saved = localStorage.getItem('craftbridge_textsize') as TextSizeLevel;
    if (saved && ['sm', 'base', 'lg', 'xl'].includes(saved)) {
      return saved;
    }
    return 'base';
  });

  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  const setLanguage = (lang: AppLanguage) => {
    setLanguageState(lang);
    localStorage.setItem('craftbridge_language', lang);
    onLanguageChange?.(lang);
  };

  const setTextSize = (size: TextSizeLevel) => {
    setTextSizeState(size);
    localStorage.setItem('craftbridge_textsize', size);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (textSize === 'sm') {
      root.style.fontSize = '14px';
    } else if (textSize === 'base') {
      root.style.fontSize = '16px';
    } else if (textSize === 'lg') {
      root.style.fontSize = '18.5px';
    } else if (textSize === 'xl') {
      root.style.fontSize = '21.5px';
    }
  }, [textSize]);

  const openLanguageModal = () => setIsLanguageModalOpen(true);
  const closeLanguageModal = () => setIsLanguageModalOpen(false);

  const t = getTranslation(language);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        isLanguageModalOpen,
        openLanguageModal,
        closeLanguageModal,
        textSize,
        setTextSize,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    const fallbackLang: AppLanguage = 'en';
    return {
      language: fallbackLang,
      setLanguage: () => {},
      t: getTranslation(fallbackLang),
      isLanguageModalOpen: false,
      openLanguageModal: () => {},
      closeLanguageModal: () => {},
      textSize: 'base',
      setTextSize: () => {},
    };
  }
  return context;
};
