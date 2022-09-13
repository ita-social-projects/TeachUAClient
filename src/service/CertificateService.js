import {BASE_URL} from "./config/ApiConfig";
import fetchRequest from "./FetchRequest";

export const getNumberOfUnsentCertificates = async () => {
    return await fetchRequest
        .get(BASE_URL + "/api/certificate/generate")
        .then((response) => {
            return response.data;
        });
};

export const loadDataToDatabase = async (data) => {
    return await fetchRequest.post(BASE_URL + "/api/certificate/load-to-db",
        data
    )
        .then((response) => {
            // console.log(response.data);
            return response.data
        }).catch((error) => {
            return error.response.data
        });
};

export const sendCertificatesScheduler = async () => {
    return await fetchRequest
        .post(BASE_URL + "/api/scheduler")
        .then((response) => {
            return response.data;
        });
};

export const getSentCertificates = async () => {
    return await fetchRequest
        .get(BASE_URL + "/api/certificates")
        .then((response) => {
            return response.data;
        });
};

export const updateCertificateProfile = async (id, data) => {
    return await fetchRequest.put(BASE_URL + "/api/certificates/" + id, {
        userName: data.userName,
        sendToEmail: data.sendToEmail,
        sendStatus: data.sendStatus,
        serialNumber: data.serialNumber,
        updateStatus: data.updateStatus
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data;
    });
}

export const getValidationResponse = (serialNumber) => {
    return fetchRequest.get(BASE_URL + "/api/certificate/" + serialNumber)
    .then((response) => {
        return response.data;
    }).catch((error) =>{
        return error.response;
    })
};
