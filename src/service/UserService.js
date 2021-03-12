import fetchRequest from "./FetchRequest";
import { BASE_URL } from "./config/ApiConfig";
import { Redirect } from 'react-router-dom'

export const getUserById = async (id) => {
    return await fetchRequest.get(BASE_URL + "/api/user/" + id).then((response) => {
        return response.data
    }).catch((error) => {
        console.log("CATCH ERROR");
        console.log(error);
        return window.location.href = '/clubs';
    });
};

export const signUp = async (data) => {
    return await fetchRequest.post(BASE_URL + "/api/signup", {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phone: data.phone,
        roleName: data.role,
        urlLogo: data.urlLogo && data.urlLogo.file.response
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const signIn = async (data) => {
    return await fetchRequest.post(BASE_URL + "/api/signin", {
        email: data.email,
        password: data.password
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const updateUser = async (data) => {
    console.log(data)
    return await fetchRequest.put(BASE_URL + "/api/user/" + data.id, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phone: data.phone,
        roleName: data.role,
        urlLogo: data.urlLogo && data.urlLogo.file.response
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};
