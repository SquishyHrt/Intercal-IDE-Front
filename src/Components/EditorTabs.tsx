import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import MonacoEditor from "./MonacoEditor";
import '../style/EditorTabs.css'

const EditorTabs = ({ openTabs, fileContents }: any) => {

    return (
        <div id="file-tabs">
            <Tabs id="editor-tabs" forceRenderTabPanel={true}>
                <TabList>
                    {openTabs.map((tab: any, index: any) => (
                        <Tab key={index}>{tab}</Tab>
                    ))}
                </TabList>
                {openTabs.map((tab: any, index: any) => (
                    <TabPanel key={index}>
                        <MonacoEditor domId={index} value={fileContents[tab]} />
                    </TabPanel>
                ))}
            </Tabs>
        </div>
    )
}

export default EditorTabs;