import {Button, Form, Input, List, Popconfirm, Select, Switch} from "antd";
import React, {useEffect, useState} from "react";
import MaskIcon from "../../MaskIcon";
import {getDistrictsByCityName} from "../../../service/DisctrictService";
import "../css/MainInformationTab.less"
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import EditLocationModal from "../locations/EditLocationModal";

const {Option} = Select;

const ContactsTab = ({contacts, cities, setResult, result}) => {
    const [contactsForm] = Form.useForm();
    const [locationForm] = Form.useForm();
    // const [cityName, setCityName] = useState(result.locations[0] !== undefined ?
    //     (result.locations[0].city !== undefined ? result.locations[0].city.name : result.locations[0].cityName) : null);
    // const [cityName, setCityName] = useState(result.locations[0] !== undefined ? )
    const [cityOnInput, setCityOnInput] = useState(null);
    const [inputAddressProps, setInputAddressProps] = useState({});
    const [districts, setDistricts] = useState([]);
    const [contacts_data, setContactsData] = useState({});
    const [checked, setChecked] = useState(result.isOnline !== undefined ? result.isOnline : false);
    const [locationVisible, setLocationVisible] = useState(false);
    const [editedLocation, setEditedLocation] = useState(null);
    // const [locations, setLocations] = useState([]);
    const [locations, setLocations] = useState(result.locations !== undefined ? result.locations : []);
    console.log(result.contacts);
    const parsedContacts = JSON.parse(JSON.parse(JSON.stringify(result.contacts).replaceAll("::", ":")));
    // useEffect(() => {
    //     getDistrictsByCityName(cityName).then(response => setDistricts(response));
    // }, [cityName]);
    console.log(result);

    const onFinish = (values) => {
        console.log(result);
        values.contacts = JSON.stringify(contacts_data).replaceAll(":", "::");
        console.log(values);
        console.log(locations);
        if (locations !== undefined) {
            for (const loc in locations) {
                console.log(locations[loc]);
                values.locations[loc] = {
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

        setResult(Object.assign(result, values));
        console.log(result);
    };

    const onOnlineChange = () => {
        if (checked) {
            setChecked(false);
            setResult({
                isOnline: false,
            });
        } else {
            setChecked(true);
            setResult({
                isOnline: true,
            });
        }
    }

    const changeContacts = (event, contact) => {
        setContactsData({
            ...contacts_data,
            [contact.id]: event.target.value
        });
        setResult({
            contacts: JSON.stringify(contacts_data).replaceAll(":", "::"),
        })
    };

    const onEdit = (item) => {
        console.log(item);
        locationForm.setFieldsValue({
            ...item,
        });
        // setEditedLocation(item);
        setEditedLocation({
            address: item.address,
            cityName: item.city !== undefined ? item.city.name : item.cityName,
            coordinates: item.latitude + ", " + item.longitude,
            districtName: item.district !== undefined ? item.district.name : item.districtName,
            name: item.name,
            stationName: item.station !== undefined ? item.station.name : item.stationName,
        });
        console.log(item);
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
            form={contactsForm}
            requiredMark={false}
            onFinish={onFinish}>
            <Form.Item name="locations"
                       className="add-club-row"
                // label="Локації"
                //        initialValue={result.locations}>
                       initialValue={locations}
            >
                <List
                    className="add-club-location-list"
                    itemLayout="horizontal"
                    // dataSource={result.locations}
                    dataSource={locations}
                    renderItem={item => (
                        // console.log(item),
                        <List.Item
                            actions={[
                                <div>
                                    {/*<EditOutlined key="edit" onClick={() => onEdit(item)} />*/}
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
                                // description={`Адреса: ${item?.address}`}
                                // description={`Адреса: ${item?.address.value?.structured_formatting.main_text}`}
                            />
                        </List.Item>
                    )}/>
                <span className="add-club-location" onClick={() => setLocationVisible(true)}>
                    Додати локацію
                </span>
            </Form.Item>
            <Form.Item
                label="Контакти"
                className="edit-club-row edit-club-contacts">

                {contacts.map(contact =>
                    <Form.Item name={`clubContact${contact.name}`}
                               className="edit-club-contact"
                               // initialValue={}
                        // initialValue={result[`clubContact${contact.name}`]}
                               hasFeedback
                    >
                        <Input className="edit-club-input"
                               placeholder="Заповніть поле"
                               suffix={<MaskIcon maskColor="#D9D9D9" iconUrl={contact.urlLogo}/>}
                               onChange={(e) => changeContacts(e, contact)}
                        />
                    </Form.Item>)}
            </Form.Item>
            {result.locations.length === 0 &&
            <div className="add-club-inline">
                <Form.Item name="isOnline"
                           className="add-club-row"
                           label="Доступний онлайн?"
                >
                    <Switch checkedChildren="Так" unCheckedChildren="Ні" onChange={onOnlineChange} checked={checked}/>
                </Form.Item>
            </div>}
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