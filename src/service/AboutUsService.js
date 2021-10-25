import {BASE_URL} from "./config/ApiConfig";
import fetchRequest from "./FetchRequest";
import {searchParameters} from "../context/SearchContext";

export const getAllItems = async () => {
    return await fetchRequest.get(BASE_URL + "/api/about_us_items")
        .then((response) => {
            return response.data;
        });
}

export const updateItemById = async (data) => {
    return await fetchRequest
        .put(BASE_URL + "/api/about_us_item/" + data.id, {
            picture: data.picture,
            text: data.text,
            video: data.video,
            type: data.type,
            number: 0
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};