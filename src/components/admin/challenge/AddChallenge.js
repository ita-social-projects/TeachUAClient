import React, {useEffect, useState} from 'react';
import './css/AddChallenge.css';
import {Layout, Typography, Form, Input, Button, message, Upload} from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {createChallenge} from "../../../service/ChallengeService";
import {useForm} from "antd/es/form/Form";
import {UPLOAD_IMAGE_URL} from "../../../service/config/ApiConfig";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";

const { Content } = Layout;
const { Title } = Typography;

const AddChallenge = () => {
    const [challengeForm] = useForm();
    const [name, setName] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [sortNumber, setSortNumber] = useState();
    const [picture, setPicture] = useState();

    const handleNameChange = (value) => {
        setName(value);
    }
    const handleTitleChange = (value) => {
        setTitle(value);
    }
    const handleSortNumberChange = (value) => {
        setSortNumber(value);
    }
    const handlePictureChange = (value) => {
        setPicture(value);
    }

    const onFinish = (values) => {
        values.description = description;
        createChallenge(values)
            .then((response) => {
                if (response.status) {
                    message.warning(response.message);
                    return;
                }
                message.success("Челендж '" + response.name + "' успішно доданий!");

            });
        console.log('Success:', values);
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
                    name="sortNumber"
                    label="sortNumber"
                    value={sortNumber}
                    onChange={handleSortNumberChange}
                    >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="name"
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="title"
                    name="title"
                    value={title}
                    onChange={handleTitleChange}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="description"
                    name="description"
                    value={description}
                >
                    <CKEditor
                        data={description}
                        editor={ ClassicEditor }
                        onInit={ editor => {
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setDescription(data);
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name="picture"
                    label="picture"
                    value={picture}
                    onChange={handlePictureChange}
                           >
                    <Upload
                        name="image"
                        listType="picture-card"
                        className="avatar-uploader"
                        action={UPLOAD_IMAGE_URL}
                        maxCount={1}
                        data={{folder:`challenges`}}
                        headers={{contentType: 'multipart/form-data'}}>
                        <span className="upload-label"><UploadOutlined className="icon" />Завантажити</span>
                    </Upload>
                </Form.Item>
                <Form.Item
                >
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
    )
}

export default AddChallenge;