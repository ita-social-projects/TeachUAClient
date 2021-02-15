import React, {useEffect, useState, useContext} from "react";
import {Menu, Select} from "antd";
import {getAllCities} from "../../service/CityService";
import {mapSearchParameters, MapZoomContext} from "../../context/SearchContext";
import {getClubsByParameters} from "../../service/ClubService";
import './css/Cities.css';


const Cities = ({setMapClubs}) => {
    const {Option} = Select;
    const [cities, setCities] = useState([]);
    const {zoom, setZoom} = useContext(MapZoomContext);

    useEffect(() => {
        getAllCities().then(response => setCities(response))
    }, []);

    const onCityChange = (value) => {
        mapSearchParameters.cityName = value;
        getClubsByParameters(mapSearchParameters).then(response => setMapClubs(response));
        setZoom(10);
    }

    return (
        <Select
            className="selectCity"
            onChange={onCityChange}
            onClear={() => {
                console.log("I am clear))")
            }}
            showSearch
            placeholder={mapSearchParameters.cityName}
            style={{borderRadius: '30px'}}
        >
            {cities.map(city => (<Option value={city.name}>{city.name}</Option>))}
        </Select>
    )
}

export default Cities;