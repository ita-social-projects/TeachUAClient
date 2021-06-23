import fetchRequest from "./FetchRequest";
import {BASE_URL} from "./config/ApiConfig";

export const getUserById = async (id) => {
    return await fetchRequest.get(BASE_URL + "/api/user/" + id).then((response) => {
        return response.data
    }).catch((error) => {
    });
};

export const getUserByEmail = async (params) => {
    return await fetchRequest.get(BASE_URL + "/api/user", {params})
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            return error.response.data
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
    // console.log( {
    //     firstName: data.firstName,
    //     lastName: data.lastName,
    //     email: data.email,
    //     password: data.password,
    //     phone: data.phone,
    //     urlLogo: data.urlLogo/* && data.urlLogo.file.response*/
    // });
    console.log(data);
    return await fetchRequest.put(BASE_URL + "/api/user/" + data.id, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phone: data.phone,
        roleName: data.role,
        urlLogo: data.urlLogo/* && data.urlLogo.file.response*/,
        status: data.status
    }).then((response) => {
        console.log(response.data)
        return response.data

    }).catch((error) => {
        console.log(error.response.data)
        return error.response.data
    });
};

export const updateUserByAdmin = async (data) => {
    return await fetchRequest.put(BASE_URL + "/api/user/update", {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phone: data.phone,
        roleName: data.roleName,
        urlLogo: data.urlLogo/* && data.urlLogo.file.response*/,
        status: data.status
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const getAllUsers = async () => {
    return await fetchRequest.get(BASE_URL + "/api/users")
        .then((response) => {
            return response.data
        }).catch((error) => {
            return error.response.data
        })
};

export const deleteUserById = async (id) => {
    return await fetchRequest.delete(BASE_URL + "/api/user/" + id, {
        id: id
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};