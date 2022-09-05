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

export const getValidationResponse = (serialNumber) => {
    return fetchRequest.get(BASE_URL + "/api/certificate/" + serialNumber)
    .then((response) => {
        return response.data;
    }).catch((error) =>{
        return error.response;
    })
};

export const getCertificatesByUserName = async (data) => {
    return await fetchRequest.get(BASE_URL + "/api/certificate", {
        params: {
            userName: data.userName
        }
    })
    .then((response) => {return response.data})
    .catch((error) => {
        return error.response.data;
    });
}
export const convertCertificateType = (type) => {
    switch(type){
        case 1:
            return "Тренер";
            break;
        
        case 2:
            return "Модератор";
            break;
        
        case 3: 
            return "Учасник";
            break;
        default:
            return "Учасник";
    }
}