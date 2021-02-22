import {searchParameters} from "../../context/SearchContext";
import Search from "../Search";
import React, {useState} from "react";
import {Button, Layout} from "antd";
import MapComponent from "../map/MapComponent";

const ClubListHeader = ({load, setClubs}) => {
    const [mapVisible, setMapVisible] = useState(false);

    return (
        <div className="lower-header-box">
            <div className="city-name-box">
                <h2 className="city-name">{"Гуртки у місті " + searchParameters.cityName}</h2>
                <Button className="flooded-button"
                        onClick={() => setMapVisible(true)}>Показати на карті</Button>
            </div>
            <div className="search">
                <Search load={load} setClubs={setClubs}/>
            </div>
            <MapComponent visible={mapVisible} setVisible={setMapVisible}/>
        </div>
    );
};

export default ClubListHeader;