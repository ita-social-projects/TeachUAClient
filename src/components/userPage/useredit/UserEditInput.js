import React from 'react';
import {Button, Form, Input, message, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {UPLOAD_IMAGE_URL} from "../../../service/config/ApiConfig";


const UserEditInput = ({user}) => {
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

    let prefixSelector = '+38';
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
                           message: "Будь ласка введіть ваше прізвище"
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
                           message: "Будь ласка введіть ваше ім'я"

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
                           message: "Будь ласка введіть ваш номер телефону"
                       }]}>
                <Input addonBefore={prefixSelector} />
            </Form.Item>
            <Form.Item name="email"
                       initialValue={user.email}
                       className="user-edit-input"
                       label="Емейл"
                       hasFeedback
                       rules={[{
                           required: true,
                           type: 'email'
                       }]}>
                <Input className="user-edit-box"/>
            </Form.Item>
            <Form.Item name="password"
                       initialValue={user.password}
                       className="user-edit-input"
                       label="Пароль"
                       hasFeedback
                       rules={[{
                           required: true,
                       }]}>
                <Input.Password className="user-edit-box"/>
            </Form.Item>
            <Form.Item name="urlLogo"
                       initialValue={user.urlLogo}
                       className="user-edit-input"
                       label="Лого"
                       hasFeedback
                       rules={[{
                           required: true,
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
            <Form.Item>
                <div className="user-edit-footer">
                    <Button className="submit-button"
                            htmlType="submit"
                    >
                        Зберегти зміни
                    </Button>
                </div>
            </Form.Item>
        </div>
    )
};

export default UserEditInput;
