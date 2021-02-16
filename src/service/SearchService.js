import axios from "axios";


export const getPossibleResults = async (parameters) => {
    return await axios.get("/api/search", {
        params: {
            text: "",
            cityName: parameters.cityName
        }
    }).then((response) => {
        return response.data
    });
};

export const getPossibleResultsByText = async (text, parameters) => {
    return await axios.get("/api/search", {
        params: {
            text: text,
            cityName: parameters.cityName
        }
    }).then((response) => {
        return response.data
    });
};