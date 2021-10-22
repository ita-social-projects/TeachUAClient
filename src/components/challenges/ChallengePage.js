import React, {useEffect} from "react";
import {Layout} from "antd";
import AboutHeader from "../mainPage/MainHeader";
import MarathonBanner from "../marathonPage/MarathonBanner";
import MarathonDescription from "../marathonPage/MarathonDescription";
import MarathonDayCarousel from "../marathonPage/MarathonDayCarousel";

const ChallengePage = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <Layout className="global-padding marathon-page">
            <AboutHeader />
            {/*<MarathonBanner imageURL={`${process.env.PUBLIC_URL}/static/images/about/slider/maraton.jpg`} />*/}
            {/*<MarathonDescription />*/}
            {/*<MarathonDayCarousel/>*/}
        </Layout>
    );
};
export default ChallengePage;