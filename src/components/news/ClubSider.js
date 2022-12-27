import React, {useEffect, useState} from "react";
import EmptySearch from "../EmptySearch";
import "./css/ClubSider.css"
import {getTopClubsByCity} from "../../service/ClubService";
import ClubListItem from "../clubList/ClubListItem";
import {mapSearchParameters, searchParameters} from "../../context/SearchContext";
import ClubListItemInfo from "../clubList/ClubListItemInfo";
import Loader from "../Loader";

const ClubSider = ({clubs}) => {

    const [clubInfoVisible, setClubInfoVisible] = useState(false);
    const [clickedClub, setClickedClub] = useState(null);

    const onClubClick = (club) => {
        setClickedClub(club);
        setClubInfoVisible(true);
    };

    return clubs.length === 0 ? <EmptySearch/> : (
        <div className="club-sider">
            <div className="sider-header">
                {mapSearchParameters.cityName !== 'online' ?
                    <h2 className="city-name">{searchParameters.cityName !== undefined ? "Гуртки у місті " + searchParameters.cityName : "Гуртки у всіх містах"}</h2>
                    :
                    <h2 className="city-name">Гуртки без локації</h2>}
            </div>
            {clubs.map((club, index) => <ClubListItem club={club} key={index} onClubClick={onClubClick}/>)}
            {clickedClub &&
                <ClubListItemInfo visible={clubInfoVisible} setVisible={setClubInfoVisible}
                                  club={clickedClub}/>}
        </div>

    )

};

export default ClubSider;