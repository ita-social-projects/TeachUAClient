import React from "react";
import {Avatar, Button, Dropdown, Menu} from "antd";
import CaretDownFilled from "@ant-design/icons/lib/icons/CaretDownFilled";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import ProfileLoginComponent from "../profile/ProfileLogin";
import '../profile/сss/Profile.less'
import ProfileRegistrationComponent from "../profile/ProfileRegistration";
import UserPage from "../userPage/UserPage";


const AuthMenu = () => {
    const profileDropdown = (
        <Menu>

            <Menu.Item><ProfileLoginComponent/></Menu.Item>
            <Menu.Item> <ProfileRegistrationComponent/></Menu.Item>
            <Menu.Item> <a target="blank" href="/user"><Button> Сторінка користувача</Button> </a></Menu.Item>
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