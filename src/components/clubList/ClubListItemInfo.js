import React from 'react';
import { Button, Modal, Rate } from 'antd';
import "./css/ClubInfo.css"
import { Link } from "react-router-dom";
import Tags from "../Tags";
import CategoryLogo from "../CategoryLogo";
import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";
import ContactsInfoUtil from '../../util/ContactsInfoUtil';
import ImageCarousel from '../ImageCarousel';
import { getShortContent } from "../editor/EditorConverter";


const ClubListItemInfo = ({ visible, setVisible, club }) => {
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
            className='clubInfo'
        >
            <div className="container">
                <div className="title">
                    <CategoryLogo category={club.categories[0]} />
                    <div className="club-name">{club.name}</div>
                </div>
                <Tags className="categories" categories={club.categories} />
                <div className="rating">
                    <Rate allowHalf disabled value={club.rating} />
                    <span className="feedback">{3} відгуків</span>
                </div>
                <div className="address">
                    <EnvironmentFilled className="address-icon" />
                    <span className="text">{club.locations.length === 0 ? "Онлайн" : club.locations[0].address}</span>
                </div>
                <div className="age">
                    <span className="sider-label">Вік аудиторії: </span>
                    <span className="years">від {club.ageFrom} до {club.ageTo} років</span>
                </div>
                <ContactsInfoUtil className="socialMedia" label="Контакти гуртка" contacts={club.contacts} />
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

export default ClubListItemInfo;