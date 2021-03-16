import React, {useState, useEffect} from 'react';
import {Layout, Modal} from 'antd';
import "./css/EditMainInformationTab.less"
import {getAllCategories} from "../../service/CategoryService";
import {getAllCities} from "../../service/CityService";
import {getAllContacts} from "../../service/ContactService";
import {getClubById} from "../../service/ClubService";
import EditClubTabs from "./EditClubTabs";


const EditClubModal = () => {
    const [visible, setVisible] = useState(false);
    const [result, setResult] = useState({});
    const [categories, setCategories] = useState([]);
    const [cities, setCities] = useState([]);
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        getAllCategories().then(response => setCategories(response));
        getAllCities().then(response => setCities(response));
        getAllContacts().then(response => setContacts(response));
        getClubById(1).then(response => setResult(response));
    }, []);



    return (
        <div>
            <div onClick={() => setVisible(true)}>
                Редагувати гурток
            </div>
            <Modal
                className="modal-edit-club"
                centered
                width={880}
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                footer={false}
                >
                <div className="header-edit-club">Редагувати гурток</div>
                <EditClubTabs categories={categories}
                                  setResult={setResult}
                                  result={result}
                                  contacts={contacts}
                                  cities={cities}/>
            </Modal>
        </div>
    );
};

export default EditClubModal;
