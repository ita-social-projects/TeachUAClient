import React, { useEffect, useState } from "react";
import { Checkbox, Form, InputNumber, Layout, Radio, Select } from "antd";
import "./css/ClubListSider.css";
import { getAllCategories } from "../../service/CategoryService";
import { getAllCities } from "../../service/CityService";
import { getDistrictsByCityName } from "../../service/DisctrictService";
import { getStationsByCity } from "../../service/StationService";
import { searchParameters, mapSearchParameters } from "../../context/SearchContext";

const { Sider } = Layout;
const { Option } = Select;

const ClubListSider = ({ setCurrentPage, form, getAdvancedData, isCenterChecked, setIsCenterChecked }) => {
    const [cityName, setCityName] = useState(null);
    const [categories, setCategories] = useState([]);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [stations, setStations] = useState([]);

    const getData = () => {
        setCurrentPage(0);
        getAdvancedData(0);
    };

    useEffect(() => {
        getAllCategories().then((response) => setCategories(response));
        getAllCities().then((response) => setCities(response));
        getData();
    }, []);

    useEffect(() => {
        const city = !cityName ? searchParameters.cityName : cityName;
        getDistrictsByCityName(city).then((response) => {
            setDistricts(response);
        });
        getStationsByCity(city).then((response) => {
            setStations(response);
        });
    }, [cityName]);

    const onValuesChange = (values) => {
        setIsCenterChecked(values.isCenter);
        if (values.hasOwnProperty("cityName")) {
            form.setFieldsValue({ districtName: undefined });
            form.setFieldsValue({ stationName: undefined });
        }
        getData();
    };

    const onCityChange = (value) => {
        setCityName(value);
        searchParameters.cityName = value;
        mapSearchParameters.cityName = value;
        form.setFieldsValue({ districtName: undefined });
        form.setFieldsValue({ stationName: undefined });
    };

    return (
        <Sider className="club-list-sider">
            <div className="club-list-label">Розширений пошук</div>
            <Form
                name="basic"
                requiredMark={false}
                form={form}
                onValuesChange={onValuesChange}>

                <Form.Item name="isCenter"
                           className="club-list-row"
                           label="Гурток/Центр"
                           initialValue={false}>
                    <Radio.Group className="club-list-kind">
                        <Radio value={false}>Гурток</Radio>
                        <Radio value={true}>Центр</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    name="cityName"
                    className="club-list-row"
                    label="Місто"
                    initialValue={
                        searchParameters.cityName === "Без локації"
                            ? "online"
                            : searchParameters.cityName
                    }>
                    <Select
                        className="club-list-select"
                        placeholder="Виберіть місто"
                        optionFilterProp="children"
                        onChange={onCityChange}>

                        {cities.map((city) => (
                            <Option value={city.name}>{city.name}</Option>
                        ))}
                        <Option value="online">Без локації</Option>

                    </Select>
                </Form.Item>
                <Form.Item
                    name="districtName"
                    className="club-list-row"
                    label="Район міста">
                    <Select
                        allowClear
                        className="club-list-select"
                        placeholder="Виберіть район"
                        optionFilterProp="children">
                        {districts.map((district) => (
                            <Option value={district.name}>
                                {district.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="stationName"
                    className="club-list-row"
                    label="Найближча станція метро">
                    <Select
                        allowClear
                        className="club-list-select"
                        placeholder="Виберіть станцію"
                        optionFilterProp="children">
                        {stations.map((station) => (
                            <Option value={station.name}>{station.name}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="isOnline"
                    className="club-list-row"
                    label="Ремоут">
                    <Checkbox.Group className="club-list-categories">
                        <Checkbox
                            style={{ display: "flex" }}
                            disabled={
                                form.getFieldValue("cityName") === "online"
                            }>
                            Доступний онлайн
                        </Checkbox>
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item
                    name="categoriesName"
                    className="club-list-row"
                    label="Категорії">
                    <Checkbox.Group className="club-list-categories">
                        {categories
                            .sort((a, b) => a.sortby - b.sortby)
                            .map((category) => (
                                <Checkbox
                                    style={{ display: "flex" }}
                                    value={category.name}>
                                    {category.name}
                                </Checkbox>
                            ))}
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item
                    name="age"
                    label="Вік дитини"
                    className="club-list-row"
                    inititalValue={0}>
                    <span>
                        <InputNumber className="age" min={2} max={18} />
                        років
                    </span>
                </Form.Item>
            </Form>
        </Sider>
    );
};

export default ClubListSider;
