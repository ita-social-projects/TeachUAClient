import React, { useState } from 'react';
import { Form, message, Modal } from "antd";
import LoginSocial from "./LoginSocial";
import LoginInput from "./LoginInput";
import { signIn } from "../../service/UserService";
import './css/Login.less';


const Login = () => {
    const [loginVisible, setLoginVisible] = useState(false);

    const onFinish = (values) => {
        signIn(values).then((response) => {
            if (response.status) {
                message.error(response.message);
            } else {
                console.log(response)
                message.success("Ви успішно залогувалися!");
                localStorage.setItem("id", response.id);
                localStorage.setItem("accessToken", response.accessToken);
                setLoginVisible(false);
            }
        });
    };

    return (
        <div>
            <div onClick={() => setLoginVisible(true)}>
                Увійти
            </div>
            <Modal
                className="modal-login"
                centered
                width={520}
                visible={loginVisible}
                onOk={() => setLoginVisible(false)}
                onCancel={() => setLoginVisible(false)}
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
            </Modal>
        </div>
    );
};

export default Login;