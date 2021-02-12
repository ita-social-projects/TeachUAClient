import React, {useContext, useState, useEffect} from 'react';
import {Button, Col, Layout, Row,Modal} from 'antd';
import {SearchContext, searchParameters} from "../../context/SearchContext";
import ClubList from "./ClubList";
import Search from "./Search";
import MapComponent from "../Map/MapComponent";
import '../Map/css/MapModal.css'

const ClubComponent = () => {
    const {clubs, setClubs} = useContext(SearchContext);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    return (
        <Layout>
            <Row style={{marginBottom: 20, justifyContent:'center'}}>
                <Col span={12} className="city-name-box">
                    <h2 className="city-name">{"Гуртки у місті " + searchParameters.cityName}</h2>
                </Col>
                <Col className="search right-col full-width" span={12}>
                    <Search load={setLoading} setClubs={setClubs}/>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Button className="flooded-button" onClick={() => setVisible(true)}>Показати на карті</Button>
                </Col>
                <Col span={12} className="right-col">Sort</Col>
            </Row>
            <ClubList loading={loading} load={setLoading} clubs={clubs} setClubs={setClubs}/>
            <Modal
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width={1200}
                footer={null}
                className='mapModal'
            >
                   <MapComponent />

            </Modal>
        </Layout>)
};

export default ClubComponent;