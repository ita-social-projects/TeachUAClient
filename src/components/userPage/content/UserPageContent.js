import React from "react";
import {Content} from "antd/es/layout/layout";
import './css/UserContent.less';
import UserInformationComponent from "./UserInformationComponent";
import {Button, Dropdown} from "antd";
import menu from "./AddMenu";
import {PlusOutlined} from "@ant-design/icons";
import UserCenterContent from "./UserCenterContent";
import UserClubContent from "./UserClubContent";
import PropTypes from "prop-types";
import PageContent from "../../clubPage/content/PageContent";


const UserPageContent = ({user, id}) => {


    return (
        <Content className="user-content">
            <div className="content-title">Мій профіль</div>
            <UserInformationComponent user={user}/>
            <div>
                <div className="club-title">Мої гуртки та центри
                    <div className="add-club-dropdown">
                        <Dropdown сlassname overlay={menu} placement="bottomRight">
                            <Button classname="add-button">
                                <PlusOutlined/>
                                Додати</Button>
                        </Dropdown>
                    </div>
                </div>
                <UserCenterContent id={id}/>
                <UserClubContent id={id}/>
            </div>
        </Content>
    )
};

PageContent.propTypes = {
    user: PropTypes.object.isRequired
};

export default UserPageContent;
