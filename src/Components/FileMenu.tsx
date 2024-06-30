import React, {useRef} from "react";
import smalltalk from 'smalltalk';
import {useTranslation} from 'react-i18next';

const FileMenuCookies = (t: any) => {
    smalltalk
        .prompt('JDoodle cookies', t('cookiePrompt'), window.localStorage["compileCookie"])
        .then((value) => {
            if (value.trim().length == 0)
                smalltalk.alert(t("cookieErrorTitle"), t("cookieError"));
            else
                window.localStorage["compileCookie"] = value.trim();
        })
        .catch();
}

// enter localisation lat and long and set it to local storage
// Input format: (-?)xx.y+,(-?)yy.y+
const FileMenuLocalisation = (t: any, setLat: React.Dispatch<React.SetStateAction<string>>, setLong: React.Dispatch<React.SetStateAction<string>>) => {
    smalltalk
        .prompt('', t('localisationPrompt'), window.localStorage["localisation"])
        .then((value) => {
            if (value.trim().length == 0)
                smalltalk.alert(t("localisationErrorTitle"), t("localisationError"));
            else {
                // using regex to check if the input is correct 
                const regex = /^ *(-?\d{1,2}\.\d+) *, *(-?\d{1,2}\.\d+) *$/;
                const match = value.match(regex);
                let lat = null;
                let long = null;
                if (match) {
                    lat = match[1];
                    long = match[2];
                }
                if (lat && long) {
                    console.log("Setting lat and long to", lat, long)
                } else {
                    smalltalk.alert(t("localisationErrorTitle"), t("localisationError"));
                    lat = "48.132022";
                    long = "-1.621433";
                }
                setLat(lat);
                setLong(long);
            }
        })
}

const FileMenuExit = () => {
    // @ts-ignore
    window.electron.exitApp();
};

const FileMenu = ({onSaveClick, setRootPath, loadFile, clearTabs, setLat, setLong}: any) => {
    const {t} = useTranslation();
    const openProjectRef = useRef(null);
    const openFileRef = useRef(null);


    const handleOpenProject = async () => {
        if (openProjectRef.current.files.length == 0)
            return;
        const firstFile: string = openProjectRef.current.files[0].path;
        // @ts-ignore
        const absDir: string = await window.electron.dirName(firstFile);
        setRootPath(absDir);
        clearTabs();
    }

    const handleOpenFile = () => {
        if (openFileRef.current.files.length == 0)
            return;

        const file = openFileRef.current.files[0];
        loadFile(file.path, file.name);
    }



    return (
        <div className="top-menu" id="file-menu">
            <ul>
                <input ref={openProjectRef} type="file" hidden
                       onChange={handleOpenProject} {...({webkitdirectory: "true"} as React.InputHTMLAttributes<HTMLInputElement>)} />
                <input ref={openFileRef} type="file" hidden onChange={handleOpenFile}/>
                <li onClick={() => openProjectRef.current.click()}>{t('openProject')}</li>
                <li onClick={() => openFileRef.current.click()}>{t('openFile')}</li>
                <li onClick={onSaveClick}>{t('saveFile')}</li>
                <li onClick={() => FileMenuLocalisation(t, setLat, setLong)}>{t('localisationM')}</li>
                <li onClick={FileMenuExit}>{t('quit')}</li>
            </ul>
        </div>
    )
};

export default FileMenu;

