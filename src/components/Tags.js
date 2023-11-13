import {Tag} from "antd";
import React from "react";
import PropTypes from "prop-types";
import MaskIcon from "./MaskIcon";
import { useCategoryContext } from "../context/CategoryContext";

const Tags = ({categories, className}) => {
    const { toggleCategory } = useCategoryContext();
    return (
        <div className={`tags ${className ? className : ''}`}>
            {categories.map(category =>
                <Tag className="tag" onClick={() => toggleCategory(category.name)} key={category.id} style={{
                    backgroundColor: category.tagBackgroundColor,
                    color: category.tagTextColor,
                    cursor: 'pointer',
                }}>
                    <MaskIcon maskColor={category.tagTextColor} iconUrl={category.urlLogo}/>
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
