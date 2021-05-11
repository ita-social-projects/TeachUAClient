import React, {useEffect} from "react";
import Layout from "antd/lib/layout/layout";
import './css/VerifyPage.less';
import Login from "../login/Login";
import {useLocation} from "react-router";
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
            } else {
                message.warning(response.data.message);
            }
        });
    })

    return (
        <Layout className="aboutProject global-padding">
            {/*<div className="verification-message">*/}
            {/*</div>*/}
            <div className="login-div">
           <button className="flooded-button donate-button">
                <Login/>
            </button>

            </div>
        </Layout >
    )
}
export default VerifyPage;