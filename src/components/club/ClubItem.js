import {Button, Card} from "antd";
import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";
import React from "react";

const ClubItem = ({club}) => {
    const clubTitle = (
        <div className="title">
            <div className="icon-box" style={{backgroundColor: club.categories[0].backgroundColor}}>
                <img className="icon" src={club.categories[0].urlLogo} alt="Category logo"/>
            </div>
            <div className="name">
                {club.name}
            </div>
        </div>
    );

    return (
        <Card className="card" title={clubTitle}>
            <p className="description">{club.description}</p>
            <p className="address"><EnvironmentFilled
                className="address-icon"/> {club.address}
            </p>
            <Button className="outlined-button details-button">Детальніше</Button>
        </Card>
    )
};

export default ClubItem;