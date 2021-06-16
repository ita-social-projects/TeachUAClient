import {Form, Input, Upload,Button} from 'antd';
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import EditorComponent from "../editor/EditorComponent";
import { UPLOAD_IMAGE_URL } from "../../service/config/ApiConfig";
import { saveContent } from "../editor/EditorConverter";
import React, { useEffect, useRef } from 'react';
import "./css/Description.css";
import { transToEng } from '../../util/Translit';

const Description = ({ step, setStep, result, setResult }) => {
    const [descriptionForm] = Form.useForm();
    const editorRef = useRef(null);
    const centerName = transToEng(result.name.replace(/[^a-zA-ZА-Яа-яЁё0-9]/gi, ""));

    const nextStep = () => {
        setStep(step + 1);
    }

    const prevStep = () => {
        setResult(Object.assign(result, descriptionForm.getFieldValue()));
        setStep(step - 1);
    }

    useEffect(() => {
        if (result) {
            console.log(result)
            descriptionForm.setFieldsValue({ ...result });
        }
    }, [])

    const onFinish = (values) => {
        values.description = saveContent(editorRef.current.state.editorState.getCurrentContent());
        descriptionForm.setFieldsValue(values);
        setResult(Object.assign(result, values));
        nextStep();
        descriptionForm.resetFields();
    }

    return (
        <Form
            name="basic"
            form={descriptionForm}
            requiredMark={false}
            onFinish={onFinish}
            className="description">
            <div className="form-fields">
                <Form.Item name="urlLogo"
                    className="add-club-row"
                    label="Логотип"
                    hasFeedback>
                    <Upload
                        name="image"
                        action={UPLOAD_IMAGE_URL}
                        maxCount={1}
                        data={{ folder: `clubs/${centerName}/logo` }}
                        headers={{ contentType: 'multipart/form-data' }}
                    >
                        <span className="add-club-upload"><UploadOutlined className="icon" />Завантажити лого</span>
                    </Upload>
                </Form.Item>
                <Form.Item name="urlBackground"
                    className="add-club-row"
                    label="Фото"
                    hasFeedback>
                    <Upload
                        name="image"
                        action={UPLOAD_IMAGE_URL}
                        maxCount={1}
                        data={{ folder: `clubs/${centerName}/background` }}
                        headers={{ contentType: 'multipart/form-data' }}
                    >
                        <span className="add-club-upload"><UploadOutlined className="icon" />Завантажити фото</span>
                    </Upload>
                </Form.Item>
                <Form.Item name="description"
                           className="add-club-row"
                           label="Опис"
                           hasFeedback
                           rules={[{
                               required: true,
                               pattern: /^(?!\s)([\wА-ЩЬЮЯҐЄІЇа-щьюяґєії @#$()%&{}, ,[\]^\/\\'’.,"!?:*|><]){40,1500}\S$|\s/
                           }]}
                >
                    <Input.TextArea className="editor-textarea" style={{height: 200}} placeholder="Додайте опис гуртка"/>
                </Form.Item>
            </div>
            <div className="btn">
                <Button className="prev-btn" type="button" onClick={prevStep}>Назад</Button>
                <Button className="next-btn" htmlType="submit" onClick={nextStep} >Наступний крок</Button>
            </div>
        </Form>

    )
}

export default Description;