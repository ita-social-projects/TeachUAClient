import fetchRequest from "./FetchRequest";
import { BASE_URL } from "./config/ApiConfig";

export const LOAD_EXCEL_TO_DB = BASE_URL + "/api/load-excel-to-db";

export const loadExcelToDatabase = async (data) => {
    console.log("DATA")
    console.log(data)
    return await fetchRequest.post(LOAD_EXCEL_TO_DB,
        data
    )
        .then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};