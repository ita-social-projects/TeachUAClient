import {BASE_URL} from "./config/ApiConfig";
import fetchRequest from "./FetchRequest";

export const loadDataCertificatesByTemplateToDB = async (data) => {
    console.log(data);
    return await fetchRequest.post(BASE_URL + "/api/certificate-by-template/load-to-db",
        data
    ).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const loadTemplateName = async (value) => {
    return await fetchRequest.post(BASE_URL + "/api/certificate-by-template/pdf", {
            filePath: value
        }
    ).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const loadTemplateMetadata = async (data) => {
    return await fetchRequest.post(BASE_URL + "/api/certificate-by-template/load-template-metadata",
        data
    ).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};
