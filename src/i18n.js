import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import backend from "i18next-electron-fs-backend";

i18n
  .use(backend)
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
    fallbackLng: ["es"],
    lng: "es",
    ns: "translation"
  });

export default i18n;