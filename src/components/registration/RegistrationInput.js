import React from 'react';
import {Button, Form, Input, Layout, Select} from "antd";
import {MailOutlined, PhoneOutlined} from "@ant-design/icons";

const RegistrationInput = ({disabledButton}) => {
    return (
        <div>
            <div className="registration-or"><span className="label-or">або</span></div>
            <div className="registration-column">
                <Form.Item name="lastName"
                           label="Прізвище"
                           rules={[{
                               required: true,
                           }]}>
                    <div className="registration-row">
                        <span className="label">Прізвище</span>
                        <div className="registration-box">
                            <Input className="registration-input"
                                   placeholder="Введіть ваше прізвище"/>
                        </div>
                    </div>
                </Form.Item>
                <Form.Item name="firstName"
                           label="Ім'я"
                           rules={[{required: true}]}>
                    <div className="registration-row">
                        <span className="label">Ім'я</span>
                        <div className="registration-box">
                            <Input className="registration-input"
                                   placeholder="Введіть ваше ім'я"/>
                        </div>
                    </div>
                </Form.Item>
                <Form.Item name="phone"
                           label="Телефон"
                           rules={[{
                               required: true,
                           }]}>
                    <div className="registration-row">
                        <span className="label">Телефон</span>
                        <div className="registration-box">
                            <Input className="registration-input"
                                   defaultValue="+380"
                                   placeholder="+38(___) ___ __ __"
                                   suffix={<PhoneOutlined className="phone-icon"/>}/>
                        </div>
                    </div>
                </Form.Item>
                <Form.Item name="email"
                           label="Емейл"
                           rules={[{
                               required: true,
                               type: 'email'
                           }]}>
                    <div className="registration-row">
                        <span className="label">Email</span>
                        <div className="registration-box">
                            <Input className="registration-input"
                                   placeholder="Введіть ваш емейл"
                                   suffix={<MailOutlined classname="mail-icon"/>}/>
                        </div>
                    </div>
                </Form.Item>
                <Form.Item name="password"
                           label="Пароль"
                           rules={[{
                               required: true,
                           }]}>
                    <div className="registration-row">
                        <span className="label">Пароль</span>
                        <div className="registration-box">
                            <Input.Password className="registration-input"
                                            placeholder="Введіть ваш пароль"/>
                        </div>
                    </div>
                </Form.Item>
            </div>
            <Form.Item>
                <div className="registration-footer">
                    <Button className="registration-button"
                            htmlType="submit"
                            style={{opacity: disabledButton === false ? '1' : '0.4'}}
                            disabled={disabledButton}>
                        Зареєструватися
                    </Button>
                </div>
            </Form.Item>
        </div>
    )
};

export default RegistrationInput;
