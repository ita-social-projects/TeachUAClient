import React, {Component, useEffect, useState} from 'react';
import axios from 'axios';
import {AutoComplete, Input} from "antd";
import {log} from "@craco/craco/lib/logger";


const AddressFormHooks = () => {
    const API_KEY = 't5QQKqG_fWl0ojlXd8xQUgjthd-J4zIoFu6QTnEF2lo';
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const [selectedValue, setSelectedValue] = useState({
        'address' : {},
        'countryCode' : "",
        'label' : "",
        'language' : "",
        'locationId' : "",
        'matchLevel' : ""
    });
    const [geoLocation, setGeoLocation] = useState({
        'Latitude' : "",
        'Longitude' : "",
    });


    const onChange = (value) => {
        console.log(value);
        setInputValue(value);
        console.log('onChange', value);
    }

    const onSelect = value => {
        console.log('onSelect', value);
        const selectedItem = options.find(item => item.value === value).source;
        setSelectedValue(selectedItem);
        getGeoLocation();
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
        axios.get('https://geocoder.ls.hereapi.com/6.2/geocode.json',
            {'params': {
                    'apiKey' : API_KEY,
                    'locationid': selectedValue.locationId,
                }}).then((response) => {
            console.log(response.data.Response.View[0].Result[0].Location.DisplayPosition);
            setGeoLocation(response.data.Response.View[0].Result[0].Location.DisplayPosition);
            console.log(geoLocation);
        });
    }

    useEffect(() => {
        getData();
    }, [inputValue]);

    return (
        <div className="add-form">
            <AutoComplete
                style={{ width: 400 }}
                onSearch={onChange}
                options={options}
                onSelect={onSelect}
            >
                <Input placeholder="Search..." />
            </AutoComplete>
            <br/>
            <Input
                style={{ width: 400 }}
                value={geoLocation.Latitude + ", " + geoLocation.Longitude}
            />
        </div>
    )

}

export default AddressFormHooks;