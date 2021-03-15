import {Button, Card, Rate} from "antd";
import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import Tags from "../Tags";
import CategoryLogo from "../CategoryLogo";
import {getShortContent} from "../editor/EditorConverter";
import ClubInfo from "./ClubInfo";


const ClubListItem = ({club}) => {
    const [visible, setVisible] = useState(false);

    return (
        <div>
            <Card className="card" onClick={() => setVisible(true)}>
                <div className="title">
                    <CategoryLogo category={club.categories[0]}/>
                    <div className="name">{club.name}</div>
                </div>
                <div className="club-item-tags">
                    <Tags categories={club.categories.filter((_, idx) => idx < 3)}/>
                    <span>{club.categories.length > 3 && `і ще ${club.categories.length - 3}...`}</span>
                </div>
                {club.center !== null ?
                    <div className="with-center">
                        <div className="center">
                            <img className="center-logo" src={club.center.urlLogo} alt="Center logo"/>
                            <div className="center-description">
                                <span className="center-label">Центр розвитку</span>
                                <span className="center-name">{club.center.name}</span>
                            </div>
                        </div>
                        <div className="description">{getShortContent(club.description)}</div>
                    </div> :
                    <p className="description">{getShortContent(club.description)}</p>}
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
            <ClubInfo visible={visible} setVisible={setVisible} club={club}/>
        </div>
    )
};
ClubListItem.propTypes = {
    club: PropTypes.object.isRequired
};


export default ClubListItem;