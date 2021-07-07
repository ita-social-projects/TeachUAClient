import React from 'react';
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import {Form, Radio} from "antd";

const UserEditRoles =({user}) => {

    return (
        <Form.Item name="role"  initialValue={user.roleName}>
            <Radio.Group className="button-container"
                         optionType="button"
                         buttonStyle="solid"
            >

                <Radio.Button value="ROLE_USER"
                disabled>
                    <div className="button-box">
                        <div className="ellipse"><UserOutlined className="user-icon"/></div>
                        Відвідувач
                    </div>
                </Radio.Button>
                <Radio.Button value="ROLE_ADMIN">
                    <div className="button-box">
                        <div className="ellipse"><UserOutlined className="user-icon"/></div>
                        Керівник
                    </div>
                </Radio.Button>
            </Radio.Group>
        </Form.Item>
    )
}
export default UserEditRoles;
