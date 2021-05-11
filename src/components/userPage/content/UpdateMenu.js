import React from "react";
import {Menu} from "antd";
import './css/UserClub.less';


const updateMenu = (
    <Menu classname="update-menu">
        <Menu.Item className="menu-item">
            <a target="_blank" rel="#" href="#">
                Редагувати
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="#" href="#">
                Видалити
            </a>
        </Menu.Item>
    </Menu>
);

export default updateMenu;
