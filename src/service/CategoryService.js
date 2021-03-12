import {BASE_URL} from "./config/ApiConfig";
import axios from "axios";

export const getPageableCategory = async (page) => {
    return await axios.get(BASE_URL + "/api/categories/search?page=" + page).then((response) => {
        return response.data
    });
};

export const getAllCategories = async () => {
    return await axios.get(BASE_URL + "/api/categories").then((response) => {
        return response.data
    });
};