import {BASE_URL} from "./config/ApiConfig";
import fetchRequest from "./FetchRequest";

export const createTemplate = async (data) => {
    return await fetchRequest.post(BASE_URL + "/api/template", {
        name: data.name,
        courseDescription: data.courseDescription,
        projectDescription: data.projectDescription,
        certificateType: data.certificateType,
        filePath: data.filePath,
        properties: JSON.stringify(data.properties)
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        return error.response.data;
    });
};

export const loadTemplateMetadata = async (data) => {
    return await fetchRequest.post(BASE_URL + "/api/template/load-metadata",
        data
    ).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const getAllTemplates = async () => {
    return await fetchRequest
        .get(BASE_URL + "/api/templates")
        .then((response) => {
            return response.data;
        });
};


export const getTemplateById = async (id) => {
    return await fetchRequest.get(BASE_URL + "/api/template/" + id).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const updateTemplate = async (data, id) => {
    return await fetchRequest
        .put(BASE_URL + "/api/template/" + id, {
            name: data.name,
            courseDescription: data.courseDescription,
            projectDescription: data.projectDescription
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const deleteTemplate = async (id) => {
    return await fetchRequest
        .delete(BASE_URL + "/api/template/" + id)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};
