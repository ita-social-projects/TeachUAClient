import axios from "axios";

export const getPossibleResults = async () => {
    return await axios.get("/search?text=").then((response) => {
        return response.data
    });
};

export const getPossibleResultsByText = async (text) => {
    return await axios.get("/search?text=" + text).then((response) => {
        return response.data
    });
};