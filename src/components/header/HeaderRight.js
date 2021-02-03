import React, {useContext, useEffect, useState} from "react";
import {Avatar, Button, Dropdown, Menu} from "antd";
import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";
import {SearchContext, searchParameters} from "../../context/SearchContext";
import CaretDownFilled from "@ant-design/icons/lib/icons/CaretDownFilled";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import {getAllCities} from "../../service/CityService";
import {getClubsByParameters} from "../../service/ClubService";

const HeaderRight = () => {
    const [cities, setCities] = useState([]);
    const {setClubs} = useContext(SearchContext);

    useEffect(() => {
        getAllCities().then(response => setCities(response));
    }, []);

    const onCityChange = (value) => {
        searchParameters.cityName = value.key === "all" ? "" : value.key;
        getClubsByParameters(searchParameters).then(response => setClubs(response));
    };

    const menuDropdown = (
        <Menu onClick={onCityChange}>
            {cities.map(city => (<Menu.Item key={city.name}>{city.name}</Menu.Item>))}
            <Menu.Item key="all" danger>Всі</Menu.Item>
        </Menu>
    );

    const profileDropdown = (
        <Menu>
            <Menu.Item>Профіль</Menu.Item>
            <Menu.Item>Настройки</Menu.Item>
            <Menu.Item danger>Вийти</Menu.Item>
        </Menu>
    );

    return (
        <div className="right-side-menu">
            <Button className="outlined-button support-button">Допомогти</Button>
            <div className="left-divider">
                <Dropdown overlay={menuDropdown} className="city" placement="bottomCenter" arrow>
                    <div>
                        <EnvironmentFilled
                            className="icon"/> {searchParameters.cityName.length === 0 ? "Місто" : searchParameters.cityName}
                        <CaretDownFilled/>
                    </div>
                </Dropdown>
                <Dropdown overlay={profileDropdown} className="user-profile" placement="bottomCenter" arrow>
                    <div>
                        <Avatar size="large" icon={<UserOutlined/>}/> <CaretDownFilled/>
                    </div>
                </Dropdown>
            </div>
        </div>
    )
};

export default HeaderRight;