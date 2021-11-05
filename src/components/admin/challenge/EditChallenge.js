import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {Link} from "react-router-dom";

import {Typography, Form, Input, Button, Upload, message, Image, Switch, Select} from 'antd';
import {useForm} from "antd/es/form/Form";

import {getChallengeById, updateChallenge} from "../../../service/ChallengeService";
import {BASE_URL, UPLOAD_IMAGE_URL} from "../../../service/config/ApiConfig";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import "react-quill/dist/quill.snow.css";
import Editor from './Editor';
import TasksSelect from "./TasksSelect";
import TasksInChallenge from "./TasksInChallenge";
//const { Option } = Select;

const { Title } = Typography;

const EditChallenge = (props) => {

    const [challenge, setChallenge] = useState([{
        id: 0,
        name: "",
        title: "",
        description: "",
        picture: "",
        sortNumber: 0,
        isActive: "",
        tasks: []
    }]);
    const [challengeNotFound, setChallengeNotFound] = useState(false);
    const [loading, setLoading] = useState(true);
    const [picture, setPicture] = useState(challenge.picture);
    const [description, setDescription] = useState();
    const [challengeEditForm, form] = useForm();
    const challengeId  = useParams();
    const [name, setName] = useState();
    const [title, setTitle] = useState();
    const [sortNumber, setSortNumber] = useState();
    const [isChecked, setIsChecked] = useState(challenge.isActive);
    const [selectedTasks, setSelectedTasks] = useState ([]);
    // const [tasks, setTasks] = useState( [{ // to activate when tasks select is ready
    //     id: 0,
    //     name: "",
    //     startDate: ""
    // }])

    const handleNameChange = (value) => {
        setName(value);
    }

    const getData = () => {
        getChallengeById(challengeId.id).then(response =>
            setChallenge(response)
        ).catch(response => {
            if(response.status === 404){
                setChallengeNotFound(true);
            }
        });
        setLoading(false);
    };

    const onFill = () => {
        challengeEditForm.setFieldsValue(challenge);
    };

    const saveForm = (values) => {
        //const formValues = {...values, tasks: selectedTasks}, to activate tasks select, paste formValues instead of values
        updateChallenge(values, challengeId.id).then(response => {
            console.log(response);
            if (response.status) {
                message.warning(response.message);
                return;
            } message.success(`Челендж ${challenge.name} успішно оновлено`);
        });
        setChallenge(values);
    };

    const handleToggleSwitch = (state) => {
        console.log("handleChange", state);
        setIsChecked(state);
    };

    useEffect(() => {
        getData();
    }, []);

    return(
        <div className="add-form">
            <Link
                to="/admin/challenges"
                className="back-btn"
            >
                <Button  className="flooded-button">
                    До списку челенджів
                </Button>
            </Link>
            <Link
                to={"/challenge/"+challengeId.id}
                className="back-btn"
            >
                <Button  className="flooded-button">
                    Переглянути челендж
                </Button>
            </Link>
            <Title>Редагування челенджа</Title>
            <Form
                initialValues={onFill()}
                onFinish={saveForm}
                form={challengeEditForm}
                initialValues={{ remember: true }}
                autoComplete="off"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
            >
                <Form.Item
                    name="sortNumber"
                    label="Порядковий номер"
                    value={challenge.sortNumber}
                    onChange={handleNameChange}
                >
                    <Input disabled/>
                </Form.Item>
                <Form.Item
                    name="isActive"
                    label="Статус"
                    value={challenge.isActive}
                >
                    <Switch checked={isChecked} onChange={handleToggleSwitch}/>
                </Form.Item>
                <Form.Item
                    label="Назва"
                    name="name"
                    value={challenge.name}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Заголовок"
                    name="title"
                    value={challenge.title}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Опис"
                    name="description"
                >
                    <Editor />
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
                        src={BASE_URL + challenge.picture}
                    />
                    <Upload
                        name="image"
                        listType="picture-card"
                        action={UPLOAD_IMAGE_URL}
                        maxCount={1}
                        data={{folder:`challenges`}}
                        headers={{contentType: 'multipart/form-data'}}>
                        <span className="upload-label"><UploadOutlined className="icon" />Завантажити</span>
                    </Upload>
                </Form.Item>
                {/* working solution for tasks select, which doesn't have the back-end yet */}
                {/*<Form.Item*/}
                {/*    label="Завдання"*/}
                {/*    name="tasks"*/}
                {/*>*/}
                {/*    <TasksSelect selectedTasks={selectedTasks} setSelectedTasks={setSelectedTasks}/>*/}
                {/*</Form.Item>*/}
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
                <Title level={3}>Усі завдання</Title>
                <TasksInChallenge />
            </div>
        </div>
    )

}
export default EditChallenge;