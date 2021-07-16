import {Button, Form, Input, Upload} from "antd";
import React, {useRef} from "react";
import EditClubContentFooter from "../EditClubContentFooter";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import EditorComponent from "../../editor/EditorComponent";
import {saveContent} from "../../editor/EditorConverter";
import {transToEng} from "../../../util/Translit";
import {UPLOAD_IMAGE_URL} from "../../../service/config/ApiConfig";
import {addClub} from "../../../service/ClubService";
import "../css/MainInformationTab.less"
import {uploadImage} from "../../../service/UploadService";
import {v4 as uuidv4} from "uuid";

const DescriptionTab = ({setResult, result}) => {
    const [descriptionForm] = Form.useForm();
    console.log(result);
    const folderName = uuidv4();
    const logoFolder = `clubs/${folderName}/logo`;
    const coverFolder = `clubs/${folderName}/background`;
    const galleryFolder = `clubs/${folderName}/gallery`;

    const description = JSON.parse(result.description).blocks[0].text;
    const leftDesc = "{\"blocks\":[{\"key\":\"brl63\",\"text\":\"";
    const rightDesc = "\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}";

    const onFinish = (values) => {
        console.log(result);
        setResult(Object.assign(result, descriptionForm.getFieldValue()));
        const text = result.description.replace(/(\r\n|\n|\r)/gm, "");
        const textEdit = text.replace(/"/gm, '\\"');
        const descJSON = leftDesc + textEdit + rightDesc;
        values.description = saveContent(descJSON);
        setResult(Object.assign(result, values));

        if (values.urlLogo && values.urlLogo.file) {
            result.urlLogo = uploadImage(values.urlLogo.file, logoFolder);

        }
        if (values.urlBackground && values.urlBackground.file) {
            result.urlBackground = uploadImage(values.urlBackground.file, coverFolder);

        }
        if (values.urlGallery) {
            result.urlGallery = [];
            values.urlGallery.forEach((el) => {
                result.urlGallery.push(uploadImage(el.originFileObj, galleryFolder));
            })
        }

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
                       initialValue={result.urlLogo}
                       hasFeedback>
                <Upload
                    name="image"
                    accept="image/png,image/jpeg,image/jpg,image/svg"
                    maxCount={1}
                    headers={{contentType: 'multipart/form-data'}}
                    showUploadList={false}
                    beforeUpload={() => false}
                >
                    <span className="edit-club-upload"><UploadOutlined className="icon"/>Завантажити лого</span>
                </Upload>
            </Form.Item>
            <Form.Item name="urlBackground"
                       className="edit-club-row"
                       label="Фото"
                       initialValue={result.urlBackground}
                       hasFeedback>
                <Upload
                    name="image"
                    accept="image/png,image/jpeg,image/jpg,image/svg"
                    maxCount={1}
                    headers={{contentType: 'multipart/form-data'}}
                    showUploadList={false}
                    beforeUpload={() => false}
                >
                    <span className="edit-club-upload"><UploadOutlined className="icon"/>Завантажити фото</span>
                </Upload>
            </Form.Item>
            <Form.Item name="description"
                       className="add-club-row"
                       label="Опис"
                       initialValue={description}
                       hasFeedback
                       rules={[{
                           required: true,
                           pattern: /^[А-Яа-яёЁЇїІіЄєҐґa-zA-Z0-9()!"#$%&'*+\n, ,-.:\r;<=>—«»„”“–’‘?|@_`{}№~^\/[\]]{40,1500}$/,
                           message: " Некоректний опис гуртка"
                       }]}
            >
                <Input.TextArea className="editor-textarea" style={{height: 200}} placeholder="Додайте опис гуртка"/>
            </Form.Item>
            <Button htmlType="submit" className="edit-club-button">Зберегти зміни</Button>
        </Form>
    )
};

export default DescriptionTab;