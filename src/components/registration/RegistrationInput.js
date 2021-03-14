import React from 'react';
import {Button, Form, Input} from 'antd';
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
                               message: 'Поле необхідне для введення',
                           },
                               {
                                   pattern: /^([А-Я,І][а-я,і]{1,50}|[A-Z][a-z]{1,23})$/,
                                   message: 'Невірний формат прізвища',
                               }]}>
                    <Input className="registration-box"
                           placeholder="Введіть ваше прізвище"/>
                </Form.Item>
                <Form.Item name="firstName"
                           className="registration-input"
                           label="Ім'я"
                           hasFeedback
                           rules={[{
                               required: true,
                               message: 'Поле необхідне для введення',
                           },
                               {
                                   pattern: /^([А-Я,І][а-я,і]{1,50}|[A-Z][a-z]{1,23}|[А-Я,І][а-я]{1,50}\-[А-Я,І][а-я,і]{1,50})$/,
                                   message: 'Невірний формат імені',
                               }]}>
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
                               message: 'Поле необхідне для введення'
                           },
                               {
                                   pattern: /^\+?[3]?[8]?[0][-\(]?\d{2}\)?-?\d{3}-?\d{2}-?\d{2}$/,
                                   message: 'Телефон введено невірно'
                               }]}>
                    <Input className="registration-box"
                           placeholder="+38(___) ___ __ __"
                           suffix={<PhoneOutlined className="phone-icon"/>}/>
                </Form.Item>
                <Form.Item name="email"
                           className="registration-input"
                           label="Емейл"
                           hasFeedback
                           rules={[{
                               required: true,
                               message: 'Поле необхідне для введення'
                           },
                               {
                                   type: 'email',
                                   message: 'Введено не валідний емейл',
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
                               message: 'Поле необхідне для введення'
                           },
                               {
                                   pattern: /^\S{6,}$/,
                                   message: 'Невірний формат паролю'
                               },
                               {
                                   min: 6,
                                   message: 'Пароль повинен бути довшим ніж 6 символів'
                               }
                           ]}>
                    <Input.Password className="registration-box"
                                    placeholder="Введіть ваш пароль"/>
                </Form.Item>
                <Form.Item name="confirm"
                           className="registration-input"
                           label="Пароль"
                           hasFeedback
                           rules={[
                               {
                                   required: true,
                                   message: 'Поле необхідне для введення',

                               },
                               ({getFieldValue}) => ({
                                   validator(_, value) {
                                       if (!value || getFieldValue('password') === value) {
                                           return Promise.resolve();
                                       }

                                       return Promise.reject(new Error('Паролі повинні відповідати один-одному'));
                                   },
                               }),
                           ]}
                >
                    <Input.Password className="registration-box"
                                    placeholder="Підтвердіть ваш пароль"/>
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
