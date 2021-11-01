import {BASE_URL} from "./config/ApiConfig";
import fetchRequest from "./FetchRequest";

export const getTasksByChallenge = async (id) => {
    return await fetchRequest
        .get(BASE_URL + "/api/challenge/" + id + "/tasks")
        .then((response) => {
            return response.data;
        });
};

export const getTasks = async () => {
    return await fetchRequest
        .get(BASE_URL + "/api/tasks")
        .then((response) => {
            return response.data;
        });
};

export const createTask = async (data, id) => {
    return await fetchRequest
        .post(BASE_URL + "/api/challenge/" + id + "/task", {
            name: data.name,
            description: data.description,
            startDate: data.startDate,
            picture: data.picture && data.picture.file.response,
            challengeId: data.challengeId
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const deleteTask = async (id) => {
    return await fetchRequest
        .delete(BASE_URL + "/api/challenge/task/" + id)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const updateTask = async (data, id) => {
    return await fetchRequest
        .put(BASE_URL + "/api/challenge/task/" + id, {
            name: data.name,
            title: data.title,
            description: data.description,
            startDate: data.startDate,
            picture: data.picture && data.picture.file.response,
            challengeId: data.challengeId
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};