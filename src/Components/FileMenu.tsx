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
    console.log('Exit');
}

const FileMenu = () => (
    <div className="file-menu">
        <ul>
            <li onClick={FileMenuNew}>New File</li>
            <li onClick={FileMenuOpen}>Open File</li>
            <li onClick={FileMenuSave}>Save File</li>
            <li onClick={FileMenuExit}>Exit</li>
        </ul>
    </div>
);

export default FileMenu;

