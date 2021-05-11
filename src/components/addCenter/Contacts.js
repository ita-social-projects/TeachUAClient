import { Form, Input } from 'antd';
import React, { useEffect } from 'react';
import MaskIcon from '../MaskIcon';
import "./css/Contacts.css";

const Contacts = ({ step, setStep, contacts, result, setResult }) => {
    const [contactsForm] = Form.useForm();

    useEffect(() => {
        if (result) {
            contactsForm.setFieldsValue({ ...result });
        }
    }, [])


    const nextStep = () => {
        console.log("FIELDS VALUE")
        console.log(contactsForm.getFieldValue());
        setStep(step + 1);
    }

    const prevStep = () => {
        setResult(Object.assign(result, contactsForm.getFieldValue()));
        setStep(step - 1);
    }

    const onFinish = (values) => {
        console.log("VALUES")
        console.log(values);
        setResult(Object.assign(result, values));
        nextStep();
        contactsForm.resetFields();
    }


    return (
        <Form
            name="contacts"
            className="contacts"
            onFinish={onFinish}
            form={contactsForm}
        >
            <div className="form-fields">
                <Form.Item
                    label="Контакти"
                    className="add-club-row add-club-contacts">
                    {contacts.map(contact =>
                        <Form.Item name={`clubContact${contact.name}`}
                            className="add-club-contact"
                            initialValue={result[`clubContact${contact.name}`]}
                            hasFeedback
                        >
                            <Input className="add-club-input"
                                placeholder="Заповніть поле"
                                suffix={<MaskIcon maskColor="#D9D9D9" iconUrl={contact.urlLogo} />} />
                        </Form.Item>)}
                </Form.Item>
            </div>
            <div className="btn">
                <button className="prev-btn" type="button" onClick={prevStep}>Назад</button>
                <button className="next-btn" htmlType="submit">Наступний крок</button>
            </div>
        </Form >
    )
}

export default Contacts;