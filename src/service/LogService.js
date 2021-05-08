import axios from "axios";
import {BASE_URL} from "./config/ApiConfig";

export const getAllLogs = async () => {
    return await axios.get(BASE_URL + "/api/logs").then((response) => {
        console.log(response);
        return response;
    });
};

export const getLogByName = async (params) => {
    return await axios.get(BASE_URL + "/api/log/" + params)
        .then((response) => {
            return response;
        });
};

export const deleteAllLogs = async () => {
    return await axios.delete(BASE_URL + "/api/logs")
        .then((response) => {
            return response;
        });
};