import React from 'react';
import {Button, Form, Input, Layout, Select, Tooltip} from "antd";
import {MailOutlined, PhoneOutlined} from "@ant-design/icons";

const LoginInput = () => {
    return (
        <div>
            <div className="registration-or"><span className="label-or">або</span></div>
            <div className="registration-column">
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
                           suffix={<MailOutlined classname="mail-icon"/>}/>
                </Form.Item>

                <Form.Item name="password"
                           className="registration-input"
                           label="Пароль"
                           hasFeedback
                           rules={[{
                               required: true,
                           }]}>
                    <Input.Password className="registration-box"
                                    placeholder="Введіть ваш пароль"/>
                </Form.Item>
            </div>
            <Form.Item>
                <div className="registration-footer">
                    <Button className="registration-button"
                            htmlType="submit">
                        __Увійти__
                    </Button>
                </div>
            </Form.Item>
        </div>
    )
};

export default LoginInput;