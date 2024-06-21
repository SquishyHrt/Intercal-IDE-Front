import React from 'react';

const FileMenu = ({ closeMenu }) => (
    <div className="file-menu">
        <ul>
            <li onClick={closeMenu}>New File</li>
            <li onClick={closeMenu}>Open File</li>
            <li onClick={closeMenu}>Save File</li>
            <li onClick={closeMenu}>Exit</li>
        </ul>
    </div>
);

export default FileMenu;

