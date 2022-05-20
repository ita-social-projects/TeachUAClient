import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
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
import {tokenToHeader, uploadImage} from "../../../service/UploadService";

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

    const [currentPicture, setCurrentPicture] = useState([{
        uid: "",
        name: "",
        status: "",
        url: ""
    }]);

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
    const dateFormat = 'DD-MM-YYYY';

    const getData = () => {
        getTask(taskId.id).then(response => {
                console.log(response);
                setTask(response);
                let img = [{
                    uid: "1",
                    name: response.name,
                    status: "uploaded",
                    url: BASE_URL + response.picture
                }]
                setCurrentPicture(img);
            }
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
        console.log(dateString);
        setTask({...task, startDate: moment(date).format("YYYY-MM-DD")});
        console.log(task);
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

    const handlePictureChange = (value) => {
        if(value.file.status == "removed"){
            task.picture = null;
        } else {
            setPicture("/upload/tasks/" + value.file.name)
            task.picture = picture;
        }
        setCurrentPicture(value.fileList);
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
                to={"/challenges/task/"+taskId.id}
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
                    <Upload
                        name="image"
                        listType="picture-card"
                        action={UPLOAD_IMAGE_URL}
                        maxCount={1}
                        fileList={currentPicture}
                        data={{folder:`tasks`}}
                        headers={{contentType: 'multipart/form-data', Authorization: tokenToHeader()}}
                        onChange={(uploaded) => handlePictureChange(uploaded)}>
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