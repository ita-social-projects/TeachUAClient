import {Tabs} from "antd";
import MainInformationTab from "../editCenter/tabs/MainInformationTab";
import ContactTab from "../editCenter/tabs/ContactTab";
import DescriptionTab from "../editCenter/tabs/DescriptionTab";
import React from "react";
import ClubsTab from "./tabs/ClubsTab";
import "./css/EditCenterTabs.css"

const {TabPane} = Tabs;

const EditClubTabs = ({
                          center,
                          categories,
                          setResult,
                          result,
                          contacts,
                          cities,
                          form
                      }) => (
    <Tabs defaultActiveKey="1">
        <TabPane tab="Основна інформація" key="1">
            <MainInformationTab cities={cities}
                                form={form}
                                center={center}
                                categories={categories}
                                result={result}
            />
        </TabPane>
        <TabPane tab="Адреса і контакти" key="2">
            <ContactTab  center={center}
                         contacts={contacts}
                         cities={cities}
                         categories={categories}
                         form={form}/>
        </TabPane>
        <TabPane tab="Опис гуртка" key="3">
            <DescriptionTab center={center}
                            form={form}/>
        </TabPane>
        <TabPane tab="Гуртки" key="4">
            <ClubsTab center={center}
                       form ={form} />
        </TabPane>
    </Tabs>
);

export default EditClubTabs;