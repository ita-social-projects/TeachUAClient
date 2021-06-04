import React, {useRef} from "react";
import PropTypes from 'prop-types';
import {Content} from "antd/es/layout/layout";
import './css/PageContent.css';
import {Button} from "antd";
import ImageCarousel from "../../ImageCarousel";
import PageRating from "./PageRating";
import { getShortContent } from "../../editor/EditorConverter";

const PageContent = ({club, feedbackCount}) => {
    const images = [
        process.env.PUBLIC_URL+"/static/images/clubs_carousel_tmp/kids_jump.png",
        process.env.PUBLIC_URL+"/static/images/clubs_carousel_tmp/balls.jpg",
        process.env.PUBLIC_URL+"/static/images/clubs_carousel_tmp/exercise.jpg",
        process.env.PUBLIC_URL+"/static/images/clubs_carousel_tmp/pencils.jpg",
    ];

    return (
        <Content className="page-content">
            <PageRating rating={club.rating} count={feedbackCount}/>
            <ImageCarousel className="carousel" urls={images}/>
            {!club.description ?
                <div className="content">У цього гуртка опису немає...</div>
                :
                <div className="content">
                    {getShortContent(club.description)}
                    {/*{club.description}*/}
                </div>}
            <div className="full-width button-box">
                <Button className="flooded-button apply-button">Записатись на гурток</Button>
            </div>
        </Content>
    )
};

PageContent.propTypes = {
  club: PropTypes.object.isRequired
};


export default PageContent;