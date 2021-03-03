import axios from "axios";
import {BASE_URL} from "./config/ApiConfig";

export const getAllContacts = async () => {
    return await axios.get(BASE_URL + "/api/contact-types").then((response) => {
        return response.data
    });
};