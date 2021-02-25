import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import backend from "i18next-electron-fs-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath:
        process.env.NODE_ENV !== "production"
          ? './public/locales/{{lng}}/{{ns}}.json'
          : './resources/locales/{{lng}}/{{ns}}.json', 
      addPath:
        process.env.NODE_ENV !== "production"
          ? './locales/{{lng}}/{{ns}}.missing.json'
          : './resources/locales1/{{lng}}/{{ns}}.missing.json',
      ipcRenderer: window.api.i18nextElectronBackend
    },
    debug: true,
    saveMissing: true,
    saveMissingTo: "current",
    fallbackLng: ["en"],
    lng: "en",
    caches: ['localStorage', 'cookie'],
    ns: "translation"
  });

export default i18n;