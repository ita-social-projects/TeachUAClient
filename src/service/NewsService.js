import fetchRequest from "./FetchRequest";
import { BASE_URL } from "./config/ApiConfig";

export const getPageableNews = async (size) => {
    return await fetchRequest.get(BASE_URL + "/api/newslist/search?size=" + size).then((response) => {
        return response.data
    });
};
