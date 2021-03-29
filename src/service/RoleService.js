import fetchRequest from "./FetchRequest";
import { BASE_URL } from "./config/ApiConfig";
import { Redirect } from 'react-router-dom'

export const getAllRoles = async () => {
    return await fetchRequest.get(BASE_URL + "/api/roles").then((response) => {
        return response.data
    }).catch((error) => {
    });
};