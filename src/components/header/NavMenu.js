import {Menu} from "antd";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import ApartmentOutlined from "@ant-design/icons/lib/icons/ApartmentOutlined";
import CrownOutlined from "@ant-design/icons/lib/icons/CrownOutlined";
import ContainerOutlined from "@ant-design/icons/lib/icons/ContainerOutlined";
import FolderOpenOutlined from "@ant-design/icons/lib/icons/FolderOpenOutlined";
import FlagOutlined from "@ant-design/icons/lib/icons/FlagOutlined";
import MenuOutlined from "@ant-design/icons/lib/icons/MenuOutlined";


const NavMenu = () => {
    const pageKey = window.location.pathname !== process.env.PUBLIC_URL && localStorage.getItem("head-component-page");
    const [currentPage, setCurrentPage] = useState(pageKey);

    const onMenuChange = (elem) => {
        setCurrentPage(elem.key);
        localStorage.setItem("head-component-page", elem.key);
    };

    useEffect(() => {
        let slashPos = document.URL.lastIndexOf("/");
        let urlPage = document.URL.substr(slashPos + 1);

        if(urlPage !== currentPage){
            setCurrentPage(-1);
        }
    });

    return (
        <div className="center-side">
            <Menu className="nav-menu"
                  onClick={onMenuChange}
                  selectedKeys={[currentPage]}
                  expandIcon={<MenuOutlined />}
                  mode="horizontal">
                <Menu.Item key="clubs">
                    <Link to="/clubs"><ApartmentOutlined className="icon"/>Гуртки</Link>
                </Menu.Item>
                <Menu.Item key="challenge">
                    <Link to="/challenge"><CrownOutlined className="icon"/>Челендж</Link>
                </Menu.Item>
                {/*Замість  новин - про нас(проєкт)*/}
                <Menu.Item key="news">
                    <Link to="/about"><ContainerOutlined className="icon"/>Про нас</Link>
                </Menu.Item>
                <Menu.Item key="about">
                    <Link to="/service"><FolderOpenOutlined className="icon"/>Послуги українською</Link>
                </Menu.Item>
                {/*Приховано лінк service - # та виправити на послуги українською назви*/}
                {/*Забрати стиль*/}
                <Menu.Item key="service" style={{display: 'none' }}>
                    <Link to="#"><FlagOutlined className="icon"/>Послуги </Link>
                </Menu.Item>
            </Menu>
        </div>
    );
};

export default NavMenu;