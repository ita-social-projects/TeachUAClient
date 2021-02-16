import axios from "axios";

export const getCityById = async (id) => {
    return await axios.get( "/api/city/" + id).then((response) => {
        return response.data
    });
};

export const getAllCities = async () => {
    return await axios.get("/api/cities").then((response) => {
        return response.data
    });
};