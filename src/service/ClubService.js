import axios from "axios";

export const getClubsByParameters = async (parameters) => {
    return await axios.get("/clubs/search", {
        params: parameters,
    }).then((response) => {
        return response.data
    });
};