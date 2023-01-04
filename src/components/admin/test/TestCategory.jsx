import React, {useEffect, useState} from "react";
import { Typography, Form, Input, InputNumber, Button, message, Select, Col, Row } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Link, useParams } from "react-router-dom";
import './css/TestQuestion.css';

import { getQuestionById, getQuestionTypes, getQuestionCategories, createQuestion, updateQuestion } from "../../../service/TestQuestionService";

const { Title } = Typography;

const InputGroup = Input.Group;

export const TestCategory = () => {

    const emptyCategory = {
        title: ''
    }

    const [form] = Form.useForm();
    const params = useParams();
    const [isEditing, setEditing] = useState(false);
    const [types, setTypes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(emptyCategory);

    const init = () => {
        setEditing(params.id !== undefined);    // if category is edited or a new one is created
    }

    const fetchData = () => {
        if (isEditing) {
            fetchCategory();
        }
    }

    const fetchCategory = () => {
        getCategoryById(params.id).then(response => {
            setCategory(response.data);
            form.resetFields();
        });
    }

    const onFinish = (category) => {
        if (isEditing) {
            updateCategory(params.id, category).then(response => {
                message.success('Категорія збережена')
            }).catch(function (error) {
                message.error(error.response.data.message);
            })
            return;
        }
        createCategory(category).then(response => {
            message.success('Категорія збережена');
        }).catch(function (error) {
            message.error(error.response.data.message);
        })
    }

    useEffect(() => {
        init();
    }, []);

    useEffect(() => {
        fetchData();
    }, [isEditing]);

    return (
        <div className="question-form">
            <Link
                to="/admin/quiz/questions/edit"
                className="back-btn"
            >
                <Button  className="flooded-button">
                    До списку категорій
                </Button>
            </Link>
            <Title>Редагування категорію</Title>
            <Form
                form={ form }
                layout='horizontal'
                onFinish={ onFinish }
                initialValues={ category }
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
            >

                <Form.Item
                    name="title"
                    label="Заголовок"
                >
                    <Input />
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
    )
}