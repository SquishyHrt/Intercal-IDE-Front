import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

// Import your translation files
import translationRU from './locales/ru/translation.json';
import translationFR from './locales/fr/translation.json';

i18n
    .use(initReactI18next) // Passes i18next instance to react-i18next.
    .init({
        resources: {
            ru: {translation: translationRU},
            fr: {translation: translationFR}
        },
        lng: 'fr', // default language
        fallbackLng: 'ru', // use en if detected lng is not available

        interpolation: {
            escapeValue: false // React already safes from XSS
        }
    });

export default i18n;
