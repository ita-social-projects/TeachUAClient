import {Button, Checkbox, Form, Input, InputNumber, Select} from "antd";
import React, {useEffect, useState} from "react";
import EditCenterContentFooter from "../EditCenterFooter";
import "../css/MainInformationTab.css"
import {PlusOutlined} from "@ant-design/icons";
import AddLocationModal from "../../addClub/location/AddLocationModal";


const MainInformationTab = ({center,form,cities}) =>{
    const [locationVisible, setLocationVisible] = useState(false);
    const [editedLocation, setEditedLocation] = useState(null);
    const [locationForm] = Form.useForm();
    const [locations,setLocations] = useState([]);
    useEffect(() => {
        console.log(center)
        setLocations(center.locations)
        console.log(locations)
    }, [])

    return (
        <div className="edit-center">
        <Form name="edit-center-main"
                form={form}>
            <Form.Item name="name"
                       className="edit-center-row edit-center-name"
                       label="Назва"
            >
                <Input className="edit-center-input"
                       value={center.name}
                       placeholder="Назва гуртка"
                       defaultValue={center.name}
                />
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
    <AddLocationModal
        form={locationForm}
        visible={locationVisible}
        setVisible={setLocationVisible}
        editedLocation={editedLocation}
        setEditedLocation={setEditedLocation}
        cities={cities}/>

        </Form>

            <div className="edit-center-footer">
            <EditCenterContentFooter  result={center}/>
                </div>
        </div>
    )
}
export default MainInformationTab