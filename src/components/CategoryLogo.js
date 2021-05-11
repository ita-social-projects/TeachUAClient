import React from "react";
import PropTypes from "prop-types";

const CategoryLogo = ({category}) => {
    return (
        <div className="icon-box" style={{backgroundColor: category.backgroundColor}}>
            <img className="icon" src={process.env.PUBLIC_URL + category.urlLogo} alt="Category logo"/>
        </div>
    )
};

CategoryLogo.propTypes = {
    category: PropTypes.object.isRequired
};

export default CategoryLogo;
