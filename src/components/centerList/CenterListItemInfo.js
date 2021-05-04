import React from 'react';
import { Button, Modal, Rate } from 'antd';
import "../clubList/css/ClubInfo.css"
import { Link } from "react-router-dom";
import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";
import ContactsInfoUtil from '../../util/ContactsInfoUtil';
import ImageCarousel from '../ImageCarousel';
import CenterLogo from "./CenterLogo";


const CenterListItemInfo = ({ visible, setVisible, center }) => {
    const images = [
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
        "https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/advice/maps-satellite-images/satellite-image-of-globe.jpg",
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
        "https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/advice/maps-satellite-images/satellite-image-of-globe.jpg",
        "https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/advice/maps-satellite-images/satellite-image-of-globe.jpg"
    ];

    return (
        <Modal
            centered
            visible={visible}
            onCancel={() => setVisible(false)}
            width={900}
            footer={null}
            className='clubInfo'
        >
            <div className="container">
                <div className="title">
                    <CenterLogo urlLogo={center.urlLogo} />
                    <div className="club-name">{center.name}</div>
                </div>
                <div className="rating">
                    <span className="feedback">{3} відгуків</span>
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
            </div>
        </Modal>
    )
};

export default CenterListItemInfo;