import React, { useState, useEffect } from 'react';
import { Modal, Rate } from 'antd';
import { Steps } from 'antd';
import "./css/AddCenter.css"
import MainInformation from './MainInformation';
import Contacts from './Contacts';
import Description from './Description';
import ClubsOfCenter from './ClubsOfCenter';
import { getClubsByUserId } from "../../service/ClubService";
import { getUserId } from "../../service/StorageService";
import { getAllCities } from '../../service/CityService';
import { getAllContacts } from '../../service/ContactService';


const { Step } = Steps;


const AddCenter = () => {
    const [visible, setVisible] = useState(false);
    const [step, setStep] = useState(0);
    const [clubs, setClubs] = useState(null);
    const [cities, setCities] = useState(null);
    const [locations, setLocations] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [result, setResult] = useState({});

    useEffect(() => {
        getClubsByUserId(getUserId(), 0).then(response => {
            setClubs(response)
            response.content.map(club => (
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
        console.log(locations)
        getAllCities().then(response => setCities(response));
        getAllContacts().then(response => setContacts(response));
        setResult({
            userId: getUserId()
        })
    }, [])

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
                    result={result}
                    setResult={setResult}
                />;

            case 2:
                return <Description
                    step={step}
                    setStep={setStep}
                    result={result}
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
                />;
        }
    };

    return (
        <div>
            <div onClick={() => setVisible(true)}>
                Додати центр
             </div>
            <Modal
                centered
                visible={visible}
                onCancel={() => setVisible(false)}
                width={880}
                footer={null}
                className='addCenter'
            >
                <div class="layout">
                    <div class="side">
                        <Steps direction="vertical" current={step}>
                            <Step title="Основна інформація"></Step>
                            <Step title="Контакти"></Step>
                            <Step title="Опис"></Step>
                            <Step title="Гуртки"></Step>
                        </Steps>
                    </div>
                    <div className="content">
                        <div className="modal-title">
                            Додати центр
                        </div>
                        <div className="input-data">
                            {currentComponnet(step)}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
};

export default AddCenter;