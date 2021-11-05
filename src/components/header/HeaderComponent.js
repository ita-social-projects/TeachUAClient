import React from 'react';
import {Header} from "antd/es/layout/layout";
import HeaderRight from "./HeaderRight";
import NavMenu from "./NavMenu";
import {Link} from "react-router-dom";
import {searchParameters} from "../../context/SearchContext";
import {useLocation} from "react-router-dom";

const HeaderComponent = () => {
    const location = useLocation();

    searchParameters.isAdvancedSearch =
        (searchParameters.isAdvancedSearch && location.pathname === '/clubs') && true;

    return (
        <Header className="header">
            <div className="left-side-menu">
                <Link to="/">
                    <div className="logo"/>
                </Link>
            </div>

            <NavMenu/>
            <HeaderRight/>
        </Header>
    );
};

export default HeaderComponent;