import React, {useState, useEffect, useRef} from 'react';
import '../App.css';
import BasicTree from "Components/FileTree.tsx";
import FileMenu from "Components/FileMenu.js";
import EditMenu from "Components/EditMenu.js";
import ViewMenu from "Components/ViewMenu.js";
import HelpMenu from "Components/HelpMenu.js";
import TabInfoBox from "Components/TabInfoBox.tsx";
import MonacoEditor from './MonacoEditor';
import 'react-tabs/style/react-tabs.css';

const App = () => {
    const [visibleMenu, setVisibleMenu] = useState(null);
    const menuRef: React.MutableRefObject<undefined> = useRef();

    const openMenu = (menu: any) => {
        setVisibleMenu(menu);
    };

    const closeMenu = () => {
        setVisibleMenu(null);
    };

    useEffect(() => {
        const handleClickOutside = (event: any) => {
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
        <body>
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
                    {visibleMenu === 'file' && <FileMenu/>}
                    {visibleMenu === 'edit' && <EditMenu/>}
                    {visibleMenu === 'view' && <ViewMenu/>}
                    {visibleMenu === 'help' && <HelpMenu/>}
                </div>
            </div>
            <div className="bottom-container">
                <div className="bottom-box">
                    <BasicTree/>
                </div>
                <div className="bottom-box" id="editor-box">
                    <MonacoEditor/>
                </div>
                <div className="bottom-box">
                    <TabInfoBox/>
                </div>
                <div className="bottom-box">
                    <button className="bleachers-box"></button>
                </div>
            </div>
        </div>
        </body>
    );
};

export default App;

