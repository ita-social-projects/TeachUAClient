import { Button, Card } from "antd";
import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import CenterLogo from "./CenterLogo";

const CenterListRectangleItem = ({center, onCenterClick}) => {

    return (
        <div>
            <Card className="card list-rectangle-item" onClick={() => onCenterClick(center)}>
                <div className={"centerInscription"}>
                    <span style={{fontWeight: "bold"}}> Центр:</span>
                </div>
                <br/>
                <div className="item-rectangle-row">
                    <div className="title">
                        <CenterLogo urlLogo={center.urlLogo}/>
                        <div className="name">{center.name}</div>
                    </div>
                    <div className="center-description">
                        <span className="center-label">Центр</span>
                        <span className="center-name">{center.description}</span>
                    </div>
                </div>
                <div className="club-tags-box">
                </div>
                <div className="item-rectangle-row">
                    <div className="item-rating-address">
                        <div className="address">
                            <EnvironmentFilled
                                className="address-icon"/>
                            <span className="text"> {center.address}</span>
                        </div>
                    </div>
                    <Button className="outlined-button details-button">
                        <Link to={`/center/${center.id}`}>Детальніше</Link>
                    </Button>
                </div>
            </Card>
        </div>
    )
};
CenterListRectangleItem.propTypes = {
    center: PropTypes.object.isRequired
};


export default CenterListRectangleItem;