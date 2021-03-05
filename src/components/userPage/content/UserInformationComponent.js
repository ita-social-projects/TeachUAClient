import React from "react";
import './css/UserContent.less';
import {Avatar} from "antd";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import UserEditModal from "../useredit/UserEditModal";
import PropTypes from "prop-types";



const UserInformationComponent = ({user}) => {
    return (
        <div className="user-profile">
            <div className="user-info">
                <Avatar size={68} src={process.env.PUBLIC_URL +user.urlLogo} icon={<UserOutlined />} />
                <div>
                <div className="user-name">{user.firstName} {user.lastName}
                </div>
                <div className="user-role"> {user.roleName}</div>
            </div>
                <div className="edit-button">
                  <UserEditModal user={user}/>
            </div>
            </div>
            <div className="user-contacts">
                <div className="user-phone">
                    Телефон
                    <div className="user-phone-data">
                        {user.phone}
                    </div>
                </div>
                <div className="user-email">
                    Email
                    <div className="user-email-data">
                        {user.email}
                    </div>
            </div>
            </div>
        </div>
    )
};
UserInformationComponent.propTypes = {
    user: PropTypes.object.isRequired
};


export default UserInformationComponent;
