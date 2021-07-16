import {Button, Form, Input, Select} from "antd";
import EditClubInputAddress from "../../editClub/EditClubInputAddress";
import MaskIcon from "../../MaskIcon";
import React, {useEffect, useState} from "react";
import EditCenterContentFooter from "../EditCenterFooter";


const {Option} = Select;

const ContactTab = ({contacts, cities, center}) => {
    const [locations, setLocations] = useState([])
    const [city, setCity] = useState()
    const [contacts_data, setContactsData] = useState({});
    const [contactValue, setContactValue] = useState();
    const [someContact, setSome] = useState([]);
    useEffect(() => {
        console.log(center.contacts)
    }, [])
    const changeContacts = (event, contact) => {
        setContactsData({
            ...contacts_data,
            [contact.id]: event.target.value
        });
    };

    const initialValue = (contactName) => {
        let value = "";
        center.contacts.map(e => {
                console.log(contactName.name + " " + e.contact_data + " " + e.contactType.name);
                if (e.contactType.name === contactName.name) {
                    console.log(e)
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
        <Form name="edit-center-contactForm">
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

            <EditCenterContentFooter/>
        </Form>
    )
}
export default ContactTab