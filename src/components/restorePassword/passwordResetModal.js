import React, {useEffect, useState} from "react";
import Layout from "antd/lib/layout/layout";
import './../verifyPage/css/VerifyPage.less';
import {useLocation} from "react-router";
import "../userPage/css/User.less"
import {Form, message, Modal} from "antd";
//import EmailInput from "./emailConfirmation";
import {changePassword, verifyReset} from "../../service/UserService";
import {verifyUser} from "../../service/VerifyService";
import Login from "../login/Login";
import PasswordResetInput from "./passwordResetInput";

const ResetPasswordModal = () => {

    const [visible, setVisible] = useState(true);

    const onFinish = (values) => {

        changePassword(values).then((response) => {
            if (response.status > 400) {
                message.error("Пароль не відповідає критеріям")
            } else {
                message.success("Пароль змінено успішно");
                setTimeout(function () {
                    if (process.env.REACT_APP_ROOT_SERVER === "http://localhost:8080") {
                        window.location = "http://localhost:3000/dev";
                    } else {
                        window.location = process.env.REACT_APP_ROOT_SERVER + process.env.PUBLIC_URL;
                    }
                }, 3000);

                setVisible(false);

            }
        });
    };

    return (
        <div>
            <Layout className="aboutProject global-padding">
                <Modal
                    className="user-edit"
                    centered
                    width={540}
                    onOk={() => setVisible(false)}
                    visible={visible}
                    onCancel={() => setVisible(true)}
                    footer={null}
                    closeIcon={visible}
                >
                    <div className="edit-header">
                        Відновлення паролю
                    </div>
                    <Form
                        name="edit"
                        requiredMark={true}
                        onFinish={onFinish}
                    >
                        <PasswordResetInput/>
                    </Form>
                </Modal>
            </Layout>
        </div>
    )
}
export default ResetPasswordModal;