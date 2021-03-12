import axios from "axios";
import {BASE_URL} from "./config/ApiConfig";

export const getCenterById = async (id) => {
    return await axios.get(BASE_URL + "/api/center/" + id).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const getCentersByUserId = async (id, page) => {
    return await axios.get(BASE_URL + "/api/centers/" + id +"?page" + page).then((response) => {
        return response.data
    });
};