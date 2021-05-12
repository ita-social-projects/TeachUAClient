import axios from "axios";
import {BASE_URL} from "./config/ApiConfig";
import fetchRequest from "./FetchRequest";
import {searchParameters} from "../context/SearchContext";
import {replaceCommaToSemicolon} from "../util/CategoryUtil";

export const getCenterById = async (id) => {
    return await axios.get(BASE_URL + "/api/center/" + id).then((response) => {
        return response.data
    }).catch((error) => {
        console.log(error);
        console.log(error.response.data);
        return error.response.data
    });
};

export const getCentersByUserId = async (id, page) => {
    return await axios.get(BASE_URL + "/api/centers/" + id +"?page" + page).then((response) => {
        return response.data
    });
};

export const getAllCenters = async () => {
    return await axios.get(BASE_URL + "/api/centers").then((response) => {
        return response.data
    });
};

export const getCentersByAdvancedSearch = async (parameters, page) => {
    return await fetchRequest.get(BASE_URL + "/api/centers/search/advanced", {
        params: {
            cityName: parameters.cityName ? parameters.cityName : searchParameters.cityName,
            districtName: parameters.districtName,
            stationName: parameters.stationName,
            page: page,
        },
    }).then((response) => {
        return response.data
    });
};