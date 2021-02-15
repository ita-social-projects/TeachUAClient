import {Card, Layout, Pagination, Space} from "antd";
import {mapSearchParameters} from "../../context/SearchContext";
import React, {useContext, useEffect} from "react";
import ClubItem from "./ClubItem";
import {getClubsByParameters} from "../../service/ClubService";
import EmptySearch from "../clubs/EmptySearch";
import {getAllCities} from "../../service/CityService";
import './css/MapClubList.css'
import {MapSelectContext} from "../../context/SearchContext";


const MapClubList = ({loading, load, mapClubs, setMapClubs}) => {
    const{selected, setSelected} = useContext(MapSelectContext);

    useEffect(() => {
                getClubsByParameters(mapSearchParameters).then(response => {
                    setMapClubs(response);
                    load(false);
                });

    }, []);
    return (!loading && mapClubs.content.length === 0) ? <EmptySearch/> : (
            <div className="clubList" style={{overflow:"scroll"}}>
                {mapClubs.content.map((mapClub, index) => <ClubItem  mapClub={mapClub} key={index}/>)}
            </div>
    )
};

export default MapClubList;