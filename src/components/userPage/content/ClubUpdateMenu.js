import React from "react";
import {Menu , message} from "antd";
import './css/UserClub.less';
import {deleteClubById} from "../../../service/ClubService";
import EditClubModal from "../../editClub/EditClubModal";

const clubUpdateMenu = (clubId) => (
    <Menu className="update-menu">
        <Menu.Item className="menu-item">
            <EditClubModal clubId={clubId} />
        </Menu.Item>
        <Menu.Item>
            <a onClick={() => {
                deleteClubById(clubId).then((response) => {
                    if(response.status != 400){
                        window.location.reload()
                    } else{
                        message.warning(response.message);
                    }
                });
            }}>Видалити гурток</a>
        </Menu.Item>
    </Menu>
);

export default clubUpdateMenu;
