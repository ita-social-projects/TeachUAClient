import axios from "axios";
import {BASE_URL} from "./config/ApiConfig";

export const addDistrict = async (data) => {
    console.log(data)

    return await axios.post(BASE_URL + "/api/district", {
        name: data.name,
        cityName: data.cityName
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const updateDistrictById = async (data) => {
    return await axios.put(BASE_URL + "/api/district/" + data.id, {
        name: data.name,
        cityName: data.cityName
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const deleteDistrictById = async (id) => {
    return await axios.delete(BASE_URL + "/api/district/" + id).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const getDistrictsByCityName = async (name) => {
    return await axios.get(BASE_URL + "/api/districts/" + name).then((response) => {
        return response.data
    });
};

export const getAllDistrict = async () => {
    return await axios.get(BASE_URL + "/api/districts").then((response) => {
        return response.data
    });
};