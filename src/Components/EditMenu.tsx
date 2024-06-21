import React from 'react';

const EditMenu = ({ closeMenu }) => (
    <div className="edit-menu">
        <ul>
            <li onClick={closeMenu}>Cut</li>
            <li onClick={closeMenu}>Copy</li>
            <li onClick={closeMenu}>Delete</li>
            <li onClick={closeMenu}>Find</li>
        </ul>
    </div>
);

export default EditMenu;

