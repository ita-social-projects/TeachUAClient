import React, {useState} from "react";
import PropTypes from 'prop-types';
import {Content} from "antd/es/layout/layout";
import './css/PageContent.css';
import {Button} from "antd";
import ImageCarousel from "../../ImageCarousel";
import PageRating from "./PageRating";
import {getShortContent} from "../../editor/EditorConverter";
import {BASE_URL} from "../../../service/config/ApiConfig";
import {getFeedbackListByClubId} from "../../../service/FeedbackService";

const PageContent = ({club, feedbackCount}) => {
    const [rate,setRate] = useState(0);
    const images = club.urlGallery.map(image => BASE_URL + image.url);

    const  feedback = getFeedbackListByClubId(club.id);

    feedback.then((value)=>{
        var clubRate =0;
        for (let i = 0; i < value.length; i++) {
            clubRate += value[i].rate;
        }
        setRate(clubRate/value.length);
    })

    return (
        <Content className="page-content">
            <PageRating rating={rate} count={feedbackCount}/>
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