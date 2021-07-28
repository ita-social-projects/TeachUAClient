import {Button, Checkbox, Form, Input, InputNumber, Select} from "antd";
import React, {useEffect, useState} from "react";
import EditCenterContentFooter from "../EditCenterFooter";
import "../css/MainInformationTab.css"
import {PlusOutlined} from "@ant-design/icons";
import AddLocationModal from "../../addClub/location/AddLocationModal";


const MainInformationTab = ({center,form,cities,result,setResult}) =>{
    const [locationVisible, setLocationVisible] = useState(false);
    const [editedLocation, setEditedLocation] = useState(null);
    const [locationForm] = Form.useForm();
    const [locations,setLocations] = useState([]);

    const onFinish = (values) => {
        console.log(values)
        setResult(Object.assign(result,values))

    }
    useEffect(() => {
        setLocations(center.locations)
    }, [])

    return (
        <div className="edit-center">
        <Form
            onFinish={onFinish}
            name="edit-center-main"
                form={form}>
            <Form.Item name="name"
                       className="edit-center-row edit-center-name"
                       label="Назва"
                       initialValue={center.name}
            >
                <Input className="edit-center-input"
                       value={center.name}
                       onChange={event => setResult({...result, name: event.target.value})}
                       placeholder="Назва гуртка"

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
        locations={locations}
        setLocations={setLocations}
        visible={locationVisible}
        setVisible={setLocationVisible}
        editedLocation={editedLocation}
        setEditedLocation={setEditedLocation}
        cities={cities}/>
            <div className="edit-center-footer">
                <Button htmlType="submit" className="edit-club-button" >Зберегти зміни</Button>
            </div>
        </Form>


        </div>
    )
}
export default MainInformationTab