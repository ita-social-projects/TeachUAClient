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

// Ми разом з вами хочемо, щоб молоде покоління добре знало українську мову, і розуміємо, 
//                 як важливо, щоб нею навчали у дитячих гуртках, студіях та секціях.
//                 Ви можете вдосконалити свої знання та навички, щоб викладати українською мовою, взявши участь у челенджі “Навчай українською”.
//                 Ми записали для вас мотиваційні та практичні вебінари з експертами, зібрали корисні матеріали та придумали цікаві завдання. 
//                 Завдяки челенджу “Навчай українською” перехід на українську мову викладання стане для вас комфортним.
//                 Близько тисячі учасників з усієї України уже взяли участь у 21-денному челенджі “Навчай українською” для закладів позашкільної освіти. 
//                 На українську мову викладання у листопаді 2020 року перейшло близько пів сотні гуртків.