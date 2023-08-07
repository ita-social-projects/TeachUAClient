import React, {useState} from 'react';
import {Form, message, Modal} from 'antd';
import './сss/Registration.less';
import RegistrationRoles from "./RegistrationRoles";
import RegistrationSocial from "./RegistrationSocial";
import RegistrationInput from "./RegistrationInput";
import {signUp} from "../../service/UserService";


const Registration = ({isShowing, setShowing}) => {
 
    const [disabledButton, setDisabledButton] = useState(true);
    const [role, setRole] = useState("ROLE_USER");


    const onFinish = (values) => {
        setShowing(false)

        values.role = role;

        console.log(values);
        signUp(values).then((response) => {
            if (response.status) {
                message.error("Вказаний email вже зареєстрований на сайті");
            } else {
                message.success({
                    content: 'Ви успішно зареєструвалися! \n' +
                        'Вам на пошту відправлено лист з лінком для підтвердження реєстрації',
                    duration: 5,
                    className: "custom-class-confirmation",
                });
                setShowing(false)
            }
        });
    };
    return (
        
            <Modal
                className="modal-registration"
                centered
                width={520}
                open={isShowing}
                onOk={() => setShowing(false)}
                onCancel={() => setShowing(false)}
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
                        <RegistrationSocial role={role}/>
                        <RegistrationRoles setDisabledButton={setDisabledButton}
                                          disabledButton={disabledButton} setRole={setRole}/>
                        <RegistrationInput disabledButton={disabledButton}/>
                    </Form>
                </div>
            </Modal>
       
    );
};
export default Registration;
