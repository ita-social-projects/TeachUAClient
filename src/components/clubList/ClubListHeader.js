import {searchParameters} from "../../context/SearchContext";
import Search from "../Search";
import React, {useState} from "react";
import {Button, Layout} from "antd";
import MapComponent from "../map/MapComponent";
import ControlOutlined from "@ant-design/icons/lib/icons/ControlOutlined";

const ClubListHeader = () => {
    const [mapVisible, setMapVisible] = useState(false);

    return (
        <div className="lower-header-box">
            <div className="city-name-box">
                <h2 className="city-name">{"Гуртки у місті " + searchParameters.cityName}</h2>
                <Button className="flooded-button show-map-button"
                        onClick={() => setMapVisible(true)}>Показати на карті</Button>
            </div>
            <Search />
            <MapComponent visible={mapVisible} setVisible={setMapVisible}/>
        </div>
    );
};

export default ClubListHeader;