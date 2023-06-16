import fetchRequest from "./FetchRequest";
import { BASE_URL } from "./config/ApiConfig";

export const updateRating = async () => {
    await fetchRequest.patch(BASE_URL + "/api/v1/club/all/rating").then((response) => {
        return response.data
    }).catch((error) => {
    });
    await fetchRequest.patch(BASE_URL + "/api/v1/center/all/rating").then((response) => {
        return response.data
    }).catch((error) => {
    });
};
