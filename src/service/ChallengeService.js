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

export const getAllChallenges = async () => {
    return await fetchRequest
        .get(BASE_URL + "/api/challenges")
        .then((response) => {
            return response.data;
        });
};

export const getChallengeById = async (id) => {
    return await fetchRequest.get(BASE_URL + "/api/challenge/" + id).then((response) => {
        return response.data
        console.log(response.data);
    }).catch((error) => {
        console.log(error);
        return error.response.data
    });
};

export const updateChallenge = async (data, id) => {
    console.log(data);
    return await fetchRequest
        .put(BASE_URL + "/api/challenge/" + id, {
            name: data.name,
            title: data.title,
            description: data.description,
            picture: data.picture,
            sortNumber: data.sortNumber,
            isActive: data.isActive,
            tasks: data.tasks
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const updateChallengePreview = async (data, id) => {
    console.log(data, id);
    return await fetchRequest
        .patch(BASE_URL + "/api/challenge/" + id, {
            name: data.name,
            sortNumber: data.sortNumber,
            title: data.title,
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};


export const deleteChallenge = async (id) => {
    return await fetchRequest
        .delete(BASE_URL + "/api/challenge/" + id)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};
