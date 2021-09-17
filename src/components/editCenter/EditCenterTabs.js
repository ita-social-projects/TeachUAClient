import {Tabs} from "antd";
import MainInformationTab from "../editCenter/tabs/MainInformationTab";
import ContactTab from "../editCenter/tabs/ContactTab";
import DescriptionTab from "../editCenter/tabs/DescriptionTab";
import React, {useEffect} from "react";
import ClubsTab from "./tabs/ClubsTab";
import "./css/EditCenterTabs.css"
import {getClubsByCenterId} from "../../service/ClubService";
import {getAllContacts} from "../../service/ContactService";
import {getCenterById} from "../../service/CenterService";
import {getAllCities} from "../../service/CityService";

const {TabPane} = Tabs;

const EditCenterTabs = ({
                          center,
                          categories,
                          clubs,
                          setClubs,
                          locations,
                          setLocations,
                            setContactsData,
                            contacts_data,
                          setResult,
                          result,
                          contacts,
                          cities,
                          form
                      }) => {
    useEffect(() => {
        const contacts = center.contacts;
        let newContacts = Object.assign({...contacts_data})
        contacts.forEach(e =>newContacts[e.contactType.id] = e.contact_data)
        console.log(newContacts)
        console.log("--------------")
        setContactsData(newContacts)
        console.log(contacts_data)
    }, []);
    return (
    <Tabs defaultActiveKey="1">
        <TabPane tab="Основна інформація" key="1">
            <MainInformationTab cities={cities}
                                result={result}
                                setResult={setResult}
                                center={center}
                                locations={locations}
                                setLocations={setLocations}
                                categories={categories}
                                setContactsData={setContactsData}
                                contacts_data={contacts_data}

            />
        </TabPane>
        <TabPane tab="Адреса і контакти" key="2">
            <ContactTab center={center}
                        result={result}
                        setResult={setResult}
                        contacts={contacts}
                        cities={cities}
                        locations={locations}
                        setLocations={setLocations}
                        categories={categories}
                        form={form}
                        setContactsData={setContactsData}
                        contacts_data={contacts_data}
            />
        </TabPane>
        <TabPane tab="Опис центру" key="3">
            <DescriptionTab center={center}
                            result={result}
                            locations={locations}
                            setLocations={setLocations}
                            setResult={setResult}
                            setContactsData={setContactsData}
                            contacts_data={contacts_data}
             />
        </TabPane>
        <TabPane tab="Гуртки" key="4">
            <ClubsTab center={center}
                      result={result}
                      setResult={setResult}
                      clubs={clubs}
                      setClubs={setClubs}
                      setContactsData={setContactsData}
                      contacts_data={contacts_data}

            />
        </TabPane>
    </Tabs>
);
}

export default EditCenterTabs;