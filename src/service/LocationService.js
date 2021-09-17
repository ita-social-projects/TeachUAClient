import {BASE_URL} from "./config/ApiConfig";
import fetchRequest from "./FetchRequest";


export const deleteLocationById = async (id) => {
    return await fetchRequest
        .delete(BASE_URL + "/api/location/" + id)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.data;
        });
};
