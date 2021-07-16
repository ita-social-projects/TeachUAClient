import fetchRequest from "./FetchRequest";
import {BASE_URL} from "./config/ApiConfig";
import {replaceCommaToSemicolon} from "../util/CategoryUtil";
import {searchParameters} from "../context/SearchContext";

export const addClub = async (data) => {
    // data.locations.map(
    //     (location) =>
    //         (location.address =
    //             location.address.value.structured_formatting.main_text)
    // );
    return await fetchRequest
        .post(BASE_URL + "/api/club", {
            categoriesName: data.categories,
            name: data.name,
            ageFrom: data.ageFrom,
            ageTo: data.ageTo,
            isOnline: data.isOnline,
            description: data.description,
            userId: data.userId,
            locations: data.locations,
            urlLogo: data.urlLogo,
            urlBackground: data.urlBackground,
            urlGallery: data.urlGallery,
            contacts: data.contacts,
            isApproved: data.isApproved,
            centerId: data.centerId,
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const updateClubBuId = async (data) => {
    return await fetchRequest
        .put(BASE_URL + "/api/club/" + data.id, {
            ageFrom: data.ageFrom,
            ageTo: data.ageTo,
            name: data.name,
            description: data.description,
            urlWeb: data.urlWeb,
            urlLogo: data.urlLogo,
            urlBackground: data.urlBackground,
            workTime: data.workTime,
            categories: data.categories,
            user: data.user,
            center: data.center,
            rating: data.rating,
            locations: data.locations,
            isApproved: data.isApproved,
            isOnline: data.isOnline,
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const getClubById = async (id) => {
    return await fetchRequest
        .get(BASE_URL + "/api/club/" + id)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const getClubsByUserId = async (id, page) => {
    return await fetchRequest
        .get(BASE_URL + "/api/clubs/" + id + "?page=" + page)
        .then((response) => {
            return response.data;
        });
};

export const getClubsByCenterId = async (id) => {
    return await fetchRequest
        .get(BASE_URL + "/api/clubs/center/"+ id)
        .then((response ) => {
            return response.data;
        });
};

export const getAllClubsByUserId = async (id) => {
    return await fetchRequest
        .get(BASE_URL + "/api/clubs/user/" + id)
        .then((response) => {
            return response.data;
        });
};

export const getSimilarClubsByCategoryName = async (
    id,
    categoriesName,
    cityName
) => {
    return await fetchRequest
        .get(BASE_URL + "/api/clubs/search/similar", {
            params: {
                id: id,
                categoriesName: replaceCommaToSemicolon(categoriesName),
                cityName: cityName,
            },
        })
        .then((response) => {
            return response.data;
        });
};

export const getClubsByCategoryAndCity = async (mapSearchParameters) => {
    return await fetchRequest
        .get(BASE_URL + "/api/clubs/search/simple", {
            params: {
                cityName: mapSearchParameters.cityName,
                categoryName: mapSearchParameters.categoryName,
            },
        })
        .then((response) => {
            return response.data;
        });
};

export const getClubsByAdvancedSearch = async (
    parameters,
    page,
    sortBy,
    sortPath
) => {
    return await fetchRequest
        .get(BASE_URL + "/api/clubs/search/advanced", {
            params: {
                age: parameters.age,
                cityName: parameters.cityName
                    ? parameters.cityName
                    : searchParameters.cityName,
                districtName: parameters.districtName,
                stationName: parameters.stationName,
                categoriesName:
                    parameters.categoriesName &&
                    replaceCommaToSemicolon(parameters.categoriesName),
                isCenter: parameters.isCenter,
                isOnline: parameters.isOnline
                    ? parameters.isOnline.length === 0
                        ? null
                        : true
                    : null,
                sort: `${sortBy},${sortPath}`,
                page: page,
            },
        })
        .then((response) => {
            return response.data;
        });
};

export const getClubsByParameters = async (parameters, page) => {
    return await fetchRequest
        .get(BASE_URL + "/api/clubs/search", {
            params: {
                clubName: parameters.clubName,
                cityName: parameters.cityName,
                isOnline: parameters.isOnline,
                categoryName: parameters.categoryName,
                page: page,
            },
        })
        .then((response) => {
            return response.data;
        });
};

export const getAllClubs = async () => {
    return await fetchRequest.get(BASE_URL + "/api/clubs").then((response) => {
        return response.data;
    });
};

export const changeClubOwner = async (params, id) => {
    return await fetchRequest
        .get(BASE_URL + "/api/user", {params})
        .then((response) => {
            return fetchRequest
                .patch(BASE_URL + "/api/club/" + id, {
                    user: {
                        id: response.data.id,
                        email: response.data.email,
                        password: response.data.password,
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        phone: response.data.phone,
                        urlLogo: response.data.urlLogo,
                        provider: response.data.provider,
                        providerId: response.data.providerId,
                        status: response.data.status,
                        verificationCode: response.data.verificationCode,
                    },
                })
                .then((response) => {
                    return response.data;
                })
                .catch((error) => {
                    return error.response.data;
                });
        });
};

export const deleteClubById = async (id) => {
    return await fetchRequest
        .delete(BASE_URL + "/api/club/" + id)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.data;
        });
};
