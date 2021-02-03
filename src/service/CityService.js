import axios from "axios";

export const getAllCities = async () => {
    return await axios.get("/cities").then((response) => {
        return response.data
    });
};