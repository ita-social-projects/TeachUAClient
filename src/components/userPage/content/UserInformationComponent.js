import React, { useEffect, useState } from "react";
import './css/UserContent.less';
import { Avatar } from "antd";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import UserEditModal from "../useredit/UserEditModal";
import PropTypes from "prop-types";
import {BASE_URL} from "../../../service/config/ApiConfig";



const UserInformationComponent = ({ user }) => {
    const [userAvatar, setUserAvatart] = useState(null);
    const [isMobile, setIsMobile]  = useState(false);

    useEffect(() => {
        if (window.outerWidth <= 850) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }

        console.log(user);
        if (user?.urlLogo?.includes("https")) {
            setUserAvatart(user.urlLogo);
        }
        else {
            setUserAvatart(BASE_URL + user.urlLogo)
        }
    }, [user])

    return (
        <div className="user-profile-page">
            <div className="user-information">
                {!isMobile &&
                <div className="edit-button">
                    <UserEditModal user={user}/>
                </div>
                }
                <div className="user-info">
                    <Avatar className="user-avatar" size={68} src={userAvatar} icon={<UserOutlined />} />
                    <div>
                        <div className="user-name">{user.firstName} {user.lastName}
                        </div>
                        <div className="user-role"> {user.roleName}</div>
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
            {isMobile &&
                <div className="edit-button">
                    <UserEditModal user={user}/>
                </div>
            }
        </div>
    )
};

UserInformationComponent.propTypes = {
    user: PropTypes.object.isRequired
};


export default UserInformationComponent;