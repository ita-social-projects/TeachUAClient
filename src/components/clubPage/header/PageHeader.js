import {Header} from "antd/es/layout/layout";
import React, {useContext} from "react";
import PropTypes from 'prop-types';
import './css/PageHeader.css';
import {Button, Col, Row, Tag} from "antd";
import Tags from "../../Tags";
import CategoryLogo from "../../CategoryLogo";
import {UriContext} from "../../../context/UriContext";

const PageHeader = ({club}) => {
    const uri = useContext(UriContext);

    return (
        <Header className="page-header" style={{background: `url(${uri + club.urlBackground}) 50% 50% / cover no-repeat`}}>
            <div className="blur">
                <div className="row">
                    <div className="tags-name-box">
                        <div className="name-box">
                            <CategoryLogo category={club.categories[0]}/>
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