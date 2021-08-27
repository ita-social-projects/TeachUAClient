import React, { useEffect, useState } from "react";
import './css/UserContent.less';
import { Avatar } from "antd";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import UserEditModal from "../useredit/UserEditModal";
import PropTypes from "prop-types";



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
            setUserAvatart(process.env.PUBLIC_URL + user.urlLogo)
        }
    }, [user])

    return (
        <div className="user-profile-page">
            <div className="user-information">
                <div className="user-info">
                    <Avatar size={68} src={userAvatar} icon={<UserOutlined />} />
                    <div>
                        <div className="user-name">{user.firstName} {user.lastName}
                        </div>
                        <div className="user-role"> {user.roleName}</div>
                    </div>
                    {!isMobile &&
                        <div className="edit-button">
                            <UserEditModal user={user}/>
                        </div>
                    }
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