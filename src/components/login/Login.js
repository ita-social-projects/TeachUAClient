import React, { useState } from 'react';
import { Form, message, Modal } from "antd";
import LoginSocial from "./LoginSocial";
import LoginInput from "./LoginInput";
import { signIn } from "../../service/UserService";
import './css/Login.less';
import { saveUserId, saveToken } from '../../service/StorageService';

const Login = ({verifyCode}) => {
    const [loginVisible, setLoginVisible] = useState(false);

    const onFinish = (values) => {
        signIn(values).then((response) => {
            if (response.status>=500) {
                message.error("Ваш email не підтверджено. Будь ласка підтвердіть email");
            } else if(response.status<500){
                message.error("Введено невірний пароль або email");
            }
            else {
                message.success("Ви успішно залогувалися!");
                saveUserId(response.id);
                saveToken(response.accessToken);
                setLoginVisible(false);
                if (verifyCode !== undefined) {
                    if(process.env.REACT_APP_ROOT_SERVER === "http://localhost:8080"){
                        window.location = "http://localhost:3000/dev";
                    }else{
                        window.location = process.env.REACT_APP_ROOT_SERVER + process.env.PUBLIC_URL;
                    }
                    //window.location = "https://speak-ukrainian.org.ua/dev/";
                    // window.location = "http://localhost:3000/dev";
                }
                let a = setTimeout(() => {
                    console.log("before reload ");
                    window.location.reload();
                    clearTimeout(a);
                    }, 1000);
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
                        <div className="edit-button">

                        </div>
                    </Form>
                </div>
            </Modal>
        </div>
    );
};

export default Login;