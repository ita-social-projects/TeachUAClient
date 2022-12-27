import { message } from "antd";
import React, { useEffect } from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { deleteUserStorage, getToken } from "../../service/StorageService";

const AuthVerify = () => {
    const history = useHistory();
    const {setUser, setShowLogin} = useContext(AuthContext);

    const onExitClick = () => {
        deleteUserStorage();
        setUser({});
        history.push("/");
    };

    useEffect(() => {
        const unlisten = history.listen(() => {    
            const token = getToken();
            if (token) {
                const payload = JSON.parse(atob(token.split(".")[1]));
                if (payload.exp * 1000 < Date.now()) {
                    onExitClick();
                    message.info("Увійдіть заново в обліковий запис");
                    setShowLogin(true);
                }
            } 
        });
        return unlisten;
    }, []);

    return <div></div>;
};

export default AuthVerify;