import {Menu} from "antd";
import {Link} from "react-router-dom";
import React, {useState} from "react";

const HeaderCenter = () => {
    const data = window.location.pathname === '/' ? 'clubs' : localStorage.getItem("head-component-page");
    const [currentPage, setCurrentPage] = useState(data);

    const onMenuChange = (elem) => {
        setCurrentPage(elem.key);
        localStorage.setItem("head-component-page", elem.key);
    };

    return (
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
    );
};

export default HeaderCenter;