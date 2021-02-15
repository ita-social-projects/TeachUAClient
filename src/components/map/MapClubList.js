import React, {useEffect} from "react";
import ClubItem from "./ClubItem";
import EmptySearch from "../clubs/EmptySearch";
import './css/MapClubList.css'
import {getClubsByParameters} from "../../service/ClubService";
import {mapSearchParameters} from "../../context/SearchContext";


const MapClubList = ({ mapClubs, setMapClubs, setZoom, setSelected}) => {
    useEffect(() => {
        getClubsByParameters(mapSearchParameters).then(response => {
            setMapClubs(response);
        });
    }, []);

    return mapClubs.content.length === 0 ? <EmptySearch/> : (
        <div className="clubList">
            {mapClubs.content.map((mapClub, index) => <ClubItem
                mapClub={mapClub}
                key={index}
                setZoom={setZoom}
                setSelected={setSelected}/>)}
        </div>
    )
};

export default MapClubList;