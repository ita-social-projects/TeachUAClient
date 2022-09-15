import fetchRequest from "../FetchRequest";
import {BASE_URL} from "../config/ApiConfig";

export const getAllGroups = async () => {
    return await fetchRequest
        .get(BASE_URL + "/api/groups")
        .then((response) => {
            response.data.map((x, index) => x.orderId = index + 1);
            return response.data;
        }).catch((error) => {
            return error.response;
        });
}

export const updateGroupById = async (data, id) => {
    return await fetchRequest
        .patch(BASE_URL + "/api/groups/" + id, {
            title: data.title,
            startDate: data.startDate,
            endDate: data.endDate,
            enrollmentKey: data.enrollmentKey
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
}
