import {Menu} from "antd";
import {deleteClubById} from "../../../service/ClubService";
import React from "react";
import {deleteCenterById} from "../../../service/CenterService";
import CenterEditModal from "./CenterEditModal";

const centerUpdateMenu = (centerId) => (
    <Menu classname="update-menu">
        {/*<Menu.Item className="menu-item">*/}
        {/*    <CenterEditModal/>*/}
        {/*</Menu.Item>*/}
        <Menu.Item>
            <a onClick={() => {
                deleteCenterById(centerId).then(window.location.reload())
            }}>Видалити</a>
        </Menu.Item>
    </Menu>
);

export default centerUpdateMenu;
