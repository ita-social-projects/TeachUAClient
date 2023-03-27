import {BASE_URL} from "./config/ApiConfig";
import fetchRequest from "./FetchRequest";

export const getAllForDurationChallengeTable = () => {
    return fetchRequest.get(BASE_URL + "/api/admin/challenge-durations/")
        .then((response) => {
            return response.data;
        }).catch((error) => {
            return error.response;
        });
};
export const getAllForDurationChallengePageByChallengeId = (id) => {
    return fetchRequest.get(BASE_URL + "/api/admin/challenge-durations/" + id)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            return error.response;
        });
};

export const createDuration = async (createDurationData, challengeId) => {
    return await fetchRequest
        .post(BASE_URL + "/api/admin/challenge-duration/" + challengeId, createDurationData)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            return error.response;
        });
    ;
};
export const existUsers = async (data) => {
    return await fetchRequest
        .post(BASE_URL + "/api/admin/challenge-durations/check-users", {
            startDate : data.startDate,
            endDate : data.endDate
        })
        .then ((response) => {
            return response.data;
        }).catch((error) => {
            return error.response;
        });
    ;
};

export const deleteChallengeDuration = async (challengeId, data) => {
    return await fetchRequest
        .post(BASE_URL + "/api/admin/challenge-duration/delete", {
            challengeId: challengeId,
            startDate: data.startDate,
            endDate: data.endDate
        })
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            return error.response.data;
        });
};
