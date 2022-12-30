import React, {useState, useEffect} from 'react';
import {message, Modal} from 'antd';
import "./css/EditMainInformationTab.less"
import {getAllCategories} from "../../service/CategoryService";
import {getAllCities} from "../../service/CityService";
import {getAllContacts} from "../../service/ContactService";
import {getClubById, updateClubById} from "../../service/ClubService";
import EditClubTabs from "./EditClubTabs";
import {getAllCenters} from "../../service/CenterService";


const EditClubModal = ({clubId, reloadAfterChange}) => {
    const [visible, setVisible] = useState(false);
    const [result, setResult] = useState({});
    const [categories, setCategories] = useState([]);
    const [centers, setCenters] = useState([]);
    const [cities, setCities] = useState([]);
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        getAllCategories().then(response => setCategories(response));
        getAllCenters().then(response => setCenters(response));
        getAllCities().then(response => setCities(response));
        getAllContacts().then(response => setContacts(response));
        getClubById(clubId).then(response => setResult(response));
    }, []);

    const onFinish = () => {
        updateClubById(result).then(() => {
            setVisible(false);
            reloadAfterChange();
            message.success("Гурток успішно оновлено");
        }).catch(() => {
            message.error("Помилка при оновленні гуртка");
        });
    };

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
                              centers={centers}
                              setResult={setResult}
                              result={result}
                              contacts={contacts}
                              cities={cities}
                              onFinish={onFinish}/>
            </Modal>
        </div>
    );
};

export default EditClubModal;
