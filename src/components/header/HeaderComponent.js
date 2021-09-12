import React from 'react';
import {Header} from "antd/es/layout/layout";
import HeaderRight from "./HeaderRight";
import NavMenu from "./NavMenu";
import {Link} from "react-router-dom";
import {searchParameters} from "../../context/SearchContext";
import {useLocation} from "react-router";

const HeaderComponent = () => {
    const location = useLocation();
    const page = window.location.pathname !== process.env.PUBLIC_URL && localStorage.getItem("head-component-page");

    searchParameters.isAdvancedSearch =
        (searchParameters.isAdvancedSearch && location.pathname === '/clubs') && true;

    const onLogoClick = ()=> {
        localStorage.setItem("head-component-page", null);
    }

    return (
        <Header className="header">
            <div className="left-side-menu">
                <Link to="/" onClick={onLogoClick}>
                    <div className="logo"/>
                </Link>
            </div>

            <NavMenu page={page}/>
            <HeaderRight/>
        </Header>
    );
};

export default HeaderComponent;