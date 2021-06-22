import {Header} from "antd/es/layout/layout";
import React, {useContext} from "react";
import PropTypes from 'prop-types';
import './css/PageHeader.css';
import {Button} from "antd";
import Tags from "../../Tags";
import ClubLogo from "./ClubLogo";
import { BASE_URL } from "../../../service/config/ApiConfig";

const PageHeader = ({club}) => {
    return (
        <Header className="page-header" style={{background: `url(${BASE_URL + (club.urlBackground == null ?"/static/images/club/bg_2.png" :club.urlBackground)}) 50% 50% / cover no-repeat`}}>
            <div className="blur">
                <div className="row">
                    <div className="tags-name-box">
                        <div className="name-box">
                            <ClubLogo logo={club.urlLogo} category={club.categories[0]}/>
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