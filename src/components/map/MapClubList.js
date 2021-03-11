import React, {useEffect, useState} from "react";
import ClubItem from "./ClubItem";
import EmptySearch from "../EmptySearch";
import './css/MapClubList.css'
import {getClubsByParameters} from "../../service/ClubService";
import {mapSearchParameters} from "../../context/SearchContext";
import {getAllCities} from "../../service/CityService";


const MapClubList = ({mapClubs, setMapClubs, setZoom, setSelected, setCenter}) => {


    useEffect(() => {
        getClubsByParameters(mapSearchParameters).then(response => {
            setMapClubs(response);
        });
        getAllCities().then(response => {
            response
                .filter(city => city.name === mapSearchParameters.cityName)
                .map(city => setCenter({
                    lat: city.latitude,
                    lng: city.longitude
                }));
        });
    }, []);

    return mapClubs.content.length === 0 ? <EmptySearch/> : (
        <div className="clubList">
            {mapClubs.content.map((mapClub, index) => <ClubItem
                mapClub={mapClub}
                key={index}
                setZoom={setZoom}
                setSelected={setSelected}
                setCenter={setCenter}
            />)}
        </div>
    )
};

export default MapClubList;