import axios from "axios";

export const API = "/api";

export const getClubsByParameters = async (parameters) => {
    return await axios.get(API + "/clubs/search", {
        params: parameters,
    }).then((response) => {
        return response.data
    });
};