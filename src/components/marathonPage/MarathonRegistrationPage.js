import React, { useEffect } from "react";
import {Button, Layout, Menu} from "antd";
import "./css/MarathonPage.css";

import AboutHeader from "../mainPage/MainHeader";
import {Link} from "react-router-dom";


const MarathonPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <Layout className="global-padding marathon-page">
            <AboutHeader />
          <div className = "google-form">
           <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSc44MDNWvgsw0caL1HLTyBV5dHckPkd0yb3t5HN4vwUe9ENxQ/viewform?embedded=true" width="700" height="2000" frameborder="0" marginheight="0" marginwidth="0">Завантаження…</iframe> 
         </div>
            <Link to="/marathon"><Button className="details-back">Назад на Мовомаратон</Button></Link>
        </Layout>
    );
};

export default MarathonPage;