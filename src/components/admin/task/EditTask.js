import React, {useEffect, useState} from "react";
import {useForm} from "antd/es/form/Form";
import {getTask} from "../../../service/TaskService";
import {useParams} from "react-router";
import {Button, DatePicker, Form, Input, Select, Upload} from "antd";
import {UPLOAD_IMAGE_URL} from "../../../service/config/ApiConfig";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import Editor from "../challenge/Editor";
import Title from "antd/es/typography/Title";
import {Link} from "react-router-dom";
const { Option } = Select;

const EditTask = () => {
    const [taskForm] = useForm();
    const taskId  = useParams();
    const [taskNotFound, setTaskNotFound] = useState(false);
    const [task, setTask] = useState({
        id: 0,
        name: '',
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

    useEffect(() => {
        getData();
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
                to="/admin/challenge/task/:id/view"
                className="back-btn"
            >
                <Button  className="flooded-button">
                    Переглянути завдання
                </Button>
            </Link>

            <Title>Оновити завдання</Title>
            <Form
                form={taskForm}
                //onFinish={onFinish}
                //onFinishFailed={onFinishFailed}
                initialValues={{ remember: true }}
                autoComplete="off"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}>
                <Form.Item
                    label="Дата початку"
                    name="startDate"
                >
                    <DatePicker
                        //defaultPickerValue={moment(new Date(), 'YYYY-MM-DD')}
                        // onChange={onDateChange}
                        // format={dateFormat}
                        // value={startDate}
                    />
                </Form.Item>
                <Form.Item
                    name="picture"
                    label="Фото"
                    //value={picture}
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
                    //value={name}
                >
                    <Input/>
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
                        //value={id}
                        // onChange={handleChange}
                        // onSelect={getChallenges}
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
        </div>
    )
}

export default EditTask;