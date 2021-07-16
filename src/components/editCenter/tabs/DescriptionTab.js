import {Button, Form, Input, Upload} from "antd";
import {BASE_URL, UPLOAD_IMAGE_URL} from "../../../service/config/ApiConfig";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import EditorComponent from "../../editor/EditorComponent";
import React, {useEffect} from "react";
import "../css/DescriptionTab.css"
import EditCenterContentFooter from "../EditCenterFooter";


const DescriptionTab = ({center}) => {
        const [descriptionFrom] = Form.useForm();
    useEffect(() => {
        console.log(descriptionFrom.getFieldsValue())
    }, [])
    return (
        <Form
            form={descriptionFrom}
            name="basic">
            <Form.Item name="urlLogo"
                       className="edit-center-row"
                       label="Логотип"
            >
                <div className="edit-center-photos">
                    {
                        center.urlLogo === null ? <div> </div> :
                            <img src={BASE_URL + center.urlLogo} className="edit-center-logo"/>
                    }

                    <Upload
                        name="image"
                        action={UPLOAD_IMAGE_URL}
                        maxCount={1}
                        data={{folder: `center/${center.name}/logo`}}
                        headers={{contentType: 'multipart/form-data'}}
                    >
                        <span className="edit-center-upload"><UploadOutlined
                            className="icon" value={center.urlLogo}/>Завантажити нове лого</span>

                    </Upload>
                </div>
            </Form.Item>
            <Form.Item name="urlBackground"
                       className="edit-center-row"
                       label="Фото">
                <div className="edit-center-photos">
                    {
                        center.urlWeb === null ? <div> </div> :
                            <img src={BASE_URL + center.urlWeb} className="edit-center-urlWeb"/>
                    }
                    <Upload
                        name="image"
                        action={UPLOAD_IMAGE_URL}
                        maxCount={1}
                        data={{folder: `center/${center.name}/background`}}
                        headers={{contentType: 'multipart/form-data'}}
                    >


                        <span className="edit-center-upload"><UploadOutlined
                            className="icon"/>Завантажити нове фото</span>
                    </Upload>
                </div>
            </Form.Item>
            <Form.Item name="description"
                       className="add-club-row"
                       label="Опис"
                       hasFeedback
                       initialValue={center.description}
                       rules={[{
                           required: true,
                           pattern: /^[А-Яа-яёЁЇїІіЄєҐґa-zA-Z0-9()!"#$%&'*+\n, ,-.:\r;<=>?|@_`{}~^\/[\]]{40,1500}$/,
                           message: " Некоректний опис гуртка"
                       }]}
            >
                <Input.TextArea className="editor-textarea" style={{height: 200}} placeholder="Додайте опис гуртка"/>
            </Form.Item>
            <EditCenterContentFooter result={center}/>
        </Form>
    )
}
export default DescriptionTab