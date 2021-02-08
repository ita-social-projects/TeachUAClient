import {Button, Card} from "antd";
import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";
import React from "react";
import {Link} from "react-router-dom";
import Sider from "antd/es/layout/Sider";

const ClubItem = ({club}) => {
    return (
        <Card className="card">
            <div className="title">
                <div className="icon-box" style={{backgroundColor: club.categories[0].backgroundColor}}>
                    <img className="icon" src={club.categories[0].urlLogo} alt="Category logo"/>
                </div>
                <div className="name">
                    {club.name}
                </div>
            </div>
            <p className="description">{club.description}</p>
            <div className="address">
                <EnvironmentFilled
                    className="address-icon"/>
                <p className="text"> {club.address}</p>
            </div>
            <Button className="outlined-button details-button">
                <Link to={`/club/${club.id}`}>Детальніше</Link>
            </Button>
        </Card>
    )
};

export default ClubItem;