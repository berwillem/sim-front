import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translations from "./translation.json";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: translations,
  defaultNS: "common",
});

export default i18n;
