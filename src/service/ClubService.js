import axios from "axios";
import fetchRequest from "./FetchRequest";
import { BASE_URL } from "./config/ApiConfig";
import { replaceCommaToSemicolon } from "../util/CategoryUtil";
import { searchParameters } from "../context/SearchContext";

export const addClub = async (data) => {
    data.locations.map(location => location.address = location.address.value.structured_formatting.main_text);
    return await fetchRequest.post(BASE_URL + "/api/club", {
        categoriesName: data.categories,
        name: data.name,
        ageFrom: data.ageFrom,
        ageTo: data.ageTo,
        isOnline: data.isOnline,
        description: data.description,
        locations: data.locations,
        urlLogo: data.urlLogo && data.urlLogo.file.response,
        urlBackground: data.urlBackground && data.urlBackground.file.response,
        contacts: data.contacts
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const updateClubBuId = async (data) => {
    return await fetchRequest.put(BASE_URL + "/api/club/" + data.id, {
        categoriesName: data.categories,
        name: data.name,
        ageFrom: data.ageFrom,
        ageTo: data.ageTo,
        cityName: data.cityName,
        description: data.description,
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
        districtName: data.districtName,
        urlLogo: data.urlLogo,
        urlBackground: data.urlBackground
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const getClubById = async (id) => {
    return await fetchRequest.get(BASE_URL + "/api/club/" + id).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const getClubsByUserId = async (id, page) => {
    return await fetchRequest.get(BASE_URL + "/api/clubs/" + id + "?page=" + page).then((response) => {
        return response.data
    });
};

export const getSimilarClubsByCategoryName = async (id, categoriesName, cityName) => {
    return await fetchRequest.get(BASE_URL + "/api/clubs/search/similar", {
        params: {
            id: id,
            categoriesName: replaceCommaToSemicolon(categoriesName),
            cityName: cityName
        },
    }).then((response) => {
        return response.data
    });
};

export const getClubsByCategoryAndCity = async (mapSearchParameters) => {
    return await fetchRequest.get(BASE_URL + "/api/clubs/search/simple", {
        params: {
            cityName: mapSearchParameters.cityName,
            categoryName: mapSearchParameters.categoryName
        },
    }).then((response) => {
        return response.data
    });
};

export const getClubsByAdvancedSearch = async (parameters, page, sortBy, sortPath) => {
    return await fetchRequest.get(BASE_URL + "/api/clubs/search/advanced", {
        params: {
            ageFrom: parameters.ageFrom,
            ageTo: parameters.ageTo,
            cityName: parameters.cityName ? parameters.cityName : searchParameters.cityName,
            districtName: parameters.districtName,
            stationName: parameters.stationName,
            categoriesName: parameters.categoriesName && replaceCommaToSemicolon(parameters.categoriesName),
            isCenter: parameters.isCenter,
            isOnline: parameters.isOnline ? parameters.isOnline.length === 0 ? null : true : null,
            sort: `${sortBy},${sortPath}`,
            page: page,
        },
    }).then((response) => {
        return response.data
    });
};

export const getClubsByParameters = async (parameters, page) => {
    return await fetchRequest.get(BASE_URL + "/api/clubs/search", {
        params: {
            clubName: parameters.clubName,
            cityName: parameters.cityName,
            isOnline: parameters.isOnline,
            categoryName: parameters.categoryName,
            page: page,
        },

    }).then((response) => {
        return response.data
    });
};
