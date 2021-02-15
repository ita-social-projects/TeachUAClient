import React, {useContext, useState} from 'react';
import {Button, Col, Layout, Row} from 'antd';
import {SearchContext, searchParameters} from "../../context/SearchContext";
import ClubList from "./ClubList";
import Search from "./Search";
import '../map/css/MapModal.css'
import MapComponent from "../map/MapComponent";


const ClubComponent = () => {
    const {clubs, setClubs} = useContext(SearchContext);
    const [loading, setLoading] = useState(false);
    const [mapVisible, setMapVisible] = useState(false);

    return (
        <Layout>
            <Row style={{marginBottom: 20, justifyContent: 'center'}}>
                <Col span={12} className="city-name-box">
                    <h2 className="city-name">{"Гуртки у місті " + searchParameters.cityName}</h2>
                </Col>
                <Col className="search right-col full-width" span={12}>
                    <Search load={setLoading} setClubs={setClubs}/>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Button className="flooded-button"
                            onClick={() => setMapVisible(true)}>Показати на карті</Button>
                </Col>
                <Col span={12} className="right-col">Sort</Col>
            </Row>
            <ClubList loading={loading} load={setLoading} clubs={clubs} setClubs={setClubs}/>
            <MapComponent visible={mapVisible} setVisible={setMapVisible}/>
        </Layout>)
};

export default ClubComponent;