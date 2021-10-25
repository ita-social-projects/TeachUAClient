import {BASE_URL} from "./config/ApiConfig";
import fetchRequest from "./FetchRequest";
import {searchParameters} from "../context/SearchContext";

export const getAllItems = async () => {
    return await fetchRequest.get(BASE_URL + "/api/about_us_items")
        .then((response) => {
            return response.data;
        });
}