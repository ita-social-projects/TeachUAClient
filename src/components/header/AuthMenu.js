import React from "react";
import {Avatar, Dropdown, Menu} from "antd";
import CaretDownFilled from "@ant-design/icons/lib/icons/CaretDownFilled";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import ProfileComponent from "../profile/Profile";
import '../profile/сss/Profile.less'


const AuthMenu = () => {
    const profileDropdown = (
        <Menu>
            <ProfileComponent/>
            <Menu.Item>Профіль </Menu.Item>
            <Menu.Item>Настройки</Menu.Item>
            <Menu.Item danger>Вийти</Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={profileDropdown} className="user-profile" placement="bottomCenter" arrow>
            <div>
                <Avatar size="large" icon={<UserOutlined/>}/> <CaretDownFilled/>
            </div>
        </Dropdown>
    )
};

export default AuthMenu;