import {Form, Input, List, message, Popconfirm, Select, Switch, Tooltip} from "antd";
import React, {useState, useEffect} from "react";
import AddClubContentFooter from "../AddClubContentFooter";
import MaskIcon from "../../MaskIcon";
import EditOutlined from "@ant-design/icons/lib/icons/EditOutlined";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import AddLocationModal from "../location/AddLocationModal";
import InfoCircleOutlined from "@ant-design/icons/lib/icons/InfoCircleOutlined";

const ContactsStep = ({contacts, cities, step, setStep, setResult, result}) => {
    const [locations, setLocations] = useState([]);
    const [locationVisible, setLocationVisible] = useState(false);
    const [editedLocation, setEditedLocation] = useState(null);
    const [locationForm] = Form.useForm();
    const [contactsFrom] = Form.useForm();

    useEffect(() => {
        if (result) {
            contactsFrom.setFieldsValue({...result});
        }
    }, []);

    const onFinish = (values) => {
        if (locations.length <= 0) {
            values.isOnline = true;
            message.info('Ви не додали жодної локації, гурток автоматично є онлайн');
        }

        values.locations = locations;

        setResult(Object.assign(result, values));
        setStep(2);
    };

    const onEdit = (item) => {
        locationForm.setFieldsValue({
            ...item,
        });
        setEditedLocation(item);
        setLocationVisible(true);
    };

    const onRemove = (item) => {
        const newData = [...locations];
        const index = newData.findIndex((it) => item.key === it.key);
        newData.splice(index, 1);
        setLocations(newData);
    };

    return (
        <Form
            name="basic"
            requiredMark={false}
            form={contactsFrom}
            onFinish={onFinish}>
            <Form.Item name="locations"
                       className="add-club-row"
                       label="Локації"
                       initialValue={result.locations}>
                <List
                    className="add-club-location-list"
                    itemLayout="horizontal"
                    dataSource={locations}
                    renderItem={item => (
                        <List.Item
                            actions={[
                                <div>
                                    <EditOutlined key="edit" onClick={() => onEdit(item)}/>
                                    <Popconfirm key="delete"
                                                title="Видалити локацію?"
                                                cancelText="Ні"
                                                okText="Так"
                                                cancelButtonProps={{className: "popConfirm-cancel-button"}}
                                                okButtonProps={{className: "popConfirm-ok-button"}}
                                                onConfirm={() => onRemove(item)}>
                                        <DeleteOutlined/>
                                    </Popconfirm>
                                </div>]}
                        >
                            <List.Item.Meta
                                title={item.name}
                                description={`Адреса: ${item.address.value.structured_formatting.main_text}`}
                            />
                        </List.Item>
                    )}/>
                <span className="add-club-location" onClick={() => setLocationVisible(true)}>
                    Додати локацію
                </span>
            </Form.Item>
            <div className="add-club-inline">
                <Form.Item name="isOnline"
                           className="add-club-row"
                           label="Доступний онлайн?"
                >
                    <Switch checkedChildren="Так" unCheckedChildren="Ні"/>
                </Form.Item>
                <Tooltip title="Якщо не додано жодної локації буде автоматично онлайн">
                    <InfoCircleOutlined className="info-icon"/>
                </Tooltip>
            </div>
            <Form.Item
                label="Контакти"
                className="add-club-row add-club-contacts">
                {contacts.map(contact =>
                    <Form.Item name={`clubContact${contact.name}`}
                               className="add-club-contact"
                               initialValue={result[`clubContact${contact.name}`]}
                               hasFeedback>
                        <Input className="add-club-input"
                               placeholder="Заповніть поле"
                               suffix={<MaskIcon maskColor="#D9D9D9" iconUrl={contact.urlLogo}/>}/>
                    </Form.Item>)}
            </Form.Item>

            <AddClubContentFooter step={step} setStep={setStep}/>

            <AddLocationModal
                form={locationForm}
                locations={locations}
                setLocations={setLocations}
                visible={locationVisible}
                setVisible={setLocationVisible}
                editedLocation={editedLocation}
                setEditedLocation={setEditedLocation}
                cities={cities}/>
        </Form>
    )
};

export default ContactsStep;