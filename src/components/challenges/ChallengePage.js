import React, {useEffect, useState} from "react";
import { useLocation } from 'react-router-dom';
import {Button, Layout, Result, Tooltip} from "antd";
import AboutHeader from "../mainPage/MainHeader";
import SocialInfo from "../SocialInfo";
import {getChallengeProfile} from "../../service/ChallengeService";
import "./css/ChallengePage.css";
import ChallengeDescription from "./ChallengeDescription";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import ChallengeBanner from "./ChallengeBanner";
import ChallengeCarousel from "./ChallengeCarousel";
import SignUpForChallenge from "./register/SignUpForChallenge";
import {getRole} from "../../service/StorageService";

const ChallengePage = () => {
    const [signUpForChallengeVisible, setSignUpForChallengeVisible] = useState(false);
    const role = getRole();

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
    const location = useLocation();
    const params = useParams();

    const getData = () => {
        getChallengeProfile(params.challengeId).then(response => {
            if (response.status > 400) {
                setChallenge(undefined);
            } else {
                setChallenge(response);
            }
        });
    }

    useEffect(() => {
        getData();
    }, [location]);

    return (
        <Layout className="global-padding challenge-page">
            {challenge ?
                (<div>
                    <AboutHeader/>
                    <ChallengeBanner challenge={challenge}/>
                    <SocialInfo/>
                    <ChallengeDescription challenge={challenge}/>
                    <div className="full-width button-box">
                        <Tooltip
                            title={role !== 'ROLE_USER' ? "Ця функціональність доступна тільки користувачу" : ""}
                            color={role !== 'ROLE_USER' ? "#FFA940" : ""}
                        >
                            <Button
                                className="flooded-button apply-button"
                                onClick={() => {
                                    if (role === 'ROLE_USER') {
                                        setSignUpForChallengeVisible(true);
                                    }
                                }}
                                disabled={role !== 'ROLE_USER'}
                            >
                                Записатись на челендж
                            </Button>

                            <SignUpForChallenge isShowing={signUpForChallengeVisible}
                                                setShowing={setSignUpForChallengeVisible}
                                                challenge={challenge}
                            />
                        </Tooltip>
                    </div>
                    {challenge.registrationLink &&
                    <div className="button-div">
                        <Link to={"/challenges/registration/" + params.challengeId}>
                            <Button className="details-button">Зареєструватись</Button>
                        </Link>
                    </div>}
                    {
                        (challenge.tasks && challenge.tasks.length !== 0)  &&
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