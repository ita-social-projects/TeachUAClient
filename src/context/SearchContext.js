import {createContext} from "react";

export const SearchContext = createContext(null);

export const searchParameters = {
    clubName: "",
    cityName: "Київ",
    districtName: "",
    stationName: "",
    categoryName: "",
    page: 0
};

export const mapSearchParameters = {
    clubName: "",
    cityName: "Київ",
    districtName: "",
    stationName: "",
    categoryName: "",
};

export const clearSearchParameters = () => {
    searchParameters.categoryName = "";
    searchParameters.clubName = "";
};