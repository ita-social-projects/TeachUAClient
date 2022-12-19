import React, { useState } from 'react';
import { Form, message, Modal } from "antd";
import LoginSocial from "./LoginSocial";
import LoginInput from "./LoginInput";
import RestorePasswordModal from "../restorePassword/restorePasswordModal";
import { signIn } from "../../service/UserService";
import { saveUserId, saveToken, saveRole } from '../../service/StorageService';
import './../restorePassword/css/RestorePassword.less';
import './css/Login.less';

const Login = ({isShowing, setShowing, setIsLogin}) => {

    const onFinish = (values) => {
        signIn(values).then((response) => {
            if (response.status>=500) {
                message.error("Ваш email не підтверджено. Будь ласка підтвердіть email");
            } else if(response.status < 500){
                message.destroy();
                message.error("Введено невірний пароль або email");
            }
            else {
                message.success("Ви успішно залогувалися!");
                saveUserId(response.id);
                saveRole(response.roleName);
                saveToken(response.accessToken);
                setShowing(false);
                setIsLogin(true);
            }
        });
    };

    return (
        
            <Modal
                className="modal-login"
                centered
                width={520}
                visible={isShowing}
                onOk={() => setShowing(false)}
                onCancel={() => setShowing(false)}
                footer={null}
            >
                <div className="login-header">
                    Вхід
                </div>
                <div className="login-content">
                    <Form
                        name="basic"
                        requiredMark={false}
                        onFinish={onFinish}
                    >
                        <LoginSocial />
                        <LoginInput />

                    </Form>
                </div>
                <div className="restore-password">
                    <RestorePasswordModal/>
                </div>
            </Modal>
        
    );
};

export default Login;