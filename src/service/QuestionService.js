import fetchRequest from "./FetchRequest";
import { BASE_URL } from "./config/ApiConfig";

export const addQuestion = async (data) => {
    return await fetchRequest.post(BASE_URL + "/api/question", {
        title: data.title,
        text: data.text
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const updateQuestionById = async (data) => {
    return await fetchRequest.put(BASE_URL + "/api/question/" + data.id, {
        title: data.title,
        text: data.text
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const deleteQuestionById = async (id) => {
    return await fetchRequest.delete(BASE_URL + "/api/question/" + id).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const getAllQuestions = async () => {
    return await fetchRequest.get(BASE_URL + "/api/questions").then((response) => {
        return response.data
    });
};