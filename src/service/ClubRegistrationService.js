import { BASE_URL } from "./config/ApiConfig";
import fetchRequest from "./FetchRequest";

export const postClubRegistration = async (clubRegistrationRequest) => {
    return await fetchRequest
        .post(BASE_URL + "/api/club-registration", clubRegistrationRequest)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const postUserClubRegistration = async (userClubRegistrationRequest) => {
    return await fetchRequest
        .post(BASE_URL + "/api/club-registration/user", userClubRegistrationRequest)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};