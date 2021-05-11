import React, { useEffect, useState } from 'react';
import { Button, Layout, Modal } from 'antd';
import './css/AddClubModal.css';
import "./css/AddClubContent.css";
import { Content } from "antd/es/layout/layout";
import AddClubSider from "./AddClubSider";
import MainInformationStep from "./steps/MainInformationStep";
import ContactsStep from "./steps/ContactsStep";
import DescriptionStep from "./steps/DescriptionStep";
import { getAllCategories } from "../../service/CategoryService";
import { getAllCities } from "../../service/CityService";
import { getAllContacts } from "../../service/ContactService";
import { getUserId } from '../../service/StorageService';

const AddClubModal = ({ button, clubs, setClubs }) => {
    const [visible, setVisible] = useState(false);
    const [step, setStep] = useState(0);
    const [result, setResult] = useState({});
    const [categories, setCategories] = useState([]);
    const [cities, setCities] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        getAllCategories().then(response => setCategories(response));
        getAllCities().then(response => setCities(response));
        getAllContacts().then(response => setContacts(response));
        setResult({
            userId: getUserId()
        })
    }, [visible]);

    const stepComponent = (step) => {
        switch (step) {
            case 0:
                return <MainInformationStep
                    categories={categories}
                    setResult={setResult}
                    result={result}
                    step={step}
                    setStep={setStep} />;
            case 1:
                return <ContactsStep
                    contacts={contacts}
                    cities={cities}
                    setResult={setResult}
                    result={result}
                    step={step}
                    setStep={setStep}
                    locations={locations}
                    setLocations={setLocations} />;
            case 2:
                return <DescriptionStep
                    setResult={setResult}
                    result={result}
                    step={step}
                    setVisible={setVisible}
                    setStep={setStep}
                    clubs={clubs}
                    setClubs={setClubs} />;
        }
    };

    return (
        <div>
            {button ?
                <Button onClick={() => setVisible(true)}
                    className="add-club-button">Додати гурток</Button>
                : <div onClick={() => setVisible(true)}>Додати гурток</div>}
            <Modal
                className="modal-add-club"
                centered
                width={880}
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                footer={null}>
                <Layout>
                    <AddClubSider step={step} />
                    <Content className="add-club-container">
                        <div className="add-club-header">
                            Додати гурток
                        </div>
                        <div className="add-club-content">
                            {stepComponent(step)}
                        </div>
                    </Content>
                </Layout>
            </Modal>
        </div>
    );
};

export default AddClubModal;
