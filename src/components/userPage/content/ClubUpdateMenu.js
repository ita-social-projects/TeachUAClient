import React, {useState} from "react";
import {Button, Menu} from "antd";
import './css/UserClub.less';
import {deleteClubById} from "../../../service/ClubService";
import EditClubModal from "../../editClub/EditClubModal";

const clubUpdateMenu = (clubId) => {
    return (
        <Menu classname="update-menu">
            <Menu.Item className="menu-item">
                <a>
                    <EditClubModal clubId={clubId}/>
                </a>
            </Menu.Item>
            <Menu.Item>
                <a onClick={() => {
                    deleteClubById(clubId).then(window.location.reload())
                }}>Видалити</a>
            </Menu.Item>
        </Menu>
    );
}

export default clubUpdateMenu;
