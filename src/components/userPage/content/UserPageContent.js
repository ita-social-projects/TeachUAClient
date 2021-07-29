import React from "react";
import { Content } from "antd/es/layout/layout";
import './css/UserContent.less';
import UserInformationComponent from "./UserInformationComponent";
import { Button, Dropdown } from "antd";
import menu from "./AddMenu";
import { PlusOutlined } from "@ant-design/icons";
import UserCenterContent from "./UserCenterContent";
import UserClubContent from "./UserClubContent";
import PropTypes from "prop-types";
import PageContent from "../../clubPage/content/PageContent";
import { Menu } from "antd";
import AddCenter from "../../addCenter/AddCenter";
import AddClubModal from "../../addClub/AddClubModal";
import { useState } from "react";
const UserPageContent = ({ user, id }) => {


    const [showAddClub, setShowAddClub] = useState(false);
    const [showAddCenter, setShowAddCenter] = useState(false);


    const menu = () => {

        return (

            <Menu classname="menu">
                <Menu.Item className="menu-item">
                    <div onClick={() => setShowAddClub(true)}>Додати гурток</div>
                </Menu.Item>
                <Menu.Item>
                    <div onClick={() => setShowAddCenter(true)}>Додати центр</div>
                </Menu.Item>
            </Menu>

        )
    };


    return (
        <Content className="user-content">
            <div className="content-title">Мій профіль</div>
            <UserInformationComponent user={user} />
            <div>
                <div className="club-title">Мої гуртки та центри
                    <div className="add-club-dropdown">
                        <AddClubModal isShowing={showAddClub} setShowing={setShowAddClub} />
                        <AddCenter isShowing={showAddCenter} setShowing={setShowAddCenter} />
                        <Dropdown сlassname overlay={menu} placement="bottomRight">
                            <Button classname="add-button">
                                <PlusOutlined />
                                Додати</Button>
                        </Dropdown>
                    </div>
                </div>
                <UserCenterContent id={id} />
                <UserClubContent id={id} />
            </div>
        </Content>
    )
};

PageContent.propTypes = {
    user: PropTypes.object.isRequired
};

export default UserPageContent;
