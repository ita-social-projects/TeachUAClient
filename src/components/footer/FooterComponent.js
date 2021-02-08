import React from 'react';
import './css/Footer.css';
import {Footer} from "antd/es/layout/layout";
import FooterSoc from "./FooterSoc";
import FooterPartners from "./FooterPartners";
import FooterDonate from "./FooterDonate";


const FooterComponent = () => {
    return (

            <Footer className="footer">
            <FooterSoc>FooterSocial</FooterSoc>
                <FooterPartners>FooterPartners</FooterPartners>
                <FooterDonate>FooterDonate</FooterDonate>
            </Footer>

    );
};

export default FooterComponent;