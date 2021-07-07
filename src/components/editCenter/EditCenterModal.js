import React, {useEffect, useState} from "react";
import {getAllContacts} from "../../service/ContactService";
import {Modal , Form} from "antd";
import "./css/EditCenterModal.css"
import {getCenterById} from "../../service/CenterService";
import EditCenterTabs from "./EditCenterTabs";
import {getAllCities} from "../../service/CityService";
import {getAllStations} from "../../service/StationService";
import {getAllCategories} from "../../service/CategoryService";

const EditCenterModal = ({centerId}) => {
    const [visible, setVisible] = useState(false);
    const [result, setResult] = useState({});
    const [categories, setCategories] = useState([]);
    const [cities, setCities] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [station,setStation] = useState([]);
    const [center,setCenter]= useState([]);
    const [mainForm,setMainFrom] = Form.useForm();


    useEffect(() => {
        getAllCategories().then(response => setCategories(response))
        getAllContacts().then(response => setContacts(response))
        getCenterById(centerId).then(response => setCenter(response))
        getAllCities().then(response => setCities(response))
        getAllStations().then(response => setStation(response))

    }, []);

    return (
        <div>
            <div onClick={() => setVisible(true)}>
                Редагувати Центр
            </div>
            <Modal
                className="modal-edit-center"
                centered
                width={880}
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                footer={false}
            >
                <div className="header-edit-center">Редагувати гурток</div>
                <EditCenterTabs
                              from={mainForm}
                              setResult={setResult}
                              result={result}
                              center={center}
                              contacts={contacts}
                              cities={cities}/>
            </Modal>
        </div>
    );
};

export default EditCenterModal;
