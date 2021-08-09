import React, { useEffect } from "react";
import { Layout } from "antd";
import "./css/MarathonPage.css";
import MarathonBanner from "./MarathonBanner";
import MarathonDescription from "./MarathonDescription";
import AboutHeader from "../mainPage/MainHeader";

const MarathonPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <Layout className="global-padding marathon-page">
            <AboutHeader />
            <MarathonBanner imageURL={`${process.env.PUBLIC_URL}/static/images/about/slider/maraton.png`} />
            <MarathonDescription />
           
        </Layout>
    );
};

export default MarathonPage;