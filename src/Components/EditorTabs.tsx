import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useState } from "react";
import MonacoEditor from "./MonacoEditor";
import '../style/EditorTabs.css'

const EditorTabs = () => {
    const [openTabs, setOpenTabs] = useState<string[]>(['hey.txt']);
    /*
                {openTabs.map((tab, index) => (
                    <TabPanel key={index}>
                        <h1>hey</h1>
                    </TabPanel>
                ))}

                {openTabs.map((tab, index) => (
                            <Tab key={index}>{tab}</Tab>
                        ))}
    */

    return (
        <div id="file-tabs">
            <div id="file-tabs-header">
                <Tabs id="editor-tabs">
                    <TabList>
                        {openTabs.map((tab, index) => (
                            <Tab key={index}>{tab}</Tab>
                        ))}
                    </TabList>
                </Tabs>
                <div id="button-run"></div>
                <div id="button-save"></div>
                <div id="button-close"></div>
            </div>
            <div id="file-tabs-content">
                <Tabs id="file-react-tabs">
                    {openTabs.map((tab, index) => (
                        <TabPanel key={index}>
                            <MonacoEditor />
                        </TabPanel>
                    ))}
                </Tabs>
            </div>
        </div>
    )
}

export default EditorTabs;