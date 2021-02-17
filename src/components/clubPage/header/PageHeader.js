import {Header} from "antd/es/layout/layout";
import React from "react";
import PropTypes from 'prop-types';
import './css/PageHeader.css';
import {Button, Col, Row, Tag} from "antd";
import Tags from "../../Tags";

const PageHeader = ({club}) => {
    return (
        <Header className="page-header" style={{background: `url(${club.urlBackground}) 50% 50% / cover no-repeat`}}>
            <div className="blur">
                <div className="row">
                    <div className="tags-name-box">
                        <div className="name-box">
                            <div className="icon-box" style={{backgroundColor: club.categories[0].backgroundColor}}>
                                <img className="icon" src={club.categories[0].urlLogo} alt="Category logo"/>
                            </div>
                            <span className="club-name">{club.name}</span>
                        </div>
                        <Tags categories={club.categories}/>
                    </div>
                    <div className="apply-box">
                        <Button className="flooded-button apply-button">Як записатись на гурток</Button>
                    </div>
                </div>
            </div>
        </Header>
    )
};

PageHeader.propTypes = {
    club: PropTypes.object.isRequired
};

export default PageHeader;