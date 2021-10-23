import React, { useState } from 'react';
import './css/AddChallenge.css';
import {Layout, Typography, Form, Input, Button, message} from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ReactHtmlParser}  from 'react-html-parser';
import {createChallenge} from "../../../service/ChallengeService";
import {addToTable} from "../../../util/TableUtil";
import {useForm} from "antd/es/form/Form";

const { Content } = Layout;
const { Title } = Typography;

const AddChallenge = () => {
    const [challengeForm] = useForm();
    const [addData, setData] = useState("");
    const [val, setVal] = useState('');
    const [addedData, showData] = useState(0);

    const handleChange = (event, editor) => {
        const data = editor.getData();
        console.log( { event, editor, data } );
    }

    const onFinish = (values) => {
        createChallenge(values)
            .then((response) => {
                if (response.status) {
                    message.warning(response.message);
                    return;
                }
                message.success("Категорія '" + response.name + "' успішно додана!");

            });
        console.log('Success:', values);
        challengeForm.resetFields();
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="add-form">
            <Form
                form={challengeForm}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={{ remember: true }}
                autoComplete="off"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
            >
                <Form.Item
                    label="name"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="title"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="description"
                >
                    <CKEditor
                        editor={ ClassicEditor }
                        data={addData}
                        onInit={ editor => {
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={handleChange}
                    />
                </Form.Item>
                <Form.Item
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="flooded-button add-contact-type-button"
                        onClick={() => console.log(addedData)}
                    >
                        Зберегти
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddChallenge;