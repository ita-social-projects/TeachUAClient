import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {AutoComplete, Input} from "antd";


const AddressAutocomplete = ({setGeoLocation}) => {
    const API_KEY = 't5QQKqG_fWl0ojlXd8xQUgjthd-J4zIoFu6QTnEF2lo';
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const [selectedValue, setSelectedValue] = useState({
        'address' : {
            "street": "",
            "houseNumber" : "",
            "county": "",
            "city": "",
            "district": "",
            "postalCode": "",
            "country": "",
        },
        'countryCode' : "",
        'label' : "",
        'language' : "",
        'locationId' : "",
        'matchLevel' : ""
    });


    const onChange = (value) => {
        setInputValue(value);
    }

    const onSelect = value => {
        const selectedItem = options.find(item => item.value === value).source;
        setSelectedValue(selectedItem);
    }

    const getData = () => {
        axios.get('https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json',
            {'params': {
                    'apiKey' : API_KEY,
                    'query': inputValue,
                    'maxresults': 5,
                }}).then((response) => {
                    const result = response.data?.suggestions?.length > 0 ? response.data.suggestions.map(item => ({
                        label: item.label,
                        value: item.label,
                        source: item
                    })) : []
                    setOptions(result);
            });
    }

    const getGeoLocation = () => {
        inputValue !== "" ?
        axios.get('https://geocoder.ls.hereapi.com/6.2/geocode.json',
            {'params': {
                    'apiKey' : API_KEY,
                    'locationid': selectedValue.locationId,
                }}).then((response) => {
            setGeoLocation(response.data.Response.View[0].Result[0].Location.DisplayPosition);
        }) : setGeoLocation({'Latitude' : "", 'Longitude' : "",});
    }

    useEffect(() => {
        getData();
    }, [inputValue]);

    return (
        <div>
            <AutoComplete
                onSearch={onChange}
                options={options}
                onSelect={onSelect}
                onMouseLeave={getGeoLocation}
                autoComplete={"no"}
                allowClear={true}
            >
                <Input placeholder="Адреса"/>
            </AutoComplete>
        </div>
    )

}

export default AddressAutocomplete;