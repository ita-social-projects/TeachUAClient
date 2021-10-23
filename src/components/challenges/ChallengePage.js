import React, {useEffect, useState} from "react";
import {Layout} from "antd";
import AboutHeader from "../mainPage/MainHeader";
import SocialInfo from "../SocialInfo";
import {getChallengeProfile} from "../../service/ChallengeService";
import "./css/ChallengePage.css";
import ChallengeDescription from "./ChallengeDescription";
import ChallengeBanner from "./ChallengeBanner";

const ChallengePage = () => {
    const [challenge, setChallenge] = useState();

    useEffect(() => {
        window.scrollTo(0, 0)
        getChallengeProfile(9).then(response => {
            setChallenge(response)
            // console.log(response)
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