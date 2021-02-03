import React, {useContext, useState, useEffect, useCallback, useLayoutEffect} from 'react';
import {Button, Card, Col, Pagination, Row, Select, Space, Spin} from 'antd';
import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";
import {clearSearchParameters, SearchContext, searchParameters} from "../context/SearchContext";
import {doRequest} from "../requests/Requester";

const {Option, OptGroup} = Select;

const ClubComponent = () => {
    const [loading, setLoading] = useState(true);
    const {clubs, setClubs} = useContext(SearchContext);

    const [possibleResults, setPossibleResult] = useState({
        categories: [],
        clubs: []
    });

    const [searchText, setSearchText] = useState('');


    useEffect(() => {
        doRequest('/clubs/search', searchParameters).then(data => {
            setClubs(data);
            setLoading(false);
        });
        doRequest('/search?text=').then(response => setPossibleResult(response));
    }, []);

    const onSearchChange = useCallback((value) => {
        let parameter = value.split("#")[0],
            name = value.split("#")[1];

        clearSearchParameters();

        if (parameter === "category") {
            searchParameters.categoryName = name;
        } else if (parameter === "club") {
            searchParameters.clubName = name;
        }

        setLoading(true);
        doRequest('/clubs/search', searchParameters).then(data => {
            setClubs(data);
            setLoading(false);
        });
    }, []);

    const onPageChange = useCallback((page) => {
        searchParameters.page = page - 1;
        setLoading(true);
        doRequest('/clubs/search', searchParameters).then(data => {
            setClubs(data);
            setLoading(false);
        });
    }, []);

    const onBlur = useCallback(() => {
        doRequest('/search?text=').then(response => setPossibleResult(response));
    }, []);

    const onKeyDown = useCallback((event) => {
        if (event.key === 'Enter') {
            onSearchChange("club#" + searchText)
        }
    }, [searchText]);

    const onSearch = useCallback((val) => {
        doRequest('/search', {text: val}).then(response => setPossibleResult(response));

        setSearchText(val);
    }, []);


    return (
        <div>
            {loading ? (
                <div className="loader">
                    <div className="bar"/>
                </div>) : <div/>}
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
                                <p className="address"><EnvironmentFilled
                                    className="address-icon"/> {club.address}
                                </p>
                                <Button className="outlined-button details-button">Детальніше</Button>
                            </Card>)
                    })
                }
                <Card className="card empty"/>
                <Card className="card empty"/>
            </Space>
            {
                clubs.size ? (<Pagination className="pagination"
                                          hideOnSinglePage
                                          showSizeChanger={false}
                                          onChange={onPageChange}
                                          current={searchParameters.page + 1}
                                          pageSize={clubs.size}
                                          total={clubs.totalElements}/>) : "No"
            }
        </div>
    );
};

export default ClubComponent;