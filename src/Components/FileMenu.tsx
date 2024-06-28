import { useRef } from "react";
import smalltalk from 'smalltalk';
import { useTranslation } from 'react-i18next';

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

const FileMenuExit = () => {
    // @ts-ignore
    window.electron.exitApp();
};

const FileMenu = ({ onSaveClick, setRootPath, loadFile, clearTabs }: any) => {
    const { t } = useTranslation();

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
                <input ref={openProjectRef} type="file" hidden onChange={handleOpenProject} {...({ webkitdirectory: "true" } as React.InputHTMLAttributes<HTMLInputElement>)} />
                <input ref={openFileRef} type="file" hidden onChange={handleOpenFile} />
                <li onClick={() => openProjectRef.current.click()}>{t('openProject')}</li>
                <li onClick={() => openFileRef.current.click()}>{t('openFile')}</li>
                <li onClick={onSaveClick}>{t('saveFile')}</li>
                <li onClick={() => FileMenuCookies(t)}>{t('cookieMenu')}</li>
                <li onClick={FileMenuExit}>{t('quit')}</li>
            </ul>
        </div >
    )
};

export default FileMenu;

