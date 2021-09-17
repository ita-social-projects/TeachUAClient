import {Button, Form, Input, Select} from "antd";
import EditClubInputAddress from "../../editClub/EditClubInputAddress";
import MaskIcon from "../../MaskIcon";
import React, {useEffect, useState} from "react";
import EditCenterContentFooter from "../EditCenterFooter";
import {updateCenterById} from "../../../service/CenterService";
import {logDOM} from "@testing-library/react";


const {Option} = Select;

const ContactTab = ({contacts, cities, center,setResult,result,contacts_data,setContactsData,locations}) => {



    const onFinish = (values) => {
        if (locations !== []) {
            for (const loc in locations) {
                result.locations[loc] = {
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
        else {
            values.locations = locations;
        }
        values.contacts = JSON.stringify(contacts_data).replaceAll(":", "::");
        console.log(result)
        setResult(Object.assign(result,values))

        updateCenterById(result).then(response => console.log(response))

    }

    useEffect(() => {
    }, [])

    const changeContacts = (e, contact) => {
        setContactsData({
            ...contacts_data,
            [contact.id]: e.target.value
        });
        const parsedContact = JSON.stringify(contacts_data).replaceAll(":", "::");
        setResult({...result, contacts: parsedContact})
        };


    const initialValue = (contactName) => {
        let value = "";
        center.contacts.map(e => {
                if (e.contactType.name === contactName.name) {
                    value = e.contact_data;
                }
            }
        )

        return value
    }

    const isEmailField = (contact) => {
        return contact.name === "Пошта";
    }

    const isPhoneField = (contact) => {
        return contact.name === "Phone";
    }

    return (
        <Form
            onFinish={onFinish}
            name="edit-center-contactForm">
            <Form.Item
                label="Контакти"
                className="add-club-row add-club-contacts"
                name="contacts"

            >
                {contacts.map(contact =>
                    <Form.Item name={`contact${contact.name}`}
                               className="edit-center-contact"
                               initialValue={initialValue(contact)}
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
                        <Input className="add-center-input"
                               name={contact.name}
                               prefix={isPhoneField(contact) ? "+380" : undefined}
                               placeholder={isPhoneField(contact) ? "__________" : "Заповніть поле"}
                               onChange={(e) => changeContacts(e, contact)}
                               suffix={<MaskIcon maskColor="#D9D9D9" iconUrl={contact.urlLogo}/>}/>
                    </Form.Item>)}
            </Form.Item>
            <Button htmlType="submit" className="edit-club-button">Зберегти зміни</Button>
        </Form>
    )
}
export default ContactTab