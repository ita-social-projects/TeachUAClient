import {Button, Form, Upload} from "antd";
import React, {useRef} from "react";
import EditClubContentFooter from "../EditClubContentFooter";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import EditorComponent from "../../editor/EditorComponent";
import {saveContent} from "../../editor/EditorConverter";
import {transToEng} from "../../../util/Translit";
import {UPLOAD_IMAGE_URL} from "../../../service/config/ApiConfig";
import {addClub} from "../../../service/ClubService";
import "../css/MainInformationTab.less"

const DescriptionTab = ({setResult, result}) => {
    const [descriptionForm] = Form.useForm();
    const editorRef = useRef(null);
    const clubName = transToEng(result.name.replace(/[^a-zA-ZА-Яа-яЁё0-9]/gi, ""));

    const onFinish = (values) => {
        console.log(result);
        // values.description = saveContent(editorRef.current.state.editorState.getCurrentContent());
        //
        // descriptionForm.setFieldsValue(values);

        setResult(Object.assign(result, values));

        // addClub(result).then(response => console.log(response));
    };

    return (
        <Form
            name="basic"
            form={descriptionForm}
            onFinish={onFinish}>
            <Form.Item name="urlLogo"
                       className="edit-club-row"
                       label="Логотип"
                       >
                <Upload
                    name="image"
                    action={UPLOAD_IMAGE_URL}
                    maxCount={1}
                    data={{folder: `clubs/${clubName}/logo`}}
                    headers={{contentType: 'multipart/form-data'}}
                >
                    <span className="edit-club-upload"><UploadOutlined className="icon"/>Завантажити лого</span>
                </Upload>
            </Form.Item>
            <Form.Item name="urlBackground"
                       className="edit-club-row"
                       label="Фото">
                <Upload
                    name="image"
                    action={UPLOAD_IMAGE_URL}
                    maxCount={1}
                    data={{folder: `clubs/${clubName}/background`}}
                    headers={{contentType: 'multipart/form-data'}}
                >
                    <span className="edit-club-upload"><UploadOutlined className="icon"/>Завантажити фото</span>
                </Upload>
            </Form.Item>
            {/*<Form.Item className="edit-club-row"*/}
            {/*           label="Опис"*/}
            {/*           hasFeedback*/}
            {/*           rules={[{*/}
            {/*               required: true,*/}
            {/*               max:1500,*/}
            {/*               pattern: /^(?!\s)([\wА-ЩЬЮЯҐЄІЇа-щьюяґєії \/\\'’.,"!?:*|><]){39,}\S$/*/}
            {/*           }]}>*/}
            {/*    <EditorComponent ref={editorRef}*/}
            {/*                     />*/}
            {/*</Form.Item>*/}
            <Button htmlType="submit" className="edit-club-button">Зберегти зміни</Button>
        </Form>
    )
};

export default DescriptionTab;