import React, {useEffect, useState} from 'react';
import {Button, Form, Layout, Menu, message, Modal} from 'antd';
import './css/AddClubModal.css';
import "./css/AddClubContent.css";
import {Content} from "antd/es/layout/layout";
import AddClubSider from "./AddClubSider";
import AddClubSiderMobile from "./AddClubSiderMobile";
import MainInformationStep from "./steps/MainInformationStep";
import ContactsStep from "./steps/ContactsStep";
import ContactsStepMobile from "./steps/ContactsStepMobile";
import DescriptionStep from "./steps/DescriptionStep";
import {getAllCategories} from "../../service/CategoryService";
import {getAllCities} from "../../service/CityService";
import {getAllContacts} from "../../service/ContactService";
import {getUserId, saveToken, saveUserId, getToken} from '../../service/StorageService';
import {getAllCenters} from "../../service/CenterService";
import LoginInput from "../login/LoginInput";
import LoginSocial from "../login/LoginSocial";
import {signIn} from "../../service/UserService";
import Login from "../login/Login";
import AddLocationModal from "./location/AddLocationModal";

const AddClubModal = ({isShowing, setShowing, clubs, setClubs,reloadPage,fromCenter}) => {

    const [visible, setVisible] = useState(isShowing);
    const [step, setStep] = useState(0);
    const [result, setResult] = useState({});
    const [categories, setCategories] = useState([]);
    const [cities, setCities] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [locations, setLocations] = useState([]);
    const [centers, setCenters] = useState([]);


    useEffect(() => {
        getAllCenters().then(response => setCenters(response))
        getAllCategories().then(response => setCategories(response));
        getAllCities().then(response => setCities(response));
        getAllContacts().then(response => setContacts(response));
        setResult({
            userId: getUserId()
        })
    }, [visible]);

    const refreshPage = () => {
        window.location.reload();
    }

    const onFinish = (values) => {
        signIn(values).then((response) => {
            if (response.status >= 500) {
                message.error("Ваш email не підтверджено. Будь ласка підтвердіть email");
            } else if (response.status < 500) {
                message.error("Введено невірний пароль або email");
            } else {
                console.log(response)
                message.success("Ви успішно залогувалися!");
                saveUserId(response.id);
                saveToken(response.accessToken);
                setShowing(false)
                refreshPage();
            }
        });
    };

    const stepComponent = (step) => {
        switch (step) {
            case 0:
                return <MainInformationStep
                    categories={categories}
                    setResult={setResult}
                    result={result}
                    step={step}
                    fromCenter={fromCenter}
                    setStep={setStep}
                    centers={centers}
                />;
            case 1:
                if (window.innerWidth > 577) {
                    return <ContactsStep
                        contacts={contacts}
                        cities={cities}
                        setResult={setResult}
                        result={result}
                        step={step}
                        setStep={setStep}
                        locations={locations}
                        setLocations={setLocations}/>;
                } else {
                    return <ContactsStepMobile
                        contacts={contacts}
                        cities={cities}
                        setResult={setResult}
                        result={result}
                        step={step}
                        setStep={setStep}/>;
                }
            case 2:
                return <DescriptionStep
                    reloadPage={reloadPage}
                    setResult={setResult}
                    result={result}
                    step={step}
                    setVisible={setVisible}
                    setStep={setStep}
                    setLocations={setLocations}
                    clubs={clubs}
                    setClubs={setClubs}/>;
        }
    };

    if (getToken()) {
        return (
            <Modal
                className="modal-add-club"
                centered
                width={880}
                visible={isShowing}
                onOk={() => setShowing(false)}
                onCancel={() => setShowing(false)}
                footer={null}>
                <Layout>
                    <AddClubSider step={step}/>
                    <Content className="add-club-container">
                        <div className="add-club-header">
                            Додати гурток
                        </div>
                        <AddClubSiderMobile step={step}/>
                        <div className="add-club-content">
                            {stepComponent(step)}
                        </div>
                    </Content>
                </Layout>
            </Modal>

        )
    } else {
        return (

            <Modal
                className="modal-login"
                centered
                width={520}
                visible={isShowing}
                onOk={() => setShowing(false)}
                onCancel={() => setShowing(false)}
                footer={null}
            >
                <div className="login-header">
                    Вхід
                </div>
                <div className="login-content">
                    <Form
                        name="basic"
                        requiredMark={false}
                        onFinish={onFinish}
                    >
                        <LoginSocial/>
                        <LoginInput/>
                    </Form>

                </div>
            </Modal>


        )
    }

};

export default AddClubModal;
