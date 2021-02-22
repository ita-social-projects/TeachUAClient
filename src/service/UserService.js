import axios from "axios";
import {BASE_URL} from "../config/ApplicationConfig";


export const SuccessRegistration = async (email, password) => {
    return await axios.set(BASE_URL + "/signup", {
        params: {
            email: email,
            password: password
    },
}).then((response) =>  {
        return response.data
    });
};