import { BASE_URL } from './config/ApiConfig';
import fetchRequest from './FetchRequest';

export const getResponsesFromGoogleForms = async (formId) => {
    return await fetchRequest
        .get(`${BASE_URL}/api/google-forms/responses/${formId}`)
        .then((response) => {
            return response.data;
        });
};

export const getInfoFromGoogleForms = async (formId) => {
    return await fetchRequest
        .get(`${BASE_URL}/api/google-forms/info/${formId}`)
        .then((response) => {
            return response.data;
        });
};

export const getAllTests = async () => {
    return await fetchRequest
        .get(`${BASE_URL}/api/tests`)
        .then((response) => response.data);
};

export const getAllTopics = async () => {
    return await fetchRequest
        .get(`${BASE_URL}/api/topics`)
        .then((response) => response.data);
};

export const createTopic = async (data) => {
    return await fetchRequest
        .post(`${BASE_URL}/api/topics`, { title: data })
        .then((response) => response.data);
};

export const createTest = async (data) => {
    const { title, description, difficulty, duration, topicTitle } = data;
    return await fetchRequest
        .post(`${BASE_URL}/api/tests`, {
            title,
            description,
            difficulty,
            duration,
            topicTitle,
            questions: [],
        })
        .then((response) => response.data);
};

export const createResponsesFromGoogleForms = async (test, data) => {
    return await fetchRequest
        .post(`${BASE_URL}/api/google-forms/import-responses`, {
            information: { title: test },
            quizResults: data,
        })
        .then((response) => response.data);
};
