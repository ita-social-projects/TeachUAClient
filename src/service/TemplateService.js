import {BASE_URL} from "./config/ApiConfig";
import fetchRequest from "./FetchRequest";

export const createTemplate = async (data) => {
    return await fetchRequest.post(BASE_URL + "/api/template", {
        name: data.name,
        courseDescription: data.courseDescription,
        projectDescription: data.projectDescription,
        certificateType: data.certificateType,
        filePath: data.filePath,
        properties: data.properties
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        return error.response.data;
    });
};

export const getAllTemplates = async () => {
    return await fetchRequest
        .get(BASE_URL + "/api/templates")
        .then((response) => {
            return response.data;
        });
};

