import {Button, Form, Input, message, Select} from "antd";
import React from "react";
import "./css/AddStation.css";
import {addToTable} from "../../../util/TableUtil";
import {addStation} from "../../../service/StationService";

const {Option} = Select;

const AddStation = ({cities, stations, setStations}) => {
    const onFinish = (values) => {
        addStation(values).then((response) => {
            if (response.status) {
                message.warning(response.message);
                return;
            }

            message.success(`Станція ${response.name} успішно додана`);

            setStations(addToTable(stations, response));
        });
    };

    return (
        <Form className="add-station"
              name="basic"
              requiredMark={false}
              onFinish={onFinish}>
            <Form.Item name="name"
                       rules={[{
                           required: true,
                           message: "Введіть назву станції"
                       }]}>
                <Input className="add-station-input"
                       placeholder="Назва станції">
                </Input>
            </Form.Item>
            <Form.Item name="cityName"
                       rules={[{
                           required: true,
                           message: "Виберіть місто"
                       }]}>
                <Select className="add-station-input"
                        placeholder="Місто"
                        allowSearch>
                    {cities.map((city) => <Option value={city.name}>{city.name}</Option>)}
                </Select>
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" className="flooded-button add-station-button">Додати станцію</Button>
            </Form.Item>
        </Form>
    );
};

export default AddStation;