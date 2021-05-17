import React from "react";
import PropTypes from "prop-types";
import "./css/CenterLogo.css"

const CenterLogo = ({urlLogo}) => {
    return (
        <div className="icon-box" >
            <img className="icon" src={urlLogo} alt="Center logo"/>
        </div>
    )
};

CenterLogo.propTypes = {
    urlLogo: PropTypes.string.isRequired
};

export default CenterLogo;