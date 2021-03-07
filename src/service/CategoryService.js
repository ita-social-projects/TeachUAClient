import { BASE_URL } from "./config/ApiConfig";
import fetchRequest from "./FetchRequest";

export const getPageableCategory = async (page) => {
    return await fetchRequest.get(BASE_URL + "/api/categories/search?page=" + page).then((response) => {
        return response.data
    });
};

export const getAllCategories = async () => {
    return await fetchRequest.get(BASE_URL + "/api/categories").then((response) => {
        return response.data
    });
};