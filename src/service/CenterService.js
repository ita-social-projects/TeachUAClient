
import {BASE_URL} from "./config/ApiConfig";
import fetchRequest from "./FetchRequest";
import {searchParameters} from "../context/SearchContext";



export const getCenterById = async (id) => {
    return await fetchRequest.get(BASE_URL + "/api/center/" + id).then((response) => {
        return response.data
    }).catch((error) => {
        console.log(error);
        return error.response.data
    });
};

export const getCentersByUserId = async (id, page) => {
    return await fetchRequest.get(BASE_URL + "/api/centers/" + id + "?page" + page).then((response) => {
        return response.data
    });
};

export const getAllCenters = async () => {
    return await fetchRequest.get(BASE_URL + "/api/centers").then((response) => {
        return response.data
    });
};

export const getCentersByAdvancedSearch = async (parameters, page) => {
    return await fetchRequest.get(BASE_URL + "/api/centers/search/advanced", {
        params: {
            cityName: parameters.cityName ? parameters.cityName : searchParameters.cityName,
            districtName: parameters.districtName,
            stationName: parameters.stationName,
            page: page,
        },
    }).then((response) => {
        return response.data
    });
}


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
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    })
};