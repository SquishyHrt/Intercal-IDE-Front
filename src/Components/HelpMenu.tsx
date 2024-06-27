import { useTranslation } from 'react-i18next';
import React from 'react';
import aud from "@/assets/doit.mp3";

const HelpMenuHelp = () => {
    console.log('Help');
}

const HelpMenuTipOfTheDay = () => {
    console.log('Tip of the Day');

    const { t } = useTranslation();

    const texts = [
        t('motiv1'),
        t('motiv2'),
        t('motiv3'),
        t('motiv4'),
        t('motiv5'),
        t('motiv6'),
        t('motiv7'),
        t('motiv8'),
        t('motiv9'),
        t('motiv10'),
        t('motiv11'),
        t('motiv12'),
        t('motiv13'),
        t('motiv14'),
        t('motiv15'),
        t('motiv16'),
        t('motiv17'),
        t('motiv18'),
        t('motiv19'),
        t('motiv20'),
        t('motiv21'),
        t('motiv22')
    ];

    const randomText = texts[Math.floor(Math.random() * texts.length)];
    // @ts-ignore
    window.electron.openTips(randomText);
}


function HelpMenu() {

    const { t } = useTranslation();

    const PlayAudio = () => {
        var audio = new Audio(aud);
        audio.play();
    };

    return (
        <div className="top-menu" id="help-menu">
            <ul>
                <li onClick={HelpMenuHelp}>{t('help')}</li>
                <li onClick={HelpMenuTipOfTheDay}>{t('tipDay')}</li>
                <li onClick={PlayAudio}>{t('motivate')}</li>
            </ul>
        </div>
    )
}

export default HelpMenu;

