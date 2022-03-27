import React, {useEffect, useState} from 'react';
import {Button, Form, Input, Modal} from "antd";
import "../comments/css/CommentEditComponent.less";
import ModalHint from "./ModalHint";
import {createMessage} from "../../../service/MessageService";
import {MailOutlined, PhoneOutlined} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import {getUserById, getUsersByRole} from "../../../service/UserService";
import {getUserId} from "../../../service/StorageService";


const WriteEditMessage = ({isShowing, setShowing, club}) => {
    const [messageForm] = Form.useForm();
    const [user, setUser] = useState({});
    const [admin, setAdmin] = useState(0);

    useEffect(() => {
        getUserById(getUserId()).then(response => setUser(response));
        getUsersByRole("ROLE_ADMIN").then((response) => setAdmin(response[0]));
    }, [isShowing]);

    const getRecipientId = () => {
        if (club.user) {
            // console.log(`In club with id ${club.id} - user_id = null`);
            return club.user.id;
        } else if (club.center && club.center.user) {
            // console.log(`In club with id ${club.id} - center_id = null or in this center user_id = null`);
            return club.center.user.id;
        } else {
            // console.log(`In club with id ${club.id} - user_id = null and center_id = null`);
            return admin.id;
        }
    }

    const onFinish = (values) => {
        const data = {
            senderId: getUserId(),
            clubId: club.id,
            recipientId: getRecipientId(),
            text: values.text,
        };
        messageForm.resetFields();
        setShowing(false);
        createMessage(data).then(() => window.location.reload())
    };

    return (
        !getUserId()
            ?
            <ModalHint visible={isShowing}
                       setVisible={setShowing}
            >
                Увійдіть або зареєструйтеся!!!
            </ModalHint>
            :
            <div className="comment-edit">
                <Modal
                    className="comment-modal"
                    centered
                    width={521}
                    visible={isShowing}
                    onOk={() => setShowing(false)}
                    onCancel={() => setShowing(false)}
                    footer={null}
                >
                    <span className="comment-edit-title"
                          style={{marginBottom: 25}}
                    >
                        Записатись на гурток
                    </span>

                    <Form
                        name="comment-edit"
                        form={messageForm}
                        requiredMark={true}
                        onFinish={onFinish}
                    >
                        <div className="club-title-note">
                            {club.name}
                        </div>
                        <div className="comment-fields">
                            <Form.Item
                                label="Ім'я"
                                style={{marginBottom: 16}}
                            >
                                <Input
                                    className="comment-input-box"
                                    value={user.lastName + " " + user.firstName}
                                    readOnly={true}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Телефон"
                                style={{marginBottom: 16}}>
                                <Input
                                    className="comment-input-box"
                                    suffix={<PhoneOutlined className="phone-icon"/>}
                                    value={user.phone}
                                    readOnly={true}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                style={{marginBottom: 16}}
                            >
                                <Input
                                    className="comment-input-box"
                                    suffix={<MailOutlined classname="mail-icon"/>}
                                    value={user.email}
                                    readOnly={true}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Опис"
                                name="text"
                                rules={[{
                                    required: true,
                                    message: "Додайте текст повідомлення"
                                }]}
                            >
                                <TextArea autoSize={{minRows: 5, maxRows: 5}}
                                          placeholder="Додайте опис"
                                />
                            </Form.Item>
                        </div>

                        <Form.Item>
                            <Button
                                className="do-comment-button"
                                type="primary"
                                htmlType="submit"
                            >Надіслати</Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
    );
};

export default WriteEditMessage;