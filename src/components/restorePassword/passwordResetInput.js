import React from 'react';
import {Button, Form, Input} from "antd";
import "../userPage/css/User.less"

const PasswordResetInput = () => {

    const queryParams = new URLSearchParams(window.location.search);
    return (

        <div className="user-edit-column">

            <Form.Item name="verificationCode"
                       initialValue={queryParams.get('code')}/>

            <Form.Item name="password"
                       className="user-edit-input"
                // label="Пароль"
                       hasFeedback
                       rules={[
                           {
                               pattern: /^\S{8,20}$/,
                               message: 'Пароль не може бути коротшим, ніж 8 та довшим, ніж 20 символів'

                           },
                           {
                               pattern: /[а-щА-ЩїюьяЇЮЯЄє0-9A-Za-z~`!@#$%^&()_=+{}[\]/|:;"<>?]/,
                               message: "Пароль повинен містити великі/маленькі літери, цифри та спеціальні символи"
                           },
                       ]}>
                <Input.Password className="login-box"
                                placeholder="Введіть новий пароль"/>

            </Form.Item>
            <Form.Item name="new-password"
                       className="user-edit-input"
                       hasFeedback
                       rules={[
                           /*{
                               pattern: /^\S{8,20}$/,
                               message: 'Пароль не може бути коротшим, ніж 8 та довшим, ніж 20 символів'

                           },
                           {
                               pattern: /[а-щА-ЩїюьяЇЮЯЄє0-9A-Za-z~`!@#$%^&()_=+{}[\]/|:;"<>?]/,
                               message: "Пароль повинен містити великі/маленькі літери, цифри та спеціальні символи"
                           },*/
                           ({getFieldValue}) => ({
                               validator(_, value) {
                                   if (getFieldValue('password') === value) {
                                       return Promise.resolve();
                                   }

                                   return Promise.reject(new Error('Значення поля ‘Підтвердити новий пароль’ має бути еквівалентним значенню поля ‘Новий пароль’'));
                               },

                           })]}>
                <Input.Password className="login-box"
                                placeholder="Введіть новий пароль повторно"/>

            </Form.Item>

            <div><p></p></div>
            <Form.Item>
                <div className="user-edit-footer">
                    <Button className="submit-button"
                            htmlType="submit">
                        Змінити пароль
                    </Button>
                </div>
            </Form.Item>
        </div>
    )
};

export default PasswordResetInput;