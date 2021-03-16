import {Tabs} from "antd";
import React from "react";
import MainInformationStep from "./steps/MainInformationStep";
import ContactsStep from "./steps/ContactsStep";
import DescriptionStep from "./steps/DescriptionStep";
import "./css/Tabs.less"
const {TabPane} = Tabs;

const EditClubTabs = ({
                          categories,
                          setResult,
                          result,
                          contacts,
                          cities
                      }) => (
    <Tabs defaultActiveKey="1">
        <TabPane tab="Основна інформація" key="1">
            <MainInformationStep categories={categories}
                                 setResult={setResult}
                                 result={result}
            />
        </TabPane>
        <TabPane tab="Адреса і контакти" key="2">
            <ContactsStep contacts={contacts}
                          cities={cities}
                          categories={categories}
                          setResult={setResult}
                          result={result}/>
        </TabPane>
        <TabPane tab="Опис гуртка" key="3">
            <DescriptionStep setResult={setResult}
                             result={result}/>
        </TabPane>
    </Tabs>
);

export default EditClubTabs;