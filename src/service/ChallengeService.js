import {BASE_URL} from "./config/ApiConfig";
import fetchRequest from "./FetchRequest";

export const getChallengeProfile = (id) => {
    return fetchRequest.get(BASE_URL + "/api/challenge/" + id)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            return error.response;
        });
};

export const getActiveChallengesPreviews = () => {
    return fetchRequest.get(BASE_URL + "/api/challenges?active=true")
        .then((response) => {
            return response.data
        }).catch((error) => {
            return error.response
        });
};

export const getTaskProfile = (id) => {
    return fetchRequest.get(BASE_URL + "/api/challenge/task/" + id)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            return error.response;
        })
};
