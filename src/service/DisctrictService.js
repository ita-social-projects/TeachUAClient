import axios from "axios";
import {BASE_URL} from "./config/ApiConfig";

export const getDistrictsByCityName = async (name) => {
    return await axios.get(BASE_URL + "/api/districts/" + name).then((response) => {
        return response.data
    });
};