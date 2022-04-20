import {BASE_URL} from "../../../../service/config/ApiConfig";


export const sortMessages = (messages) => {
    messages.sort((a, b) => {
        if (getDate(a.date) < getDate(b.date)) return -1;
        if (getDate(a.date) > getDate(b.date)) return 1;
        return 0;
    });
    return messages;
}

export const getDate = (messageDate) => {
    const md = messageDate;
    return  new Date(md[0], md[1] - 1, md[2], md[3], md[4], md[5]);
}

export const getFormattedDate = (messageDate) => {
    const date = getDate(messageDate);

    let year = new Intl.DateTimeFormat('uk', {year: 'numeric'}).format(date);
    let month = new Intl.DateTimeFormat('uk', {month: 'short'}).format(date);
    let day = new Intl.DateTimeFormat('uk', {day: 'numeric'}).format(date);
    let hour = new Intl.DateTimeFormat('uk', {hour: '2-digit'}).format(date);
    let minute = new Intl.DateTimeFormat('uk', {minute: '2-digit'}).format(date);

    let second = new Intl.DateTimeFormat('uk', {second: '2-digit'}).format(date);
    return `${day} ${month} ${year} ${hour}:${minute}:${second}`;
}

export const getLogo = (url) => {
    if (!url) return "";

    if (url.includes("https")) return url;
    else return BASE_URL + url;
}
