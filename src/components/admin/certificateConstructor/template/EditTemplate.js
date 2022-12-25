import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import {Button, Form, Input, Layout, message, Select, Typography, Upload} from 'antd';
import {useForm} from "antd/es/form/Form";
import "react-quill/dist/quill.snow.css";
import Editor from '../../../../util/Editor';
import {getTemplateById, updateTemplate} from "../../../../service/TemplateService";
import {BASE_URL} from "../../../../service/config/ApiConfig";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import {tokenToHeader} from "../../../../service/UploadService";
import {certificateTypes, fieldsProperties} from "./TemplateConstants";
import * as TemplateService from "../../../../service/TemplateService";

const {Title} = Typography;

const EditTemplate = () => {
    const [templateEditForm] = useForm();
    const templateId = useParams();
    const [chosenProperties, setChosenProperties] = useState({});
    const [fieldsList, setFieldsList] = useState([]);

    const [template, setTemplate] = useState({
        name: "",
        used: true,
        courseDescription: "",
        projectDescription: "",
        certificateType: 0,
        filePath: "",
        properties: {}
    });

    const [templateMetadata, setTemplateMetadata] = useState({
        templateName: "",
        templateLastModifiedDate: ""
    })

    const saveForm = (values) => {
        template.name = values.name;
        template.courseDescription = values.courseDescription;
        template.projectDescription = values.projectDescription;

        if (values.certificateTypes !== undefined) {
            template.certificateType = values.certificateTypes;
        }

        template.properties = JSON.stringify(chosenProperties);
        console.log(template)
        if (values.name.length === 0 || values.courseDescription === "<p><br></p>" ||
            values.projectDescription === "<p><br></p>") {
            message.error("Усі поля повинні бути заповнені!");
            return;
        }
        if (values.name.length > 250) {
            message.error("Занадто велика назва!")
            return;
        } else if (values.courseDescription.length > 1020) {
            message.error("Занадто великий опис курсу!")
            return;
        } else if (values.projectDescription.length > 1020) {
            message.error("Занадто великий опис проекту!")
            return;
        }

        updateTemplate(template).then(response => {
            console.log(response);
            if (response.status) {
                message.warning(response.message);
                return;
            }
            if (!response.updated) {
                for (const error of response.messages) {
                    message.error(error);
                }
                return;
            }

            message.success(`Шаблон "${response.template.name}" успішно оновлено`);
        });
    };

    const getData = () => {
        getTemplateById(templateId.id).then(response => {
            console.log(response);
            setTemplate(response);
            setChosenProperties(JSON.parse(response.properties))
            setFieldsList(Object.keys(JSON.parse(response.properties)))

            if (response.used) {
                message.warning("Шаблон використовується, можливості редагування обмежено!", 5)
            }

            let certificateTypeName;
            if (response.certificateType === 1) {
                certificateTypeName = "тренер";
            } else if (response.certificateType === 2) {
                certificateTypeName = "модератор";
            } else {
                certificateTypeName = "учасник";
            }
            document.getElementsByClassName("ant-select-selection-item")[0].textContent = certificateTypeName;
        }).catch(response => {
            if (response.status === 404) {
                console.log(response);
            }
        });
    };

    useEffect(() => {
        getData();
    }, []);

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onFill = () => {
        templateEditForm.setFieldsValue(template);
    };

    const uploadPdf = (value) => {
        if (value.file.response !== undefined) {
            console.log(value);

            templateMetadata.templateName = value.file.response.templateName;
            templateMetadata.templateLastModifiedDate = value.file.lastModified;

            TemplateService.loadTemplateMetadata(templateMetadata).then(response => {
                    setFieldsList(value.file.response.fieldsList)
                    let includedFields = [];
                    Object.keys(chosenProperties).forEach(key => {
                        if (!value.file.response.fieldsList.includes(key)) {
                            delete chosenProperties[key];
                        } else {
                            includedFields.push(key);
                        }
                    });

                    for (const element of value.file.response.fieldsList) {
                        if (!includedFields.includes(element)) {
                            chosenProperties[element] = "";
                        }
                    }

                    setTemplate({
                        ...template,
                        filePath: response.filePath,
                        properties: chosenProperties
                    })

                    if (response.messages != null) {
                        for (const warning of response.messages) {
                            message.warning(warning)
                        }
                    }
                }
            );
        }
    }
    const onFieldPropertyChange = () => {
        setTemplate({
            ...template,
            properties: chosenProperties
        })
    }
    const onCertificateTypeChange = (element) => {
        setTemplate({
            ...template,
            certificateType: element
        })
    }

    const fieldPropertiesList = () => {
        return fieldsList.map(element =>
            <Form.Item
                name={element}
                label={element}
                key={"item_" + element}
                initialValue={Object.keys(chosenProperties).includes(element) ? chosenProperties[element] : "—"}
            >
                <Select
                    name={element}
                    className="dropdown"
                    options={fieldsProperties}
                    key={element}
                    onChange={value => {
                        chosenProperties[element] = value;
                        setChosenProperties(chosenProperties);
                        setTemplate({...template, properties: chosenProperties});
                        onFieldPropertyChange();
                    }}
                />
            </Form.Item>
        )
    }

    return (<Layout className="" style={{paddingTop: 40, background: '#f8e5d7'}}>
        <div className="add-form" style={{paddingTop: 0}}>
            <Link
                to="/admin/templates"
                className="back-btn"
            >
                <Button className="flooded-button">
                    До списку шаблонів
                </Button>
            </Link>
            <Title>Редагування шаблону</Title>
            <Form
                form={templateEditForm}
                onFinish={saveForm}
                onFinishFailed={onFinishFailed}
                initialValues={onFill()}
                autoComplete="off"
                labelCol={{span: 4}}
                wrapperCol={{span: 14}}
            >
                <Form.Item
                    name="name"
                    label="Назва шаблону"
                    value={template.name}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="courseDescription"
                    label="Опис курсу"
                    value={template.courseDescription}
                >
                    <Editor/>
                </Form.Item>
                <Form.Item
                    name="projectDescription"
                    label="Опис проекту"
                    value={template.projectDescription}
                >
                    <Editor/>
                </Form.Item>
                <Form.Item
                    name="certificateTypes"
                    id={"certificateTypes"}
                    label="Тип сертифікату"
                >
                    <Select
                        defaultValue={""}
                        name="certificateType"
                        id={"certificateType"}
                        className="dropdown"
                        options={certificateTypes}
                        key={certificateTypes}
                        onChange={onCertificateTypeChange}
                    />
                </Form.Item>
                <Form
                    disabled={template.used}
                    id="templateCreatingFormId"
                    labelCol={{span: 4}}
                    wrapperCol={{span: 14}}
                >
                    <Form.Item
                        name="pdfFile"
                        label="Pdf-шаблон"
                    >
                        <Upload
                            name="pdf-file"
                            accept={".pdf"}
                            action={BASE_URL + "/api/template/pdf"}
                            maxCount={1}
                            icon={<UploadOutlined/>}
                            headers={{contentType: 'multipart/form-data', Authorization: tokenToHeader()}}
                            onChange={uploadPdf}
                        >
                            <Button className="flooded-button"><UploadOutlined className="icon"/>
                                Завантажити новий шаблон
                            </Button>
                        </Upload>
                        <div
                            style={fieldsList.length !== 0 ? {} : {display: 'none'}}
                            className="import-report">
                        </div>
                    </Form.Item>
                    <h3>Налаштування pdf-файлу:</h3>
                    <Form
                        id="templateCreatingFormId"
                        labelCol={{span: 4}}
                        wrapperCol={{span: 14}}
                    >
                        <div>{fieldPropertiesList()}</div>
                    </Form>
                </Form>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="flooded-button add-contact-type-button"
                    >
                        Зберегти
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </Layout>);
}
export default EditTemplate;