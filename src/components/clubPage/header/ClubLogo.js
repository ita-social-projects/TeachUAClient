import React from "react";
import PropTypes from "prop-types";
import CategoryLogo from "../../CategoryLogo";

//you will not see the self-uploaded club logo because self-uploaded photo is retrieving from backend
const ClubLogo = ({logo, category}) => {
    
    const DEFAULT_LOGO = "#";

    return (
            !logo || logo === DEFAULT_LOGO  ?
                <CategoryLogo category={category}/> :
                <div className="icon-box">
                    <img className="icon" src={process.env.PUBLIC_URL + logo} />
                </div>
    )
};

ClubLogo.propTypes = {
    logo: PropTypes.object.isRequired
};

export default ClubLogo;