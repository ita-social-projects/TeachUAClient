import React from 'react';
import TwitterOutlined from "@ant-design/icons/lib/icons/TwitterOutlined";
import GoogleOutlined from "@ant-design/icons/lib/icons/GoogleOutlined";
import InstagramOutlined from "@ant-design/icons/lib/icons/InstagramOutlined";
import Icon, { createFromIconfontCN } from '@ant-design/icons';


const FooterSocials = () => {
    const IconFont = createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
    });

    const facebookIcon = () => (
        <svg t="1618265607313" className="icon" viewBox="0 120 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="4813" width="200" height="200">
            <path
                d="M571.605333 895.872v-349.696h117.973334l17.536-136.917333h-135.509334V322.048c0-39.509333 11.008-66.56 67.712-66.56h71.850667V133.418667A953.002667 953.002667 0 0 0 605.909333 128c-104.277333 0-175.872 63.658667-175.872 180.522667v100.48H312.832v136.917333h117.461333v349.952h141.312z"
                p-id="4814"></path>
        </svg>
    );

    return (
        <div className="footer-social">
            <a href="/dev/">
                <div className="footer-logo"/>
            </a>
            <div className="description">
                <div className="text">
                    <span>Нам небайдуже майбутнє</span>
                    <span>дітей та української мови</span>
                </div>
            </div>

            <div className="social-media">
                <div className="links">
                    <a target="_blank" href="#"><TwitterOutlined className="icon"/></a>
                    <a target="_blank" href="#"><Icon className="icon" component={facebookIcon} /></a>
                    <a target="_blank" href="#"><GoogleOutlined className="icon"/></a>
                    <a target="_blank" href="#"><InstagramOutlined className="icon"/></a>
                </div>
            </div>
            <div className="qubstudio">
                ©2021 Design by Qubstudio & Development by SoftServe
            </div>
        </div>
    );
};

export default FooterSocials