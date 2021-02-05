import React, {useEffect, useState} from "react";
import {Dropdown, Menu} from "antd";
import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";
import {searchParameters} from "../../context/SearchContext";
import CaretDownFilled from "@ant-design/icons/lib/icons/CaretDownFilled";
import {getAllCities} from "../../service/CityService";
import {getClubsByParameters} from "../../service/ClubService";

const Cities = ({setClubs}) => {
    const [cities, setCities] = useState([]);

    useEffect(() => {
        getAllCities().then(response => setCities(response));
    }, []);

    const onCityChange = (value) => {
        searchParameters.cityName = value.key;
        getClubsByParameters(searchParameters).then(response => setClubs(response));
    };

    const cityList = (
        <Menu onClick={onCityChange}>
            {cities.map(city => (<Menu.Item key={city.name}>{city.name}</Menu.Item>))}
        </Menu>
    );

    return (
        <Dropdown overlay={cityList} className="city" placement="bottomCenter" arrow>
            <div>
                <EnvironmentFilled
                    className="icon"/> {searchParameters.cityName}
                <CaretDownFilled/>
            </div>
        </Dropdown>
    )
};

export default Cities;