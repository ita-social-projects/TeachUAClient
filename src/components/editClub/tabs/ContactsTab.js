import {Button, Form, Input, List, message, Popconfirm, Select, Switch, Tooltip} from "antd";
import React, {useEffect, useState} from "react";
import EditClubContentFooter from "../EditClubContentFooter";
import EditClubInputAddress from "../EditClubInputAddress";
import MaskIcon from "../../MaskIcon";
import {geocodeByAddress, getLatLng} from "react-google-places-autocomplete";
import {getDistrictsByCityName} from "../../../service/DisctrictService";
import "../css/MainInformationTab.less"
import InfoCircleOutlined from "@ant-design/icons/lib/icons/InfoCircleOutlined";
import AddLocationModal from "../../addClub/location/AddLocationModal";
import EditOutlined from "@ant-design/icons/lib/icons/EditOutlined";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import EditLocationModal from "../locations/EditLocationModal";

const {Option} = Select;

const ContactsTab = ({contacts, cities, setResult, result}) => {
    const [contactsForm] = Form.useForm();
    const [locationForm] = Form.useForm();
    console.log(result.locations[0]);
    const [cityName, setCityName] = useState(result.locations[0] !== undefined ?
        (result.locations[0].city !== undefined ? result.locations[0].city.name : result.locations[0].cityName) : null);
    const [cityOnInput, setCityOnInput] = useState(null);
    const [inputAddressProps, setInputAddressProps] = useState({});
    const [districts, setDistricts] = useState([]);
    const [contacts_data, setContactsData] = useState({});
    const [checked, setChecked] = useState(result.isOnline !== undefined ? result.isOnline : false);
    const [locationVisible, setLocationVisible] = useState(false);
    const [editedLocation, setEditedLocation] = useState(null);
    // const [locations, setLocations] = useState([]);
    const [locations, setLocations] = useState(result.locations !== undefined ? result.locations : []);
    console.log(locations);
    useEffect(() => {
        getDistrictsByCityName(cityName).then(response => setDistricts(response));
    }, [cityName]);
    console.log(result);

    const onFinish = (values) => {
        console.log(result);
        values.contacts = JSON.stringify(contacts_data).replaceAll(":", "::");
        // values.locations = [{
        //     cityName: cityName,
        //     address: values.address,
        //     coordinates: result.locations[0].latitude + ", " + result.locations[0].longitude,
        //     districtName: values.districtName,
        //     key: result.locations[0].key,
        //     name: result.locations[0].name,
        //     phone: result.locations[0].phone,
        //     stationName: result.locations[0].station.name,
        // }]
        console.log(values);
        console.log(values.locations);
        setResult(Object.assign(result, values));
        console.log(result);
        // });
    };

    const onChange = () => {
        if (checked) {
            setChecked(false);
        } else {
            setChecked(true);
        }
    }

    const changeContacts = (event, contact) => {
        setContactsData({
            ...contacts_data,
            [contact.id]: event.target.value
        });
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

    // const handleSelect = address => {
    //     setInputAddressProps({validateStatus: 'success'});
    //     setCityOnInput(cityName);
    // };

    return (
        <Form
            name="basic"
            form={contactsForm}
            requiredMark={false}
            onFinish={onFinish}>
            {/*{cityName !== null &&*/}
            {/*<div className="edit-club-inline">*/}
            {/*    <Form.Item name="cityName"*/}
            {/*               className="edit-club-row"*/}
            {/*               label="Місто"*/}
            {/*               initialValue={cityName}*/}
            {/*    >*/}
            {/*        <Select*/}
            {/*            className="edit-club-select"*/}
            {/*            placeholder="Виберіть місто"*/}
            {/*            onChange={(value) => {*/}
            {/*                if (cityName) {*/}
            {/*                    cityOnInput === value ?*/}
            {/*                        setInputAddressProps({validateStatus: 'success'}) :*/}
            {/*                        setInputAddressProps({validateStatus: 'error'});*/}
            {/*                }*/}
            {/*                setCityName(value);*/}
            {/*            }}*/}
            {/*            optionFilterProp="children">*/}
            {/*            {cities.map(city => <Option*/}
            {/*                value={city.name}>{city.name}</Option>)}*/}
            {/*        </Select>*/}
            {/*    </Form.Item>*/}
            {/*    <Form.Item name="districtName"*/}
            {/*               className="edit-club-row"*/}
            {/*               label="Район"*/}
            {/*               initialValue={result.locations[0].district.name}*/}
            {/*    >*/}
            {/*        <Select*/}
            {/*            className="edit-club-select"*/}
            {/*            placeholder="Виберіть район"*/}
            {/*            optionFilterProp="children">*/}
            {/*            {districts.map(district => <Option value={district.name}>{district.name}</Option>)}*/}
            {/*        </Select>*/}
            {/*    </Form.Item>*/}
            {/*</div>}*/}
            {/*{cityName !== null &&*/}
            {/*<Form.Item name="address"*/}
            {/*           className="edit-club-row"*/}
            {/*           label="Адреса"*/}
            {/*           rules={[{*/}
            {/*               required: true,*/}
            {/*               message: "Це поле є обов'язковим"*/}
            {/*           }]}*/}
            {/*           hasFeedback*/}
            {/*           initialValue={result.locations[0].address}*/}
            {/*>*/}
            {/*    <Input className="add-club-input"*/}
            {/*           placeholder="Адреса"*/}
            {/*    />*/}
            {/*</Form.Item>}*/}
            <Form.Item name="locations"
                       className="add-club-row"
                       label="Локації"
                       initialValue={result.locations}>
                <List
                    className="add-club-location-list"
                    itemLayout="horizontal"
                    dataSource={result.locations}
                    renderItem={item => (
                        <List.Item
                            actions={[
                                <div>
                                    <EditOutlined key="edit" onClick={() => onEdit(item)} />
                                    <Popconfirm key="delete"
                                                title="Видалити локацію?"
                                                cancelText="Ні"
                                                okText="Так"
                                                cancelButtonProps={{ className: "popConfirm-cancel-button" }}
                                                okButtonProps={{ className: "popConfirm-ok-button" }}
                                                onConfirm={() => onRemove(item)}>
                                        <DeleteOutlined />
                                    </Popconfirm>
                                </div>]}
                        >
                            <List.Item.Meta
                                title={item?.name}
                                description={`Адреса: ${item?.address}`}
                                // description={`Адреса: ${item?.address.value?.structured_formatting.main_text}`}
                            />
                        </List.Item>
                    )} />
                <span className="add-club-location" onClick={() => setLocationVisible(true)}>
                    Додати локацію
                </span>
            </Form.Item>
            {cityName === null &&
            <span className="add-club-location" onClick={() => setLocationVisible(true)}>
                    Додати локацію
            </span>}
            <Form.Item
                label="Контакти"
                className="edit-club-row edit-club-contacts">
                {contacts.map(contact =>
                    <Form.Item name={`clubContact${contact.name}`}
                               className="edit-club-contact"
                        // initialValue={result.contacts}
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
            {cityName !== null &&
            <div className="add-club-inline">
                <Form.Item name="isOnline"
                           className="add-club-row"
                           label="Доступний онлайн?"
                >
                    <Switch checkedChildren="Так" unCheckedChildren="Ні" onChange={onChange} checked={checked}/>
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
                cities={cities} />
        </Form>
    )
};

export default ContactsTab;