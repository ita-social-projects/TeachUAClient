import {Avatar, Card, Dropdown} from "antd";
import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";
import React from "react";
import './css/UserCenterCardItem.less';
import PropTypes from "prop-types";
import UserClubCardItem from "./UserClubCardItem";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import CenterEditModal from "./CenterEditModal";
import clubUpdateMenu from "./ClubUpdateMenu";
import {MoreOutlined} from "@ant-design/icons";
import centerUpdateMenu from "./CenterUpdateMenu";


const UserCenterCardItem = ({center}) => {
    return (
        <Card className="center-card">
            <div className="center-information">
                <div className="center-left">
                    <div className="center-info">
                        <Avatar size={42}
                                src={center.urlLogo}
                                icon={<UserOutlined/>}/>
                        <div>
                            <div className="center-title">
                                Центр Розвитку
                            </div>
                            <div className="center-name">
                                {center.name}
                            </div>
                        </div>
                    </div>
                    <div className="center-categories">
                        {/*<Tags categories={center.categories}/>*/}
                    </div>
                </div>
                <div className="center-right">
                    <div className="center-edit-button">
                        <Dropdown overlay={centerUpdateMenu(center.id)} placement="bottomRight">
                            <MoreOutlined/>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <div className="center-address">
                <EnvironmentFilled className="address-icon"/>
                <span className="text">{center.locations[0].address}</span>
            </div>
        </Card>
    )
};

UserClubCardItem.propTypes = {
    center: PropTypes.object.isRequired
};


export default UserCenterCardItem;

