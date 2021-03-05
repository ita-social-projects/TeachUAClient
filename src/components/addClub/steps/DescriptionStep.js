import {Form, Upload} from "antd";
import React, {useRef} from "react";
import AddClubContentFooter from "../AddClubContentFooter";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import EditorComponent from "../../editor/EditorComponent";
import {saveContent} from "../../editor/EditorConverter";
import {transToEng} from "../../../util/Translit";
import {UPLOAD_IMAGE_URL} from "../../../service/config/ApiConfig";
import {addClub} from "../../../service/ClubService";

const DescriptionStep = ({step, setStep, setResult, result}) => {
    const [descriptionForm] = Form.useForm();
    const editorRef = useRef(null);
    const clubName = transToEng(result.name.replace(/[^a-zA-ZА-Яа-яЁё0-9]/gi, ""));

    const onFinish = (values) => {
        values.description = saveContent(editorRef.current.state.editorState.getCurrentContent());

        descriptionForm.setFieldsValue(values);

        setResult(Object.assign(result, values));

        addClub(result).then(response => console.log(response));
    };

    return (
        <Form
            name="basic"
            form={descriptionForm}
            requiredMark={false}
            onFinish={onFinish}>
            <Form.Item name="urlLogo"
                       className="add-club-row"
                       label="Логотип"
                       hasFeedback>
                <Upload
                    name="image"
                    action={UPLOAD_IMAGE_URL}
                    maxCount={1}
                    data={{folder: `clubs/${clubName}/logo`}}
                    headers={{contentType: 'multipart/form-data'}}
                >
                    <span className="add-club-upload"><UploadOutlined className="icon"/>Завантажити лого</span>
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
                    data={{folder: `clubs/${clubName}/background`}}
                    headers={{contentType: 'multipart/form-data'}}
                >
                    <span className="add-club-upload"><UploadOutlined className="icon"/>Завантажити фото</span>
                </Upload>
            </Form.Item>
            <Form.Item className="add-club-row"
                       label="Опис">
                <EditorComponent ref={editorRef}/>
            </Form.Item>
            <AddClubContentFooter step={step} setStep={setStep}/>
        </Form>
    )
};

export default DescriptionStep;