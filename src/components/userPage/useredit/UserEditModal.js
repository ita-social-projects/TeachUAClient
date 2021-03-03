import React, {useState} from "react";
import {Button, Form, message, Modal} from "antd";
import ArrowRightOutlined from "@ant-design/icons/lib/icons/ArrowRightOutlined";
import './css/UserEditModal.less';
import UserEditRoles from "./UserEditRoles";
import UserEditInput from "./UserEditInput";
import {updateUser} from "../../../service/UserService";


const UserEditModal = ({user}) => {

    const [visible, setVisible] = useState(false);


    const onFinish = (values) => {
        updateUser(values).then((response) => {
            if(response.status) {
                message.error(response.message);
            }
            else {
                message.success("Профіль змінено успішно");
                setVisible(false);
            }
        });
    };


    return (
        <>
            <Button type="text button" onClick={() => setVisible(true)}>
                Редагувати профіль
                <ArrowRightOutlined />
            </Button>
            <Modal
                className="user-edit"
                centered
                width={880}
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                footer={null}
            >
                <div className="edit-header">
                    Редагувати профіль
                </div>
                <Form
                    name="edit"
                    requiredMark={false}
                    onFinish={onFinish}
                >
                <UserEditRoles user={user} />
                <UserEditInput user={user}
                    />
                </Form>
            </Modal>
        </>
    );
};

// UserEditModal.propTypes = {
//     user: PropTypes.object.isRequired

export default UserEditModal;
