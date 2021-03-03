import axios from "axios";
import {BASE_URL} from "../config/ApplicationConfig";

export const getUserById = async (id) => {
    return await axios.get(BASE_URL + "/api/user/" + id).then((response) => {
        return response.data
    });
};


export const signUp = async (data) => {
    return await axios.post(BASE_URL + "/api/signup", {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phone: data.phone,
        roleName: data.role,
        urlLogo: data.urlLogo
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};


export const signIn = async (data) => {
    return await axios.post(BASE_URL + "/api/signin", {
        email: data.email,
        password: data.password
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};


export const updateUser = async (data) => {
    return await axios.put(BASE_URL + "/api/user/" + data.id, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phone: data.phone,
        roleName: data.role
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};