export const saveToken = (token) => {
    localStorage.setItem("accessToken", token)
}

export const saveUserId = (id) => {
    localStorage.setItem("id", id)
}

export const deleteToken = () => {
    localStorage.removeItem("accessToken");
}

export const deleteUserId = () => {
    localStorage.removeItem("id");
}

export const getToken = () => {
    return localStorage.getItem("accessToken");
}

export const getUserId = () => {
    return localStorage.getItem("id");
}