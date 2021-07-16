import {Button, Form, Input, List, Popconfirm, Select, Switch} from "antd";
import React, {useState} from "react";
import MaskIcon from "../../MaskIcon";
import "../css/MainInformationTab.less"
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import EditLocationModal from "../locations/EditLocationModal";

const ContactsTab = ({contacts, cities, setResult, result}) => {
    const [contactsForm] = Form.useForm();
    const [locationForm] = Form.useForm();
    const [contacts_data, setContactsData] = useState(JSON.parse(result.contacts.replaceAll("::", ":")));
    const [checked, setChecked] = useState(result.isOnline !== undefined ? result.isOnline : false);
    const [locationVisible, setLocationVisible] = useState(false);
    const [editedLocation, setEditedLocation] = useState(null);
    const [locations, setLocations] = useState(result.locations !== undefined ? result.locations : []);

    const onFinish = (values) => {
        console.log(result);
        // values.contacts = JSON.stringify(contacts_data).replaceAll(":", "::");
        // console.log(values);
        // if (locations !== undefined) {
        //     for (const loc in locations) {
        //         console.log(locations[loc]);
        //         values.locations[loc] = {
        //             id: locations[loc].id,
        //             cityName: locations[loc].cityName !== undefined ? locations[loc].cityName : locations[loc].city.name,
        //             address: locations[loc].address,
        //             coordinates: locations[loc].coordinates !== null ? locations[loc].coordinates : locations[loc].latitude + ", " + locations[loc].longitude,
        //             districtName: locations[loc].districtName !== undefined ? locations[loc].districtName : locations[loc].district.name,
        //             key: locations[loc].key,
        //             name: locations[loc].name,
        //             phone: locations[loc].phone,
        //             stationName: locations[loc].stationName !== undefined ? locations[loc].stationName : locations[loc].station.name,
        //         }
        //     }
        // }
        setResult(Object.assign(result, values));
        console.log(result);
    };
    console.log(result);

    const onFinalChange = (values) => {
        values.contacts = JSON.stringify(contacts_data).replaceAll(":", "::");
        console.log(values);
        if (locations !== undefined) {
            for (const loc in locations) {
                console.log(locations[loc]);
                values.locations[loc] = {
                    id: locations[loc].id,
                    cityName: locations[loc].cityName !== undefined ? locations[loc].cityName : locations[loc].city.name,
                    address: locations[loc].address,
                    coordinates: locations[loc].coordinates !== null ? locations[loc].coordinates : locations[loc].latitude + ", " + locations[loc].longitude,
                    districtName: locations[loc].districtName !== undefined ? locations[loc].districtName : locations[loc].district.name,
                    key: locations[loc].key,
                    name: locations[loc].name,
                    phone: locations[loc].phone,
                    stationName: locations[loc].stationName !== undefined ? locations[loc].stationName : locations[loc].station.name,
                }
            }
        }
    }

    const onOnlineChange = () => {
        if (checked) {
            setChecked(false);
            setResult({
                ...result, isOnline: false,
            });
        } else {
            setChecked(true);
            setResult({
                ...result, isOnline: true,
            });
        }
    }

    const changeContacts = (event, contact) => {
        console.log(result);
        console.log(contact);
        setContactsData({
            ...contacts_data,
            [contact.id]: event.target.value
        });
        console.log(contacts_data);
        const parsedContact = JSON.stringify(contacts_data).replaceAll(":", "::");
        setResult({...result, contacts: parsedContact})
        console.log(result);
    };

    const initialValue = (contactName) => {
        let value = "";
        if (result.contactsArray !== undefined) {
            result.contactsArray.map(e => {
                if (e.contactType.name === contactName.name) {
                    value = e.contact_data;
                }
            })
        }
        return value;
    }

    const onRemove = (item) => {
        const newData = [...locations];
        const index = newData.findIndex((it) => item.key === it.key);
        newData.splice(index, 1);
        setLocations(newData);
    };

    return (
        <Form
            name="basic"
            form={contactsForm}
            requiredMark={false}
            // onChange={onFinalChange}
            onFinish={onFinish}>
            <Form.Item name="locations"
                       className="add-club-row"
                       initialValue={locations}
            >
                <List
                    className="add-club-location-list"
                    itemLayout="horizontal"
                    dataSource={locations}
                    renderItem={item => (
                        <List.Item
                            actions={[
                                <div>
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
                                title={item?.name}
                                description={item?.address}
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
                    <Switch checkedChildren="Так" unCheckedChildren="Ні" onChange={onOnlineChange} checked={checked}/>
                </Form.Item>
            </div>
            <Form.Item
                label="Контакти"
                className="edit-club-row edit-club-contacts">
                {contacts.map(contact =>
                    <Form.Item name={`clubContact${contact.name}`}
                               className="edit-club-contact"
                               hasFeedback
                               initialValue={initialValue(contact)}
                    >
                        <Input className="edit-club-input"
                               placeholder="Заповніть поле"
                               suffix={<MaskIcon maskColor="#D9D9D9" iconUrl={contact.urlLogo}/>}
                               onChange={(e) => changeContacts(e, contact)}
                        />
                    </Form.Item>)}
            </Form.Item>
            <Button htmlType="submit" className="edit-club-button">Зберегти зміни</Button>

            <EditLocationModal
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

export default ContactsTab;