import React from "react";
import AboutHeader from "../mainPage/MainHeader";
import {Layout} from "antd";
import ChallengeBanner from "./ChallengeBanner";
import ChallengeDescription from "./ChallengeDescription";
import {items} from "./WebinarItems";
import "./css/ChallengePage.css";

const ChallengePage = () => {
    console.log(items);
    return (
        <Layout className="global-padding challenge-page">
            <AboutHeader/>
            <ChallengeBanner imageURL={`${process.env.PUBLIC_URL}/static/images/about/slider/challenge.jpg`}/>
            <ChallengeDescription />
        </Layout>
    );
};

export default ChallengePage;