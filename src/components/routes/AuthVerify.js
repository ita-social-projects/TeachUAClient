import { message } from "antd";
import React from "react";
import { useContext } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { deleteUserStorage, getToken } from "../../service/StorageService";


const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
        return null;
    }
};

const AuthVerify = (props) => {
    const history = useHistory();
    const {setUser, setShowLogin} = useContext(AuthContext);

    const onExitClick = () => {
        deleteUserStorage();
        setUser({});
        history.push("/");
    };

    props.history.listen(() => {
        message.info("props.history.listen");
        const token = getToken();
        if (token) {
            const payload = JSON.parse(atob(token.split(".")[1]));
            const expiration = new Date(payload.exp);
            const now = new Date();
            if (expiration.getTime() - now.getTime() / 1000 < 0) {
                message.info("Увійдіть заново в обліковий запис");
                onExitClick();
                setShowLogin(true);
                return false;
            } else {
                return true;
            }
        }
    });

    return <div></div>;
};

export default withRouter(AuthVerify);