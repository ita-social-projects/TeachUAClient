import React, { useState, useEffect } from 'react';
import { Layout, Modal } from 'antd';
import { Steps } from 'antd';
import "./css/AddCenter.css"
import MainInformation from './MainInformation';
import Contacts from './Contacts';
import Description from './Description';
import ClubsOfCenter from './ClubsOfCenter';
import { getAllClubsByUserId, getClubsByUserId } from "../../service/ClubService";
import { getUserId } from "../../service/StorageService";
import { getAllCities } from '../../service/CityService';
import { getAllContacts } from '../../service/ContactService';
import AddCenterSider from "./AddCenterSider";
import {Content} from "antd/es/layout/layout";


const { Step } = Steps;


const AddCenter = ({isShowing, setShowing}) => {
    const [visible, setVisible] = useState(false);
    const [step, setStep] = useState(0);
    const [clubs, setClubs] = useState(null);
    const [cities, setCities] = useState(null);
    const [locations, setLocations] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [result, setResult] = useState({});
    const [fromCenter,setFromCenter] = useState(true);
    const [isMobile, setIsMobile]  = useState(false);

    useEffect(() => {
        getAllClubsByUserId(getUserId()).then(response => {
            console.log(response);
            setClubs(response)
            response.map(club => (
                club.locations.map(location => {
                    console.log(location)
                    locations.push({
                        id: location.id,
                        name: location.name,
                        cityName: location.city.name,
                        districtName: location.district?.name,
                        stationName: location.station?.name,
                        address: location.address,
                        latitude: location.latitude,
                        longitude: location.longitude,
                        phone: location.phone
                    });
                })
            ))
        });
        getAllCities().then(response => setCities(response));
        getAllContacts().then(response => setContacts(response));
        setResult({
            userId: getUserId()
        })
        console.log("ADD CENTER USE EFFECT")
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
                    locations={locations}
                    setLocations={setLocations}
                    result={result}
                    setResult={setResult}
                />;

            case 1:
                return <Contacts
                    step={step}
                    setStep={setStep}
                    contacts={contacts}
                    setContacts={setContacts}
                    result={result}
                    setResult={setResult}
                />;

            case 2:
                return <Description
                    step={step}
                    setStep={setStep}
                    result={result}
                    setResult={setResult}
                />;

            case 3:
                return <ClubsOfCenter
                    step={step}
                    setStep={setStep}
                    setVisible={setVisible}
                    clubs={clubs}
                    setClubs={setClubs}
                    result={result}
                    setResult={setResult}
                    setLocations={setLocations}
                    fromCenter={fromCenter}
                />;
        }
    };

    return (
      
            <Modal
                className="addCenter"
                centered
                visible={isShowing}
                onOk={() => setShowing(false)}
                onCancel={() => setShowing(false)}
                width={880}
                footer={null}
            >
                <Layout>
                    {!isMobile &&
                    <AddCenterSider step={step}/>
                    }
                    <Content className="add-center-container">
                        <div className="modal-title">
                            Додати центр
                        </div>
                        {isMobile &&
                        <AddCenterSider step={step}/>
                        }
                        <div className="input-data">
                            {currentComponnet(step)}
                        </div>
                    </Content>
                </Layout>
            </Modal>
      
    )
};

export default AddCenter;