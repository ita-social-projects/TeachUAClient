import {Button, Checkbox, Form, Input, InputNumber, List, Popconfirm, Select} from "antd";
import React, {useEffect, useState} from "react";
import EditCenterContentFooter from "../EditCenterFooter";
import "../css/MainInformationTab.css"
import {PlusOutlined} from "@ant-design/icons";
import AddLocationModal from "../../addClub/location/AddLocationModal";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import {updateCenterById} from "../../../service/CenterService";
import {deleteLocationById} from "../../../service/LocationService";


const MainInformationTab = ({center,form,cities,result,setResult,contacts_data,setContactsData,locations,setLocations}) =>{
    const [locationVisible, setLocationVisible] = useState(false);
    const [editedLocation, setEditedLocation] = useState(null);
    const [locationForm] = Form.useForm();
    const [contacts,setContacts] = useState([]);




    const onFinish = (values) => {
        if (locations !== []) {
            for (const loc in locations) {
                    result.locations[loc] = {
                        id: locations[loc].id,
                        cityName: locations[loc].cityName !== undefined ? locations[loc].cityName : locations[loc].city.name,
                        address: locations[loc].address,
                        coordinates: locations[loc].coordinates !== null ? locations[loc].coordinates : locations[loc].latitude + ", " + locations[loc].longitude,
                        districtName: locations[loc].districtName !== undefined ? locations[loc].districtName : locations[loc].district.name,
                        key: locations[loc].key,
                        name: locations[loc].name,
                        phone: locations[loc].phone,
                        stationName: locations[loc].stationName !== undefined ? locations[loc].stationName : locations[loc].station.name,
                    }
                }
            }
         else {
            result.locations = locations;
        }

        result.contacts = JSON.stringify(contacts_data).replaceAll(":", "::");
        setResult(Object.assign(result, values));
        console.log(result)
        updateCenterById(result).then(response => console.log(response))

    }
    const onRemove = (item) => {
        deleteLocationById(item.id)
        const newData = [...locations];
        const index = newData.findIndex((it) => item.key === it.key);
        newData.splice(index, 1);
        setResult(Object.assign(result,{locations:newData}));
        setLocations(newData);

    }
    useEffect(() => {
        console.log(center)
        setContacts(center.contacts)
        contacts.map(e => setContactsData(...contacts_data,{[e.contactType.id]:e.contact_data}))
        console.log(contacts_data)
        setLocations(center.locations)
        setResult({...result,name:center.name })

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

            <Form.Item name="locations"
                       className="add-club-row"
                       initialValue={locations}
            >
                <List
                    className="add-club-location-list"
                    itemLayout="horizontal"
                    dataSource={locations}
                    renderItem={item => (
                        <List.Item
                            actions={[
                                <div>
                                    <Popconfirm key="delete"
                                                title="Видалити локацію?"
                                                cancelText="Ні"
                                                okText="Так"
                                                cancelButtonProps={{className: "popConfirm-cancel-button"}}
                                                okButtonProps={{className: "popConfirm-ok-button"}}
                                                onConfirm={() => onRemove(item)}>
                                        <DeleteOutlined/>
                                    </Popconfirm>
                                </div>]}
                        >
                            <List.Item.Meta
                                title={item?.name}
                                description={item?.address}
                            />
                        </List.Item>
                    )}/>
                <span className="add-club-location" onClick={() => setLocationVisible(true)}>
                    Додати локацію
                </span>
            </Form.Item>
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