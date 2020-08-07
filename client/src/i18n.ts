import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    ns: [
      "actions",
      "common",
      "dashboard",
      "entity",
      "events",
      "fields",
      "home",
      "modals",
      "sign-in",
      "validation",
      "voices",
    ],
    defaultNS: "common",
    backend: {
      allowMultiLoading: true,
    },
    fallbackLng: {
      "ca-ES": ["ca"],
      default: ["ca"],
    },
    debug: true,
  });

export default i18n;
