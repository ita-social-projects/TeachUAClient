import axios from "axios";
import {BASE_URL} from "../config/ApplicationConfig";

export const getBaseUri = async () => {
    return await axios.get( BASE_URL + "/api/uri").then((response) => {
        return response.data
    });
};