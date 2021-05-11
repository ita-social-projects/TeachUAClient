import axios from "axios";
import {BASE_URL} from "./config/ApiConfig";

export const createComplaint = async (text, userId, clubId) => {
    return await axios.post(BASE_URL + "/api/complaint", {
        text: text,
        userId: userId,
        clubId: clubId
    }).then((response) => {
        return response.data
    });
};