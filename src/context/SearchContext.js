import {createContext} from "react";

export const SearchContext = createContext(null);

export const searchParameters = {
    clubName: "",
    cityName: "",
    categoryName: "",
    page: 0
};

export const clearSearchParameters = () => {
    searchParameters.categoryName = "";
    searchParameters.clubName = "";
};