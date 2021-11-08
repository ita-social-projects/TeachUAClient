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
import ChallengeCarousel from "./ChallengeCarousel";

const ChallengePage = () => {
    const [challenge, setChallenge] = useState({
        id: 0,
        name: "",
        title: "",
        description: "",
        picture: "",
        sortNumber: 0,
        isActive: true,
        tasks: [],
        user: {
            id: 0,
            firstName: "",
            lastName: ""
        }
    });

    const {challengeId} = useParams();

    useEffect(() => {
        getChallengeProfile(challengeId).then(response => {
            if (response.status > 400) {
                setChallenge(undefined);
            } else {
                setChallenge(response)
            }
        });
    }, [challengeId]);

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
                    {
                        (challenge.tasks.length !== 0 && challenge.tasks)  &&
                        <ChallengeCarousel challenge={challenge}/>
                    }
                </div>)
                : <Result
                    className="challenge-not-found"
                    status="404"
                    title="404"
                    subTitle="Челендж який ви намагаєтесь відкрити не існує або у вас немає до нього доступу"
                />}
        </Layout>
    );
};
export default ChallengePage;