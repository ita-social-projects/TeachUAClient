import axios from "axios";
import fetchRequest from "./FetchRequest";
import { BASE_URL } from "./config/ApiConfig";

export const getCenterById = async (id) => {
    return await axios.get(BASE_URL + "/api/center/" + id).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const getCentersByUserId = async (id, page) => {
    return await axios.get(BASE_URL + "/api/centers/" + id + "?page" + page).then((response) => {
        return response.data
    });
};

export const addCenter = async (data) => {
    data.locations.map(location => {
        if (location.address.value) {
            location.address = location.address.value.structured_formatting.main_text
        }
    });
    return await fetchRequest.post(BASE_URL + "/api/center", {
        name: data.name,
        description: data.description,
        userId: data.userId,
        locations: data.locations,
        urlLogo: data.urlLogo && data.urlLogo.file.response,
        urlBackground: data.urlBackground && data.urlBackground.file.response,
        clubsId: data.clubs,
        userId: data.userId
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};