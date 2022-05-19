import React from "react";
import {Button, Menu} from "antd";
import './css/UserClub.less';
import {deleteClubById} from "../../../service/ClubService";
import EditClubModal from "../../editClub/EditClubModal";
import {updateClubBuId} from "../../../service/ClubService";
import {Link} from "react-router-dom";

const clubUpdateMenu = (clubId) => (
    <Menu classname="update-menu">
        <Menu.Item className="menu-item">
            {/*<a onClick={() => {setShowAddClub(true).then(updateClubBuId(clubId))}}>Редагувати</a>*/}
            {/*<a target="_blank" rel="#" href="#">*/}
            {/*    Редагувати*/}
            {/*</a>*/}
            <EditClubModal clubId={clubId} />
        </Menu.Item>
        <Menu.Item>
            <a onClick={() => {
                deleteClubById(clubId).then(window.location.reload())
            }}>Видалити гурток</a>
        </Menu.Item>
    </Menu>
);

export default clubUpdateMenu;
