import React from 'react';
import {Button, Form, Input} from "antd";
import {MailOutlined, PhoneOutlined} from "@ant-design/icons";

const RegistrationInput = ({disabledButton}) => {
    return (
        <div className="registration-input-box">
            <div className="registration-or"><span className="label-or">або</span></div>
            <div className="registration-column">
                <Form.Item name="lastName"
                           className="registration-input"
                           label="Прізвище"
                           hasFeedback
                           rules={[{
                               required: true,
                           }]}>
                    <Input className="registration-box"
                           placeholder="Введіть ваше прізвище"/>
                </Form.Item>
                <Form.Item name="firstName"
                           className="registration-input"
                           label="Ім'я"
                           hasFeedback
                           rules={[{required: true}]}>
                    <Input className="registration-box"
                           placeholder="Введіть ваше ім'я"/>
                </Form.Item>
                <Form.Item name="phone"
                           className="registration-input"
                           label="Телефон"
                           initialValue="+380"
                           hasFeedback
                           rules={[{
                               required: true,
                           }]}>
                    <Input className="registration-box"
                           placeholder="+38(___) ___ __ __"
                           pattern="^\+?3?8?(0\d{9})$"
                           suffix={<PhoneOutlined className="phone-icon"/>}/>
                </Form.Item>
                <Form.Item name="email"
                           className="registration-input"
                           label="Емейл"
                           hasFeedback
                           rules={[{
                               required: true,
                               type: 'email'
                           }]}>
                    <Input className="registration-box"
                           placeholder="Введіть ваш емейл"
                           suffix={<MailOutlined className="mail-icon"/>}/>
                </Form.Item>
                <Form.Item name="password"
                           className="registration-input"
                           label="Пароль"
                           hasFeedback
                           rules={[{
                               required: true,
                           }]}>
                    <Input.Password className="registration-box"
                                    autoComplete="on"
                                    placeholder="Введіть ваш пароль"/>
                </Form.Item>
            </div>
            <Form.Item>
                <div className="registration-footer">
                        <Button className="registration-button"
                                htmlType="submit"
                                disabled={disabledButton}>
                            Зареєструватися
                        </Button>
                </div>
            </Form.Item>
        </div>
    )
};

export default RegistrationInput;
