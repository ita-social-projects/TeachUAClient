import {Button, Card, Dropdown, Rate} from "antd";
import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";
import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import CategoryLogo from "../../CategoryLogo";
import {getShortContent} from "../../editor/EditorConverter";
import Tags from "../../Tags";
import './css/UserClub.less';
import './css/UserClubCardItem.less';
import {MoreOutlined} from "@ant-design/icons";
import updateMenu from "./UpdateMenu";


const UserClubCardItem = ({club}) => {
    return (
        <Card className="card">
            <div className="title">
                <CategoryLogo category={club.categories[0]}/>
                <div className="side-menu">
                    <div className="update-club-dropdown">
                        <Dropdown overlay={updateMenu} placement="bottomRight">
                            <MoreOutlined/>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <div className="title-name">{club.name}</div>
            <Tags categories={club.categories}/>
            <p className="description">{getShortContent(club.description)}</p>
            <Rate className="rating" disabled value={club.rating}/>
            <div className="address">
                <EnvironmentFilled
                    className="address-icon"/>
                <span className="text"> {club.address}</span>
            </div>
            <Button className="outlined-button details-button">
                <Link to={`/club/${club.id}`}>Детальніше</Link>
            </Button>
        </Card>
    )
};
UserClubCardItem.propTypes = {
    club: PropTypes.object.isRequired
};


export default UserClubCardItem;