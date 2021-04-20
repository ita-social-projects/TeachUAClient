import {BASE_URL} from "./config/ApiConfig";
import axios from "axios";
import fetchRequest from "./FetchRequest";

export const getPageableCategory = async(page) => {
    return await axios.get(BASE_URL + "/api/categories/search?page=" + page).then((response) => {
        return response.data
    });
};

export const getAllCategories = async() => {
    return await axios.get(BASE_URL + "/api/categories").then((response) => {
        return response.data
    });
};

export const addCategory = async(data) => {
    return await fetchRequest.post(BASE_URL + "/api/category", {
        name: data.name,
        description: data.description,
        urlLogo: data.urlLogo,
        backgroundColor: data.backgroundColor,
        tagBackgroundColor: data.tagBackgroundColor,
        tagTextColor: data.tagTextColor
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
}

export const updateCategoryById = async(data) => {
    return await fetchRequest.put(BASE_URL + "/api/category/" + data.id, {
        name: data.name,
        description: data.description,
        urlLogo: data.urlLogo,
        backgroundColor: data.backgroundColor,
        tagBackgroundColor: data.tagBackgroundColor,
        tagTextColor: data.tagTextColor
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const deleteCategoryById = async(id) => {
    return await fetchRequest.delete(BASE_URL + "/api/category/" + id).then((response) => {
        return response.data;
    }).catch((error) => {
        return error.response.data
    });
};