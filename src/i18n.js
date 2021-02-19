import i18n from 'i18next';
//import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import XHR from "i18next-xhr-backend";
i18n
  .use(LanguageDetector)
  .use(XHR)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    backend: {
      loadPath:
          process.env.NODE_ENV !== "production"
              ? '/locales/{{lng}}/{{ns}}.json'
              : './locales/{{lng}}/{{ns}}.json'
  },
  });

export default i18n;