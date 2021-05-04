import React from "react";
import PropTypes from "prop-types";

const CenterLogo = ({urlLogo}) => {
    return (
        <div className="icon-box" style={{backgroundColor: "transparent"}}>
            <img className="icon" src={urlLogo} alt="Center logo"/>
        </div>
    )
};

CenterLogo.propTypes = {
    urlLogo: PropTypes.object.isRequired
};

export default CenterLogo;