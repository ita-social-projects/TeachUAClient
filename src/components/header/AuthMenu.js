import React, { useEffect, useState } from "react";
import { Avatar, Dropdown, Menu } from "antd";
import CaretDownFilled from "@ant-design/icons/lib/icons/CaretDownFilled";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import '../registration/сss/Registration.less'
import Registration from "../registration/Registration";
import { Link } from "react-router-dom";
import AddClubModal from "../addClub/AddClubModal";
import Login from "../login/Login";
import { deleteToken, deleteUserId, getToken, getUserId } from "../../service/StorageService";
import { DOWNLOAD_DATABASE_SQL } from "../../service/config/ApiConfig";
import { getUserById } from "../../service/UserService";
import './css/authMenu.css';

const { SubMenu } = Menu;

const AuthMenu = () => {
    const [user, setUser] = useState('');
    const [source, setSource] = useState('');
    const [styleClass, setStyleClass] = useState('');
    const [isLogin, setIsLogin] = useState('');

    const onExitClick = () => {
        deleteToken();
        deleteUserId();
        window.location.assign(process.env.PUBLIC_URL);
    };

    useEffect(() => {
        getUserById(getUserId()).then(response => {
            setUser(response);
            if (response) {
                if (response.urlLogo?.includes("https")) {
                    setSource(response.urlLogo);
                }
                else {
                    setSource(process.env.PUBLIC_URL + response.urlLogo)
                }
                setStyleClass("avatarIfLogin");
            } else {
                setStyleClass("avatarIfNotLogin");
            }
        })
    }, [isLogin])

    const profileDropdown = () => {
        if (getToken()) {
            return (
                <Menu>
                    <Menu.Item><AddClubModal /></Menu.Item>
                    <Menu.Item><Link to={`/user/${localStorage.getItem('id')}`}>Мій Профіль </Link></Menu.Item>
                    <Menu.Item onClick={onExitClick} danger>Вийти</Menu.Item>

                    <SubMenu title="Адміністрування" >
                        <Menu.Item><Link to="/admin/cities">Міста</Link></Menu.Item>
                        <Menu.Item><Link to="/admin/districts">Райони</Link></Menu.Item>
                        <Menu.Item><Link to="/admin/stations">Станції/Місцевості</Link></Menu.Item>
                        <Menu.Item><Link to="/admin/categories">Категорії</Link></Menu.Item>
                        <Menu.Item><Link to="/admin/contact-types">Контакти</Link></Menu.Item>
                        <Menu.Item><Link to="/admin/users">Користувачі</Link></Menu.Item>
                        <Menu.Item><Link to="/admin/questions">FAQ</Link></Menu.Item>
                        <Menu.Item><Link to="/admin/import-database">Імпортувати дані</Link></Menu.Item>
                        <Menu.Item><Link target="_blank" to={{ pathname: DOWNLOAD_DATABASE_SQL }} download>
                            Експортувати дані</Link></Menu.Item>
                        <Menu.Item><Link to="/admin/club-approve">Підтвердження</Link></Menu.Item>
                        <Menu.Item><Link to="/admin/change-club-owner">Зміна власника</Link></Menu.Item>
                    </SubMenu >
                </Menu >
            )
        } else {
            return (<Menu>
                <Menu.Item> <Registration /></Menu.Item>
                <Menu.Item> <Login isLogin={setIsLogin} /></Menu.Item>
            </Menu>
            )
        }
    };

    return (
        <Dropdown overlay={profileDropdown} className="user-profile" placement="bottomCenter" arrow>
            <div>
                <Avatar size="large" className={styleClass} src={source} icon={<UserOutlined />} /> <CaretDownFilled />
            </div>
        </Dropdown>
    )
};

export default AuthMenu;