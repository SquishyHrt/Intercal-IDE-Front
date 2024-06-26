import { useState, useEffect, useRef, MutableRefObject } from 'react';
import '../App.css';
import BasicTree from "Components/FileTree.tsx";
import FileMenu from "Components/FileMenu.js";
import EditMenu from "Components/EditMenu.js";
import ViewMenu from "Components/ViewMenu.js";
import HelpMenu from "Components/HelpMenu.js";
import TabInfoBox from "Components/TabInfoBox.tsx";
import DarkOverlay from 'Components/DarkOverlay';
import GetMeteo from "Components/MeteoComp.tsx";
import EditorTabs from './EditorTabs';
import RunButton from "Components/RunButton.tsx"
import './i18n'; // For Locales / Language change

import "react-tabs/style/react-tabs.css";
import "../App.css";
import { compileIntercal, getFileContent, saveFile, fetchArchitecture } from '@/Utils/utils';

import confetti from 'canvas-confetti';
import cheers1 from '../assets/cheers1.mp3';
import cheers2 from '../assets/cheers2.mp3';
import cheers3 from '../assets/cheers3.mp3';
import cheers4 from '../assets/cheers4.mp3';

const App = () => {

    const [rootPath, setRootPath] = useState("./");
    const [cwd, setCwd] = useState('./');
    const [showOverlay, setShowOverlay] = useState(false);

    const [lastClickTime, setLastClickTime] = useState<number | null>(null);
    const [confettiParams, setConfettiParams] = useState({ particleCount: 40, spread: 30 });
    const maxParticleCount = 300;
    const maxSpread = 100;
    const increment = 5;
    const decrement = 30;
    const timeout = 500; // Time in milliseconds to reset confettiParams
    const colors = [["C40C0C", "#FF6500", "FF8A08", "FFC100"], ["FF7F3E", "FFF6E9", "80C4E9", "604CC3"], ["7BD3EA", "A1EEBD", "F6F7C4", "F6D6D6"],
    ["0D1282", "EEEDED", "F0DE36", "D71313"], ["EA047E", "FF6D28", "FCE700", "00F5FF"]];

    useEffect(() => {
        const fetchCwd = async () => {
            try {
                // @ts-ignore
                const currentCwd = await window.electron.getCwd();
                setCwd(currentCwd);
                console.log('CWD:', cwd);

                // These lines should be executed after the cwd is updated
                setRootPath(cwd);
            } catch (error) {
                console.error('Error while fetching CWD:', error);
            }
        };

        fetchCwd();
    }, [cwd]);

    // To manage waiting menu
    const handleButtonClick = () => {
        setShowOverlay(true);
    };

    const handleOverlayComplete = () => {
        setShowOverlay(false);
    };

    // MANAGE CONFETTI
    const handleConfettiClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const now = Date.now();
        
        if (lastClickTime && (now - lastClickTime < timeout)) {
            setConfettiParams(prev => ({
                particleCount: Math.min(prev.particleCount + increment, maxParticleCount),
                spread: Math.min(prev.spread + increment, maxSpread),
            }));
        }

        setLastClickTime(now);

        const confettiX = event.clientX;
        const confettiY = event.clientY;

        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        // Trigger confetti centered at the mouse click position
        confetti({
            particleCount: confettiParams.particleCount,
            spread: confettiParams.spread,
            colors: randomColor,
            origin: {
                x: confettiX / window.innerWidth,
                y: confettiY / window.innerHeight
            }
        });
    };

    useEffect(() => {
        const now = Date.now();
        if (lastClickTime && (now - lastClickTime >= timeout)) {
            const timer = setInterval(() => {
                setConfettiParams(prev => ({
                    particleCount: Math.max(prev.particleCount - decrement, 40),
                    spread: Math.max(prev.spread - decrement, 30),
                }));

                // Stop decreasing if we're back to the initial values
                setConfettiParams(prev => {
                    if (prev.particleCount <= 40 && prev.spread <= 30) {
                        clearInterval(timer);
                    }
                    return prev;
                });
            }, 100); // Decrease every 100ms

            return () => clearInterval(timer);
        }
    }, [lastClickTime]);

    // MANAGE AUDIO
    const handleAudioClick = () => {
        // Check if audio should play (25% chance)
        if (Math.random() < 0.25) {
            // Play sound
            const cheers = [cheers1, cheers2, cheers3, cheers4];
            const randomCheer = cheers[Math.floor(Math.random() * cheers.length)];
        
            // Play random cheering sound
            const audio = new Audio(randomCheer);
            audio.play();
        }
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        handleConfettiClick(event);
        handleAudioClick();
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
    // RUN BUTTON CODE LOGIC IS NOW IN RunButton.tsx !
    /*
    const handleRunClick = async () => {
        if (openTabs.length == 0) {
            setCompilMsg('Open a file to run it');
            return;
        }
        setCompilMsg('Compilation in progress...');
        setInfoTabIndex(1);

        const content = fileContents[openTabs[fileTabIndex]];
        try {
            let response = await compileIntercal(content);
            response = JSON.parse(response);
            if (response.output)
                setCompilMsg(response.output);
            else
                setCompilMsg('Error: ' + response);
        }
        catch (error) {
            setCompilMsg('Error during request. Verify your internet connection.');
        }
    }
    */

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
        if (fileTabIndex == 0)
            setFileTabIndex(-1);
        else
            setFileTabIndex(fileTabIndex - 1);
    }

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
                        <RunButton fileContents={fileContents} fileTabIndex={fileTabIndex} setInfoTabIndex={setInfoTabIndex} openTabs={openTabs} setCompilMsg={setCompilMsg} />
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

                    <BasicTree openTab={onNameClick} rootPath={rootPath} />
                </div>
                <div className="bottom-box" id="editor-box">
                    <EditorTabs openTabs={openTabs} fileContents={fileContents} setFileContents={setFileContents} activeTabIndex={fileTabIndex} setActiveTabIndex={setFileTabIndex} />
                </div>
                <div className="bottom-box">
                    <TabInfoBox activeTabIndex={infoTabIndex} setActiveTabIndex={setInfoTabIndex} compilMsg={compilMsg} />
                </div>
                <div className="bottom-box">
                    <button className="bleachers-box" onClick={handleClick}></button>
                </div>
            </div >
            <button onClick={handleButtonClick}>Start Countdown</button>
        </div >
    );
};

export default App;

