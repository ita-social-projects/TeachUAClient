import React, {useState} from "react";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import {Result} from "antd";

const EditClubInputAddress = ({placeholder, onChange, form, inputText}) => {
    const [request, setRequest] = useState("");

    const handleSearch = (text) => {
        setRequest(form.getFieldValue("cityName") + " " + text);
    };

    const noOptionsMessage = () => {
        const city = form.getFieldValue("cityName");

        return !city ?
            <Result
                status="error"
                title="Виберіть місто"
                subTitle="Щоб почати вводити адресу виберіть місто"/> :
            <Result
                status="success"
                title={`Вибране місто ${city}`}
                subTitle="Починайте вводити адресу"
            />
    };

    return (
        <GooglePlacesAutocomplete
            apiKey={process.env.REACT_APP_MAP_KEY}
            selectProps={{
                className: "add-club-input input-address-auto-complete",
                placeholder: placeholder,
                noOptionsMessage: noOptionsMessage,
                loadingMessage: () => "Пошук...",
                inputValue: inputText,
                onInputChange: handleSearch,
                onChange: onChange,
            }}
            autocompletionRequest={{
                input: request,
                componentRestrictions: {
                    country: 'ua',
                }
            }}
        />
    );
};

export default EditClubInputAddress;