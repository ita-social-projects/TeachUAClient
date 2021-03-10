import fetchRequest from "./FetchRequest";
import { BASE_URL } from "./config/ApiConfig";

export const getDistrictsByCityName = async (name) => {
    return await fetchRequest.get(BASE_URL + "/api/districts/" + name).then((response) => {
        return response.data
    });
};