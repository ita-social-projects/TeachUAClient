import { Button, Card } from "antd";
import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import CenterLogo from "./CenterLogo";
import "./css/CenterListRectangleItem.css";
import { Rate } from "antd";
import {   Popover} from "antd";
import  { useState } from "react";
import EyeOutlined from "@ant-design/icons/lib/icons/EyeOutlined";


const CenterListRectangleItem = ({center, onCenterClick}) => {
    const [visible, setVisible] = useState(false);
    return (
        <div>
            <Card className="card center-list-rectangle-item" onClick={() => onCenterClick(center)} key={center.name}>
                <div className="item-rectangle-row">
                    <div className="center-title">
                        <CenterLogo urlLogo={center.urlLogo}/>
                        <div className="center-name">{center.name}</div>
                    </div>
                </div>
              
                    <div className="item-rating-address">
                    <Rate className="rating" disabled value={center.rating}/>
                          {
                    center.locations.length > 0 &&
                    <div className="center-address" onClick={() => { setVisible(true) }} >
                        <EnvironmentFilled
                            className="address-icon" />
                        {
                            center.locations.length === 1 ? <span className="oneAddress"> {center.locations[0].address}</span>
                                :
                                <Popover
                                    className="popover"
                                    title="Локації"
                                    placement="topRight"
                                    content={center.locations.map(location =>
                                        <div>
                                            <EnvironmentFilled className="address-small-icon" />
                                            <span className="text"> {location.address}</span>
                                        </div>
                                    )}>
                                    <span className="text"><span className="oneAddress"
                                    >{center.locations[0].address}</span>{center.locations.length-1}</span>
                                    <EyeOutlined className="expand-icon" />
                                </Popover>
                        }
                    </div>
                }
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