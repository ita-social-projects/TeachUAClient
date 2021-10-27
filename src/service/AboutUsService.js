import {BASE_URL, DELETE_FILE_URL} from "./config/ApiConfig";
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
            number: null
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const createItem = async (type) => {
    return await fetchRequest
        .post(BASE_URL + "/api/about_us_item/", {
            picture: null,
            text: null,
            video: null,
            type: type,
            number: null
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
}

export const deleteItem = async(id) => {
    return await fetchRequest.delete(BASE_URL + "/api/about_us_item/" + id)
        .then((response) => {
            return response.data
        }).catch((error) => {
            return error.response.data
        });
}

export const changeOrder = async (id, number) => {
    return await fetchRequest
        .patch(BASE_URL + "/api/about_us_item/" + id, {
            number: number
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
}