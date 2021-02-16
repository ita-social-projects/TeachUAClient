import axios from "axios";

export const getCategoryById = async (id) => {
    return await axios.get("/api/category/" + id).then((response) => {
        return response.data
    });
};

export const getAllCategories = async () => {
    return await axios.get("/api/categories").then((response) => {
        return response.data
    });
};