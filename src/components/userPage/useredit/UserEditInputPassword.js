import React from "react";
import {Button, Form} from "antd";
import {PasswordUpdate} from "./UserEditInput";

const Data = ({user}) => {
    return (
        <div className="user-edit-column">

            <Form.Item name="role"
                       initialValue={user.roleName}>
            </Form.Item>
            <Form.Item name="lastName"
                       initialValue={user.lastName}
                       className="user-edit-input">
            </Form.Item>
            <Form.Item name="firstName"
                       initialValue={user.firstName}
                       className="user-edit-input">
            </Form.Item>
            <Form.Item name="phone"
                       initialValue={user.phone}
                       className="user-edit-input">
            </Form.Item>
            <Form.Item name="email"
                       initialValue={user.email}
                       className="user-edit-input">
            </Form.Item>

            <Form.Item name="urlLogo"
                       initialValue={user.urlLogo}/>
        </div>
    )
};


const UserEditInputPassword = ({user}) => {
    return (
        <div>
            <Form.Item name="id"
                       initialValue={user.id}>
            </Form.Item>
            <PasswordUpdate/>
            <div hidden={true}><Data user={user}/></div>
            <div className="user-edit">
                <Button className="submit-button "
                        htmlType="submit">
                    Змінити пароль
                </Button>
            </div>

        </div>
    )
};

export default UserEditInputPassword;