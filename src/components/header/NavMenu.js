import { Menu} from "antd";
import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import ApartmentOutlined from "@ant-design/icons/lib/icons/ApartmentOutlined";
import CrownOutlined from "@ant-design/icons/lib/icons/CrownOutlined";
import ContainerOutlined from "@ant-design/icons/lib/icons/ContainerOutlined";
import FolderOpenOutlined from "@ant-design/icons/lib/icons/FolderOpenOutlined";
import HomeOutlined from "@ant-design/icons/lib/icons/HomeOutlined";
import MenuOutlined from "@ant-design/icons/lib/icons/MenuOutlined";
import { PageContext } from "../../context/PageContext";
import { CaretDownOutlined} from "@ant-design/icons";
import {getActiveChallengesPreviews, getChallengesPreviews} from "../../service/ChallengeService";

const NavMenu = () => {
    const pageKey = window.location.pathname !== process.env.PUBLIC_URL && localStorage.getItem("head-component-page");
    const [pageContent, setPageContent] = useState(pageKey);
    const { currentPage, setCurrentPage } = useContext(PageContext);
    const [isMobile, setIsMobile]  = useState(window.innerWidth < 1215 && window.innerHeight < 1390);
    const [challenges, setChallenges] = useState([]);

    const onMenuChange = (elem) => {
        setPageContent(elem.key);
        localStorage.setItem("head-component-page", elem.key);
    };

    const handleResize = () => {
        if (window.innerWidth < 1215 && window.innerHeight < 1390) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
      }
      
    const {SubMenu} = Menu;

    useEffect(() => {
        
        let slashPos = document.URL.lastIndexOf("/");
        let urlPage = document.URL.substr(slashPos + 1);

        if (urlPage !== pageContent) {
            setPageContent(-1);
        }
        window.addEventListener("resize", handleResize)
    });

    useEffect(() => {
        getActiveChallengesPreviews().then((response) => {
            setChallenges(response);
        })
    }, []);

    return (
        <div className="center-side">
            <Menu className="nav-menu"
                  onClick={onMenuChange}
                  selectedKeys={[pageContent]}
                  expandIcon={<MenuOutlined />}
                  defaultOpenKeys={['challenge_ONE']}
                  mode="horizontal"
                  key = {"nav_menu_id"}
                  triggerSubMenuAction={"click"}
                  forceSubMenuRender = {"true"}>
                <Menu.Item key="clubs">
                    <Link to="/clubs" onClick={() => setCurrentPage(0)}><ApartmentOutlined className="icon" />Гуртки</Link>
                </Menu.Item>
                <SubMenu id = {"challenge_ONE"}  icon={<CrownOutlined />} title="Челендж" className="sub1" expandIcon={<CaretDownOutlined />} triggerSubMenuAction = {'click'} forceSubMenuRender = {true} >
                    <Menu.Item key="challengeUA">
                        <Link to="/challengeUA" onClick ={() => setCurrentPage(0)}>Навчай українською Челендж</Link>
                    </Menu.Item>
                    <Menu.Item key="marathon">
                        <Link to="/marathon" onClick ={() => setCurrentPage(0)}>Мовомаратон</Link>
                    </Menu.Item>
                    <Menu.Item key ="challenge">
                        <Link to="/challenge" onClick ={() => setCurrentPage(0)}>Навчай українською</Link>
                    </Menu.Item>
                    <Menu.Item key="speakingclub">
                        <Link to="/speakingclub" onClick ={() => setCurrentPage(0)}>Клуб української мови "Розмовляй"</Link>
                    </Menu.Item>
                    {challenges.map((challenge) =>
                        <Menu.Item key={challenge.id}>
                            <Link to={"/challenges/"+challenge.id} onClick ={() => setCurrentPage(0)}>{challenge.name}</Link>
                        </Menu.Item>)
                    }
                </SubMenu >
                {/*Замість  новин - про нас(проєкт)*/}
                <Menu.Item key="about">
                    <Link to="/about"><ContainerOutlined className="icon" />Про нас</Link>
                </Menu.Item>
                <Menu.Item key="service">
                    <Link to="/service"><FolderOpenOutlined className="icon" />Послуги українською</Link>
                </Menu.Item>
                {/*Замість лого лінка в бургері головної сторінки*/}
                {isMobile &&
                <Menu.Item key="news" className="home">
                    <Link to="/"><span><HomeOutlined className="icon" /></span><span className="home-page">Головна сторінка</span></Link>
                </Menu.Item>
                }
            </Menu>
        </div>
    );
};

export default NavMenu;