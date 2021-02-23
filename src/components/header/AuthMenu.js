import React from "react";
import {Avatar, Button, Dropdown, Menu} from "antd";
import CaretDownFilled from "@ant-design/icons/lib/icons/CaretDownFilled";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import '../registration/сss/Registration.less'
import Registration from "../registration/Registration";
import {ROOT_URI} from "../../config/ApplicationConfig";


const AuthMenu = () => {
    const profileDropdown = (
        <Menu>
            <Menu.Item> <Registration/></Menu.Item>
            <Menu.Item> Додати гурток</Menu.Item>
            <Menu.Item> <a target="blank" href={`${ROOT_URI}/user`} >Мій Профіль </a></Menu.Item>
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