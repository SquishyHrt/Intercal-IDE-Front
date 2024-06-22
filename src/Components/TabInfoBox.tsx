import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import Chat from "Components/Chat.tsx";

const TabInfoBox = () => {
    return (
        <Tabs id="right-tabs">
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