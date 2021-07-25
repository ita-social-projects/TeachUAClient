import React, {useState} from "react";
import {updateUser, verify} from "../../../service/UserService";
import {Button, Form, message, Modal} from "antd";
import UserEditInputPassword from "./UserEditInputPassword";

export const UserEditPasswordModal = ({user}) => {

    const [visible, setVisible] = useState(false);

    const onFinish = (values) => {
        console.log(values.password);

        const stat = [{status: true}]
        const newValues = stat.reduce(
            (result, item) =>
                Object.assign({}, result, item), values)
        console.log(newValues);
        verify(values).then((response) => {
            if (response.status >= 500) {
                message.error("Введено невірний пароль");
            } else if (response.status < 500) {
                message.error("Введено невірний пароль");
            } else {
                //message.success("Ви успішно залогувалися!");
                updateUser(newValues).then((response) => {
                    if (response.status > 400) {
                        // window.location.reload();
                        setVisible(true);
                        message.error("Пароль не було змінено")
                    } else {
                        //  window.location.reload();
                        setVisible(false);
                        message.success("Пароль успішно змінено");
                    }
                });
            }
        })
    }

    return (
        <div>
            <Button name={"password-edit"} className={"submit-button"} type="text button"
                    onClick={() => setVisible(true)}>
                Змінити пароль
            </Button>
            <Modal
                className="ant-modal-password-content"
                centered
                width={480}
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                footer={null}
            >
                <div className="user-edit">
                    <div className="edit-header">
                        Зміна пароля
                    </div>
                </div>
                <div className="ant-modal-password-content">
                    <Form
                        name="edit"

                        requiredMark={false}
                        onFinish={onFinish}>
                        <UserEditInputPassword user={user}/>
                    </Form>
                </div>
            </Modal>
        </div>
    );
};