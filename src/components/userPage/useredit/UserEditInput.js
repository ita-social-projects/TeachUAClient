import React, {useState} from 'react';
import {Button, Checkbox, Form, Input, message, Modal, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {UPLOAD_IMAGE_URL} from "../../../service/config/ApiConfig";





export const PasswordUpdate = (isSelected) => {
    return (
        <div>
            <Form.Item
                name="currentPassword"
                className="user-edit-input"
              //  initialValue=" "
                hasFeedback
                alert="Необхідне поле"
                rules={[{
                    required: false,
                    message: "Введіть старий пароль",
                    //type:"password"
                    //pattern: /^\S{8,20}$/,

                },
                    {
                        message: 'Невірний пароль',
                    }]}>
                <Input.Password
                    className="user-edit-box"
                    placeholder="Введіть діючий пароль"
                />
            </Form.Item>

            <Form.Item
                id="password"
                name="password"
                className="user-edit-input"
              //  initialValue=" "
                hasFeedback
                alert="Необхідне поле"
                rules={[{
                    required: false,
                    message: 'Введіть новий пароль',
                },
                    {
                        //pattern: /^\S{8,20}$/,
                        message: 'Пароль не може бути коротшим, ніж 8 та довшим, ніж 20 символів'

                    },
                    ({getFieldValue}) => ({
                        validator(_, value) {
                            if (getFieldValue('currentPassword') != value) {
                                return Promise.resolve();
                            }

                            return Promise.reject(new Error('Значення поля ‘Новий пароль’ має відрізнятися від значення поля ‘Старий пароль’'));
                        },

                    }),

                ]}>
                <Input.Password
                    className="user-edit-box"
                    placeholder="Введіть новий пароль"
                />

            </Form.Item>

            <Form.Item

                name="confirmPassword"
               // initialValue=" "
                className="user-edit-input"
                hasFeedback
                alert="Необхідне поле"
                rules={[
                    {
                        required: true,
                        message: 'Підтвердіть пароль',
                    },
                    ({getFieldValue}) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject(new Error('Значення поля ‘Підтвердити пароль’ має бути еквівалентним значенню поля ‘Пароль’'));
                        },
                    }),

                ]}>
                <Input.Password className="user-edit-box"
                                placeholder="Підтвердіть новий пароль"/>
            </Form.Item>
        </div>)
}

const PasswordWithoutUpdate = () => {
    return (
        <div>
            <Form.Item
                name="password"
                className="user-edit-input"
            >
            </Form.Item>

        </div>)
}


const UserEditInput = ({user}) => {


    const [isSelected, setSelection] = useState(false);
    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    let prefixSelector = '+380';
    return (


        <div className="user-edit-column">
            <Form.Item name="id"
                       initialValue={user.id}>
            </Form.Item>
            <Form.Item name="lastName"
                       initialValue={user.lastName}
                       className="user-edit-input"
                       label="Прізвище"
                       hasFeedback
                       alert="Необхідне поле"
                       rules={[{
                           required: true,
                           message: "Будь ласка введіть Ваше прізвище",
                           max: 15
                       },
                           {
                               pattern: /^(?!\s)([\wА-ЩЬЮЯҐЄІЇа-щьюяґєії \/\\'’.,"?:*|><]){3,}\S$/,
                               message: 'Невірний формат прізвища',
                           }]}>
                <Input className="user-edit-box"/>
            </Form.Item>
            <Form.Item name="firstName"
                       initialValue={user.firstName}
                       className="user-edit-input"
                       label="Ім'я"
                       hasFeedback
                       rules={[{
                           required: true,
                           message: "Будь ласка введіть Ваше ім'я",
                           max: 15
                       },
                           {
                               pattern: /^(?!\s)([\wА-ЩЬЮЯҐЄІЇа-щьюяґєії \/\\'’.,"?:*|><]){3,}\S$/,
                               message: 'Невірний формат імені',
                           }]}>
                <Input className="user-edit-box"/>
            </Form.Item>
            <Form.Item name="phone"
                       initialValue={user.phone}
                       className="user-edit-input"
                       label="Телефон"
                       hasFeedback
                       rules={[{
                           required: true,
                           message: "Будь ласка введіть Ваш номер телефону"
                       },
                           {
                               pattern: /^\d{9}$/,
                               message: 'Телефон введено невірно'
                           }]}>
                <Input addonBefore={prefixSelector}/>
            </Form.Item>
            <Form.Item name="email"
                       initialValue={user.email}
                       className="user-edit-input"
                       label="Емейл"
                       hasFeedback
                       rules={[{
                           required: true,
                           message: 'Будь ласка введіть Ваш емейл'
                       },
                           {
                               type: 'email',
                               message: 'Введено не валідний емейл',
                           }]}>
                <Input className="user-edit-box"/>
            </Form.Item>
            <Form.Item name="urlLogo"
                       initialValue={user.urlLogo}
                       className="user-edit-input"
                       label="Лого"
                       hasFeedback
                       rules={[{
                           required: true,
                           message: "Будь ласка завантажте Логотип"
                       }]}>
                <Upload
                    name="image"
                    action={UPLOAD_IMAGE_URL}
                    maxCount={1}
                    data={{folder: `user/logo/${user.id}`}}
                    headers={{contentType: 'multipart/form-data'}}
                >
                    <span className="add-club-upload"><UploadOutlined className="icon"/>Завантажити лого</span>
                </Upload>
            </Form.Item>

            <div>
                <Checkbox
                    checked={isSelected}
                    onClick={() => {
                        setSelection(!isSelected)
                    }}/>
            </div>

            <text>Змінити пароль</text>
            {isSelected ? <PasswordUpdate isSelected={isSelected}/> : <PasswordWithoutUpdate/>}

            <Form.Item
                name="currentPassword"
                className="user-edit-input"
                initialValue={user.password}
                />
            <Form.Item
                name="password"
                className="user-edit-input"
                initialValue={user.password}
            />


                <div className="user-edit-footer">
                    <Button className="submit-button"
                            htmlType="submit"

                    >
                        Зберегти зміни
                    </Button>
                </div>

        </div>
    )
};

export default UserEditInput;
