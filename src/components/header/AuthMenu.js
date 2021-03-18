import React from "react";
import {Avatar, Dropdown, Menu} from "antd";
import CaretDownFilled from "@ant-design/icons/lib/icons/CaretDownFilled";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import '../registration/сss/Registration.less'
import Registration from "../registration/Registration";
import { Link, Redirect } from "react-router-dom";
import AddClubModal from "../addClub/AddClubModal";
import Login from "../login/Login";
import { deleteToken, deleteUserId, getToken } from "../../service/StorageService";


const AuthMenu = () => {
    const onExitClick = () => {
        deleteToken();
        deleteUserId();
    }

    const profileDropdown = () => {
        if (getToken()) {
            return (<Menu>
                <Menu.Item > <AddClubModal /></Menu.Item>
                <Menu.Item> <Link to={`/user/${localStorage.getItem('id')}`}>Мій Профіль </Link></Menu.Item>
                <Menu.Item onClick={onExitClick} danger>Вийти</Menu.Item>
            </Menu>
            )
        }
        else {
            return (<Menu>
                <Menu.Item> <Registration /></Menu.Item>
                <Menu.Item> <Login /></Menu.Item>
                <Menu.Item > <AddClubModal /></Menu.Item>
            </Menu>
            )
        }
    }

    return (
        <Dropdown overlay={profileDropdown} className="user-profile" placement="bottomCenter" arrow>
            <div>
                <Avatar size="large" icon={<UserOutlined/>}/> <CaretDownFilled/>
            </div>
        </Dropdown>
    )
};

export default AuthMenu;
