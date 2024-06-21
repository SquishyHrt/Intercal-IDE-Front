import React, { useState, useEffect, useRef } from 'react';
import '../App.css';
import BasicTree from "Components/FileTree.tsx";
import AceEdit from "Components/AceEditor.tsx";
import FileMenu from "Components/FileMenu.js";
import EditMenu from "Components/EditMenu.js";
import ViewMenu from "Components/ViewMenu.js";
import HelpMenu from "Components/HelpMenu.js";
import Chat from "Components/Chat.tsx";
import MonacoEditor from './MonacoEditor';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

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
                        <MonacoEditor />
                    </div>
                    <div className="bottom-box">
                        <Tabs id="right-tabs">
                            <TabList>
                                <Tab>IA</Tab>
                                <Tab>Compilation</Tab>
                            </TabList>

                            <TabPanel>
                                <Chat />
                            </TabPanel>
                            <TabPanel>
                                <div id="">
                                    <p>Compilation console</p>
                                </div>
                            </TabPanel>
                        </Tabs>
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

