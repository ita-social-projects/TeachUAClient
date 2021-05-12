import React, { useEffect, useState } from "react";
import { Checkbox, Form, InputNumber, Layout, Radio, Select } from "antd";
import "./css/ClubListSider.css"
import { getAllCategories } from "../../service/CategoryService";
import { getAllCities } from "../../service/CityService";
import { getDistrictsByCityName } from "../../service/DisctrictService";
import { mapSearchParameters, searchParameters } from "../../context/SearchContext";

const { Sider } = Layout;
const { Option } = Select;

const ClubListSider = ({ setCurrentPage, form, getAdvancedData, isCenterChecked, setIsCenterChecked }) => {
    const [cityName, setCityName] = useState(null);
    const [categories, setCategories] = useState([]);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);

    const getData = () => {
        setCurrentPage(0);
        getAdvancedData(0);
    };

    useEffect(() => {
        getAllCategories().then(response => setCategories(response));
        getAllCities().then(response => setCities(response));
        getData();
    }, []);

    useEffect(() => {
        getDistrictsByCityName(cityName).then(response => setDistricts(response));
    }, [cityName]);

    const onValuesChange = (values) => {
        console.log("=======  ClubListSider ===>  onValueChange  ========");
        setIsCenterChecked(values.isCenter);
        getData();
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

                <Form.Item name="cityName"
                    className="club-list-row"
                    label="Місто"
                    initialValue={searchParameters.cityName === "Без локації" ? "online" : searchParameters.cityName}
                >
                    <Select
                        className="club-list-select"
                        placeholder="Виберіть місто"
                        optionFilterProp="children"
                        onChange={(value) => {
                            setCityName(value)
                            form.setFieldsValue({ districtName: undefined })
                        }}>
                        {cities.map(city => <Option value={city.name} key={city.id}>{city.name}</Option>)}ss
                        <Option value="online">Без локації</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="districtName"
                    className="club-list-row"
                    label="Район міста">
                    <Select
                        allowClear
                        className="club-list-select"
                        placeholder="Виберіть район"
                        optionFilterProp="children">
                        {districts.map(district => <Option value={district.name} key={district.id}>{district.name}</Option>)}
                    </Select>
                </Form.Item>
                <Form.Item  name="isOnline"
                            className="club-list-row"
                            label="Ремоут"
                >
                    <Checkbox.Group className="club-list-categories"
                                    disabled={isCenterChecked}
                    >
                        <Checkbox style={{ display: "flex" }} disabled={form.getFieldValue("cityName") === 'online'}>Доступний онлайн</Checkbox>
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item name="categoriesName"
                    className="club-list-row"
                    label="Категорії"
                    disabled={isCenterChecked}
                >
                    <Checkbox.Group className="club-list-categories"
                                    disabled={isCenterChecked}
                    >
                        {categories.sort((a, b) => a.sortby - b.sortby)
                            .map(category => <Checkbox style={{display: "flex"}}
                                                       value={category.name}
                                                       key={category.id}
                            >
                                {category.name}
                            </Checkbox>)}
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item label="Вік дитини"
                    className="club-list-row"
                    inititalValue={0}>
                    <span className="club-list-age">
                        Від
                    <Form.Item name="ageFrom"
                            style={{ margin: 0 }}
                            initialValue={2}>
                            <InputNumber className="input-age"
                                min={2}
                                max={18} />
                        </Form.Item>
                    до
                    <Form.Item name="ageTo"
                            style={{ margin: 0 }}
                            initialValue={18}>
                            <InputNumber className="input-age"
                                min={3}
                                max={18} />
                        </Form.Item>
                    років
                </span>
                </Form.Item>
            </Form>
        </Sider>
    )
};

export default ClubListSider;