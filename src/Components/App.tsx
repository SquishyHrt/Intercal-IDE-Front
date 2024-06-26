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
import './i18n'; // For Locales / Language change

import "react-tabs/style/react-tabs.css";
import "../App.css";
import { compileIntercal, getFileContent } from '@/Utils/utils';
import confetti from 'canvas-confetti';

function streamToString(stream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', chunk => chunks.push(chunk));
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
        stream.on('error', reject);
    });
}

const App = () => {
    const handleConfettiClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log("Confetti button clicked!");

        const confettiX = event.clientX;
        const confettiY = event.clientY;

        // Trigger confetti centered at the mouse click position
        confetti({
            particleCount: 40,
            spread: 30,
            origin: {
                x: confettiX / window.innerWidth,
                y: confettiY / window.innerHeight
            }
        });

        // // Play sound
        // const audio = new Audio('/path-to-your-sound-file.mp3');
        // audio.play();
    };

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

    // MANAGE INFO TAB SELECTION
    const [infoTabIndex, setInfoTabIndex] = useState(0);
    const [compilMsg, setCompilMsg] = useState("");

    // MANAGE FILE TAB SELECTION
    const [fileTabIndex, setFileTabIndex] = useState(0);

    // MANAGE FILE OPENING
    const [openTabs, setOpenTabs] = useState<string[]>([]);
    const [fileContents, setFileContents] = useState({});

    const onNameClick = async (selectedFileAbsPath: string, selectedFile: string) => {
        const idx = openTabs.indexOf(selectedFile);
        if (idx == -1) {
            const content = await getFileContent(selectedFileAbsPath);
            setOpenTabs([...openTabs, selectedFile]);
            setFileContents({ ...fileContents, [selectedFile]: content });
            setFileTabIndex(openTabs.length);
        }
        else {
            setFileTabIndex(idx);
        }
    }

    // MANAGE RUN - SAVE - CLOSE BUTTONS
    const handleRunClick = async () => {
        const content = fileContents[openTabs[fileTabIndex]];
        setInfoTabIndex(1);
        try {
            let response = await compileIntercal(content);
            response = JSON.parse(response);
            if (response.output)
                setCompilMsg(response.output);
            else
                setCompilMsg('Error: ' + response);
        }
        catch (error) {
            setCompilMsg('Error during request');
        }
    }

    const handleSaveClick = () => {
        console.log('save');
    }

    const handleCloseClick = () => {
        console.log('close');
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
                        <button id="button-run" onClick={handleRunClick}></button>
                        <button id="button-save" onClick={handleSaveClick}></button>
                        <button id="button-close" onClick={handleCloseClick}></button>
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
                    <EditorTabs openTabs={openTabs} fileContents={fileContents} activeTabIndex={fileTabIndex} setActiveTabIndex={setFileTabIndex} />
                </div>
                <div className="bottom-box">
                    <TabInfoBox activeTabIndex={infoTabIndex} setActiveTabIndex={setInfoTabIndex} compilMsg={compilMsg} />
                </div>
                <div className="bottom-box">
                    <button className="bleachers-box" onClick={handleConfettiClick}></button>
                </div>
            </div >
        </div >
    );
};

export default App;

