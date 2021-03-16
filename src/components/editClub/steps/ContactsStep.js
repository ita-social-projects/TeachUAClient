import {Button, Form, Input, message, Select} from "antd";
import React, {useEffect, useState} from "react";
import EditClubContentFooter from "../EditClubContentFooter";
import EditClubInputAddress from "../EditClubInputAddress";
import MaskIcon from "../../MaskIcon";
import {geocodeByAddress, getLatLng} from "react-google-places-autocomplete";
import {getDistrictsByCityName} from "../../../service/DisctrictService";
import "../css/MainInformationTab.less"

const {Option} = Select;

const ContactsStep = ({contacts, cities, setResult, result}) => {
    const [contactsForm] = Form.useForm();
    const [cityName, setCityName] = useState(null);
    const [cityOnInput, setCityOnInput] = useState(null);
    const [inputAddressProps, setInputAddressProps] = useState({});
    const [districts, setDistricts] = useState([]);

    useEffect(() => {
        getDistrictsByCityName(cityName).then(response => setDistricts(response));
    }, [cityName]);

    const onFinish = (values) => {
        if (inputAddressProps.validateStatus === 'error') {
            message.error("Некоректно вибрана адреса");
            return;
        }

        geocodeByAddress(values.address.label)
            .then(results => getLatLng(results[0]))
            .then(({lat, lng}) => {
                values.latitude = lat;
                values.longitude = lng;

                setResult(Object.assign(result, values));
            });
    };

    const handleSelect = address => {
        setInputAddressProps({validateStatus: 'success'});
        setCityOnInput(cityName);
    };

    return (
        <Form
            name="basic"
            form={contactsForm}
            requiredMark={false}
            onFinish={onFinish}>

            <div className="edit-club-inline">
                <Form.Item name="cityName"
                           className="edit-club-row"
                           label="Місто"
                           initialValue={result.city.name}>
                    <Select
                        className="edit-club-select"
                        placeholder="Виберіть місто"
                        onChange={(value) => {
                            if (cityName) {
                                cityOnInput === value ?
                                    setInputAddressProps({validateStatus: 'success'}) :
                                    setInputAddressProps({validateStatus: 'error'});
                            }

                            setCityName(value);
                        }}
                        optionFilterProp="children">
                        {cities.map(city => <Option
                            value={city.name}>{city.name}</Option>)}

                    </Select>
                </Form.Item>
                <Form.Item name="districtName"
                           className="edit-club-row"
                           label="Район"
                           initialValue={result.district.name}
                           >
                    <Select
                        className="edit-club-select"
                        placeholder="Виберіть район"
                        optionFilterProp="children">
                        {districts.map(district => <Option value={district.name}>{district.name}</Option>)}
                    </Select>
                </Form.Item>
            </div>
            <Form.Item name="address"
                       className="edit-club-row"
                       label="Адреса"
                       validateTrigger={handleSelect}
                       {...inputAddressProps}
            >
                <EditClubInputAddress
                    placeholder={result.address}
                    form={contactsForm}
                    inputText={result.address && result.address.label}
                    setCityName={setCityName}
                    onChange={handleSelect}/>
            </Form.Item>
            <Form.Item
                label="Контакти"
                className="edit-club-row edit-club-contacts">
                {contacts.map(contact =>
                    <Form.Item name={`clubContact${contact.name}`}
                               className="edit-club-contact"
                               initialValue={result[`clubContact${contact.name}`]}
                               >
                        <Input className="edit-club-input"
                               placeholder="Заповніть поле"
                               suffix={<MaskIcon maskColor="#D9D9D9" iconUrl={contact.urlLogo}/>}/>
                    </Form.Item>)}
            </Form.Item>
            <Button htmlType="submit" onClick={onFinish} className="edit-club-button">Зберегти зміни</Button>
        </Form>
    )
};

export default ContactsStep;