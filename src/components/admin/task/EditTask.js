import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {Link} from "react-router-dom";

import {Button, DatePicker, Form, Image, Input, message, Select, Upload} from "antd";
import moment from "moment";

import {useForm} from "antd/es/form/Form";
import {getTask, updateTask} from "../../../service/TaskService";
import {getAllChallenges} from "../../../service/ChallengeService";

import {BASE_URL, UPLOAD_IMAGE_URL} from "../../../service/config/ApiConfig";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import Editor from "../challenge/Editor";
import Title from "antd/es/typography/Title";
import ChallengesInTasks from "./ChallengesInTasks";

const { Option } = Select;
const { TextArea } = Input;

const EditTask = () => {
    const [taskEditForm] = useForm();
    const taskId  = useParams();
    const [taskNotFound, setTaskNotFound] = useState(false);
    const [task, setTask] = useState({
        id: 0,
        name: '',
        headerText: '',
        description: '',
        picture: '',
        startDate: '',
        challengeId: 0,
    });
    const [challengeId, setChallengeId] = useState(task.challengeId);
    const [picture, setPicture] = useState(task.picture);
    const [challengeList, setChallengeList] = useState([
        {
            'id' : 0,
            'name' : '',
            'title' : '',
            'sortNumber' : 0
        }
    ]);
    const [selectedChallenges, setSelectedChallenges] = useState([]);
    const [loading, setLoading] = useState(true);
    const dateFormat = 'YYYY-MM-DD';

    const getData = () => {
        getTask(taskId.id).then(response =>
            setTask(response)
        ).catch(response => {
            if(response.status === 404){
                setTaskNotFound(true);
            }
        });
        setLoading(false);
    };

    const getChallengeData = () => {
        getAllChallenges().then(response => {
            setChallengeList(response);
        });
        setLoading(false);
    };

    const onFill = () => {
        taskEditForm.setFieldsValue(task);
    };

    const onDateChange = (date, dateString) => {
        setTask({...task, startDate: dateString});
    }

    const saveForm = (values) => {
        const formValues = {...values, challengeId: task.challengeId, startDate: task.startDate}
        updateTask(formValues, taskId.id).then(response => {
            console.log(response);
            if (response.status) {
                message.warning(response.message);
                return;
            } message.success(`Завдання ${task.name} успішно оновлено`);
        });
        setTask(formValues);
    }

    const onChange = (value) => {
        setSelectedChallenges(value);
    }

    useEffect(() => {
        getData();
        getChallengeData();
    }, []);

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
                to={"/challenge/task/"+taskId.id}
                className="back-btn"
            >
                <Button  className="flooded-button">
                    Переглянути завдання
                </Button>
            </Link>

            <Title>Оновити завдання</Title>
            <Form
                form={taskEditForm}
                onFinish={saveForm}
                initialValues={onFill()}
                autoComplete="off"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}>
                <Form.Item
                    label="Дата початку"
                >
                    <DatePicker
                        onChange={onDateChange}
                        format={dateFormat}
                        name="startDate"
                        allowClear={false}
                        value={moment(task.startDate,"YYYY-MM-DD")}
                    />
                </Form.Item>
                <Form.Item
                    name="picture"
                    label="Фото"
                    value={picture}
                >
                    <Image
                        width={100}
                        height={100}
                        alt="picture"
                        src={BASE_URL + task.picture}
                    />
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
                    value={task.name}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Заголовок"
                    name="headerText"
                    value={task.headerText}
                >
                    <TextArea />
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
                    value={task.challengeId}
                >
                    <Select
                        placeholder="Оберіть челендж"
                        allowClear
                        onChange={onChange}
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
                <Title level={3}>Усі челенджі</Title>
                <ChallengesInTasks />
            </div>
        </div>
    )
}

export default EditTask;