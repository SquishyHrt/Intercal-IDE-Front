import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useState } from "react";
import MonacoEditor from "./MonacoEditor";
import '../style/EditorTabs.css'

const EditorTabs = ({ openTabs, fileContents, setFileContents, activeTabIndex, setActiveTabIndex }: any) => {
    const handleTabSelect = (index) => {
        setActiveTabIndex(index);
    };

    return (
        <div id="file-tabs">
            <Tabs id="editor-tabs" forceRenderTabPanel={true} selectedIndex={activeTabIndex} onSelect={handleTabSelect}>
                <TabList>
                    {openTabs.map((tab: any, index: any) => (
                        <Tab key={index}>{tab}</Tab>
                    ))}
                </TabList>
                {openTabs.map((tab: any, index: any) => (
                    <TabPanel key={index}>
                        <MonacoEditor domId={index} filename={tab} value={fileContents[tab]} fileContents={fileContents} setFileContents={setFileContents} />
                    </TabPanel>
                ))}
            </Tabs>
        </div>
    )
}

export default EditorTabs;