import React, { useEffect } from "react";
import ClubItem from "./ClubItem";
import EmptySearch from "../EmptySearch";
import './css/MapClubList.css'
import { getClubsByCategoryAndCity } from "../../service/ClubService";
import { mapSearchParameters, searchParameters } from "../../context/SearchContext";
import { getAllCities } from "../../service/CityService";


const MapClubList = ({ mapClubs, setMapClubs, setZoom, setSelected, setCenter }) => {

    useEffect(() => {
        getClubsByCategoryAndCity(mapSearchParameters).then(response => {
            setMapClubs(response);
        });

        getAllCities().then(response => {
            response
                .filter(city => city.name === mapSearchParameters.cityName)
                .map(city => {
                    setCenter({
                        lat: city.latitude,
                        lng: city.longitude
                    });
                    setZoom(10);
                });
        });
    }, [mapSearchParameters.cityName, mapSearchParameters.categoryName]);

    return mapClubs.length === 0 ? <EmptySearch /> : (
        <div className="clubList">
            {mapClubs.map((mapClub, index) => <ClubItem
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