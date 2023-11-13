import React, {StrictMode, useEffect, useLayoutEffect, useState} from "react";
import {Button, Checkbox, ConfigProvider, Form, InputNumber, Layout, Radio, Select, Typography} from "antd";
import "./css/ClubListSider.css";
import {getAllCategories, getPageableCategory} from "../../service/CategoryService";
import {getAllCities} from "../../service/CityService";
import {getDistrictsByCityName} from "../../service/DisctrictService";
import {getStationsByCity} from "../../service/StationService";
import {searchParameters, mapSearchParameters} from "../../context/SearchContext";
import {getClubReport} from "../../service/ClubService";
import {FilePdfOutlined} from "@ant-design/icons";
import { useCategoryContext } from "../../context/CategoryContext";

const {Sider} = Layout;
const {Option} = Select;
const {Text} = Typography;

const ClubListSider = ({
                           setCurrentPage,
                           setParams,
                           getAdvancedData,
                           isCenterChecked,
                           setShowHideMenu,
                           setIsCenterChecked,
                           activeCategory,
                           toggleCenter,
                           changeCityName
                       }) => {
    const [form] = Form.useForm();
    const [cityName, setCityName] = useState(null);
    const [categories, setCategories] = useState([]);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [stations, setStations] = useState([]);
    const [age, setAge] = useState([]);
    const [stateForClub, setStateForClub] = useState(false);
    const { selectedCategories, toggleCategory } = useCategoryContext();


    const getData = () => {
        setCurrentPage(0);
        getAdvancedData(0);
    };
    setIsCenterChecked(stateForClub);

    useEffect(() => {
        if(selectedCategories.length !== 0) {
        form.setFieldsValue({categoriesName: selectedCategories});
        onValuesChange(form.getFieldsValue);
        }
    }, [selectedCategories]);

    useEffect(() => {
        if (activeCategory) {
            form.setFieldsValue({categoriesName: [activeCategory]});
        }
        getAllCategories().then((response) => setCategories(response));
        getAllCities().then((response) => setCities(response));
        getData();
    }, [cityName]);

    useEffect(() => {
        const city = !cityName ? searchParameters.cityName : cityName;

        getDistrictsByCityName(city).then((response) => {
            setDistricts(response);
        });
        getStationsByCity(city).then((response) => {
            setStations(response);
        });
    }, [cityName]);

    useEffect(() => {
        form.setFieldsValue({cityName: searchParameters.cityName});
    }, [searchParameters.cityName]);

    const onValuesChange = (values) => {
        setIsCenterChecked(values.isCenter);

        if (values.hasOwnProperty("cityName")) {
            form.setFieldsValue({districtName: undefined});
            form.setFieldsValue({stationName: undefined});
        }

        if (values.hasOwnProperty("isCenter")) {
            if (values.isCenter !== true) {
                setStateForClub(false);
                searchParameters.isCenter = false;
            } else {
                form.setFieldsValue({categoriesName: undefined});
                setStateForClub(true);
                searchParameters.isCenter = true;
            }
        }

        if (values.hasOwnProperty("age")) {
            if (!values.age) {
                setAge(undefined);
                form.setFieldsValue({age: undefined});
            } else if (values.age > 18) {
                setAge(18);
                form.setFieldsValue({age: 18});
            } else {
                setAge(values.age);
                form.setFieldsValue({age: values.age});
            }
        }

        setParams(form.getFieldsValue());
    };

    const onCityChange = (value) => {
        setCityName(value);
        searchParameters.cityName = value;
        form.setFieldsValue({districtName: undefined});
        form.setFieldsValue({stationName: undefined});
    };

    const clearAllValues = () => {
        onCityChange(undefined);
        form.setFieldsValue({categoriesName: activeCategory});
        form.setFieldsValue({isOnline: undefined});
        setAge(undefined);
        form.setFieldsValue({age: undefined});
    }

    const onKeyPress = (event) => {
        const specialCharRegex = /^\d+$/;
        const pressedKey = String.fromCharCode(
            !event.charCode ? event.which : event.charCode
        );
        if (!specialCharRegex.test(pressedKey)) {
            event.preventDefault();
            return false;
        }
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Select: {
                        colorPrimaryHover: '#d1d0d0',
                    },
                    Checkbox:{
                        colorPrimaryHover: "#0958d9"
                    }
                }
            }}>
            <Sider className="club-list-sider">
                <div className="club-list-label">Розширений пошук</div>
                <Form
                    name="basic"
                    requiredMark={false}
                    form={form}
                    onValuesChange={onValuesChange}>
                    <Text style={{fontSize: '19px', color: 'GrayText'}}>Гурток/Центр</Text>
                    <Form.Item
                        name="isCenter"
                        className="club-list-row"
                        // label="Гурток/Центр"
                        initialValue={false}>
                        <Radio.Group className="club-list-kind" onChange={toggleCenter}>
                            <Radio value={false}>Гурток</Radio>
                            <Radio value={true}>Центр</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Text style={{fontSize: '19px', color: 'GrayText'}}>Місто</Text>
                    <Form.Item
                        name="cityName"
                        className="club-list-row"
                        // label="Місто"
                        initialValue={
                            searchParameters.cityName === "Без локації"
                                ? "online"
                                : searchParameters.cityName
                        }>
                        <Select
                            allowClear
                            className="club-list-select"
                            placeholder="Виберіть місто"
                            optionFilterProp="children"
                            onChange={(value) => {
                                onCityChange(value);
                                changeCityName(value);
                            }}>
                            {cities.map((city) => (
                                <Option value={city.name}>{city.name}</Option>
                            ))}
                            <Option value="online">Без локації</Option>
                        </Select>
                    </Form.Item>

                    <Text style={{fontSize: '19px', color: 'GrayText'}}>Район міста</Text>
                    <Form.Item
                        name="districtName"
                        className="club-list-row"
                        // label="Район міста"
                    >
                        <Select
                            allowClear
                            className="club-list-select"
                            placeholder="Виберіть район"
                            optionFilterProp="children"
                            disabled={
                                form.getFieldValue("cityName") === "online" || form.getFieldValue("cityName") === undefined
                            }>
                            {districts.map((district) => (
                                <Option value={district.name}>
                                    {district.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Text style={{fontSize: '19px', color: 'GrayText'}}>Найближча станція метро</Text>
                    <Form.Item
                        name="stationName"
                        className="club-list-row"
                        // label="Найближча станція метро"
                    >
                        <Select
                            allowClear
                            className="club-list-select"
                            placeholder="Виберіть станцію"
                            optionFilterProp="children"
                            disabled={
                                form.getFieldValue("cityName") === "online" || form.getFieldValue("cityName") === undefined
                            }>
                            {stations.map((station) => (
                                <Option value={station.name}>{station.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    {stateForClub === false ? (
                        <>
                            <Text style={{fontSize: '19px', color: 'GrayText'}}>Ремоут</Text>
                            <Form.Item
                                name="isOnline"
                                className="club-list-row"
                                // label="Ремоут"
                            >
                                <Checkbox.Group className="club-list-categories">
                                    <Checkbox
                                        style={{display: "flex"}}
                                        disabled={
                                            form.getFieldValue("cityName") === "online"
                                        }>
                                        Доступний онлайн
                                    </Checkbox>
                                </Checkbox.Group>
                            </Form.Item>
                        </>
                    ) : <Form.Item/>}
                    {stateForClub === false ? (
                        <>
                            <Text style={{fontSize: '19px', color: 'GrayText'}}>Категорії</Text>
                            <Form.Item
                                name="categoriesName"
                                className="club-list-row"
                                // label="Категорії"
                            >
                                <Checkbox.Group className="club-list-categories">
                                    {categories
                                        .sort((a, b) => a.sortby - b.sortby)
                                        .map((category) => (
                                            <Checkbox
                                                style={{display: "flex"}}
                                                value={category.name}
                                                onClick={() => toggleCategory(category.name)}>
                                                {category.name}
                                            </Checkbox>
                                        ))}
                                </Checkbox.Group>
                            </Form.Item>
                        </>
                    ) : <Form.Item/>}
                    {stateForClub === false ? (
                        <>
                            <Text style={{fontSize: '19px', color: 'GrayText'}}>Вік дитини</Text>
                            <Form.Item
                                name="age"
                                // label="Вік дитини"
                                className="club-list-row"
                                inititalValue={0}
                            >
                 <span>
                     <InputNumber
                         className="age"
                         value={age}
                         onKeyPress={onKeyPress}
                         max={18}
                         min={2}
                         maxLength={2}
                     />
                     років
                 </span>
                            </Form.Item>
                        </>
                    ) : <Form.Item/>}
                    <div className="use-clear-button">
                        <div className="mobile-clear-button">
                            <Button className="mobile-button clear-button" onClick={() => {
                                clearAllValues()
                            }}>
                                Очистити
                            </Button>
                        </div>
                        <div className="mobile-use-button">
                            <Button className="mobile-button use-button" onClick={() => {
                                setShowHideMenu(false)
                            }}>
                                Застосувати
                            </Button>
                        </div>
                    </div>
                </Form>
            </Sider>
        </ConfigProvider>

    );
};

export default ClubListSider;
