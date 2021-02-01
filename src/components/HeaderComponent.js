import React, {useContext, useState} from 'react';
import {Avatar, Button, Dropdown, Menu} from "antd";
import {Header} from "antd/es/layout/layout";
import {Link} from "react-router-dom";
import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";
import CaretDownFilled from "@ant-design/icons/lib/icons/CaretDownFilled";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import {SearchContext, searchParameters} from "../context/SearchContext";
import {doRequest} from "../requests/Requester";

const menuCity = (cities, setData) => {
    return (
        <Menu onClick={(value) => {
            searchParameters.cityName = value.key === "all" ? "" : value.key;
            doRequest('/clubs/search', searchParameters).then(response => setData(response));
        }}>
            {
                cities.map(city => {
                    return (<Menu.Item  key={city.name}>{city.name}</Menu.Item>)
                })
            }
            <Menu.Item key="all" danger>Всі</Menu.Item>
        </Menu>
    );
};

const profileMenu = (
    <Menu>
        <Menu.Item>Профіль</Menu.Item>
        <Menu.Item>Настройки</Menu.Item>
        <Menu.Item danger>Вийти</Menu.Item>
    </Menu>
);

const HeaderComponent = () => {
    const data = window.location.pathname === '/' ? 'clubs' : localStorage.getItem("head-component-page");
    const [currentPage, setCurrentPage] = useState(data);
    const [cities, setCities] = useState([]);

    const {setClubs} = useContext(SearchContext);

    useState(() => {
        doRequest('/cities').then(response => setCities(response));
    });

    const onMenuChange = (elem) => {
        setCurrentPage(elem.key);
        localStorage.setItem("head-component-page", elem.key);
    };

    return (
        <Header className="header">
            <div className="left-side-menu">
                <div className="logo"/>
            </div>

            <div className="center-side">
                <Menu className="nav-menu" onClick={onMenuChange} selectedKeys={[currentPage]} mode="horizontal">
                    <Menu.Item key="clubs">
                        <Link to="/clubs">Гуртки</Link>
                    </Menu.Item>
                    <Menu.Item key="projects">
                        <Link to="/projects">Проєкти</Link>
                    </Menu.Item>
                </Menu>
            </div>

            <div className="right-side-menu">
                <Button className="outlined-button support-button">Допомогти</Button>
                <div className="left-divider">
                    <Dropdown overlay={menuCity(cities, setClubs)} className="city" placement="bottomCenter" arrow>
                        <div>
                            <EnvironmentFilled className="icon"/> {searchParameters.cityName.length === 0 ? "Місто" : searchParameters.cityName} <CaretDownFilled/>
                        </div>
                    </Dropdown>
                    <Dropdown overlay={profileMenu} className="user-profile" placement="bottomCenter" arrow>
                        <div>
                            <Avatar size="large" icon={<UserOutlined/>}/> <CaretDownFilled/>
                        </div>
                    </Dropdown>
                </div>
            </div>
        </Header>
    );
};

export default HeaderComponent;