import {Button, Form, Input, Select} from "antd";
import EditClubInputAddress from "../../editClub/EditClubInputAddress";
import MaskIcon from "../../MaskIcon";
import React, {useEffect, useState} from "react";
import EditCenterContentFooter from "../EditCenterFooter";
import {updateCenterById} from "../../../service/CenterService";
import {logDOM} from "@testing-library/react";


const {Option} = Select;

const ContactTab = ({contacts, cities, center,setResult,result}) => {
    const [locations, setLocations] = useState([])
    const [city, setCity] = useState()
    const [contacts_data, setContactsData] = useState({});
    const [contactValue, setContactValue] = useState();
    const [someContact, setSome] = useState([]);


    const onFinish = (values) => {
        values.contacts = JSON.stringify(contacts_data).replaceAll(":", "::");
        setResult(Object.assign(result,values))
        console.log(result)
        updateCenterById(result).then(response => console.log(response))

    }

    const onChange = (values) => {
        setResult(Object.assign(result,values.target))
        console.log(result)
    }
    useEffect(() => {
        center.contacts.map(e => setContactsData(Object.assign({...contacts_data,[e.contactType.id]:e.contact_data})))
        console.log(contacts_data)
    }, [])

    const changeContacts = (e, contact) => {
         setContactsData(Object.assign({...contacts_data ,[contact.id]: e.target.value}))
         const newContact = JSON.stringify(contacts_data).replaceAll(":", "::")
        setResult(Object.assign(result,newContact))
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