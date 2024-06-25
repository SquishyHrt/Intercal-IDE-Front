import { useState, useEffect, useRef, MutableRefObject } from 'react';
import '../App.css';
import BasicTree from "Components/FileTree.tsx";
import FileMenu from "Components/FileMenu.js";
import EditMenu from "Components/EditMenu.js";
import ViewMenu from "Components/ViewMenu.js";
import HelpMenu from "Components/HelpMenu.js";
import TabInfoBox from "Components/TabInfoBox.tsx";
import GetMeteo from "Components/MeteoComp.tsx";
import EditorTabs from './EditorTabs';

import "react-tabs/style/react-tabs.css";
import "../App.css";

const App = () => {

    // MANAGE MENUS
    const [visibleMenu, setVisibleMenu] = useState(null);
    const menuRef: MutableRefObject<undefined> = useRef();

    const openMenu = (menu: any) => {
        setVisibleMenu(menu);
    };

    const closeMenu = () => {
        setVisibleMenu(null);
    };

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            // @ts-ignore
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                closeMenu();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);

    // MANAGE FILE OPENING
    const [openTabs, setOpenTabs] = useState<string[]>(['hey.txt', 'hello.txt']);
    const [fileContents, setFileContents] = useState({ 'hey.txt': 'this is a text', 'hello.txt': 'look at that text' });

    const onNameClick = (selectedFileAbsPath: string, selectedFile: string) => {
        const idx = openTabs.indexOf(selectedFile);
        if (idx == -1) {
            setOpenTabs([...openTabs, selectedFile]);
            setFileContents({ ...fileContents, [selectedFile]: 'example text' });
        }
    }

    // RETURN COMPONENT
    return (

        <div className="container">
            <GetMeteo>
                <div className="buttons">
                    <div>
                        <button className="button-1" onClick={() => openMenu('file')}></button>
                        <button className="button-2" onClick={() => openMenu('edit')}></button>
                        <button className="button-3" onClick={() => openMenu('view')}></button>
                        <button className="button-4" onClick={() => openMenu('help')}></button>
                    </div>

                    <div>
                        <button id="button-run"></button>
                        <button id="button-save"></button>
                        <button id="button-close"></button>
                    </div>
                </div>
                <div className="bottom-part" ref={menuRef}>
                    {visibleMenu === 'file' && <FileMenu />}
                    {visibleMenu === 'edit' && <EditMenu />}
                    {visibleMenu === 'view' && <ViewMenu />}
                    {visibleMenu === 'help' && <HelpMenu />}
                </div>
            </GetMeteo>
            <div className="bottom-container">
                <div className="bottom-box">

                    <BasicTree openTab={onNameClick} />
                </div>
                <div className="bottom-box" id="editor-box">
                    <EditorTabs openTabs={openTabs} fileContents={fileContents} />
                </div>
                <div className="bottom-box">
                    <TabInfoBox />
                </div>
                <div className="bottom-box">
                    <button className="bleachers-box"></button>
                </div>
            </div >
        </div >
    );
};

export default App;

