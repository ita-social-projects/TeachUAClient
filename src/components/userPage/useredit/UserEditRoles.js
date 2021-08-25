import React from 'react';
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import {Form, Radio} from "antd";

const UserEditRoles =({user}) => {
function disable(value){
    if (value===user.roleName){
        return false;
    }
    else return true;
}
    return (
        <Form.Item name="role"  initialValue={user.roleName}>
            <Radio.Group className="button-container"
                         optionType="button"
                         buttonStyle="solid"
            >

                <Radio.Button value="ROLE_USER"
                disabled={disable("ROLE_USER")}>
                    <div className="button-box">
                        <div className="ellipse"><UserOutlined className="user-icon"/></div>
                        <div className="role-name"> Відвідувач</div>
                    </div>
                </Radio.Button>
                <Radio.Button value={user.roleName} disabled={!disable("ROLE_USER")}>
                    <div className="button-box">
                        <div className="ellipse"><UserOutlined className="user-icon"/></div>
                        <div className="role-name"> Керівник</div>
                    </div>
                </Radio.Button>
            </Radio.Group>
        </Form.Item>
    )
}
export default UserEditRoles;
