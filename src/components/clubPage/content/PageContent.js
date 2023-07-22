import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {Content} from "antd/es/layout/layout";
import './css/PageContent.css';
import {Button, Tooltip} from "antd";
import ImageCarousel from "../../ImageCarousel";
import PageRating from "./PageRating";
import {getShortContent} from "../../editor/EditorConverter";
import {BASE_URL} from "../../../service/config/ApiConfig";
import {getFeedbackRatingByClubId} from "../../../service/FeedbackService";
import {getClubReport} from "../../../service/ClubService";
import {FilePdfOutlined} from "@ant-design/icons";
import SignUpForClub from "../register/SignUpForClub";
import { getRole } from "../../../service/StorageService"

const PageContent = ({club, feedbackCount}) => {
    const [rate, setRate] = useState(0);
    const images = club.urlGallery.map(image => BASE_URL + image.url);
    const [signUpForClubVisible, setSignUpForClubVisible] = useState(false);
    const role = getRole();

    useEffect(() => {
        const fetchFeedbackRate = async () => {
            try {
                const value = await getFeedbackRatingByClubId(club.id);
                setRate(value);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFeedbackRate();
    }, [club.id]);

    return (
        <Content className="page-content">
            <PageRating rating={rate} count={feedbackCount}/>
            {images.length > 0 &&
                <ImageCarousel className="carousel" urls={images}/>
            }
            {!club.description ?
                <div className="content">У цього гуртка опису немає...</div>
                :
                <div className="content">
                    {getShortContent(club.description)}
                </div>
            }

            <div className="full-width button-box">
                <Tooltip
                    title={role !== 'ROLE_USER' ? "Ця функціональність доступна тільки користувачу" : ""}
                    color={role !== 'ROLE_USER' ? "#FFA940" : ""}
                >
                    <Button
                        className="flooded-button apply-button"
                        onClick={() => {
                            if (role === 'ROLE_USER') {
                                setSignUpForClubVisible(true);
                            }
                        }}
                        disabled={role !== 'ROLE_USER'}
                    >
                        Записатись на гурток
                    </Button>

                <SignUpForClub isShowing={signUpForClubVisible}
                               setShowing={setSignUpForClubVisible}
                               club={club}
                />
            </Tooltip>
            </div>

            <div className="full-width button-box">
                <Button onClick={() => getClubReport(club.id, club.name)} className="outlined-button details-button">
                    Завантажити
                    <FilePdfOutlined/>
                </Button>
            </div>
        </Content>
    )
};

PageContent.propTypes = {
    club: PropTypes.object.isRequired
};


export default PageContent;