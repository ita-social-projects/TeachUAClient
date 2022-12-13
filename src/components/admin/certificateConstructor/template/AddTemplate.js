import React, {useState} from 'react';
import {Layout, Typography, Form, Input, Button, message, Upload, Select} from 'antd';
import {createChallenge} from "../../../../service/ChallengeService";
import {useForm} from "antd/es/form/Form";
import {BASE_URL, UPLOAD_IMAGE_URL} from "../../../../service/config/ApiConfig";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import {Link} from "react-router-dom";
import {tokenToHeader} from "../../../../service/UploadService";
import Editor from "./Editor";
import {createTemplate} from "../../../../service/TemplateService";
import * as CertificateByTemplateService from "../../../../service/CertificateByTemplateService";
import {CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined} from "@ant-design/icons";

const {Title} = Typography;

const AddTemplate = () => {
    const [challengeForm] = useForm();
    const [dataLoaded, setDataLoaded] = useState(false);
    const [pdfUploadFormControl, setPdfUploadFormControl] = useState(0);
    const [chosenProperties, setChosenProperties] = useState({});
    const [fieldsList, setFieldsList] = useState([]);

    const [templateMetadata, setTemplateMetadata] = useState({
        templateName: "",
        templateLastModifiedDate: ""
    })

    const ICON_WARNING = 1;
    const ICON_ERROR = 2;
    const ICON_OK = 3;

    const renderIcon = (type) => {
        switch (type) {
            case ICON_WARNING:
                return (<ExclamationCircleOutlined className="site-result-demo-error-icon icon warn-icon"/>)
            case ICON_ERROR:
                return (<CloseCircleOutlined className="site-result-demo-error-icon icon error-icon"/>)
            case ICON_OK:
                return (<CheckCircleOutlined className="icon ok-icon"/>)
        }
    }

    const [dataToDB, setDataToDB] = useState({
        name: "",
        courseDescription: "",
        projectDescription: "",
        certificateType: 3,
        filePath: "",
        properties: {}
    });

    const certificateTypes = [
        {label: "учасник", value: 3},
        {label: "модератор", value: 2},
        {label: "тренер", value: 1}
    ];

    const fieldsProperties = [
        {label: "—", value: ""},
        {label: "Серійний номер", value: "serial_number"},
        {label: "ПІБ учасника", value: "user_name"},
        {label: "Кількість годин", value: "hours"},
        {label: "Номер курсу", value: "course_number"},
        {label: "Форма навчання", value: "study_form"},
        {label: "QR-код", value: "qrCode"}

    ];

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const loadToDatabase = () => {
        console.log(dataToDB);
        createTemplate(dataToDB)
            .then((response) => {
                if (response.status) {
                    message.warning(response.message);
                    return;
                }
                message.success("Шаблон '" + response.name + "' успішно доданий!");
                console.log('Success:', dataToDB);
            });
    }

    const onNameChange = (element) => {
        setDataToDB({
            ...dataToDB,
            name: element.target.value
        })
    }

    const onCourseDescriptionChange = (element) => {
        setDataToDB({
            ...dataToDB,
            courseDescription: element.target.innerHTML
        })
    }

    const onProjectDescriptionChange = (element) => {
        setDataToDB({
            ...dataToDB,
            projectDescription: element.target.innerHTML
        })
    }

    const onFieldPropertyChange = () => {
        setDataToDB({
            ...dataToDB,
            properties: chosenProperties
        })
    }

    const onCertificateTypeChange = (element) => {
        setDataToDB({
            ...dataToDB,
            certificateType: element
        })
    }

    const uploadPdf = (value) => {
        if (value.file.response !== undefined) {
            console.log(value);
            setPdfUploadFormControl(value.fileList.length);

            templateMetadata.templateName = value.file.response.templateName;
            templateMetadata.templateLastModifiedDate = value.file.lastModified;

            CertificateByTemplateService.loadTemplateMetadata(templateMetadata).then(response => {
                    setFieldsList(value.file.response.fieldsList)
                    Object.keys(chosenProperties).forEach(key => delete chosenProperties[key]);
                    for (const element of value.file.response.fieldsList) {
                        chosenProperties[element] = "";
                    }
                    setDataToDB({
                        ...dataToDB,
                        filePath: response,
                        properties: chosenProperties
                    })
                }
            );
        }
    }

    const fieldPropertiesList = () => {
        return fieldsList.map(element =>
            <Form.Item
                name={element}
                label={element}
                initialValue="—"
            >
                <Select
                    name={element}
                    className="dropdown"
                    options={fieldsProperties}
                    key={element}
                    onChange={value => {
                        chosenProperties[element] = value;
                        setChosenProperties(chosenProperties);
                        setDataToDB({...dataToDB, properties: chosenProperties});
                        onFieldPropertyChange();
                    }}
                />

            </Form.Item>
        )
    }

    const checkButtonState = () => {
        for (const field of Object.values(chosenProperties)) {
            if (field.trim().length === 0) {
                return;
            }
        }

        // setSendButtonState(false);
    };

    return (
        <Layout className="" style={{paddingTop: 40, background: '#f8e5d7'}}>
            <div className="add-form" style={{paddingTop: 0}}>
                <Link
                    to="/admin/templates"
                    className="back-btn"
                >
                    <Button className="flooded-button">
                        До списку шаблонів
                    </Button>
                </Link>
                <Title>Додайте шаблон</Title>
                <Form
                    form={challengeForm}
                    onFinishFailed={onFinishFailed}
                    initialValues={{remember: true}}
                    autoComplete="off"
                    labelCol={{span: 4}}
                    wrapperCol={{span: 14}}
                >
                    <Form.Item
                        name="name"
                        label="Назва шаблону"
                    >
                        <Input
                            onChange={onNameChange}
                        />
                    </Form.Item>
                    <Form.Item
                        name="courseDescription"
                        label="Опис курсу"
                        onInput={onCourseDescriptionChange}
                    >
                        <Editor/>
                    </Form.Item>
                    <Form.Item
                        name="projectDescription"
                        label="Опис проекту"
                        onInput={onProjectDescriptionChange}
                    >
                        <Editor/>
                    </Form.Item>
                    <Form.Item
                        name="certificateTypes"
                        label="Тип сертифікату"
                        initialValue="учасник"
                    >
                        <Select
                            name="certificateType"
                            className="dropdown"
                            options={certificateTypes}
                            key={certificateTypes}
                            onChange={onCertificateTypeChange}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Pdf-шаблон"
                        rules={[{
                            required: true, message: "Завантажте pdf-шаблон"
                        }]}
                    >
                        <Upload
                            name="pdf-file"
                            accept={".pdf"}
                            action={BASE_URL + "/api/certificate-by-template/pdf"}
                            maxCount={1}
                            icon={<UploadOutlined/>}
                            headers={{contentType: 'multipart/form-data', Authorization: tokenToHeader()}}
                            onChange={uploadPdf}
                        >
                            <Button className="flooded-button" htmlType="submit"><UploadOutlined className="icon"/>
                                Завантажити
                            </Button>
                        </Upload>
                        <div
                            style={fieldsList.length !== 0 ? {} : {display: 'none'}}
                            className="import-report">
                        <span>
                            {renderIcon(ICON_OK)}
                            Знайдено {fieldsList ? fieldsList.length : 0} полів
                        </span>
                        </div>
                    </Form.Item>
                    <div
                        style={pdfUploadFormControl > 0 ? {} : {display: 'none'}}
                    >
                        {fieldPropertiesList()}
                    </div>
                    <Form.Item
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={() => loadToDatabase()}
                            headers={{Authorization: tokenToHeader()}}
                            className="flooded-button add-contact-type-button"
                        >
                            Зберегти
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Layout>
    )
}

export default AddTemplate;