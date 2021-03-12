import {Avatar, Card} from "antd";
import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";
import React from "react";
import './css/UserCenterCardItem.less';
import UserEditModal from "../useredit/UserEditModal";
import PropTypes from "prop-types";
import UserClubCardItem from "./UserClubCardItem";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import CenterEditModal from "./CenterEditModal";


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
                        <CenterEditModal/>
                    </div>
                    <div className="address">
                        <EnvironmentFilled
                            className="address-icon"/>
                        <span className="text">{center.address}</span>
                    </div>
                </div>
            </div>
        </Card>
    )
};

UserClubCardItem.propTypes = {
    center: PropTypes.object.isRequired
};


export default UserCenterCardItem;

