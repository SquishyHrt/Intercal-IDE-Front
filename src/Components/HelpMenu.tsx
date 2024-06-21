import React from 'react';

const HelpMenu = ({ closeMenu }) => (
    <div className="help-menu">
        <ul>
            <li onClick={closeMenu}>Help</li>
            <li onClick={closeMenu}>Tip of the Day</li>
        </ul>
    </div>
);

export default HelpMenu;

