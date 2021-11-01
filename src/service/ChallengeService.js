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

export const createChallenge = async (data) => {
    return await fetchRequest
        .post(BASE_URL + "/api/challenge", {
            name: data.name,
            description: data.description,
            title: data.title,
            picture: data.picture && data.picture.file.response,
            sortNumber: data.sortNumber
        })
        .then((response) => {
            return response.data;
            console.log(response.data);
        })
        .catch((error) => {
            return error.response.data;
        });
};
