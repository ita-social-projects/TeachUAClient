import React, { useEffect, useState } from "react";
import Layout from "antd/lib/layout/layout";
import './css/VerifyPage.less';
import {LiqPayPay} from "react-liqpay";
import Login from "../login/Login";

const VerifyPage = () => {


    return (
        <Layout className="aboutProject global-padding">
            <div className="verification-message">
       Користувач успішно зареєстрований
            </div>

            <div className="login-div">
           <button className="flooded-button donate-button">
                <Login/>
            </button>

            </div>
        </Layout >
    )
}
export default VerifyPage;