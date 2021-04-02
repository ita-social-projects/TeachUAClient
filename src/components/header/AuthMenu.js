import React from "react";
import {Avatar, Dropdown, Menu} from "antd";
import CaretDownFilled from "@ant-design/icons/lib/icons/CaretDownFilled";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import '../registration/сss/Registration.less'
import Registration from "../registration/Registration";
import {Link} from "react-router-dom";
import AddClubModal from "../addClub/AddClubModal";
import Login from "../login/Login";
import {deleteToken, deleteUserId, getToken} from "../../service/StorageService";

const {SubMenu} = Menu;

const AuthMenu = () => {
    const onExitClick = () => {
        deleteToken();
        deleteUserId();
        window.location.assign(process.env.PUBLIC_URL);
    };

    const profileDropdown = () => {
        if (getToken()) {
            return (
                <Menu>
                    <Menu.ItemGroup title="Користувач">
                        <Menu.Item><AddClubModal/></Menu.Item>
                        <Menu.Item><Link to={`/user/${localStorage.getItem('id')}`}>Мій Профіль </Link></Menu.Item>
                        <Menu.Item onClick={onExitClick} danger>Вийти</Menu.Item>
                    </Menu.ItemGroup>
                    <SubMenu title="Адмін">
                        <Menu.Item><Link to="/admin/cities">Міста</Link></Menu.Item>
                        <Menu.Item><Link to="/admin/districts">Райони</Link></Menu.Item>
                        <Menu.Item><Link to="/admin/contact-types">Контакти</Link></Menu.Item>
                        <Menu.Item><Link to="/admin/users">Користувачі</Link></Menu.Item>
                        <Menu.Item><Link to="/admin/questions">FAQ</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            )
        } else {
            return (<Menu>
                    <Menu.Item> <Registration/></Menu.Item>
                    <Menu.Item> <Login/></Menu.Item>
                </Menu>
            )
        }
    };

    return (
        <Dropdown overlay={profileDropdown} className="user-profile" placement="bottomCenter" arrow>
            <div>
                <Avatar size="large" icon={<UserOutlined/>}/> <CaretDownFilled/>
            </div>
        </Dropdown>
    )
};

export default AuthMenu;
