import React from "react";
import { Menu } from "antd";
import './css/UserContent.less';
import AddClubModal from "../../addClub/AddClubModal";
import AddCenter from "../../addCenter/AddCenter";


const menu = (
    <Menu classname="menu">
        <Menu.Item className="menu-item">
            <AddClubModal />
        </Menu.Item>
        <Menu.Item>
            <text> Додати центр</text>
            {/*<AddCenter />*/}
        </Menu.Item>
    </Menu>
);

export default menu;
