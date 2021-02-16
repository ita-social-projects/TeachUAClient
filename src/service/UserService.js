import {API} from "./UserService";

import axios from "axios";


export const SuccessRegistration = async (email, password) => {
    return await axios.set(API + "/signup", {
        params: {
            email: email,
            password: password
    },
}).then((response) =>  {
        return response.data
    });
};