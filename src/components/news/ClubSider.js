import React, {useState} from "react";
import EmptySearch from "../EmptySearch";
import "./css/ClubSider.css"
import ClubListItem from "../clubList/ClubListItem";
import {mapSearchParameters, searchParameters} from "../../context/SearchContext";
import ClubListItemInfo from "../clubList/ClubListItemInfo";
import { CategoryProvider } from "../../context/CategoryContext";

const ClubSider = ({clubs, reloadAfterChange}) => {

    const [clubInfoVisible, setClubInfoVisible] = useState(false);
    const [clickedClub, setClickedClub] = useState(null);

    const onClubClick = (club) => {
        setClickedClub(club);
        setClubInfoVisible(true);
    };

    return clubs.length === 0 ? <EmptySearch/> : (
        <CategoryProvider>
        <div className="club-sider">
            <div className="sider-header">
                {mapSearchParameters.cityName !== 'online' ?
                    <h2 className="city-name">{searchParameters.cityName !== undefined ? "Гуртки у місті " + searchParameters.cityName : "Гуртки у всіх містах"}</h2>
                    :
                    <h2 className="city-name">Гуртки без локації</h2>}
            </div>
            {clubs.map((club, index) => <ClubListItem isClickable={false} club={club} key={index} onClubClick={onClubClick}/>)}
            {clickedClub &&
                <ClubListItemInfo visible={clubInfoVisible} setVisible={setClubInfoVisible}
                                  club={clickedClub} reloadAfterChange={reloadAfterChange}/>}
        </div>
        </CategoryProvider>

    )

};

export default ClubSider;