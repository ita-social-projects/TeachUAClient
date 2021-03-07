import fetchRequest from "./FetchRequest";
import { BASE_URL } from "./config/ApiConfig";

export const getCityById = async (id) => {
    return await fetchRequest.get(BASE_URL + "/api/city/" + id).then((response) => {
        return response.data
    });
};

export const getAllCities = async () => {
    return await fetchRequest.get(BASE_URL + "/api/cities").then((response) => {
        return response.data
    });
};