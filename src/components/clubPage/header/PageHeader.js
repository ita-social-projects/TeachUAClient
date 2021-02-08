import {Header} from "antd/es/layout/layout";
import React from "react";
import './css/PageHeader.css';
import {Button, Col, Row} from "antd";

const PageHeader = ({club}) => {
    return (
        <Header className="page-header" style={{background: `url(${club.urlBackground}) 50% 50% / cover no-repeat`}}>
            <div className="blur">
                <Row className="row">
                    <Col span={18} className="name-box full-width">
                        <div className="icon-box" style={{backgroundColor: club.categories[0].backgroundColor}}>
                            <img className="icon" src={club.categories[0].urlLogo} alt="Category logo"/>
                        </div>
                        <span className="club-name">{club.name}</span>
                    </Col>
                    <Col className="apply-box right-col full-width" span={6}>
                        <Button className="flooded-button apply-button">Записатись на гурток</Button>
                    </Col>
                </Row>
            </div>
        </Header>
    )
};

export default PageHeader;