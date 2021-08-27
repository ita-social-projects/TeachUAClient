import {Button, Form, Input, Upload} from "antd";
import {BASE_URL, UPLOAD_IMAGE_URL} from "../../../service/config/ApiConfig";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import EditorComponent from "../../editor/EditorComponent";
import React, {useEffect} from "react";
import "../css/DescriptionTab.css"
import EditCenterContentFooter from "../EditCenterFooter";
import {updateCenterById} from "../../../service/CenterService";


const DescriptionTab = ({center,result,setResult}) => {
        const [descriptionFrom] = Form.useForm();


    const onChange = (values) => {
        console.log(values)
    }

        const onFinish = (values) => {
            setResult(Object.assign(result,values))
            updateCenterById(result)
        }

    useEffect(() => {
        console.log(result)
        setResult({...result, urlLogo:center.urlLogo , description:center.description})
        console.log(result)
    }, [])

    return (
        <Form
            onFinish={onFinish}
            form={descriptionFrom}
            name="basic">
            <Form.Item name="urlLogo"
                       className="edit-center-row"
                       label="Логотип"
            >
                <div className="edit-center-photos">
                    {
                        center.urlLogo === null || center.urlLogo === undefined ? <div> </div> :
                            <img src={BASE_URL + center.urlLogo} className="edit-center-logo"/>
                    }

                    <Upload
                        name="image"
                        action={UPLOAD_IMAGE_URL}
                        maxCount={1}
                        data={{folder: `center/${center.name}/logo`}}
                        headers={{contentType: 'multipart/form-data'}}
                        onChange={event => setResult({...result, urlLogo:event.file.response})}
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
                        center.urlBackground === null || center.urlBackground === undefined ? <div> </div> :
                            <img src={BASE_URL + center.urlBackground} className="edit-center-urlWeb"/>
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
                <Input.TextArea
                   onChange={event => setResult({...result, description: event.target.defaultValue})}
                    className="editor-textarea" style={{height: 200}} placeholder="Додайте опис гуртка"/>
            </Form.Item>
            <Button htmlType="submit" className="edit-club-button">Зберегти зміни</Button>
        </Form>
    )
}
export default DescriptionTab