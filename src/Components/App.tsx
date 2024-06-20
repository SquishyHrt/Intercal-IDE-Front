import '../App.css'
import BasicTree from "Components/FileTree.tsx";
import Chat from "Components/Chat.tsx";
import MonacoEditor from './MonacoEditor';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const App = () => {
    return (
        <body>
            <div className="container">
                <div className="top-box">
                    <div className="top-part">
                        <div className="buttons">
                            <button className="button-1"></button>
                            <button className="button-2"></button>
                            <button className="button-3"></button>
                            <button className="button-4"></button>
                        </div>
                    </div>
                    <div className="bottom-part"></div>
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
}

export default App
