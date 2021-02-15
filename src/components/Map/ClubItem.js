import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";
import React from "react";
import './css/ClubItem.css'
import {MapSelectContext, MapZoomContext} from "../../context/SearchContext";
import {useContext} from "react";

const ClubItem = ({mapClub}) => {
    const {selected, setSelected} = useContext(MapSelectContext);
    const {zoom, setZoom} = useContext(MapZoomContext);

    return (
        <div onClick={() => {
            setSelected(mapClub)
            setZoom(15)
        }} className="clubItem">
            <div className="title">
                <div className="icon-box" style={{backgroundColor: mapClub.categories[0].backgroundColor}}>
                    <img className="icon" src={mapClub.categories[0].urlLogo} alt="Category logo"/>
                </div>
                <div className="name">
                    {mapClub.name}
                </div>
            </div>
            <div className="content">
                <div className="address"><EnvironmentFilled className="address-icon"/>{mapClub.address}</div>
            </div>
        </div>
    )
};

export default ClubItem;