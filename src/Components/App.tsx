import { useState, useEffect, useRef, MutableRefObject } from 'react';
import { getFileContent, saveFile } from '@/Utils/utils';

import BasicTree from 'Components/FileTree.tsx';
import FileMenu from 'Components/FileMenu.js';
import EditMenu from 'Components/EditMenu.js';
import ViewMenu from 'Components/ViewMenu.js';
import HelpMenu from 'Components/HelpMenu.js';
import TabInfoBox from 'Components/TabInfoBox.tsx';
import DarkOverlay from 'Components/DarkOverlay';
import GetMeteo from 'Components/MeteoComp.tsx';
import RunButton from 'Components/RunButton.tsx';
import Bleachers from 'Components/Bleachers.tsx';
import EditorTabs from 'Components/EditorTabs';
import RandomSoundPlayer from 'Components/randSound';

import './i18n';
import 'react-tabs/style/react-tabs.css';
import '../App.css';

const App = () => {
  if (!window.localStorage["compileCookie"])
    window.localStorage["compileCookie"] = "SESSION=4b9da30a-fb0b-474e-8ac0-5164016e3263; marker_id_65379a42896b9b3785d33e92=1baf8fbc-33a1-44e3-94e5-f3cbbffcd692; ph_phc_FTWxh3zPvEFoJy4fpLYNTxH0MSaPrUyXBO247WRRw0n_posthog=%7B%22distinct_id%22%3A%22019053d9-203e-7e44-9902-d4e6a87942bb%22%2C%22%24sesid%22%3A%5B1719741425058%2C%2201906892-5022-7397-9a10-40e0982bd67c%22%2C1719741337634%5D%7D";

  // MANAGE LOCALISATION, default localisation is Rennes
  const [lat, setLat] = useState("48.132022");
  const [long, setLong] = useState("-1.621433");


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

  const runButt = useRef(null);
  const closeButt = useRef(null);
  const saveButt = useRef(null);

  // MANAGE EDITOR MENU <=> MONACO EDITOR LINK
  const [editorRef, setEditorRef] = useState(null);

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

  // Shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'F8') {
        runButt.current.click();
      }
      else if (event.ctrlKey && event.key === 'w') {
        event.preventDefault();
        closeButt.current.click();
      }
      else if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        saveButt.current.click();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
  };

  const handleSaveClick = async () => {
    if (openTabs.length == 0)
      return;

    let path = rootPath;
    if (path[path.length - 1] != '/') {
      path += '/';
    }

    path += openTabs[fileTabIndex];
    await saveFile(path, fileContents[openTabs[fileTabIndex]]);
  };



  const handleCloseClick = () => {
    if (openTabs.length == 0)
      return;

    let newOpenTabs = openTabs;
    newOpenTabs.splice(fileTabIndex, 1);
    setOpenTabs(newOpenTabs);
    console.log(fileTabIndex);
    if (newOpenTabs.length == 0)
      setFileTabIndex(-1);
    else {
      if (fileTabIndex == 0)
        setFileTabIndex(fileTabIndex + 1);
      else
        setFileTabIndex(fileTabIndex - 1);
    }
  };

  const clearTabs = () => {
    setOpenTabs([]);
    setFileContents({});
    setFileTabIndex(-1);
  };

  return (
    <div className="container">
      <DarkOverlay show={showOverlay} onComplete={handleOverlayComplete} />
      <GetMeteo lat={lat} long={long}>
        <div className="buttons">
          <div>
            <button className="button-1 french" onClick={() => openMenu('file')}></button>
            <button className="button-2 french" onClick={() => openMenu('edit')}></button>
            <button className="button-3 french" onClick={() => openMenu('view')}></button>
            <button className="button-4 french" onClick={() => openMenu('help')}></button>
          </div>

          <div>
            <RunButton
              ref={runButt}
              fileContents={fileContents}
              fileTabIndex={fileTabIndex}
              setInfoTabIndex={setInfoTabIndex}
              openTabs={openTabs}
              setCompilMsg={setCompilMsg}
              blockScreen={setShowOverlay}
            />
            <button ref={saveButt} id="button-save" onClick={handleSaveClick}></button>
            <button ref={closeButt} id="button-close" onClick={handleCloseClick}></button>
          </div>
        </div>
        <div className="bottom-part" ref={menuRef}>
          {visibleMenu === 'file' && (
            <FileMenu
              onSaveClick={handleSaveClick}
              setRootPath={setRootPath}
              loadFile={onNameClick}
              clearTabs={clearTabs}
              setLat={setLat}
              setLong={setLong}
            />
          )}
          {visibleMenu === 'edit' && <EditMenu editorRef={editorRef} />}
          {visibleMenu === 'view' && <ViewMenu />}
          {visibleMenu === 'help' && <HelpMenu />}
        </div>

      </GetMeteo>
      <div className="bottom-container">
        <div className="bottom-box">
          <BasicTree openTab={onNameClick} rootPath={rootPath} />
        </div>
        <div className="bottom-box" id="editor-box">
          <EditorTabs
            openTabs={openTabs}
            fileContents={fileContents}
            setFileContents={setFileContents}
            activeTabIndex={fileTabIndex}
            setActiveTabIndex={setFileTabIndex}
            setEditorRef={setEditorRef}
          />
        </div>
        <div className="bottom-box">
          <TabInfoBox activeTabIndex={infoTabIndex} setActiveTabIndex={setInfoTabIndex} compilMsg={compilMsg} />
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

