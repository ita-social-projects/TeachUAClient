import {BASE_URL} from "./config/ApiConfig";
import fetchRequest from "./FetchRequest";

export const getChallengeProfile = (id) => {
    return fetchRequest.get(BASE_URL + "/api/challenge/" + id)
        .then((response) => {
            return response.data
        }).catch((error) => {
            return error.response;
        });
};
