import {Form, Input, Checkbox, Button, Tooltip} from 'antd';
import React, { useEffect, useState } from 'react';
import AddLocationModal from "../addClub/location/AddLocationModal";
import "./css/MainInformation.css";
import { PlusOutlined } from "@ant-design/icons";
import InfoCircleOutlined from "@ant-design/icons/lib/icons/InfoCircleOutlined";


const MainInformation = ({ step, setStep, clubs, cities, locations, setLocations, result, setResult }) => {
    const [locationVisible, setLocationVisible] = useState(false);
    const [editedLocation, setEditedLocation] = useState(null);
    const [locationForm] = Form.useForm();
    const [mainInformationFrom] = Form.useForm();

    const nextStep = () => {
        setStep(step + 1);
    }

    useEffect(() => {
        if (result) {
            mainInformationFrom.setFieldsValue({ ...result })
        }
    }, [])

    const onFinish = (values) => {
        console.log('Success: ', values);
        setResult(Object.assign(result, values));
        mainInformationFrom.resetFields();
        nextStep();
    };

    return (
        <Form
            name="basic"
            className="mainInfo"
            layout="horizontal"
            form={mainInformationFrom}
            onFinish={onFinish}>
            <div className="form-fields">
                <Form.Item
                    name="name"
                    className="form-item"
                    label="Назва центру"
                    rules={[
                        {
                            required: true,
                            pattern: /^(?!\s)([\wА-ЩЬЮЯҐЄІЇа-щьюяґєії !"#$%&'()*+,\-.\/:;<=>?@[\]^_`{}~]){5,100}$/,
                            message: "Некоректна назва центру",
                        },
                      ]}>
                    <Input
                        suffix={
                            <Tooltip placement="bottomRight"
                                     title="Це поле може містити тільки українські та англійські літери, довжиною 5-100 символів">
                                <InfoCircleOutlined className="info-icon" />
                            </Tooltip>
                        }
                        placeholder="Введіть назву центру" />
                </Form.Item>
                <Form.Item
                    name="locations"
                    className="form-item locations"
                    label="Локації"
                    rules={[{
                        required: true,
                        message: "Додайте і виберіть локацію"
                    }]}>
                    <Checkbox.Group >
                        {locations.map(location =>
                            <div className="checkbox-item">
                                <Checkbox value={location}>
                                    {location.name}
                                </Checkbox>
                            </div>
                        )
                        }
                    </Checkbox.Group>
                </Form.Item>
                <span className="add-club-location" onClick={() => setLocationVisible(true)}>
                    <Button className="add-location-btn" htmlType="submit"><PlusOutlined/>Додати локацію</Button>
                </span>
            </div>
            <div className="btn">
                <Button className="next-btn" htmlType="submit">Наступний крок</Button>
            </div>
            <AddLocationModal
                form={locationForm}
                locations={locations}
                setLocations={setLocations}
                visible={locationVisible}
                setVisible={setLocationVisible}
                editedLocation={editedLocation}
                setEditedLocation={setEditedLocation}
                cities={cities} />

        </Form >
    )
}

export default MainInformation;