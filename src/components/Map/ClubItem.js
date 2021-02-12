import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";
import React from "react";
import './css/ClubItem.css'
import {MapSelectContext} from "../../context/SearchContext";
import {useContext} from "react";

const ClubItem = ({mapClub}) => {
    const{selected, setSelected} = useContext(MapSelectContext);

    return (
        <div onClick={() =>{
            setSelected(mapClub)
            console.log("Clicked");
        }} className="clubItem">
            <div className="title">
                <div className="icon-box" style={{backgroundColor: mapClub.categories[0].backgroundColor}} >
                    <img className="icon" src={mapClub.categories[0].urlLogo} alt="Category logo"/>
                </div>
                <div className="name">
                    {mapClub.name}
                </div>
            </div>
            <div className="content">
                <div className="address"> <EnvironmentFilled className="address-icon"/>{mapClub.address}</div>
            </div>
        </div>
    )
};

export default ClubItem;