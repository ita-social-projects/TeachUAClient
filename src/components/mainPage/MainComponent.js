import React from "react";
import AboutHeader from "./MainHeader";
import MainCarousel from "./MainCarousel";
import {Layout} from "antd";
import MainDescription from "./MainDescription";
import MainChallenge from "./MainChallenge";

import {items} from "./carousel/CarouselItems";
import MainCategories from "./MainCategories";
import AboutNews from "./MainNews";
const MainComponent = () => {
    return (
        <Layout className="global-padding">
            <AboutHeader/>
            <MainCarousel items={items(process.env.PUBLIC_URL)}/>
            {/* <MainDescription/>
            <MainChallenge
                label='Про челендж "Навчай українською"'
                text='Ми допоможемо вам перейти на українську мову викладання.
                Тут ви можете знайти мотиваційні та практичні вебінари з експертами,
                корисні матеріали, які вдосконалять ваші знання та навички викладати українською.'
                imageUrl={`${process.env.PUBLIC_URL}/static/images/about/challenge.png`}
                buttonLabel="Переглянути матеріали"
            /> */}
            <MainCategories/>
            {/*<AboutNews/>*/}
            <MainChallenge
                label='Челендж "Навчай українською"'
                text='Ми допоможемо вам перейти на українську мову викладання.
                Тут ви можете знайти мотиваційні та практичні вебінари з експертами, корисні матеріали,
                які вдосконалять ваші знання та навички викладати українською.'
                imageUrl={`${process.env.PUBLIC_URL}/static/images/about/challenge_2.png`}
                buttonLabel="Дізнатись більше"
            />
        </Layout>
    );
};

export default MainComponent;