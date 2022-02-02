import React from 'react';
import { Button, Modal, Rate } from 'antd';
import "../clubList/css/ClubInfo.css"
import { Link } from "react-router-dom";
import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";
import ContactsInfoUtil from '../../util/ContactsInfoUtil';
import ImageCarousel from '../ImageCarousel';
import CenterLogo from "./CenterLogo";
import "./css/CenterInfo.css"
import PageRatingCenter from "../centerPage/content/PageRatingCenter";
import {getClubReport} from "../../service/ClubService";
import {getCenterReport} from "../../service/CenterService";
import {FilePdfOutlined} from "@ant-design/icons";

const CenterListItemInfo = ({ visible, setVisible, center }) => {
    const images = [
        process.env.PUBLIC_URL+"/static/images/clubs_carousel_tmp/kids_jump.png",
        process.env.PUBLIC_URL+"/static/images/clubs_carousel_tmp/balls.jpg",
        process.env.PUBLIC_URL+"/static/images/clubs_carousel_tmp/exercise.jpg",
        process.env.PUBLIC_URL+"/static/images/clubs_carousel_tmp/pencils.jpg",
    ];

    return (
        <Modal
            centered
            visible={visible}
            onCancel={() => setVisible(false)}
            width={900}
            footer={null}
            className='centerInfo'
        >
            <div className="container">
                <div className="title">
                    <CenterLogo urlLogo={center.urlLogo} />
                    <div className="center-name">{center.name}</div>
                </div>
                <div className="rating">
                    <span className="feedback">{3} відгуків</span>
                    {/*<PageRatingCenter rating={rating} count={count}*/}
                </div>
                <div className="address">
                    <EnvironmentFilled className="address-icon" />
                    <span className="text">{center.address}</span>
                </div>
                <ContactsInfoUtil className="socialMedia" label="Контакти центру" contacts={center.contacts} />
                <Button className="flooded-button more-button">
                    <Link to={`/center/${center.id}`}>Більше про центр</Link>
                </Button>
                <div className="about-club" >
                    <span className="title">Про центр</span>
                    <ImageCarousel className="carousel" urls={images} />
                    <div className="description">{center.description}</div>
                </div>
                <div>
                    <Button onClick={() => getCenterReport(center.id, center.name)} className="outlined-button details-button">
                        Завантажити
                        <FilePdfOutlined/>
                    </Button>
                </div>
            </div>
        </Modal>
    )
};

export default CenterListItemInfo;