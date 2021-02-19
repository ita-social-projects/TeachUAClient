import React from 'react';
import {Button} from "antd";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import Radio from "antd/es/radio/radio";

const RegistrationRoles = ({setDisabledButton}) => {

    const onChangeHandle = (e) => {
        setDisabledButton(false)
        console.log(e.target.value)
    }

    return (
        <Radio.Group className="button-container"
                     options={[{
                         label: (
                             <div className="button-box">
                                 <div className="ellipse"><UserOutlined className="user-icon"/></div>
                                 Відвідувач
                             </div>),
                         value: 'user'
                     }, {label: (
                             <div className="button-box">
                                 <div className="ellipse"><UserOutlined className="user-icon"/></div>
                                 Власник
                             </div>), value: 'owner'}]}
                     onChange={onChangeHandle}
                     optionType="button"
                     buttonStyle="solid"
        />
    )
}

export default RegistrationRoles
