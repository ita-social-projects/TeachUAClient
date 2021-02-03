import React, {useContext, useState} from 'react';
import {Button, Col, Row} from 'antd';
import {SearchContext, searchParameters} from "../../context/SearchContext";
import ClubList from "./ClubList";
import Search from "./Search";

const ClubComponent = () => {
    const {clubs, setClubs} = useContext(SearchContext);
    const [loading, setLoading] = useState(false);

    return (
        <div>
            {
                loading ? (
                    <div className="loader">
                        <div className="bar"/>
                    </div>
                ) : <div/>
            }
            <Row>
                <Col span={12} className="city-name-small full-width">
                    <h2 className="city-name">{searchParameters.cityName.length === 0 ?
                        "Гуртки у всіх містах" :
                        "Гуртки у місті " + searchParameters.cityName}
                    </h2>
                </Col>
                <Col className="search right-col full-width" span={12}>
                    <Search load={setLoading} setClubs={setClubs}/>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Button className="show-map-button">Показати на карті</Button>
                </Col>
                <Col span={12} className="right-col">Sort</Col>
            </Row>

            <ClubList load={setLoading} clubs={clubs} setClubs={setClubs}/>
        </div>
    );
};

export default ClubComponent;