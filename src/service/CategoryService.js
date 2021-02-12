import axios from "axios";

import {API} from "./ClubService";

export const getCategoryById = async (id) => {
    return await axios.get(API + "/category/" + id).then((response) => {
        return response.data
    });
};

export const getAllCategories = async () => {
    return await axios.get(API + "/categories").then((response) => {
        return response.data
    });
};