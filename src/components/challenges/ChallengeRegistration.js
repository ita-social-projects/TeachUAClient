import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import "./css/ChallengeRegistration.less"
import {Button, Select, message, Space} from "antd";
import Login from "../login/Login";
import {deleteToken, deleteUserId, getToken, getUserId} from "../../service/StorageService";
import {getUserById} from "../../service/UserService";
import {getAllChallengeDurationByChallengeId, registrationOnChallenge} from "../../service/UserChallengeService";

const ChallengeRegistration = () => {

    const [durations, setDurations] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const challengeId = useParams().challengeId;
    const [user, setUser] = useState('');
    const [showLogin, setShowLogin] = useState(false);

    useEffect(() => {
        getData();
    },[]);

    const getData = () => {
        getAllChallengeDurationByChallengeId(challengeId).then(response => {
            if (!response.status) {
                setDurations(response);
            }
        });
        if (getUserId()) {
            getUserById(getUserId()).then(response => {
                setUser(response);
            })
        }
    };

    const onExitClick = () => {
        deleteToken();
        deleteUserId();
        window.location.assign(process.env.PUBLIC_URL);
    };

    const checkToken = () => {
        if (getToken()) {
            const token = getToken();
            const payload = JSON.parse(atob(token.split(".")[1]));
            const expiration = new Date(payload.exp);
            const now = new Date();
            if (expiration.getTime() - now.getTime() / 1000 < 0) {
                onExitClick();
                return false;
            } else {
                return true;
            }
        }
    };

    const findFullDate = (date) => {
        return durations.find(({startDate}) => startDate === date)
    }

    const profileChallengeRegistration = () => {
        if (selectedDate === null || selectedDate === "") {
            message.warning("Виберіть дату")
        } else {
            if (checkToken()) {
                registrationOnChallenge(user.id, challengeId, findFullDate(selectedDate)).then(response => {
                    if (response.status) {
                        message.warning(response.message);
                    } else {
                        message.success(`Ви успішно зареєструвались на челендж - ${response} !`);
                    }
                });
            } else {
                message.error("Для того, щоб зареєструватись на челендж потрібно бути залогованим користувачем");
                return setShowLogin(true);
            }
        }
    };

    return (
        durations.length > 0 ?
            (
                <>
                    <div className="registration-space">
                        <Space size={"large"} align={"baseline"}>
                        <Select
                            defaultValue={"Дата старту"}
                            style={{width: 200}}
                            onChange={(value) => { setSelectedDate(value); }}
                        >
                            {
                                durations.map(duration => {
                                    return <Select.Option value={duration['startDate']}></Select.Option>
                                })
                            }
                        </Select>
                        <Button className="flooded-button donate-button" onClick={profileChallengeRegistration}>
                            Зареєструватись
                        </Button>
                        </Space>
                    </div>
                    <Login isShowing={showLogin} setShowing={setShowLogin}/>
                </>
            ) : (null)
    )
};

export default ChallengeRegistration;