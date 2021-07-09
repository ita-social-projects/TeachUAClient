import { Form, Input, Checkbox, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import AddLocationModal from "../addClub/location/AddLocationModal";
import "./css/MainInformation.css";
import { PlusOutlined } from "@ant-design/icons";


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
                            message: "Це поле є обов'язковим"
                        },
                        {
                            required: true,
                            pattern: /^(?!\s)([\wА-ЩЬЮЯҐЄІЇа-щьюяґєії !"#$%&'()*+,\-.\/:;<=>?@[\]^_`{}~]){5,100}$/,
                            message: "Це поле може містити тільки українські та англійські літери, цифри та спеціальні символи",
                        },
                      ]}>
                    <Input placeholder="Введіть назву центру" />
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
                    <PlusOutlined />Додати локацію
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