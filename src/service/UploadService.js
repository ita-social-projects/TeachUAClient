import fetchRequest from "./FetchRequest";
import { UPLOAD_IMAGE_URL } from "./config/ApiConfig";

export const uploadImage = (image, folder) => {
    let data = new FormData();
    data.append("image", image);
    data.append("folder", folder);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", UPLOAD_IMAGE_URL, false);
    xhr.send(data);
    
    return xhr.response;
}