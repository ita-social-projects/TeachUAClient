import {Menu, message} from "antd";
import React from "react";
import {deleteCenterById} from "../../../service/CenterService";
import CenterEditModal from "./CenterEditModal";

const centerUpdateMenu = (centerId, reloadAfterDelete) => (
    <Menu className="update-menu">
        <Menu.Item className="menu-item">
            <CenterEditModal centerId={centerId}/>
        </Menu.Item>
        <Menu.Item>
            <a onClick={() => {
                deleteCenterById(centerId).then(() => {
                    reloadAfterDelete();
                    message.success("Центр успішно видалено");
                }).catch(() => message.error("Помилка при видаленні центра"));
            }}>Видалити</a>
        </Menu.Item>
    </Menu>
);

export default centerUpdateMenu;
