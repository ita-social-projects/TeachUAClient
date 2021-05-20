import { Button, Card } from "antd";
import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import CenterLogo from "./CenterLogo";
import "./css/CenterListRectangleItem.css";

const CenterListRectangleItem = ({center, onCenterClick}) => {

    return (
        <div>
            <Card className="card center-list-rectangle-item" onClick={() => onCenterClick(center)} key={center.name}>
                <div className="item-rectangle-row">
                    <div className="center-title">
                        <CenterLogo urlLogo={center.urlLogo}/>
                        <div className="center-name">{center.name}</div>
                    </div>
                    <div className="center-description">
                        {center.description}
                    </div>
                </div>
                <div className="item-rectangle-row">
                    <div className="item-rating-address">
                        <div className="center-address">
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