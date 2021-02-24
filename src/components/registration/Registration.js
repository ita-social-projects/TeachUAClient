import React, {useState} from 'react';
import {Button, Form, Modal, Switch} from 'antd';
import './сss/Registration.less';
import RegistrationRoles from "./RegistrationRoles";
import RegistrationSocial from "./RegistrationSocial";
import RegistrationInput from "./RegistrationInput";
import {registerUser} from "../../service/UserService";


const Registration = () => {
    const [visible, setVisible] = useState(false);
    const [disabledButton, setDisabledButton] = useState(true);

    const onFinish = (values) => {
        registerUser(values).then((response) => {
            console.log(response)
        });
    };

    const validateMessages = {
        required: 'Заповніть поле ${label}!',
        types: {
            email: '${label} is not a valid email!',
        },
    };

    return (
        <>
            <Button type="text button" onClick={() => setVisible(true)}>
                Зареєструватися
            </Button>
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
                        name="basic"
                        onFinish={onFinish}
                        validateMessages={validateMessages}
                    >
                        <RegistrationRoles setDisabledButton={setDisabledButton}
                                           disabledButton={disabledButton}/>
                        <RegistrationSocial/>
                        <RegistrationInput disabledButton={disabledButton}/>
                    </Form>
                </div>
            </Modal>
        </>
    );
};

export default Registration;
