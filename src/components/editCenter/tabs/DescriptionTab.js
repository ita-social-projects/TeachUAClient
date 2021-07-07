import {Button, Form, Input, Upload} from "antd";
import {UPLOAD_IMAGE_URL} from "../../../service/config/ApiConfig";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import EditorComponent from "../../editor/EditorComponent";
import React from "react";
import EditCenterContentFooter from "../EditCenterFooter";


const DescriptionTab = ({center}) => {

    return (
        <Form
            name="basic">
            <Form.Item n ame="urlLogo"
                       className="edit-center-row"
                       label="Логотип"
            >
                <Upload
                    name="image"
                    action={UPLOAD_IMAGE_URL}
                    maxCount={1}
                    // data={{folder: `clubs/${clubName}/logo`}}
                    headers={{contentType: 'multipart/form-data'}}
                >
                    <span className="edit-center-upload"><UploadOutlined className="icon"/>Завантажити лого</span>
                </Upload>
            </Form.Item>
            <Form.Item name="urlBackground"
                       className="edit-center-row"
                       label="Фото">
                <Upload
                    name="image"
                    action={UPLOAD_IMAGE_URL}
                    maxCount={1}
                    // data={{folder: `clubs/${clubName}/background`}}
                    headers={{contentType: 'multipart/form-data'}}
                >
                    <span className="edit-center-upload"><UploadOutlined className="icon"/>Завантажити фото</span>
                </Upload>
            </Form.Item>
            <Form.Item name="description"
                       className="add-club-row"
                       label="Опис"
                       hasFeedback
                       rules={[{
                           required: true,
                           pattern: /^[А-Яа-яёЁЇїІіЄєҐґa-zA-Z0-9()!"#$%&'*+\n, ,-.:\r;<=>?|@_`{}~^\/[\]]{40,1500}$/,
                           message: " Некоректний опис гуртка"
                       }]}
            >
                <Input.TextArea className="editor-textarea" style={{ height: 200 }} placeholder="Додайте опис гуртка" />
            </Form.Item>
            <EditCenterContentFooter result = {center}/>
        </Form>
    )
}
export default DescriptionTab