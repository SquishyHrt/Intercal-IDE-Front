import React from 'react';

const ViewMenu = ({ closeMenu }) => (
    <div className="view-menu">
        <ul>
            <li onClick={closeMenu}>Appearance</li>
            <li onClick={closeMenu}>Switch Themes</li>
        </ul>
    </div>
);

export default ViewMenu;

