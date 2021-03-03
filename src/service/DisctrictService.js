import axios from "axios";
import {BASE_URL} from "./config/ApiConfig";

export const getAllDistricts = async () => {
    return await axios.get(BASE_URL + "/api/districts").then((response) => {
        return response.data
    });
};