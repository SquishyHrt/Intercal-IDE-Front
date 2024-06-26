// NOT USED ATM, STILL COOL FOR THE FUNCTIONS
import React from 'react';
import {useTranslation} from 'react-i18next';

function LanguageToggleButton() {
    const {i18n} = useTranslation();

    const toggleLanguage = () => {
        // Check current language and switch to the other
        const newLang = i18n.language === 'fr' ? 'ru' : 'fr';
        i18n.changeLanguage(newLang);
    };

    return (
        <button onClick={toggleLanguage}>
            {i18n.language === 'fr' ? 'РУ' : 'FR'}
        </button>
    );
}

export default LanguageToggleButton;