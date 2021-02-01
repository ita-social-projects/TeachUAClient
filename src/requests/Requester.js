import axios from "axios";

export const STRING_API = "/api";
export const methods = {GET: 'get', POST: 'post', PUT: 'put', DELETE: 'delete'};

export const doRequest = async (uri, parameters, method, requestBody) => {
    if(uri === undefined || uri === "") {
        console.error("Uri is empty or undefined");
    }

    const existParameters = parameters === undefined ? '' : parameters;
    const existMethod = method === undefined ? methods.GET : method;
    const existRequestBody = requestBody === undefined ? '': requestBody;

    return await axios(STRING_API + uri, {
        method: existMethod,
        params: existParameters,
        body: existRequestBody
    }).then((response) => {
        return response.data
    });
};