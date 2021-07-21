import React, {useState} from "react";
import {Button, Form, message, Modal} from "antd";
import EmailInput from "./emailConfirmation";
import  "./../login/css/Login.less"
import "./css/RestorePassword.less"
export const RestorePasswordModal = () => {

    const [visible, setVisible] = useState(false);

   /* const onFinish = (values) => {
        const stat = [{status: true}]
        const newValues = stat.reduce(
            (result, item) =>
                Object.assign({}, result, item), values)

        updateUser(newValues).then((response) => {
            if (response.status>400) {
                window.location.reload();
                setVisible(true);
                message.error("Профіль не було оновлено")
            } else {
                window.location.reload();
                setVisible(false);
                message.success("Профіль змінено успішно");
            }
        });
    };*/

    return (
        <>
            <Button
                className="restore-password-button"
                    onClick={() => setVisible(true)}>
                Забули пароль?
            </Button>
            <Modal
                className="modal-login"
                centered
                width={520}
                visible={visible}
                //onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                footer={null}
            >
                <div className="login-header">
                    Відновлення
                </div>
                <Form
                    name="edit"
                    requiredMark={false}
                    //onFinish={onFinish}
                >
                    <EmailInput/>
                </Form>
            </Modal>
        </>
    );
};

// UserEditModal.propTypes = {
//     user: PropTypes.object.isRequired

export default RestorePasswordModal;
