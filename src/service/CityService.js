import axios from "axios";

import {API} from "./ClubService";

export const getCityById = async (id) => {
    return await axios.get(API + "/city/" + id).then((response) => {
        return response.data
    });
};

export const getAllCities = async () => {
    return await axios.get(API + "/cities").then((response) => {
        return response.data
    });
};