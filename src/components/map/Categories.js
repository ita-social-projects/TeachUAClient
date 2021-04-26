import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { mapSearchParameters } from "../../context/SearchContext";
import { getClubsByCategoryAndCity } from "../../service/ClubService";
import { getAllCategories } from "../../service/CategoryService";
import './css/Categories.css';


const Categories = ({ setMapClubs }) => {
    const { Option } = Select;
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');

    useEffect(() => {
        getAllCategories().then(response => setCategories(response));
        setCategory(mapSearchParameters.categoryName);
    }, [mapSearchParameters.categoryName]);

    const onCategoryChange = (value) => {
        mapSearchParameters.categoryName = value;
        getClubsByCategoryAndCity(mapSearchParameters).then(response => setMapClubs(response)
        );
    };

    return (
        <Select
            className="selectCity"
            onChange={onCategoryChange}
            showSearch
            value={category}
            placeholder={mapSearchParameters.categoryName == "" ? "Всі категорії" : mapSearchParameters.categoryName}
            style={{ borderRadius: '15px' }}
        >
            <Option value="">Всі категорії</Option>
            {categories.sort((a, b) => a.sortby - b.sortby).map(category => (<Option value={category.name}>{category.name}</Option>))}

        </Select>
    )
}

export default Categories;