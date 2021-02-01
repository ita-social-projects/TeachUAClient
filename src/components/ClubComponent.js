import React, {useContext, useState} from 'react';
import {Button, Card, Col, Pagination, Row, Select, Space, Spin} from 'antd';
import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";
import {clearSearchParameters, SearchContext, searchParameters} from "../context/SearchContext";
import {doRequest} from "../requests/Requester";

const {Option, OptGroup} = Select;

const ClubComponent = () => {
    let loading = false;

    const {clubs, setClubs} = useContext(SearchContext);

    const [possibleResults, setPossibleResult] = useState({
        categories: [],
        clubs: []
    });

    const [searchText, setSearchText] = useState({});

    useState(() => {
        doRequest('/clubs/search', searchParameters).then(data => setClubs(data));
        doRequest('/search?text=').then(response => setPossibleResult(response));
        loading = true;
    });

    const onSearchChange = (value) => {
        let parameter = value.split("#")[0],
            name = value.split("#")[1];

        clearSearchParameters();

        if (parameter === "category") {
            searchParameters.categoryName = name;
        } else if (parameter === "club") {
            searchParameters.clubName = name;
        }

        doRequest('/clubs/search', searchParameters).then(data => setClubs(data));
    };

    const onPageChange = (page) => {
        searchParameters.page = page - 1;
        doRequest('/clubs/search', searchParameters).then(data => {
            setClubs(data);
        });
    };

    const onBlur = () => {
        doRequest('/search?text=').then(response => setPossibleResult(response));
    };

    const onKeyDown = (event) => {
        if (event.key === 'Enter') {
            onSearchChange("club#" + searchText);
        }
    };

    const onSearch = (val) => {
        doRequest('/search', {text: val}).then(response => setPossibleResult(response));

        setSearchText(val);
    };

    if (loading) {
        return (
            <Spin size="large"/>
        )
    }
    return (
        <div>
            <Row>
                <Col span={12} className="city-name-small full-width">
                    <h2 className="city-name">{searchParameters.cityName.length === 0 ?
                        "Гуртки у всіх містах" :
                        "Гуртки у місті " + searchParameters.cityName}
                    </h2>
                </Col>
                <Col className="search right-col full-width" span={12}>
                    <Select
                        showSearch
                        /*allowClear*/
                        onChange={onSearchChange}
                        onSearch={onSearch}
                        onBlur={onBlur}
                        onInputKeyDown={onKeyDown}
                        style={{width: 200}}
                        placeholder="Який гурток шукаєте?"
                        optionFilterProp="children"
                        defaultActiveFirstOption={false}>
                        <OptGroup label="Категорії">
                            {
                                possibleResults.categories.map(club => {
                                    return (
                                        <Option value={"category#" + club.name}
                                                key={"category#" + club.id}>
                                            {club.name}
                                        </Option>
                                    )
                                })
                            }
                        </OptGroup>
                        <OptGroup label="Гуртки">
                            {
                                possibleResults.clubs.map(cat => {
                                    return (
                                        <Option value={"club#" + cat.name}
                                                key={"club#" + cat.id}>
                                            {cat.name}
                                        </Option>
                                    )
                                })
                            }
                        </OptGroup>
                    </Select>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Button className="show-map-button">Показати на карті</Button>
                </Col>
                <Col span={12} className="right-col">Sort</Col>
            </Row>
            <Space wrap className="cards" size={[0, 16]} style={{paddingTop: 20}}>
                {
                    clubs.content.map((club, index) => {
                        return (
                            <Card key={index} className="card" title={
                                <div className="title">
                                    <div className="icon-box" style={club.categories.length === 0 ?
                                        {backgroundColor: 'blueviolet'} : {backgroundColor: club.categories[0].backgroundColor}
                                    }>
                                        <img className="icon"
                                             src={club.categories.length === 0 ?
                                                 'assets/images/categories/not-found.svg' :
                                                 club.categories[0].urlLogo}/>
                                    </div>
                                    <div className="name">
                                        {club.name}
                                    </div>
                                </div>
                            }>
                                <p className="description">{club.description}</p>
                                {/*                                <p>Місто: {club.city.name}</p>
                                <p style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}>Категорія: {club.categories.length === 0 ? "Category not found" : club.categories[0].name}</p>*/}
                                <p className="address"><EnvironmentFilled className="address-icon"/> {club.address}</p>
                                <Button className="outlined-button details-button">Детальніше</Button>
                            </Card>)
                    })
                }
                <Card className="card empty"/>
                <Card className="card empty"/>
            </Space>

            <Pagination className="pagination"
                        hideOnSinglePage
                        showSizeChanger={false}
                        onChange={onPageChange}
                        pageSize={clubs.size}
                        total={clubs.totalElements}/>
        </div>
    );
};

export default ClubComponent;