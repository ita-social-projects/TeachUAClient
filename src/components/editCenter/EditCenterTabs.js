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
                          clubs,
                          setClubs,
                          setResult,
                          result,
                          contacts,
                          cities,
                          form
                      }) => (
    <Tabs defaultActiveKey="1">
        <TabPane tab="Основна інформація" key="1">
            <MainInformationTab cities={cities}
                                result={result}
                                setResult={setResult}
                                center={center}
                                categories={categories}

            />
        </TabPane>
        <TabPane tab="Адреса і контакти" key="2">
            <ContactTab center={center}
                        result={result}
                        setResult={setResult}
                        contacts={contacts}
                        cities={cities}
                        categories={categories}
                        form={form}/>
        </TabPane>
        <TabPane tab="Опис гуртка" key="3">
            <DescriptionTab center={center}
                            result={result}
                            setResult={setResult}
             />
        </TabPane>
        <TabPane tab="Гуртки" key="4">
            <ClubsTab center={center}
                      result={result}
                      setResult={setResult}
                      clubs={clubs}
                      setClubs={setClubs}/>
        </TabPane>
    </Tabs>
);

export default EditClubTabs;