import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Chat from "Components/Chat.tsx";
import '../style/TabInfoBox.css';
import { useTranslation } from 'react-i18next';


const TabInfoBox = ({ activeTabIndex, setActiveTabIndex, compilMsg }: any) => {
    const { t } = useTranslation();

    const handleTabSelect = (index) => {
        setActiveTabIndex(index);
    };

    return (
        <Tabs id="right-tabs" forceRenderTabPanel={true} selectedIndex={activeTabIndex} onSelect={handleTabSelect}>
            <TabList>
                <Tab>{t('iaTab')}</Tab>
                <Tab>{t('compilTab')}</Tab>
            </TabList>

            <TabPanel>
                <Chat />
            </TabPanel>
            <TabPanel>
                <p>{compilMsg}</p>
            </TabPanel>
        </Tabs>
    )
}

export default TabInfoBox;