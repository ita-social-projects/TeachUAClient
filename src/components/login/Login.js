import React, {useState} from 'react';
import {Form, message, Modal} from "antd";
import LoginSocial from "./LoginSocial";
import LoginInput from "./LoginInput";
import {signIn} from "../../service/UserService";


const Login = () => {

    const [visible, setVisible] = useState(false);
    const [disabledButton, setDisabledButton] = useState(true);


    const onFinish = (values) => {
        signIn(values).then((response) => {
            if(response.status) {
                message.error(response.message);
            }
            else {
                message.success("Ви успішно залогувался!");
                setVisible(false);
            }
        });
    };



    return (
        <>
            <span type="text" onClick={() => setVisible(true)}>
                Увійти
            </span>
            <Modal
                className="modal-registration"
                centered
                width={520}
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
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
        </>
    );
};

export default Login;