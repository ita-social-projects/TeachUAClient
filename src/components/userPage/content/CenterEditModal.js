import React, { useState, useEffect } from 'react';
import { Layout, Modal } from 'antd';
import { Steps } from 'antd';
import "../../editCenter/css/EditCenter.css"
import MainInformation from '../../editCenter/MainInformation';
import Contacts from '../../editCenter/Contacts';
import Description from '../../editCenter/Description';
import ClubsOfCenter from '../../editCenter/ClubsOfCenter';
import { getAllClubsByCenterId, getAllClubsByUserId, getClubsByUserId } from "../../../service/ClubService";
import { getUserId } from "../../../service/StorageService";
import { getAllCities } from '../../../service/CityService';
import { getAllContacts } from '../../../service/ContactService';
import EditCenterSider from "../../editCenter/EditCenterSider";
import EditCenterSiderMobile from "../../editCenter/EditCenterSiderMobile";
import {Content} from "antd/es/layout/layout";
import { getCenterById } from "../../../service/CenterService";


const { Step } = Steps;


const CenterEditModal = ({centerId}) => {
    const [visible, setVisible] = useState(false);
    const [step, setStep] = useState(0);
    const [clubs, setClubs] = useState(null);
    const [cities, setCities] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [result, setResult] = useState({});
    const [fromCenter,setFromCenter] = useState(true);
    const [isMobile, setIsMobile]  = useState(false);
    const [isShowing, setShowing]  = useState(true);
    const [center, setCenter] = useState({});

    useEffect(() => {
        // getAllClubsByUserId(getUserId()).then(response => {
        //     setClubs(response)
        //     // response.map(club => (
        //     //     club.locations.map(location => {
        //     //         locations.push({
        //     //             id: location.id,
        //     //             name: location.name,
        //     //             cityName: location.locationCity.name,
        //     //             districtName: location.district?.name,
        //     //             stationName: location.station?.name,
        //     //             address: location.address,
        //     //             latitude: location.latitude,
        //     //             longitude: location.longitude,
        //     //             phone: location.phone
        //     //         });
        //     //     })
        //     // ))
        // });

        let centerClubsIds = [];
        getAllClubsByCenterId(centerId).then(response =>{
            response.forEach(club => centerClubsIds.push(club.id))
            setClubs(response);
        })

        getCenterById(centerId).then(response => {
            setCenter(response);

            let contactTelephoneData = "";
            let contactFacebookData = "";
            let contactSiteData = "";
            let contactSkypeData = "";
            let contactWhatsAppData = "";
            let contactПоштаData = "";
            response.contacts.forEach(contact =>{
                if(contact.contactType.name === "Пошта"){
                    contactПоштаData = contact.contactData
                }
                if(contact.contactType.name === "Телефон"){
                    contactTelephoneData = contact.contactData
                }
                if(contact.contactType.name === "Facebook"){
                    contactFacebookData = contact.contactData
                }
                if(contact.contactType.name === "Site"){
                    contactSiteData = contact.contactData
                }
                if(contact.contactType.name === "Skype"){
                    contactSkypeData = contact.contactData
                }
                if(contact.contactType.name === "WhatsApp"){
                    contactWhatsAppData = contact.contactData
                }
            })


            let locationsWithDuplicates = [];
            let locationsWithoutDuplicates = [];
            response.locations.map(location => {
                locationsWithDuplicates.push({
                    id: location.id,
                    name: location.name,
                    cityName: location.locationCity.name,
                    districtName: location.district?.name,
                    stationName: location.station?.name,
                    address: location.address,
                    latitude: location.latitude,
                    longitude: location.longitude,
                    phone: location.phone
                });
                // this code removes duplicates from locations
                let s = new Set(locationsWithDuplicates);
                let it = s.values();
                locationsWithoutDuplicates = Array.from(it);
            })
            
            setResult({
                id: response.id,
                userId: getUserId(),
                name: response.name,
                description: response.description,
                locations: locationsWithoutDuplicates,
                urlLogo: response.urlLogo,
                urlWeb: response.urlWeb,
                urlBackgroundPicture: response.urlBackgroundPicture,
                clubs: centerClubsIds,
                contactТелефон : contactTelephoneData,
                contactFacebook: contactFacebookData,
                contactSite: contactSiteData,
                contactSkype: contactSkypeData,
                contactWhatsApp: contactWhatsAppData,
                contactПошта: contactПоштаData
            })

        });

        getAllCities().then(response => setCities(response));
        getAllContacts().then(response => setContacts(response));
        window.addEventListener("resize", handleResize)
    }, [visible])


    const handleResize = () => {
        if (window.innerWidth < 577) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }

    const currentComponnet = (step) => {
        switch (step) {
            case 0:
                return <MainInformation
                    step={step}
                    setStep={setStep}
                    clubs={clubs}
                    cities={cities}
                    result={result}
                    setResult={setResult}
                    center={center}
                    setCenter={setCenter}
                />;

            case 1:
                return <Contacts
                    step={step}
                    setStep={setStep}
                    contacts={contacts}
                    setContacts={setContacts}
                    result={result}
                    setResult={setResult}
                    center={center}
                    setCenter={setCenter}
                />;

            case 2:
                return <Description
                    step={step}
                    setStep={setStep}
                    result={result}
                    setResult={setResult}
                    center={center}
                    setCenter={setCenter}
                    clubs={clubs}
                    setClubs={setClubs}
                />;
        }
    };

    return (
        <div>
        <a className="" type="text button" onClick={() => setVisible(true)}>
        Редагувати Центр
        </a>
        <Modal
        className="addCenter"
        centered
        width={880}
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={null}
            >
                <Layout>
                    <EditCenterSider step={step}/>
                    <Content className="add-center-container">
                        <div className="modal-title">
                            Редагувати центр
                        </div>
                        <EditCenterSiderMobile step={step}/>
                        <div className="input-data">
                            {currentComponnet(step)}
                        </div>
                    </Content>
                </Layout>
            </Modal>
        </div>
    )
};

export default CenterEditModal;