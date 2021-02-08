import React from "react";
import {searchParameters} from "../../../context/SearchContext";
import SimilarClubItem from "./SimilarClubItem";
import './css/SimilarClubs.css';

const SimilarClubs = ({similarClubs}) => {
    return (
        <div className="similar-clubs">
            <p className="label">Схожі гуртки у місті {searchParameters.cityName}</p>
            {similarClubs.map(club => <SimilarClubItem club={club}/>)}
        </div>)
};

export default SimilarClubs;