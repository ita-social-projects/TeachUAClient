import fetchRequest from "./FetchRequest";
import { BASE_URL } from "./config/ApiConfig";

export const getFeedbackListByClubId = async (id) => {
    return await fetchRequest.get(BASE_URL + "/api/feedbacks/" + id).then((response) => {
        return response.data
    });
};

export const createFeedback = async (text, rate, isComplaint, userId, clubId) => {
    return await fetchRequest.post(BASE_URL + "/api/feedback", {
        text: text,
        rate: rate,
        userId: userId,
        userName: "name",
        clubId: clubId
    }).then((response) => {
        return response.data
    });
};
