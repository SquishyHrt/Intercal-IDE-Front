import { useState, useEffect, useRef, MutableRefObject } from 'react';
import { getFileContent, saveFile } from '@/Utils/utils';

import BasicTree from "Components/FileTree.tsx";
import FileMenu from "Components/FileMenu.js";
import EditMenu from "Components/EditMenu.js";
import ViewMenu from "Components/ViewMenu.js";
import HelpMenu from "Components/HelpMenu.js";
import TabInfoBox from "Components/TabInfoBox.tsx";
import DarkOverlay from 'Components/DarkOverlay';
import GetMeteo from "Components/MeteoComp.tsx";
import RunButton from "Components/RunButton.tsx"
import Bleachers from "Components/Bleachers.tsx";
import EditorTabs from 'Components/EditorTabs';
import RandomSoundPlayer from 'Components/randSound';

import "./i18n";
import "react-tabs/style/react-tabs.css";
import "../App.css";

const App = () => {

    window.localStorage["compileCookie"] = "marker_id_65379a42896b9b3785d33e92=948fa098-1d0f-4c07-8b73-5d87f1b739b2; SESSION=169c1312-c8ab-413b-9431-5f45a19aa331; ph_phc_FTWxh3zPvEFoJy4fpLYNTxH0MSaPrUyXBO247WRRw0n_posthog=%7B%22distinct_id%22%3A%22019053d9-203e-7e44-9902-d4e6a87942bb%22%2C%22%24sesid%22%3A%5B1719493489705%2C%22019059cc-6a0d-7dc4-9042-d0643398bb7d%22%2C1719493487117%5D%7D";

    const [rootPath, setRootPath] = useState("./");
    const [showOverlay, setShowOverlay] = useState(false);
    const [visibleMenu, setVisibleMenu] = useState(null);
    // MANAGE INFO TAB SELECTION
    const [infoTabIndex, setInfoTabIndex] = useState(0);
    const [compilMsg, setCompilMsg] = useState("");
    // MANAGE FILE TAB SELECTION
    const [fileTabIndex, setFileTabIndex] = useState(0);
    // MANAGE FILE OPENING
    const [openTabs, setOpenTabs] = useState<string[]>([]);
    const [fileContents, setFileContents] = useState({});
    const menuRef: MutableRefObject<undefined> = useRef();

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

    // To manage waiting menu
    const handleOverlayComplete = () => {
        setShowOverlay(false);
    };

    // MANAGE MENUS
    const openMenu = (menu: any) => {
        setVisibleMenu(menu);
    };

    const closeMenu = () => {
        setVisibleMenu(null);
    };

    const onNameClick = async (selectedFileAbsPath: string, selectedFile: string) => {
        const idx = openTabs.indexOf(selectedFile);
        if (idx == -1) {
            const content = await getFileContent(selectedFileAbsPath);
            setOpenTabs([...openTabs, selectedFile]);
            setFileContents({ ...fileContents, [selectedFile]: content });
            setFileTabIndex(openTabs.length);
        } else {
            setFileTabIndex(idx);
        }
    }

    const handleSaveClick = async () => {
        if (openTabs.length == 0)
            return;

        let path = rootPath;
        if (path[path.length - 1] != '/') {
            path += '/';
        }
        path += openTabs[fileTabIndex];
        await saveFile(path, fileContents[openTabs[fileTabIndex]]);
    }

    const handleCloseClick = () => {
        if (openTabs.length == 0)
            return;

        let newOpenTabs = openTabs;
        newOpenTabs.splice(fileTabIndex, 1);
        setOpenTabs(newOpenTabs);
        // Set a new tab index, however the tab component doesn't re-render on button click
        setFileTabIndex(fileTabIndex == 0 ? -1 : fileTabIndex - 1)
    }

    const clearTabs = () => {
        setOpenTabs([]);
        setFileContents({});
        setFileTabIndex(-1);
    };

    // RETURN COMPONENT
    return (
        <div className="container">
            <DarkOverlay show={showOverlay} onComplete={handleOverlayComplete} />
            <GetMeteo>
                <div className="buttons">
                    <div>
                        <button className="button-1 french" onClick={() => openMenu('file')}></button>
                        <button className="button-2 french" onClick={() => openMenu('edit')}></button>
                        <button className="button-3 french" onClick={() => openMenu('view')}></button>
                        <button className="button-4 french" onClick={() => openMenu('help')}></button>
                    </div>

                    <div>
                        <RunButton fileContents={fileContents} fileTabIndex={fileTabIndex}
                            setInfoTabIndex={setInfoTabIndex} openTabs={openTabs} setCompilMsg={setCompilMsg} blockScreen={setShowOverlay} />
                        <button id="button-save" onClick={handleSaveClick}></button>
                        <button id="button-close" onClick={handleCloseClick}></button>
                    </div>
                </div>
                <div className="bottom-part" ref={menuRef}>
                    {visibleMenu === 'file' && <FileMenu onSaveClick={handleSaveClick} setRootPath={setRootPath} loadFile={onNameClick} clearTabs={clearTabs} />}
                    {visibleMenu === 'edit' && <EditMenu />}
                    {visibleMenu === 'view' && <ViewMenu />}
                    {visibleMenu === 'help' && <HelpMenu />}
                </div>

            </GetMeteo>
            <div className="bottom-container">
                <div className="bottom-box">

                    <BasicTree openTab={onNameClick} rootPath={rootPath} />
                </div>
                <div className="bottom-box" id="editor-box">
                    <EditorTabs openTabs={openTabs} fileContents={fileContents} setFileContents={setFileContents}
                        activeTabIndex={fileTabIndex} setActiveTabIndex={setFileTabIndex} />
                </div>
                <div className="bottom-box">
                    <TabInfoBox activeTabIndex={infoTabIndex} setActiveTabIndex={setInfoTabIndex}
                        compilMsg={compilMsg} />
                </div>
                <div className="bottom-box">
                    <Bleachers />
                    <RandomSoundPlayer />
                </div>
            </div>
        </div>
    );
};

export default App;

