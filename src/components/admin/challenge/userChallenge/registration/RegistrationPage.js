import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import moment from 'moment';
import {message} from "antd";
import "./css/RegistrationPage.less";
import NotRegisteredUsersTable from './NotRegisteredUsersTable';
// import RegisteredUsersTable from './RegisteredUsersTable';
import {
    deleteUserChallengeByUserIdDurationId,
    getAllNotRegisteredUsersByDurationId,
    getAllUsersByDurationId,
    registrationByUserIdDurationId
} from '../../../../../service/UserChallengeService';
import RegistrationUserChallenge from "./RegistrationUserChallenge";
import RegisteredUsersTable from "./test/RegisteredUsersTable";

const RegistrationPage = () => {
    let location = useLocation();
    const preparedData = location.state;

    const [registeredUsers, setRegisteredUsers] = useState([]);
    const [notRegisteredUsers, setNotRegisteredUsers] = useState([]);

    useEffect(() => {
        getRegisteredUsers();
        getNotRegisteredUsers();
        }, []
    );
    const getRegisteredUsers =  () => {
        getAllUsersByDurationId(preparedData)
            .then(async response => {
                setRegisteredUsers(response);
            });
    }
    const getNotRegisteredUsers = () => {
        getAllNotRegisteredUsersByDurationId(preparedData)
            .then(response => {
                setNotRegisteredUsers(response);
            });
    }


    const handleDeleteClick = async (data) => {
        await deleteUserChallengeByUserIdDurationId(data.userId,preparedData.challengeId, preparedData.durationId);
        await getNotRegisteredUsers();
        await getRegisteredUsers();

        message.success(`Ви видалили користувача  - ${data.firstName} ${data.lastName}`);
    };

    const handleAddClick = async (data) => {
        await registrationByUserIdDurationId(data.userId, preparedData.challengeId, preparedData.durationId);
        await getNotRegisteredUsers();
        await getRegisteredUsers();
        message.success(`Ви додали нового користувача  - ${data.firstName} ${data.lastName}`);
    }


    return (
        <div className="registrationPageContainer">
            <div className="registrationPageContentBox">
                <RegisteredUsersTable
                    registeredUsers={registeredUsers}
                    setRegisteredUsers={setRegisteredUsers}
                    handleDeleteClick={handleDeleteClick}
                />
                <NotRegisteredUsersTable
                    users={notRegisteredUsers}
                    handleAddClick={handleAddClick}
                />
            </div>
        </div>
    );

}

export default RegistrationPage;