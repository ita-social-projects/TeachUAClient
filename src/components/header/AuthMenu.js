import React from "react";
import {Avatar, Dropdown, Menu} from "antd";
import CaretDownFilled from "@ant-design/icons/lib/icons/CaretDownFilled";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import '../registration/сss/Registration.less'
import Registration from "../registration/Registration";
import {Link} from "react-router-dom";
import AddClubModal from "../addClub/AddClubModal";
import Login from "../login/Login";



const AuthMenu = () => {
    const profileDropdown = (
        <Menu>
            <Menu.Item> <Registration/></Menu.Item>
            <Menu.Item> <Login/></Menu.Item>
            <Menu.Item> <AddClubModal/></Menu.Item>
            <Menu.Item> <Link to={`/admin/cities`}>Редагувати міста</Link></Menu.Item>
            <Menu.Item> <Link to={`/admin/contact-types`}>Редагувати контакти</Link></Menu.Item>
            <Menu.Item> <Link to={`/admin/districts`}>Редагувати райони</Link></Menu.Item>
            <Menu.Item> <Link to={`/user/${localStorage.getItem('id')}`}>Мій Профіль </Link></Menu.Item>
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
