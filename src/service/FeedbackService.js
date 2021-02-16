import axios from "axios";

export const getFeedbackListByClubId = async (id) => {
    return await axios.get("/api/feedbacks/" + id).then((response) => {
        return response.data
    });
};
