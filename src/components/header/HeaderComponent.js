import React from 'react';
import {Header} from "antd/es/layout/layout";
import HeaderRight from "./HeaderRight";
import HeaderCenter from "./HeaderCenter";

const HeaderComponent = () => {
    return (
        <Header className="header">
            <div className="left-side-menu">
                <div className="logo"/>
            </div>

            <HeaderCenter/>
            <HeaderRight/>
        </Header>
    );
};

export default HeaderComponent;