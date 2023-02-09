import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import "./css/ChallengeDurationPage.less";
import ChallengeTable from "./ChallengeTable";
import DurationTable from "./DurationTable";
import {getAllForChallengeDurationTable} from "../../../../../service/UserChallengeService";

const ChallengeDurationPage = () => {

    const location = useLocation();
    const challengeId = location.state.challengeId;
    const challengeName = location.state.challengeName;
    const isActive = location.state.isActive;
    const [challenge, setChallenge] = useState([]);
    const [challengeDurations, setChallengeDurations] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        setChallenge([{
            "challengeId": challengeId,
            "challengeName": challengeName,
            "isActive": isActive
        }]);
        getAllForChallengeDurationTable(challengeId).then(response => {
            setChallengeDurations(response);
        });
    };

    return (
        <div className="registrationPageContainer">
            <div className="registrationPageContentBox">
                <ChallengeTable challenge={challenge}/>
                <DurationTable challengeId={challengeId} challengeDurations={challengeDurations}
                               setChallengeDurations={setChallengeDurations}/>
            </div>
        </div>
    );
}

export default ChallengeDurationPage;
