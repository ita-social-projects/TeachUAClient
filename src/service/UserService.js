import axios from "axios";

export const API = "/api";

export const getUserById = async (id) => {
    return await axios.get(API + "/user/" + id).then((response) => {
        return response.data
    });
};



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