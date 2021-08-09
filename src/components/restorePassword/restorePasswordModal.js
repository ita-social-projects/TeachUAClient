import React, {useState} from "react";
import {Button, Form, message, Modal} from "antd";
import EmailInput from "./emailConfirmation";
import  "./../login/css/Login.less"
import "./css/RestorePassword.less"
import {getUserByEmail, resetPassword} from "../../service/UserService";
import {Link} from "react-router-dom";
export const RestorePasswordModal = () => {

    const [visible, setVisible] = useState(false);

   const onFinish = (values) => {

       resetPassword(values).then((response) => {
            if (response.status>400) {
                //window.location.reload();
               setVisible(true);
                message.error("Користувача з вказаним емейлом не знайдено")
            } else {
                //window.location.reload();
                setVisible(true);
                message.success("Перевірте свій емейл та знайдіть лист із темою «Відновлення паролю»");
            }
        });
    };

    const stepComponent = (step) => {
        switch (step) {
            case 0:
                return  <EmailInput/>
            case 1:
                return <Form.Item className={"text"}
                                  label={"Перевірте свій емейл та знайдіть лист із темою «Відновлення паролю»"}/>
        }
    };


    return (
        <>
            <div className="reset-button"/>
            <Link
                className="restore-password-button"
                    onClick={() => setVisible(true)}>
                Забули пароль?
            </Link>
            <div/>
            <Modal
                className="modal-login"
                centered
                width={540}
                visible={visible}
                onOk={() => stepComponent(1)}
                onCancel={() => setVisible(false)}
                footer={null}
            >
                <div className="login-header">
                    Відновлення
                </div>
                <Form
                    name="edit"
                    requiredMark={true}
                    onFinish={onFinish}
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
