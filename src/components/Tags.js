import {Tag} from "antd";
import React, {useContext} from "react";
import PropTypes from "prop-types";
import {UriContext} from "../context/UriContext";

const Tags = ({categories}) => {
    const uri = useContext(UriContext);

    return (
        <div className="tags">
            {categories.map(category =>
                <Tag className="tag" key={category.id} style={{
                    backgroundColor: category.tagBackgroundColor,
                    color: category.tagTextColor,
                }}>
                    <div className="icon"
                         style={{
                             backgroundColor: category.tagTextColor,
                             webkitMask: `url(${uri + category.urlLogo}) no-repeat center / contain`
                         }}/>
                    <span className="name">{category.name}</span>
                </Tag>)
            }
        </div>
    )
};

Tags.propTypes = {
    categories: PropTypes.array.isRequired
};

export default Tags;
