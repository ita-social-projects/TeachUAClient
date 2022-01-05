import React, {useState} from "react";
import {Button, Form, message, Modal} from "antd";
import ArrowRightOutlined from "@ant-design/icons/lib/icons/ArrowRightOutlined";
import './css/UserEditModal.less';
import UserEditRoles from "./UserEditRoles";
import UserEditInput from "./UserEditInput";
import {updateUser, verify, updatePassword} from "../../../service/UserService";


const UserEditModal = ({user}) => {

    const [visible, setVisible] = useState(false);

    const onFinish = (values) => {
        if(values.urlLogo != null && typeof values.urlLogo !== "undefined" && typeof values.urlLogo !== "string") {
            values.urlLogo = values.urlLogo.file.response
        }
        const stat = [{status: true}]
        const newValues = stat.reduce(
            (result, item) =>
                Object.assign({}, result, item), values)
        verify(values).then((response) => {
            if (response.status >= 500) {
                message.error("Введено невірний пароль");
            } else if (response.status < 500) {
                message.error("Введено невірний пароль");
            } else {
                updateUser(newValues).then((response) => {
                    if (response.status >= 400) {
                        window.location.reload();
                        setVisible(true);
                        message.error("Профіль не було оновлено")
                    } else {
                        window.location.reload();
                        setVisible(false);
                        message.success("Профіль змінено успішно");
                    }
                });
                if(newValues.password) {
                    updatePassword(newValues).then((response) => {
                        if (response.status > 400) {
                            window.location.reload();
                            setVisible(true);
                            message.error("Пароль не було змінено")
                        } else {
                            window.location.reload();
                            setVisible(false);
                            message.success("Пароль змінено успішно");
                        }
                    })
                }
            }
        })
    };


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
