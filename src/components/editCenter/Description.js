import {Form, Input, Upload, Button, Typography, message} from 'antd';
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import EditorComponent from "../editor/EditorComponent";
import {UPLOAD_IMAGE_URL} from "../../service/config/ApiConfig";
import {saveContent} from "../editor/EditorConverter";
import React, {useEffect, useRef} from 'react';
import "./css/Description.css";
import {transToEng} from '../../util/Translit';
import { updateCenter } from '../../service/CenterService';
import {tokenToHeader} from "../../service/UploadService";

const Description = ({step, setStep, result, setResult, clubs, setClubs}) => {
    const [descriptionForm] = Form.useForm();
    const editorRef = useRef(null);
    const centerName = transToEng(result.name.replace(/[^a-zA-ZА-Яа-яЁё0-9]/gi, ""));
    const leftDesc = "{\"blocks\":[{\"key\":\"brl63\",\"text\":\"";
    const rightDesc = "\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}";
    const {Text} = Typography;


    const nextStep = () => {
        setStep(step + 1);
    }

    const prevStep = () => {
        setResult(Object.assign(result, descriptionForm.getFieldValue()));
        setStep(step - 1);
    }

    useEffect(() => {
        if (result) {
            descriptionForm.setFieldsValue({...result});
        }
    }, [])

    const onFinish = (values) => {
        if(result.clubs.length===0){
            alert("Ви не вибрали жодного клубу")
            return;
        }
        descriptionForm.setFieldsValue(values);
        setResult(Object.assign(result, values));
        if (result.urlLogo && result.urlLogo.file) {
            result.urlLogo = result.urlLogo.file.response;
        }

        // if location doesn't have phone number, we assign center number
        result.locations.forEach(location => {
            if(!location.phone){
                location.phone = result.contactТелефон
            }
        });
        updateCenter(result.id,result).then(response => {
            if(response.status && response.status ===  400 && response.data.message){
                message.warning(response.data.message);
                return;
            } else {
                window.location.reload()
                //setVisible(false)
            }

            //window.location.reload();
            /*
            Temporary solution, page shouldn't reload every time
             */
            // console.log(response);
            // setResult(null)
            // setLocations([]);
            // nextStep();
        })
        // window.location.reload()
    }

    return (
        <Form
            name="basic"
            form={descriptionForm}
            requiredMark={false}
            onFinish={onFinish}
            className="description">
            <div className="form-fields">

                <Text style={{fontSize :'19px', color:'GrayText'}}>Логотип</Text>
                <Form.Item name="urlLogo"
                           className="add-club-row"
                           hasFeedback>
                    <Upload
                        name="image"
                        action={UPLOAD_IMAGE_URL}
                        maxCount={1}
                        data={{folder: `center/${centerName}/logo`}}
                        accept="image/png,image/jpeg,image/jpg,image/svg"
                        headers={{contentType: 'multipart/form-data', Authorization: tokenToHeader()}}
                    >
                        <span className="add-club-upload"><UploadOutlined className="icon"/>Завантажити лого</span>
                    </Upload>
                </Form.Item>

                <Text style={{fontSize :'19px', color:'GrayText'}}>Фото</Text>
                <Form.Item name="urlBackground"
                           className="add-club-row"
                           hasFeedback>
                    <Upload
                        name="image"
                        action={UPLOAD_IMAGE_URL}
                        accept="image/png,image/jpeg,image/jpg,image/svg,image/jfif,image/.pjp"
                        maxCount={1}
                        data={{folder: `center/${centerName}/background`}}
                        headers={{contentType: 'multipart/form-data', Authorization: tokenToHeader()}}
                    >
                        <span className="add-club-upload"><UploadOutlined className="icon"/>Завантажити фото</span>
                    </Upload>
                </Form.Item>

                <Text style={{fontSize :'19px', color:'GrayText'}}>Опис</Text>
                <Form.Item name="description"
                           className="add-center-row"
                           hasFeedback
                           rules={[{
                               required: true,
                               pattern: /^[А-Яа-яЇїІіЄєҐґa-zA-Z0-9()!"#$%&'*+\n, ,-.:\r;<=>?|@№_`{}~^\/[\]\\]*$/,
                               message: "Некоректний опис центру"
                           },
                               {
                                   min: 40,
                                   max: 1500,
                                   message: "Опис центру може містити від 40 до 1500 символів."
                               },
                               {
                                   required: false,
                                   pattern: /^[^ЁёЪъЫыЭэ]+$/,
                                   message: 'Опис гуртка не може містити російські літери'
                               }
                           ]}
                >
                    <Input.TextArea className="editor-textarea" style={{height: 200}}
                                    placeholder="Додайте опис центру"/>
                </Form.Item>
            </div>
            <div className="btn">
                <button className="prev-btn" type="button" onClick={prevStep}>Назад</button>
                <button className="finish-btn" htmlType="submit">Завершити</button>
            </div>
        </Form>

    )
}

export default Description;