import axios from "axios";
import {API} from "./ClubService";

export const getPossibleResults = async (parameters) => {
    return await axios.get(API + "/search", {
        params: {
            text: "",
            cityName: parameters.cityName
        }
    }).then((response) => {
        return response.data
    });
};

export const getPossibleResultsByText = async (text, parameters) => {
    return await axios.get(API + "/search", {
        params: {
            text: text,
            cityName: parameters.cityName
        }
    }).then((response) => {
        return response.data
    });
};