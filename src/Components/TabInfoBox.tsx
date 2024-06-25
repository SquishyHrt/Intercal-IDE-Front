import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import Chat from "Components/Chat.tsx";
import '../style/TabInfoBox.css'

const TabInfoBox = () => {
    return (
        <Tabs id="right-tabs" forceRenderTabPanel={true}>
            <TabList>
                <Tab>IA</Tab>
                <Tab>Compilation</Tab>
            </TabList>

            <TabPanel>
                <Chat/>
            </TabPanel>
            <TabPanel>
                <div id="">
                    <p>Compilation console</p>
                </div>
            </TabPanel>
        </Tabs>
    )
}

export default TabInfoBox;