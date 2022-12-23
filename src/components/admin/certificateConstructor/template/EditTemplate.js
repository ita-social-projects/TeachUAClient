import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";

import {Button, Form, Input, Layout, message, Typography} from 'antd';
import {useForm} from "antd/es/form/Form";

import "react-quill/dist/quill.snow.css";
import Editor from './Editor';
import {getTemplateById, updateTemplate} from "../../../../service/TemplateService";

const {Title} = Typography;

const EditTemplate = () => {
    const [templateEditForm] = useForm();

    const [template, setTemplate] = useState({
        name: "",
        courseDescription: "",
        projectDescription: "",
        certificateType: 3,
        filePath: "",
        properties: {}
    });

    const templateId = useParams();

    const saveForm = (values) => {
        console.log(values)
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

        updateTemplate(values, templateId.id).then(response => {
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
            setTemplate(response);
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
    </Layout>)
}
export default EditTemplate;