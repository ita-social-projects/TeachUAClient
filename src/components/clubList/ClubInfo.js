import React from 'react';
import {Button, Modal, Rate} from 'antd';
import "./css/ClubInfo.css"
import {Link} from "react-router-dom";
import Tags from "../Tags";
import CategoryLogo from "../CategoryLogo";
import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";
import SocialMedia from '../clubPage/sider/SocialMedia';
import ImageCarousel from '../ImageCarousel';
import {getShortContent} from "../editor/EditorConverter";


const ClubInfo = ({ visible, setVisible, club }) => {
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
                    <CategoryLogo category={club.categories[0]} />
                    <div className="club-name">{club.name}</div>
                </div>
                <Tags className="categories" categories={club.categories} />
                <div className="rating">
                    <Rate allowHalf disabled value={club.rating}/>
                    <span className="feedback">{3} відгуків</span>
                </div>
                <div className="address">
                    <EnvironmentFilled className="address-icon" />
                    <span className="text">{club.address}</span>
                </div>
                <div className="age">
                    <span className="sider-label">Вік аудиторії: </span>
                    <span className="years">від {club.ageFrom} до {club.ageTo} років</span>
                </div>
                <SocialMedia className="socialMedia" label="Контакти гуртка"/>
                <Button className="flooded-button more-button">
                    <Link to={`/club/${club.id}`}>Більше про гурток</Link>
                </Button>
                <div className="about-club" >
                    <span className="title">Про гурток</span>
                    <ImageCarousel className="carousel" urls={images} />
                    <div className="description">{getShortContent(club.description)}</div>
                </div>
            </div>
        </Modal>
    )
};

export default ClubInfo;