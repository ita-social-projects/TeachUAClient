export const saveToken = (token) => {
    localStorage.setItem("accessToken", token)
}

export const saveUserId = (id) => {
    localStorage.setItem("id", id)
}

export const saveRole = (role) => {
    localStorage.setItem("role", role)
}

export const deleteToken = () => {
    localStorage.removeItem("accessToken");
}

export const deleteUserId = () => {
    localStorage.removeItem("id");
}

export const deleteRole = () => {
    localStorage.removeItem("role")
}

export const deleteUserStorage = () => {
    deleteToken();
    deleteUserId();
    deleteRole();
}

export const getToken = () => {
    return localStorage.getItem("accessToken");
}

export const getUserId = () => {
    return localStorage.getItem("id");
}

export const getRole = () => {
    return localStorage.getItem("role");
}