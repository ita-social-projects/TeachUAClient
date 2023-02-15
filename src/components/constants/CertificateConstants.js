import {message} from "antd";
import {CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import React from "react";


export const ICON_WARNING = 1;
export const ICON_ERROR = 2;
export const ICON_OK = 3;

export const renderIcon = (type) => {
    switch (type) {
        case ICON_ERROR:
            return (<CloseCircleOutlined className="site-result-demo-error-icon icon error-icon"/>)
        case ICON_OK:
            return (<CheckCircleOutlined className="icon ok-icon"/>)
        default:
            return (<ExclamationCircleOutlined className="site-result-demo-error-icon icon warn-icon"/>)
    }
}

export const fieldsProperties = [
    {label: "—", value: ""},
    {label: "Серійний номер", value: "serial_number"},
    {label: "ПІБ учасника", value: "user_name"},
    {label: "Дата видачі", value: "date"},
    {label: "Тривалість", value: "duration"},
    {label: "Кількість годин", value: "hours"},
    {label: "Номер курсу", value: "course_number"},
    {label: "Форма навчання", value: "study_form"},
    {label: "QR-код(білий)", value: "qrCode_white"},
    {label: "QR-код(чорний)", value: "qrCode_black"}
];

export const showInfo = (messages) => {
    let errors = false;
    for (const element of messages) {
        if (element[1] === "1") {
            message.warning(element[0]);
        } else if (element[1] === "2") {
            message.error(element[0]);
            errors = true;
        } else if (element[1] === "3") {
            message.success(element[0]);
        }
    }
    return errors;
}