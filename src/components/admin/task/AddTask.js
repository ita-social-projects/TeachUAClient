import React, {useEffect, useState} from 'react';
import {Form, Input, message, Typography, Upload, DatePicker, Space, Button, Select} from "antd";
import {UPLOAD_IMAGE_URL} from "../../../service/config/ApiConfig";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import {useForm} from "antd/es/form/Form";
import {createTask} from "../../../service/TaskService";
import Editor from "../challenge/Editor";
import {getAllChallenges} from "../../../service/ChallengeService";
import {Link} from "react-router-dom";
import ChallengesInTasks from "./ChallengesInTasks";
const { Option } = Select;

const { Title } = Typography;
const { TextArea } = Input;

const AddTask = () => {
    const [taskForm] = useForm();
    const [name, setName] = useState();
    const [headerText, setHeaderText] = useState();
    const [picture, setPicture] = useState();
    const [startDate, setStartDate] = useState();
    const [task, setTask] = useState({
        id: 0,
        name: '',
        headerText: '',
        description: '',
        picture: '',
        startDate: '',
        challengeId: 0,
    });
    const [challengeList, setChallengeList] = useState([
        {
            'id' : 0,
            'name' : '',
            'title' : '',
            'sortNumber' : 0
        }
    ]);
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState();
    const [taskId, setTaskId] = useState();
    const dateFormat = 'YYYY-MM-DD';

    const getData = () => {
        getAllChallenges().then(response => {
            setChallengeList(response);
        });
        setLoading(false);
    };

    const handleChange = (id) => {
        setId(id);
    }

    const getChallenges = () => {
        taskForm.setFieldsValue({})
    }

    useEffect(() => {
        getData();
    }, []);

    const onDateChange = (date, dateString) => {
        setStartDate(dateString);
    }

    const onFinish = (values) => {
        const formValues = {...values, startDate: startDate}
        createTask(formValues, values.challengeId)
            .then((response) => {
                if (response.status) {
                    message.warning(response.message);
                    return;
                }
                setTaskId(response.id)
                message.success("Завдання" + response.name + "' успішно додане!");
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="add-form">
            <Link
                to="/admin/tasks"
                className="back-btn"
            >
                <Button  className="flooded-button">
                    До списку завдань
                </Button>
            </Link>
            <Link
                to={"/challenge/task/" + taskId}
                className="back-btn"
            >
                <Button disabled={!taskId} className="flooded-button">
                    Переглянути завдання
                </Button>
            </Link>
            <Title>Додайте завдання</Title>
            <Form
                form={taskForm}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={{ remember: true }}
                autoComplete="off"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}>
                <Form.Item
                    label="Дата початку"
                    name="startDate"
                >
                        <DatePicker
                            onChange={onDateChange}
                            format={dateFormat}
                            value={startDate}
                        />
                </Form.Item>
                <Form.Item
                    name="picture"
                    label="Фото"
                    value={picture}
                >
                    <Upload
                        name="image"
                        listType="picture-card"
                        action={UPLOAD_IMAGE_URL}
                        maxCount={1}
                        data={{folder:`tasks`}}
                        headers={{contentType: 'multipart/form-data'}}>
                        <span className="upload-label"><UploadOutlined className="icon"/>Завантажити</span>
                    </Upload>
                </Form.Item>
                <Form.Item
                    label="Назва"
                    name="name"
                    value={name}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Заголовок"
                    name="headerText"
                >
                    <Editor />
                </Form.Item>
                <Form.Item
                    label="Опис"
                    name="description"
                >
                    <Editor />
                </Form.Item>
                <Form.Item
                    label="Челендж"
                    name="challengeId"
                >
                    <Select
                        placeholder="Оберіть челендж"
                        allowClear
                        name="id"
                        value={id}
                        onChange={handleChange}
                        onSelect={getChallenges}
                    >
                        {challengeList.map((option, index) => (
                            <Option
                                value={option.id}
                                key={option.id}
                            >
                                {option.name}
                            </Option>
                        ))}
                    </Select>
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
            <div>
                <Title level={3}>Доступні челенджі</Title>
                <ChallengesInTasks />
            </div>
        </div>
    )
}

export default AddTask;