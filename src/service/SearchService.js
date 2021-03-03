import axios from "axios";
import {BASE_URL} from "./config/ApiConfig";


export const getPossibleResults = async (parameters) => {
    return await axios.get(BASE_URL + "/api/search", {
        params: {
            text: "",
            cityName: parameters.cityName
        }
    }).then((response) => {
        return response.data
    });
};

export const getPossibleResultsByText = async (text, parameters) => {
    return await axios.get(BASE_URL + "/api/search", {
        params: {
            text: text,
            cityName: parameters.cityName
        }
    }).then((response) => {
        return response.data
    });
};