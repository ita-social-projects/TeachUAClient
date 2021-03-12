import React from "react";
import {Menu} from "antd";
import './css/UserContent.less';
import AddClubModal from "../../addClub/AddClubModal";


const menu = (
    <Menu classname="menu">
        <Menu.Item className="menu-item">
            <AddClubModal/>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="#" href="#">
                Додати центр
            </a>
        </Menu.Item>
    </Menu>
);

export default menu;
