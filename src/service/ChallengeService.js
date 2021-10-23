import {BASE_URL} from "./config/ApiConfig";
import fetchRequest from "./FetchRequest";

export const getChallengeProfile = async (id) => {
    return await fetchRequest.get(BASE_URL + "/api/challenge/" + id).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const createChallenge = async (data) => {
    return await fetchRequest
        .post(BASE_URL + "/api/challenge", {
            name: data.name,
            description: data.description,
            title: data.title,
            picture: data.picture,
            sortNumber: data.sortNumber
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};