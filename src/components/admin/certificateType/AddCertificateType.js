import React, {useState} from 'react';
import {Button, Form, Input, InputNumber, Layout, message, Typography} from 'antd';
import {useForm} from "antd/es/form/Form";
import {Link} from "react-router-dom";
import {createCertificateType} from "../../../service/CertificateTypeService";

const {Title} = Typography;

const AddCertificateType = () => {
    const [typeForm] = useForm();

    const [dataToDB, setDataToDB] = useState({
        name: "",
        codeNumber: "",
    });

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    const loadToDatabase = (values) => {
        if (!!values.name && !!values.codeNumber) {
            if (values.name.trim().length === 0) {
                message.error("Назва типу сертифікату не може бути відсутньою!");
                return;
            }

            dataToDB.name = values.name;
            dataToDB.codeNumber = values.codeNumber;

            createCertificateType(dataToDB)
                .then((response) => {
                    if (response.status) {
                        message.warning(response.message);
                        return;
                    }
                    if (!!response.messages) {
                        for (const element of response.messages) {
                            if (element[1] === "1") {
                                message.warning(element[0]);
                            } else if (element[1] === "3") {
                                message.error(element[0]);
                                return;
                            }
                        }
                    }
                    message.success("Тип '" + response.certificateType.name + "' успішно доданий!");
                    document.getElementById('add-certificate-type-form').reset();
                });
        } else {
            message.error("Усі поля повинні бути заповнені!")
        }
    };

    return (
        <Layout className="template add-template" style={{paddingTop: 40, background: '#f8e5d7'}}>
            <div className="add-form" style={{paddingTop: 0}}>
                <Link
                    to="/admin/certificate-types"
                    className="back-btn"
                >
                    <Button className="flooded-button">
                        До списку типів
                    </Button>
                </Link>
                <Title>Додайте тип сертифікату</Title>
                <Form
                    form={typeForm}
                    id="add-certificate-type-form"
                    onFinish={loadToDatabase}
                    onFinishFailed={onFinishFailed}
                    initialValues={{remember: true}}
                    autoComplete="off"
                    labelCol={{span: 4}}
                    wrapperCol={{span: 14}}
                >
                    <Form.Item
                        name="codeNumber"
                        label="Кодовий номер"
                    >
                        <InputNumber
                            min={1}
                        />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="Назва типу"
                    >
                        <Input/>
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
        </Layout>
    );
}

export default AddCertificateType;