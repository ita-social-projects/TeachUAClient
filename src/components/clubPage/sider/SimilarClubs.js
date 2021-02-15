import React from "react";
import {searchParameters} from "../../../context/SearchContext";
import SimilarClubItem from "./SimilarClubItem";
import './css/SimilarClubs.css';
import PropTypes from "prop-types";

const SimilarClubs = ({similarClubs}) => {
    return (
        <div className="similar-clubs">
            <p className="label">Схожі гуртки у місті {searchParameters.cityName}</p>
            {similarClubs.map(club => <SimilarClubItem key={club.id} club={club}/>)}
        </div>)
};
SimilarClubs.propTypes = {
    similarClubs: PropTypes.array.isRequired
};

export default SimilarClubs;