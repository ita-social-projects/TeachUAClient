import axios from "axios";

export const getClubById = async (id) => {
    return await axios.get("/api/club/" + id).then((response) => {
        return response.data
    });
};

export const getSimilarClubsByCategoryName = async (id, categoryName, cityName) => {
    return await axios.get("/api/clubs/search/similar", {
        params: {
            id: id,
            categoryName: categoryName,
            cityName: cityName
        },
    }).then((response) => {
        return response.data
    });
};

export const getClubsByParameters = async (parameters) => {
    return await axios.get("/api/clubs/search", {
        params: parameters,
    }).then((response) => {
        return response.data
    });
};