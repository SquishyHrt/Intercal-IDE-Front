import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import Chat from "Components/Chat.tsx";
import '../style/TabInfoBox.css'

const TabInfoBox = ({activeTabIndex, setActiveTabIndex, compilMsg}: any) => {
    const handleTabSelect = (index) => {
        setActiveTabIndex(index);
    };

    return (
        <Tabs id="right-tabs" forceRenderTabPanel={true} selectedIndex={activeTabIndex} onSelect={handleTabSelect}>
            <TabList>
                <Tab>IA</Tab>
                <Tab>Compilation</Tab>
            </TabList>

            <TabPanel>
                <Chat/>
            </TabPanel>
            <TabPanel>
                <p>{compilMsg}</p>
            </TabPanel>
        </Tabs>
    )
}

export default TabInfoBox;