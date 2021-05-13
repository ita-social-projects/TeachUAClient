import React from "react";
import './css/PageRating.css';
import PropTypes from "prop-types";
import {Rate} from "antd";

const PageRating = ({rating, count}) => {
    let feedback;
    switch (count) {
        case 0 :
            feedback = "відгуків"
            break;
        case 1 :
            feedback = "відгук"
            break;
        case 2 :
            feedback = "відгуки"
            break;
        case 3 :
            feedback = "відгуки"
            break;
        case 4 :
            feedback = "відгуки"
            break;
        default :
            feedback = "відгуків"
    }
    return (
        <div className="page-rating">
            <Rate allowHalf disabled value={rating}/>
            <span className="feedback">{count} {feedback}</span>
        </div>
    )
};

PageRating.propTypes = {
    rating: PropTypes.symbol.isRequired
};

export default PageRating;