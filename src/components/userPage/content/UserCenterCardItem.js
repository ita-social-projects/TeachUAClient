import {Avatar, Card, Dropdown} from "antd";
import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";
import React from "react";
import './css/UserCenterCardItem.less';
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import {MoreOutlined} from "@ant-design/icons";
import centerUpdateMenu from "./CenterUpdateMenu";


const UserCenterCardItem = ({center, reloadAfterDelete}) => {
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
                </div>
                <div className="center-right">
                    <div className="center-edit-button">
                        <Dropdown overlay={centerUpdateMenu(center.id, reloadAfterDelete)} placement="bottomRight">
                            <MoreOutlined/>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <div className="center-address">
                <EnvironmentFilled className="address-icon"/>
                <span className="text"> {center.locations.length === 0 ? "Онлайн" : center.locations[0].address}</span>
            </div>
        </Card>
    )
};

export default UserCenterCardItem;

