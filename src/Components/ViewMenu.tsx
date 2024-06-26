import { useTranslation } from 'react-i18next';



const ViewMenuAppearance = () => {
    console.log('Appearance');
}

const ViewMenuSwitchThemes = () => {
    console.log('Switch Themes');
}

function ViewMenu()
{
    const { i18n } = useTranslation();

    // To change buttons classes (For their img)
    const updateButtonClasses = (lang: 'fr' | 'ru') => {
        const buttons = document.querySelectorAll('.buttons button');
        console.log(lang);
        buttons.forEach(button => {
            button.classList.remove('french', 'russian');
            button.classList.add(lang === 'fr' ? 'french' : 'russian');
        });
    };

    const toggleLanguage = () => {
        // Check current language and switch to the other
        console.log("Current language is " + i18n.language);
        console.log("Change in Language");
        const newLang = i18n.language === 'fr' ? 'ru' : 'fr';
        i18n.changeLanguage(newLang);
        // @ts-ignore
        updateButtonClasses(i18n.language);
    }
    return (<div className="top-menu" id="view-menu">
        <ul>
            <li onClick={ViewMenuAppearance}>Appearance</li>
            <li onClick={ViewMenuSwitchThemes}>Switch Themes</li>
            <li onClick={toggleLanguage}>{i18n.language === 'fr' ? 'На русском языке' : 'Passer en Français'}</li>
        </ul>
    </div>);
}

export default ViewMenu;

