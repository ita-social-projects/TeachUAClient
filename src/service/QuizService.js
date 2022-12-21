import {BASE_URL} from "./config/ApiConfig";
import fetchRequest from "./FetchRequest";

export const questionsImport = async (data)=>{
    return await fetchRequest
        .post(BASE_URL+"/api/questions-import",{
            formId: data.formId
        })
        .then((response)=>{
            return response.data
        })
        .catch((error)=>{
            return error.response.data;
        });
};

export const getAllQuestions = async () => {
    return await fetchRequest
        .get(BASE_URL + "/api/quiz/questions")
        .then((response) => {
            return response.data;
        });
};

export const loadDataToDatabase = async (data) => {
    return await fetchRequest.post(BASE_URL + "/api/questions/load-to-db",
        data
    )
        .then((response) => {
            return response.data
        }).catch((error) => {
            return error.response.data
        });
};
