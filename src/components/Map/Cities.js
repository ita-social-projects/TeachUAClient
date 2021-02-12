import React, {useEffect, useState} from "react";
import {Menu, Select} from "antd";
import {getAllCities} from "../../service/CityService";
import {mapSearchParameters} from "../../context/SearchContext";
import {getClubsByParameters} from "../../service/ClubService";
import './css/Cities.css';


const Cities = ({setMapClubs}) => {
    const { Option } = Select;
    const [cities, setCities] = useState([]);

    useEffect(() => {
        getAllCities().then(response => setCities(response))
        getClubsByParameters(mapSearchParameters).then(response => setMapClubs(response)
    }, []);

    const onCityChange = (value) => {
        mapSearchParameters.cityName = value;
        getClubsByParameters(mapSearchParameters).then(response => setMapClubs(response)
            );
    }

    return (
        <Select
            className="selectCity"
            onChange={onCityChange}
            showSearch
            placeholder={mapSearchParameters.cityName}
            style={{borderRadius: '30px'}}
        >
            {cities.map(city => (<Option value={city.name} >{city.name}</Option>))}
        </Select>
    )
}

export default Cities;