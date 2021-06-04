import { Form, Input, Upload } from "antd";
import React, { useRef, useEffect, useState } from "react";
import AddClubContentFooter from "../AddClubContentFooter";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import EditorComponent from "../../editor/EditorComponent";
import { saveContent } from "../../editor/EditorConverter";
import { transToEng } from "../../../util/Translit";
import { UPLOAD_IMAGE_URL } from "../../../service/config/ApiConfig";
import { addClub, getAllClubsByUserId } from "../../../service/ClubService";
import "../css/AddClubContent.css";
import { getUserId } from "../../../service/StorageService";

import { Button } from "antd";

const DescriptionStep = ({ step, setStep, setResult, result, setVisible, setLocations, clubs, setClubs }) => {
    const [descriptionForm] = Form.useForm();
    const clubName = transToEng(result.name.replace(/[^a-zA-ZА-Яа-яЁё0-9]/gi, ""));

    const leftDesc = "{\"blocks\":[{\"key\":\"brl63\",\"text\":\"";
    const rightDesc = "\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}";

    useEffect(() => {
        if (result) {
            console.log(result);
            descriptionForm.setFieldsValue({ ...result })
        }
    }, []);

    const prevStep = () => {
        console.log("DESC VAL")
        console.log(result);
        setResult(Object.assign(result, descriptionForm.getFieldValue()));
        setStep(step - 1);
    }

    const onFinish = (values) => {
        setResult(Object.assign(result, descriptionForm.getFieldValue()));
        const text = result.description.replace(/(\r\n|\n|\r)/gm, "");
        const descJSON = leftDesc + text + rightDesc;
        values.description = saveContent(descJSON);

        setResult(Object.assign(result, values));
        addClub(result).then(response => {
            setVisible(false);
            setResult(null);
            setLocations([]);
            setStep(0);
            if (clubs) {
                getAllClubsByUserId(getUserId()).then(response => {
                    setClubs(response);
                })
            }
        });
        window.location.reload();
    };


    return (
        <Form
            name="basic"
            form={descriptionForm}
            requiredMark={false}
            onFinish={onFinish}
            className="description-step">
            <Form.Item name="urlLogo"
                className="add-club-row"
                label="Логотип"
                hasFeedback>
                <Upload
                    name="image"
                    action={UPLOAD_IMAGE_URL}
                    maxCount={1}
                    data={{ folder: `clubs/${clubName}/logo` }}
                    headers={{ contentType: 'multipart/form-data' }}
                    showUploadList={false}
                >
                    <span className="add-club-upload"><UploadOutlined className="icon" />Завантажити лого</span>
                </Upload>
            </Form.Item>
            <Form.Item name="urlBackground"
                className="add-club-row"
                label="Обкладинка"
                hasFeedback>
                <Upload
                    name="image"
                    action={UPLOAD_IMAGE_URL}
                    maxCount={1}
                    data={{ folder: `clubs/${clubName}/background` }}
                    headers={{ contentType: 'multipart/form-data' }}
                    showUploadList={false}
                >
                    <span className="add-club-upload"><UploadOutlined className="icon" />Завантажити обкладинку</span>
                </Upload>
            </Form.Item>
            <Form.Item name="description"
                className="add-club-row"
                label="Опис"
                hasFeedback
                rules={[{
                    required: true,
                    pattern: /^(?!\s)([\wА-ЩЬЮЯҐЄІЇа-щьюяґєії @#$()%&{}, ,[\]^\/\\'’.,"!?:*|><]){40,1500}\S$|([\wА-ЩЬЮЯҐЄІЇа-щьюяґєії @#$()%&{}, ,[\]^\/\\'’.,"!?:*|><])\n*$/
                }]}
            >
                <Input.TextArea className="editor-textarea" style={{ height: 200 }} placeholder="Додайте опис гуртка" />
            </Form.Item>
            <div className="add-club-content-footer">
                <Button ghost={true} className="add-club-content-prev"
                    type="button" onClick={prevStep}>Назад</Button>
                <Button className="flooded-button add-club-content-next"
                    htmlType="submit">Завершити</Button>
            </div>
        </Form>
    )
};

export default DescriptionStep;