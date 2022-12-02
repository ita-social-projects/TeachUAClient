import {BASE_URL} from "./config/ApiConfig";
import fetchRequest from "./FetchRequest";

export const loadDataCertificatesByTemplateToDB = async (data) => {
    return await fetchRequest.post(BASE_URL + "/api/certificate-by-template/load-to-db",
        data
    ).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const loadTemplateMetadata = async (data) => {
    return await fetchRequest.post(BASE_URL + "/api/certificate-by-template/load-last-modified-date",
        data
    ).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};
