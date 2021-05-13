import React from 'react';

const FooterPartners = () => {
    return (
        <div className="footer-partners">
            <div className="article">
                Наші партнери
            </div>
            <div className="sponsors">
                <a href="https://www.facebook.com/zakonpromovu5670">
                    <img src={`${process.env.PUBLIC_URL}/static/images/footer/sponsors/logo1.png`}
                         className="logo" alt="Mova_obyednue"/> </a>

                <img src={`${process.env.PUBLIC_URL}/static/images/footer/sponsors/logo2.png`}  className="logo" alt="Logo"/>

                <a href="https://emova.language-ua.online/">
                    <img src={`${process.env.PUBLIC_URL}/static/images/footer/sponsors/logo3.png`}
                         className="logo" alt="Logo"/>  </a>

                <a href="">
                    <img src={`${process.env.PUBLIC_URL}/static/images/footer/sponsors/logo4.png`}
                         className="logo" alt="Logo"/> </a>

                <img src={`${process.env.PUBLIC_URL}/static/images/footer/sponsors/logo5.png`}  className="logo" alt="Logo"/>
            </div>

        </div>
    );
};

export default FooterPartners