import React, {useEffect, useState} from "react";
import {getAllContacts} from "../../service/ContactService";
import {Modal, Form} from "antd";
import "./css/EditCenterModal.css"
import {getCenterById} from "../../service/CenterService";
import EditCenterTabs from "./EditCenterTabs";
import {getAllCities} from "../../service/CityService";
import {getAllStations} from "../../service/StationService";
import {getAllCategories} from "../../service/CategoryService";
import {getClubsByCenterId} from "../../service/ClubService";

const EditCenterModal = ({centerId}) => {
    const [visible, setVisible] = useState(false);
    const [result, setResult] = useState({});
    const [contacts, setContacts] = useState([]);
    const [center, setCenter] = useState([]);
    const [cities, setCities] = useState([]);
    const [clubs, setClubs] = useState([]);
    const [contacts_data,setContactsData] = useState({})



    useEffect(() => {
        getClubsByCenterId(centerId).then(response => setClubs(response))
        getAllContacts().then(response => setContacts(response))
        getCenterById(centerId).then(response =>setCenter(response))
        getCenterById(centerId).then(response =>setResult(response))
        getAllCities().then(response => setCities(response))
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
                <div className="header-edit-center">Редагувати центр</div>
                <EditCenterTabs
                    clubs={clubs}
                    set={setClubs}
                    setResult={setResult}
                    result={result}
                    center={center}
                    setClubs={setClubs}
                    contacts={contacts}
                    cities={cities}
                    setContactsData={setContactsData}
                    contacts_data={contacts_data}/>
            </Modal>
        </div>
    );
};

export default EditCenterModal;
