import {Card, Tag} from "antd";
import React, {useContext} from "react";
import PropTypes from "prop-types";
import ClubList from "./clubList/ClubList";
import {UriContext} from "../context/UriContext";

const CategoryLogo = ({category}) => {
    const uri = useContext(UriContext);

    return (
        <div className="icon-box" style={{backgroundColor: category.backgroundColor}}>
            <img className="icon" src={uri + category.urlLogo} alt="Category logo"/>
        </div>
    )
};

CategoryLogo.propTypes = {
    category: PropTypes.object.isRequired
};

export default CategoryLogo;
