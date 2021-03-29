import axios from "axios";
import {BASE_URL} from "./config/ApiConfig";

export const addCity = async (data) => {
    return await axios.post(BASE_URL + "/api/city", {
        name: data.name,
        latitude: data.latitude,
        longitude: data.longitude,
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const updateCityById = async (data) => {
    return await axios.put(BASE_URL + "/api/city/" + data.id, {
        name: data.name,
        latitude: data.latitude,
        longitude: data.longitude
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};


export const deleteCityById = async (id) => {
    return await axios.delete(BASE_URL + "/api/city/" + id,).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const getCityById = async (id) => {
    return await axios.get(BASE_URL + "/api/city/" + id).then((response) => {
        return response.data
    });
};

export const getAllCities = async () => {
    return await axios.get(BASE_URL + "/api/cities").then((response) => {
        return response.data
    });
};