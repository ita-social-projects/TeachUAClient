import {mapSearchParameters, searchParameters} from "../../context/SearchContext";
import Search from "../Search";
import React, {useState} from "react";
import {Button} from "antd";
import MapComponent from "../map/MapComponent";
import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";

const ClubListHeader = ({setAdvancedSearch, advancedSearch}) => {
    const [mapVisible, setMapVisible] = useState(false);

    return (
        <div className="lower-header-box global-padding">
            <div className="city-name-box">
                <div className="city-name-box-small-screen">
                    {mapSearchParameters.cityName !== 'online' ?
                        <h2 className="city-name">{"Гуртки у місті " + searchParameters.cityName}</h2>
                        : <h2 className="city-name">Гуртки без локації</h2>}
                    <EnvironmentFilled className="icon"/>
                </div>
                {mapSearchParameters.cityName !== 'online' && <Button className="flooded-button show-map-button"
                        onClick={() => setMapVisible(true)}>Показати на мапі</Button>}
            </div>
            <Search setAdvancedSearch={setAdvancedSearch} advancedSearch={advancedSearch}/>
            <MapComponent visible={mapVisible} setVisible={setMapVisible}/>
        </div>
    );
};

export default ClubListHeader;