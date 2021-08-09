import { Form, Input, List, message, Popconfirm, Select, Switch, Tooltip } from "antd";
import React, { useState, useEffect } from "react";
import AddClubContentFooter from "../AddClubContentFooter";
import MaskIcon from "../../MaskIcon";
import EditOutlined from "@ant-design/icons/lib/icons/EditOutlined";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import InfoCircleOutlined from "@ant-design/icons/lib/icons/InfoCircleOutlined";

import {Button} from "antd";
import {getDistrictsByCityName} from "../../../service/DisctrictService";

const {Option} = Select;

const ContactsStep = ({ form, contacts, cities, step, setStep, setResult, result, locations}) => {
    const [mainForm] = Form.useForm();
    const [cityOnInput, setCityOnInput] = useState(null);
    const [inputAddressProps, setInputAddressProps] = useState({});
    const [contacts_data, setContactsData] = useState({});
    const [districts, setDistricts] = useState([]);
    const [cityName, setCityName] = useState(null);
    const [contactsForm] = Form.useForm();
    const [locationForm, setLocationForm] = useState({
        locationName: "",
        cityName: "",
        inputAddress:""
    })

    useEffect(() => {
        getDistrictsByCityName(cityName).then(response => setDistricts(response));
        if (result) {
            contactsForm.setFieldsValue({ ...result });
        }
    }, [cityName]);

    const nextStep = () => {
        console.log("FIELDS VALUE")
        console.log(contactsForm.getFieldValue());
        console.log();
        setStep(step + 1);
    }

    const prevStep = () => {
        setResult(Object.assign(result, contactsForm.getFieldValue()));
        setStep(step - 1);
    }

    const onFinish = (values) => {
        console.log("================= values in onFinish");
        console.log(values);

        values.locations = locations;

        setResult(Object.assign(result, values));
        console.log(result);
        nextStep();
        contactsForm.resetFields();
    };

    const onChange = e => {
        const formFields = mainForm.getFieldValue();
    }


    const changeContacts = (event, contact) => {
        setContactsData({
            ...contacts_data,
            [contact.id]: event.target.value
        });
    };
    const isEmailField = (contact) => {
        return contact.name === "Пошта";
    }

    const isPhoneField = (contact) => {
        return contact.name === "Телефон";
    }

    return (
        <Form
            name="basic"
            requiredMark={false}
            form={contactsForm}
            onFinish={onFinish}
        >
            <Form.Item name="cityName"
                       className="add-club-row"
                       label="Місто"
                       initialValue={cityName}
                       hasFeedback
                       rules={[{
                           required: true,
                           message: "Це поле є обов'язковим"
                       }]}>
                <Select
                    onClick={onChange}
                    className="add-club-input"
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
                       className="add-club-row"
                       label="Район міста"
                       hasFeedback
                       rules={[{
                           required: true,
                           message: "Це поле є обов'язковим"
                       }]}>
                <Select
                    className="add-club-input"
                    placeholder="Виберіть район"
                    optionFilterProp="children">
                    {districts.map(district => <Option value={district.name}>{district.name}</Option>)}
                </Select>
            </Form.Item>
            <Form.Item name="address"
                       className="add-club-row"
                       label="Адреса"
                       hasFeedback
                       rules={[{
                           required: true,
                           message: "Це поле є обов'язковим"
                       },{
                           required: true,
                           pattern: /^(?!\s)([\wА-ЩЬЮЯҐЄІЇа-щьюяґєії !"#$%&'()*+,\-.\/:;<=>?@[\]^_`{}~]){5,100}$/,
                           message: "Некоректна адреса",
                       }]}>
                <Input className="add-club-input"
                       placeholder="Адреса"
                />
            </Form.Item>
            <Form.Item
                label="Контакти"
                className="add-club-row"
                name="contacts"
            >
                {contacts.map(contact =>
                    <Form.Item name={`contact${contact.name}`}
                               className="add-club-input"
                               initialValue={result[`contact${contact.name}`]}
                               rules={[
                                   isEmailField(contact) &&
                                   {
                                       required: false,
                                       type: "email",
                                       message: "Некоректний формат email"
                                   },
                                   isPhoneField(contact) &&
                                   {
                                       required: true,
                                       message: "Введіть номер телефону"
                                   },
                                   isPhoneField(contact) &&
                                   {
                                       required: false,
                                       pattern: /^[^-`~!@#$%^&*()_+={}\[\]|\\:;“’'<,>.?๐฿]*$/,
                                       message: "Телефон не може містити спеціальні символи"
                                   },
                                   isPhoneField(contact) && {
                                       required: false,
                                       pattern: /^.{9}$/,
                                       message: "Телефон не відповідає вказаному формату"
                                   },
                                   isPhoneField(contact) && {
                                       required: false,
                                       pattern: /^[^A-Za-zА-Яа-яІіЇїЄєҐґ]*$/,
                                       message: "Телефон не може містити літери"
                                   }
                               ]}
                               hasFeedback>
                        <Input className="add-club-input"
                               name={contact.name}
                               prefix={isPhoneField(contact) ?"+380" :undefined}
                               placeholder={isPhoneField(contact) ?"__________" :"Заповніть поле"}
                               onChange={(e) => changeContacts(e, contact)}
                               suffix={<MaskIcon maskColor="#D9D9D9" iconUrl={contact.urlLogo} />} />
                    </Form.Item>)}
            </Form.Item>

            <div className="add-club-content-footer">
                <Button ghost={true} className="add-club-content-prev" type="button" onClick={prevStep}>Назад</Button>
                <Button className="flooded-button add-club-content-next" htmlType="submit">Наступний крок</Button>
            </div>
        </Form>
    )
};

export default ContactsStep;
