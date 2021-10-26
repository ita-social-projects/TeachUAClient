import React, {useEffect, useState} from "react";
import {Layout} from "antd";
import AboutHeader from "../mainPage/MainHeader";
import SocialInfo from "../SocialInfo";
import {getChallengeProfile} from "../../service/ChallengeService";
import "./css/ChallengePage.css";
import ChallengeDescription from "./ChallengeDescription";
import ChallengeBanner from "./ChallengeBanner";

const ChallengePage = () => {
    const [challenge, setChallenge] = useState({
        id: 0,
        name: "",
        title: "",
        description: "",
        picture: "",
        sortNumber: 0,
        isActive: true,
        tasks: {},
        user: {
            id: 0,
            firstName: "",
            lastName: ""
        }
    });



    useEffect(() => {
        getChallengeProfile(9).then(response => {
            setChallenge(response)
        });
    }, []);

    return (
        <Layout className="global-padding marathon-page">
            <AboutHeader/>
            <ChallengeBanner challenge={challenge}/>
            <SocialInfo/>
            {/*<MarathonBanner imageURL={`${process.env.PUBLIC_URL}/static/images/about/slider/maraton.jpg`} />*/}
            {/*<MarathonDescription />*/}
            {/*<MarathonDayCarousel/>*/}
            <ChallengeDescription challenge={challenge}/>
        </Layout>
    );
};
export default ChallengePage;