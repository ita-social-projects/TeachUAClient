import React, {useState} from "react";
import {Button, Form, message, Modal} from "antd";
import ArrowRightOutlined from "@ant-design/icons/lib/icons/ArrowRightOutlined";
import './css/UserEditModal.less';
import UserEditRoles from "./UserEditRoles";
import UserEditInput from "./UserEditInput";
import {updateUser, verify} from "../../../service/UserService";
import {UserEditPasswordModal} from "./UserEditPasswordModal";

const UserEditModal = ({user}) => {

    const [visible, setVisible] = useState(false);

    const onFinish = (values) => {
        console.log(values.password);

        const stat = [{status: true}]
        const newValues = stat.reduce(
            (result, item) =>
                Object.assign({}, result, item), values)
        updateUser(newValues).then((response) => {
            if (response.status > 400) {
                window.location.reload();
                setVisible(true);
                message.error("Профіль не було оновлено")
            } else {
                window.location.reload();
                setVisible(false);
                message.success("Профіль змінено успішно");
            }
        });
    }


    return (
        <>
            <Button type="text button" onClick={() => setVisible(true)}>
                Редагувати профіль
                <ArrowRightOutlined/>
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
                    <UserEditRoles user={user}/>
                    <UserEditInput user={user}/>
                </Form>
            </Modal>
        </>
    );
};

// UserEditModal.propTypes = {
//     user: PropTypes.object.isRequired

export default UserEditModal;
