import React, { useEffect, useState} from 'react';
import {message} from "antd";
import {Content} from "antd/es/layout/layout";
import {Redirect} from "react-router-dom";
import "./css/UserChallengesPage.less";
import ChallengeTable from './ChallengeTable';
import {getToken, getUserId} from "../../../../service/StorageService";
import { getUserChallengesByUserId } from '../../../../service/UserChallengeService';

const UserChallengesPage = () => {

    const [userChallenges, setUserChallenges] = useState([]);

    useEffect(() => {
        getUserChallengesByUserId(getUserId()).then(response => setUserChallenges(response));
    },[]
    );

    if (!getToken()) {
        return (
            <Redirect to="/"/>
        );
    }

    const handleDeleteClick = (userChallenge) => {
        const newUserChallenges = [...userChallenges];
        const index = userChallenges.findIndex((data) => data.id === userChallenge.id);

        newUserChallenges.splice(index, 1);
        setUserChallenges(newUserChallenges);

        message.success(`Ви відписалися від челенджу - ${userChallenge.challengeName} !`);
    };

    return (
        <Content className="challengeContainer">
            <div className="contentBox">
                <div className="contentTitle">Мої Челенджі</div>
                    {userChallenges.length === 0
                        ?
                    <div className="noChallenges">
                        Челенджів немає
                    </div>
                        :
                    <ChallengeTable userChallenges={userChallenges} handleDeleteClick={handleDeleteClick}/>
                    }
            </div>                            
        </Content>
    );

}

export default UserChallengesPage;