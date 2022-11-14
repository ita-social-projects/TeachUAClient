import { BASE_URL } from "./config/ApiConfig";
import fetchRequest from "./FetchRequest";


export const getAllLogs = async () => {
    return await fetchRequest.get(BASE_URL + "/api/logs").then((response) => {
        return response;
    });
};

export const getLogByName = async (params) => {
    return await fetchRequest.get(BASE_URL + "/api/logs/" + params)
        .then((response) => {
            return response;
        });
};

export const deleteLogByName = async (params) => {
    return await fetchRequest.delete(BASE_URL + "/api/logs/" + params)
        .then((response) => {
            return response;
        });
};
