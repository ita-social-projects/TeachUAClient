import React from 'react';
import TwitterOutlined from "@ant-design/icons/lib/icons/TwitterOutlined";
import FacebookOutlined from "@ant-design/icons/lib/icons/FacebookOutlined";
import GoogleOutlined from "@ant-design/icons/lib/icons/GoogleOutlined";
import InstagramOutlined from "@ant-design/icons/lib/icons/InstagramOutlined";

const FooterSoc = () => {
    return (
        <div className="footerSocial">
            <div className="footerLogo"/>
            <div className="description">
                <div className="text">
                    <span>Нам небайдуже майбутнє</span>
                    <span>дітей та української мови</span>
                </div>
            </div>

            <div className="social-media">
                <div className="links">
                    <a target="_blank" href="#"><TwitterOutlined className="icon"/></a>
                    <a target="_blank" href="#"><FacebookOutlined className="icon"/></a>
                    <a target="_blank" href="#"><GoogleOutlined className="icon"/></a>
                    <a target="_blank" href="#"><InstagramOutlined className="icon"/></a>
                </div>
            </div>
        </div>
    );
};

export default FooterSoc