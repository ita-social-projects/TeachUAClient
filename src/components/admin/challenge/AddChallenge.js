import React, { useState } from 'react';
import './css/AddChallenge.css';
import { Layout, Typography, Form, Input, Button } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ReactHtmlParser}  from 'react-html-parser';

const { Content } = Layout;
const { Title } = Typography;

const onFinish = (values) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const AddChallenge = () => {
    const [addData, setData] = useState("");
    const [val, setVal] = useState('');
    const [addedData, showData] = useState(0);
    const handleChange = (event, editor) => {
        const data = editor.getData();
        console.log( { event, editor, data } );
    }

    return (
        <div className="add-form">
            <Layout>
                <Form
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                >
                    <Form.Item
                    label="Назва"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Опис"
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
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
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
            </Layout>
        </div>
    )
}

export default AddChallenge;