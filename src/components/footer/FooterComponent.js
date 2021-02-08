import React from 'react';
import {Footer} from "antd/es/layout/layout";
import FooterSoc from "./FooterSoc";
import FooterPartners from "./FooterPartners";
import FooterDonate from "./FooterDonate";
import './css/Footer.less'


const FooterComponent = () => {
    return (
        <Footer className="footer">
            <FooterSoc/>
            <FooterPartners/>
            <FooterDonate/>
        </Footer>
    );
};

export default FooterComponent;