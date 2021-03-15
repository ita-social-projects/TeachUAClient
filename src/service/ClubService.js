import fetchRequest from "./FetchRequest";
import { BASE_URL } from "./config/ApiConfig";

export const addClub = async (data) => {

    return await fetchRequest.post(BASE_URL + "/api/club", {
        categoriesName: data.categories,
        name: data.name,
        ageFrom: data.ageFrom,
        ageTo: data.ageTo,
        cityName: data.cityName,
        description: data.description,
        address: data.address.value.structured_formatting.main_text,
        latitude: data.latitude,
        longitude: data.longitude,
        districtName: data.districtName,
        urlLogo: data.urlLogo && data.urlLogo.file.response,
        urlBackground: data.urlBackground && data.urlBackground.file.response
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

export const getClubsByUserId = async (id) => {
    return await fetchRequest.get(BASE_URL + "/api/clubs/" + id + "?size=3").then((response) => {
        return response.data
    });
};

export const getSimilarClubsByCategoryName = async (id, categoriesName, cityName) => {
    return await fetchRequest.get(BASE_URL + "/api/clubs/search/similar", {
        params: {
            id: id,
            categoriesName: categoriesName,
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

export const getClubsByParameters = async (parameters) => {
    return await fetchRequest.get(BASE_URL + "/api/clubs/search", {
        params: parameters,
    }).then((response) => {
        return response.data
    });
};
