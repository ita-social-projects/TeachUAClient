import {Form, Input, Select, Tag} from "antd";
import React, {useState} from "react";
import AddClubContentFooter from "../AddClubContentFooter";
import AddClubInputAddress from "../AddClubInputAddress";
import MaskIcon from "../../MaskIcon";
import {geocodeByAddress, getLatLng} from "react-google-places-autocomplete";

const {Option} = Select;

const ContactsStep = ({contacts, cities, district, step, setStep, setResult, result}) => {
    const [contactsForm] = Form.useForm();
    const [validateStatus, setValidateStatus] = useState({});

    const onFinish = (values) => {
        geocodeByAddress(values.address.label)
            .then(results => getLatLng(results[0]))
            .then(({lat, lng}) => {
                values.latitude = lat;
                values.longitude = lng;

                setResult(Object.assign(result, values));
                setStep(2);
            });
    };

    const handleSelect = address => {
        setValidateStatus({validateStatus: 'success'});
    };

    return (
        <Form
            name="basic"
            form={contactsForm}
            requiredMark={false}
            onFinish={onFinish}>

            <div className="add-club-inline">
                <Form.Item name="cityName"
                           className="add-club-row"
                           label="Місто"
                           hasFeedback
                           initialValue={result.clubCity}
                           rules={[{
                               required: true,
                           }]}>
                    <Select
                        className="add-club-select"
                        placeholder="Виберіть місто"
                        optionFilterProp="children">
                        {cities.map(city => <Option value={city.name}>{city.name}</Option>)}
                    </Select>
                </Form.Item>
                <Form.Item name="districtName"
                           className="add-club-row"
                           label="Район"
                           initialValue={result.clubDistrict}
                           hasFeedback>
                    <Select
                        className="add-club-select"
                        placeholder="Виберіть район"
                        optionFilterProp="children">
                        {cities.map(city => <Option value={city.name}>{city.name}</Option>)}
                        {/*{districts.map(district => <Option value={district.name}>{district.name}</Option>)}*/}
                    </Select>
                </Form.Item>
            </div>
            <Form.Item name="address"
                       className="add-club-row"
                       label="Адреса"
                       hasFeedback
                       validateTrigger={handleSelect}
                       rules={[{
                           required: true,
                       }]}
                       {...validateStatus}>
                <AddClubInputAddress
                    placeholder="Введіть адресу гуртка"
                    form={contactsForm}
                    onChange={handleSelect}/>
            </Form.Item>
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
        </Form>
    )
};

export default ContactsStep;