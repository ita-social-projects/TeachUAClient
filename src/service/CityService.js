import axios from "axios";

export const getCityById = async (id) => {
    return await axios.get( "/city/" + id).then((response) => {
        return response.data
    });
};

export const getAllCities = async () => {
    return await axios.get("/cities").then((response) => {
        return response.data
    });
};