import fetchRequest from "./FetchRequest";
import {BASE_URL} from "./config/ApiConfig";

export const createMessage = async (data) => {
    return await fetchRequest.post(BASE_URL + "/api/message", {
        text: data.text,
        senderId: data.senderId,
        recipientId: data.recipientId,
        clubId: data.clubId,
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data;
    });
};

export const getMessageById = async (id) => {
    return await fetchRequest.get(BASE_URL + "/api/message/" + id).then((response) => {
        return response.data
    });
};
