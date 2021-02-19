import axios from "axios";

export const getPageableNews = async (size) => {
    return await axios.get("/api/newslist/search?size=" + size).then((response) => {
        return response.data
    });
};
