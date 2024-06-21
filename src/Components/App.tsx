import React, { useState, useEffect, useRef } from 'react';
import '../App.css';
import BasicTree from "Components/FIleTree.tsx";
import AceEdit from "Components/AceEditor.tsx";
import Chat from "Components/Chat.tsx";
import FileMenu from "Components/FileMenu.js";
import EditMenu from "Components/EditMenu.js";
import ViewMenu from "Components/ViewMenu.js";
import HelpMenu from "Components/HelpMenu.js";

const App = () => {
    const [visibleMenu, setVisibleMenu] = useState(null);
    const menuRef = useRef();

    const openMenu = (menu) => {
        setVisibleMenu(menu);
    };

    const closeMenu = () => {
        setVisibleMenu(null);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                closeMenu();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);

    return (
        <div>
            <div className="container">
                <div className="top-box">
                    <div className="top-part">
                        <div className="buttons">
                            <button className="button-1" onClick={() => openMenu('file')}></button>
                            <button className="button-2" onClick={() => openMenu('edit')}></button>
                            <button className="button-3" onClick={() => openMenu('view')}></button>
                            <button className="button-4" onClick={() => openMenu('help')}></button>
                        </div>
                    </div>
                    <div className="bottom-part" ref={menuRef}>
                        {visibleMenu === 'file' && <FileMenu closeMenu={closeMenu} />}
                        {visibleMenu === 'edit' && <EditMenu closeMenu={closeMenu} />}
                        {visibleMenu === 'view' && <ViewMenu closeMenu={closeMenu} />}
                        {visibleMenu === 'help' && <HelpMenu closeMenu={closeMenu} />}
                    </div>
                </div>
                <div className="bottom-container">
                    <div className="bottom-box">
                        <BasicTree />
                    </div>
                    <div className="bottom-box" id="editor-box">
                        <AceEdit />
                    </div>
                    <div className="bottom-box">
                        <Chat />
                    </div>
                    <div className="bottom-box">
                        <button className="bleachers-box"></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;

