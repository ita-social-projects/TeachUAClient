import React, {useState} from 'react';
import {Form, message, Modal} from "antd";
import LoginSocial from "./LoginSocial";
import LoginInput from "./LoginInput";
import {signIn} from "../../service/UserService";


const Login = () => {
    const [loginVisible, setLoginVisible] = useState(false);
    const [disabledButton, setDisabledButton] = useState(true);

    const onFinish = (values) => {
        signIn(values).then((response) => {
            if(response.status) {
                message.error(response.message);
            }
            else {
                console.log(response)
                message.success("Ви успішно залогувался!");
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
                className="modal-registration"
                centered
                width={520}
                visible={loginVisible}
                onOk={() => setLoginVisible(false)}
                onCancel={() => setLoginVisible(false)}
                footer={null}
            >
                <div className="registration-header">
                    Вхід
                </div>
                <div className="registration-content">
                    <Form
                        name="basic"
                        requiredMark={false}
                        onFinish={onFinish}
                    >
                        <LoginSocial/>
                        <LoginInput/>
                    </Form>
                </div>
            </Modal>
        </div>
    );
};

export default Login;