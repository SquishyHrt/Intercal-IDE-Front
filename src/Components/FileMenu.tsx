import React from 'react';

const FileMenuNew = () => {
    console.log('New File');
}

const FileMenuOpen = () => {
    console.log('Open File');
}

const FileMenuSave = () => {
    console.log('Save File');
}

const FileMenuExit = () => {
    window.electron.exitApp();
};

const FileMenu = () => {
    return (
        <div className="top-menu" id="file-menu">
            <ul>
                <li onClick={FileMenuNew}>New File</li>
                <li onClick={FileMenuOpen}>Open File</li>
                <li onClick={FileMenuSave}>Save File</li>
                <li onClick={FileMenuExit}>Exit</li>
            </ul>
        </div>
    )
};

export default FileMenu;

