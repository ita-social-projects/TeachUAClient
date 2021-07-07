import {Menu} from "antd";
import {deleteClubById} from "../../../service/ClubService";
import React from "react";
import {deleteCenterById} from "../../../service/CenterService";
import EditCenterModal from "../../editCenter/EditCenterModal";

const centerUpdateMenu = (centerId) => (
    <Menu classname="update-menu">
        <Menu.Item className="menu-item">
           <EditCenterModal centerId = {centerId}/>
        </Menu.Item>
        <Menu.Item>
            <a onClick={() => {
                deleteCenterById(centerId).then(window.location.reload())
            }}>Видалити</a>
        </Menu.Item>
    </Menu>
);

export default centerUpdateMenu;
