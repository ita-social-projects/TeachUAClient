import {Button, Form, Input, message, Modal, Select, Tooltip} from "antd";
import React, {useEffect, useState} from "react";
import '../css/AddClubModal.css';
import "../css/AddClubContent.css";
import AddClubInputAddress from "../AddClubInputAddress";
import {getDistrictsByCityName} from "../../../service/DisctrictService";
import {geocodeByAddress, getLatLng} from "react-google-places-autocomplete";
import {addToTable} from "../../../util/TableUtil";
import {Content} from "antd/es/layout/layout";
import InfoCircleOutlined from "@ant-design/icons/lib/icons/InfoCircleOutlined";
import {getStationsByCity} from "../../../service/StationService";

const {Option} = Select;

const AddLocationModal = ({form, locations, setLocations, cities, visible, setVisible, editedLocation, setEditedLocation}) => {
    const [cityOnInput, setCityOnInput] = useState(null);
    const [inputAddressProps, setInputAddressProps] = useState({});
    const [districts, setDistricts] = useState([]);
    const [cityName, setCityName] = useState(null);
    const [isActive, setActive] = useState(true)
    const [station,setStation] = useState([])
    const [locationForm, setLocationForm] = useState({
        locationName: "",
        cityName: "",
        latitude: "",
        longitude: "",
        phoneNumber: ""
    })

    useEffect(() => {
        getStationsByCity(cityName).then(response => setStation(response))
        getDistrictsByCityName(cityName).then(response => setDistricts(response));
    }, [cityName]);

    const onChange = e => {
        if (e.target.id === "name")
            locationForm.locationName = e.target.value
        if (e.target.id === "phone")
            locationForm.phoneNumber = e.target.value
        if (locationForm.locationName.length > 3 && locationForm.phoneNumber.length === 9 && locationForm.cityName != null) {
            setActive(false)
        } else setActive(true)
    }
    const onClose = () => {
        if (editedLocation) {
            setEditedLocation(null);
        }
        setVisible(false);
        form.resetFields();
    };

    const onFinish = (values) => {
        if (inputAddressProps.validateStatus === 'error') {
            message.error("Некоректно вибрана адреса");
            return;
        }
        console.log(values)
        values.key = Math.random();
        const coordinates = [{latitude: locationForm.latitude,longitude: locationForm.longitude, }]
        const newValues = coordinates.reduce(
                               (result, item) =>
                                                     Object.assign({}, result, item), values)
        delete newValues['longitudeAndLatitude']
        if (editedLocation) {
            const index = locations.findIndex((item) => editedLocation.key === item.key);
            locations[index] = newValues;
            setLocations(locations);
        } else {
            setLocations(addToTable(locations, newValues));
        }

        onClose();
    };

    const handleSelect = (address) => {
        geocodeByAddress(address.label)
            .then(results => getLatLng(results[0]))
            .then(({lat, lng}) => {
                locationForm.latitude = lat
                locationForm.longitude = lng
                form.setFieldsValue({
                    longitudeAndLatitude: lat + "," + lng,

                });
            });

        // setInputAddressProps({validateStatus: 'success'});
        // setCityOnInput(cityName);
    };

    const changeCity = () => {
        const fields = form.getFieldValue();
        form.resetFields();
        form.setFieldsValue({
            name: fields.name,
            cityName: fields.cityName,
            phone: fields.phone
        });
    }

    return (
        <Modal
            className="modal-add-club"
            centered
            visible={visible}
            width={650}
            onOk={onClose}
            onCancel={onClose}
            footer={null}
        >
            <Content className="add-club-container">
                <div className="add-club-header">
                    Додати локацію
                </div>
                <div className="add-club-content add-club-locations">
                    <Form
                        requiredMark={false}
                        className="add-club-content"
                        form={form}
                        onFinish={onFinish}
                        onChange={onChange}
                    >
                        <Form.Item name="name"
                                   className="add-club-row"
                                   label="Назва"
                                   hasFeedback
                                   rules={[{
                                       required: true,
                                       pattern: /^(?!\s)([\wА-ЩЬЮЯҐЄІЇа-щьюяґєії !"#$%&'()*+,\-.\/:;<=>?@[\]^_`{}~]){5,100}$/
                                   },
                                       {
                                           required: true,
                                           pattern: /^.*\S$/
                                       }]}
                        >
                            <Input className="add-club-input"
                                   placeholder="Назва локації"
                            />
                        </Form.Item>
                        <div className="add-club-inline">
                            <Form.Item name="cityName"
                                       className="add-club-row"
                                       label="Місто"
                                       initialValue={editedLocation && editedLocation.cityName}
                                       hasFeedback
                                       rules={[{
                                           required: true,
                                       }]}>
                                <Select
                                    onClick={onChange}
                                    className="add-club-select"
                                    placeholder="Виберіть місто"
                                    onChange={(value) => {
                                        if (cityName) {
                                            cityOnInput === value ?
                                                setInputAddressProps({validateStatus: 'success'}) :
                                                setInputAddressProps({validateStatus: 'error'});
                                        }
                                        changeCity();
                                        setCityName(value);
                                    }}
                                    optionFilterProp="children">
                                    {cities.map(city => <Option
                                        value={city.name}>{city.name}</Option>)}
                                </Select>
                            </Form.Item>
                            <Form.Item name="districtName"
                                       className="add-club-row"
                                       label="Район міста"
                                       hasFeedback>
                                <Select
                                    className="add-club-select"
                                    placeholder="Виберіть район"
                                    optionFilterProp="children">
                                    {districts.map(district => <Option value={district.name}>{district.name}</Option>)}
                                </Select>
                            </Form.Item>
                            <Form.Item name="stationName"
                                       className="add-club-row"
                                       label="Метро/Місцевість"
                                       hasFeedback>
                                <Select
                                    className="add-club-select"
                                    placeholder="Виберіть місцевість"
                                    optionFilterProp="children">
                                    {station.map(station => <Option value={station.name}>{station.name}</Option>)}
                                </Select>
                            </Form.Item>
                        </div>
                        <Form.Item name="address"
                                   className="add-club-row"
                                   label="Адреса"
                                   hasFeedback
                                   validateTrigger={handleSelect}
                                   rules={[{
                                       required: true,
                                   }]}
                                   {...inputAddressProps}>
                            <Input className="add-club-input"
                                   placeholder="Адреса"
                            />
                            {/*<AddClubInputAddress*/}
                            {/*    editedLocation={editedLocation}*/}
                            {/*    form={form}*/}
                            {/*    setCityName={setCityName}*/}
                            {/*    onChange={handleSelect}/>*/}
                        </Form.Item>
                        <div className="add-club-inline">
                            <Form.Item name="longitudeAndLatitude"
                                       className="add-club-row"
                                       label="Географічні координати"
                                       hasFeedback
                                       rules={[{
                                           required: true,
                                       }]}>
                                <Input className="add-club-input add-club-select"
                                       suffix={
                                           <Tooltip title="Буде автоматично заповнено при введені адреси">
                                               <InfoCircleOutlined className="info-icon"/>
                                           </Tooltip>
                                       }
                                       placeholder="Довгота та широта"/>
                            </Form.Item>
                        </div>
                        <Form.Item name="phone"
                                   className="add-club-row"
                                   label="Номер телефону"
                                   hasFeedback
                                   rules={[{
                                       required: true,
                                       pattern: /^\d{9}$/
                                   }]}>
                            <Input className="add-club-input"
                                   prefix='+380'
                                   placeholder="___________"/>
                        </Form.Item>

                        <div className="add-club-content-footer add-club-add-location-button">
                            <Button disabled={isActive} htmlType="submit"
                                    className="flooded-button add-club-content-next">Додати</Button>
                        </div>
                    </Form>
                </div>
            </Content>
        </Modal>
    );
};

export default AddLocationModal;
