import React, {useEffect} from "react";
import Layout from "antd/lib/layout/layout";
import './css/VerifyPage.less';
import Login from "../login/Login";
import {useLocation} from "react-router-dom";
import {verifyUser} from "../../service/VerifyService";
import {message} from "antd";

const VerifyPage = () => {
    const location = useLocation();

    const getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    useEffect(() => {
        const verifyCode = getUrlParameter("code");
        verifyUser(verifyCode).then((response) => {
            if (response.status===200) {
                message.success(response.data.message);
                if (verifyCode !== undefined) {
                    if(process.env.REACT_APP_ROOT_SERVER === "http://localhost:8080"){
                        window.location = "http://localhost:3000/dev";
                    }else{
                        window.location = process.env.REACT_APP_ROOT_SERVER + process.env.PUBLIC_URL;
                    }
                }
            } else {
                message.warning(response.data.message);
            }
        });
    })

    return (
        <Layout className="aboutProject global-padding">
            <div className="login-div">
                <button className="flooded-button donate-button">
                    <Login verifyCode={getUrlParameter("code")}/>
                </button>
            </div>
        </Layout>
    )
}
export default VerifyPage;