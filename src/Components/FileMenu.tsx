import { useRef } from "react";

const FileMenuCookies = () => {
    console.log('Add cookies');
}

const FileMenuExit = () => {
    // @ts-ignore
    window.electron.exitApp();
};

const FileMenu = ({ onSaveClick, setRootPath, loadFile, clearTabs }: any) => {
    const openProjectRef = useRef();
    const openFileRef = useRef();

    const handleOpenProject = () => {
        if (openProjectRef.current.files.length == 0)
            return;
        const firstFile: string = openProjectRef.current.files[0].path;
        const absDir: string = firstFile.slice(0, firstFile.lastIndexOf('/'));
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
                <input ref={openProjectRef} type="file" hidden webkitdirectory="true" onChange={handleOpenProject} />
                <input ref={openFileRef} type="file" hidden onChange={handleOpenFile} />
                <li onClick={() => openProjectRef.current.click()}>Open Project</li>
                <li onClick={() => openFileRef.current.click()}>Open File</li>
                <li onClick={onSaveClick}>Save File</li>
                <li onClick={FileMenuCookies}>Compilation cookies</li>
                <li onClick={FileMenuExit}>Exit</li>
            </ul>
        </div >
    )
};

export default FileMenu;

