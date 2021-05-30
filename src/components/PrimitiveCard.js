import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import ArrowRightOutlined from "@ant-design/icons/lib/icons/ArrowRightOutlined";
import "./css/PrimitiveCard.css";
import PropTypes from "prop-types";

const PrimitiveCard = forwardRef((props, ref) => {
    return (
        <div className="primitive-card" ref={ref}>
            <div className="content">
                {props.header}
                <div className="description">{props.description}</div>
                <Link to={props.link}>
                    <div className="details">
                        {props.buttonText}
                        <ArrowRightOutlined className="arrow" />
                    </div>
                </Link>
            </div>
        </div>
    );
});
/*PrimitiveCard.propTypes = {
    content: PropTypes.object.isRequired
};*/

export default PrimitiveCard;
