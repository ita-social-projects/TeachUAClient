import React from 'react';
import {Header} from "antd/es/layout/layout";
import HeaderRight from "./HeaderRight";
import HeaderCenter from "./HeaderCenter";
import {Button} from "antd";

const HeaderComponent = () => {
    return (
        <Header className="header">
            <div className="left-side-menu">
                <div className="logo"/>
            </div>

            <HeaderCenter/>
            <Button className="outlined-button support-button">Допомогти</Button>
            <HeaderRight/>
        </Header>
    );
};

export default HeaderComponent;