import {Tabs} from "antd";
import React from "react";
import MainInformationTab from "./tabs/MainInformationTab";
import ContactsTab from "./tabs/ContactsTab";
import DescriptionTab from "./tabs/DescriptionTab";
import "./css/Tabs.less"


const {TabPane} = Tabs;

const EditClubTabs = ({
                          categories,
                          centers,
                          setResult,
                          result,
                          contacts,
                          cities
                      }) => (
    <Tabs defaultActiveKey="1">
        <TabPane tab="Основна інформація" key="1">
            <MainInformationTab categories={categories}
                                centers={centers}
                                setResult={setResult}
                                result={result}/>
        </TabPane>
        <TabPane tab="Адреса і контакти" key="2">
            <ContactsTab contacts={contacts}
                         cities={cities}
                         categories={categories}
                         setResult={setResult}
                         result={result}/>
        </TabPane>
        <TabPane tab="Опис гуртка" key="3">
            <DescriptionTab setResult={setResult}
                            result={result}/>
        </TabPane>
    </Tabs>
);

export default EditClubTabs;