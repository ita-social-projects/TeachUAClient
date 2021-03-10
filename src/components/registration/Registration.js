import React, { useState } from 'react';
import { Button, Form, message, Modal, Switch } from 'antd';
import './сss/Registration.less';
import RegistrationRoles from "./RegistrationRoles";
import RegistrationSocial from "./RegistrationSocial";
import RegistrationInput from "./RegistrationInput";
import { signUp } from "../../service/UserService";


const Registration = () => {
    const [visible, setVisible] = useState(false);
    const [disabledButton, setDisabledButton] = useState(true);
    const [role, setRole] = useState(null);

    const onFinish = (values) => {
        console.log(values);
        signUp(values).then((response) => {
            if (response.status) {
                message.error(response.message);
            }
            else {
                console.log(response)
                message.success("Ви успішно зареєструвались!");
                setVisible(false);
            }
        });
    };


    return (
        <div>
            <div onClick={() => setVisible(true)}>
                Зареєструватися
            </div>
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
                    Реєстрація
                </div>
                <div className="registration-content">
                    <Form
                        requiredMark={false}
                        onFinish={onFinish}
                    >
                        <RegistrationRoles setDisabledButton={setDisabledButton}
                            disabledButton={disabledButton} setRole={setRole} />
                        <RegistrationSocial role={role} />
                        <RegistrationInput disabledButton={disabledButton} />
                    </Form>
                </div>
            </Modal>
        </div>
    );
};

export default Registration;
