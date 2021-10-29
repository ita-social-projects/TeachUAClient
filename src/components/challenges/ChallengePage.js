import React, {useEffect, useState} from "react";
import {Button, Layout, Result} from "antd";
import AboutHeader from "../mainPage/MainHeader";
import SocialInfo from "../SocialInfo";
import {getChallengeProfile} from "../../service/ChallengeService";
import "./css/ChallengePage.css";
import ChallengeDescription from "./ChallengeDescription";
import {useParams} from "react-router";
import {Link} from "react-router-dom";
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

    const {challengeId} = useParams();

    useEffect(() => {
        getChallengeProfile(challengeId).then(response => {
            if (response.status === 404) {
                setChallenge(undefined);
            } else {
                setChallenge(response)
            }
        });
    }, []);

    return (
        <Layout className="global-padding challenge-page">
            {challenge ?
                (<div>
                    <AboutHeader/>
                    <ChallengeBanner challenge={challenge}/>
                    <SocialInfo/>
                    <ChallengeDescription challenge={challenge}/>
                    {challenge.registrationLink &&
                    <div className="button-div">
                        <Link to={"/challenge/registration/" + challengeId}>
                            <Button className="details-button">Зареєструватись</Button>
                        </Link>
                    </div>}
                </div>)
                : <Result
                    className="challenge-not-found"
                    status="404"
                    title="404"
                    subTitle="Челендж який ви намагаєтесь відкрити не існує"
                />}
        </Layout>
    );
};
export default ChallengePage;