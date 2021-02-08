import React from "react";
import {Link} from "react-router-dom";
import ArrowRightOutlined from "@ant-design/icons/lib/icons/ArrowRightOutlined";
import './css/SimilarClubItem.css';

const SimilarClubItem = ({club}) => {
    return (
        <div className="club">
            <div className="content">
                <div className="name">{club.name}</div>
                <div className="description">{club.description}</div>
                <Link to={`/club/${club.id}`}><div className="details">Детальніше <ArrowRightOutlined/></div></Link>
            </div>
        </div>)
};

export default SimilarClubItem;