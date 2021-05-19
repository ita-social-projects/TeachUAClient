import React, { useEffect, useState } from "react";
import Layout from "antd/lib/layout/layout";
import "./css/aboutProject.css";
import FacebookOutlined from "@ant-design/icons/lib/icons/FacebookOutlined";
import YoutubeOutlined from "@ant-design/icons/lib/icons/YoutubeOutlined";
import InstagramOutlined from "@ant-design/icons/lib/icons/InstagramOutlined";
import {Button} from "antd";
import ClubCarousel from "./ClubCarousel";
import { getClubsByCategoryAndCity } from "../../service/ClubService";
import { mapSearchParameters } from "../../context/SearchContext";
import Search from "../Search";

const AboutProject = () => {
    const [clubs, setClubs] = useState([]);
    useEffect(() => {
        getClubsByCategoryAndCity(mapSearchParameters).then(responce => {
            setClubs(responce);
        })
    }, [mapSearchParameters.cityName])

    return (
        <Layout className="aboutProject global-padding">
            <div className="lower-header-box about-header">
                <div className="city-name-box">
                    <h2 className="city-name">Ініціатива “Навчай українською”</h2>
                </div>
                <Search redirect/>
            </div>
            <div className="title"
                style={{ background: `url(${process.env.PUBLIC_URL}/static/images/service/about_project.png) center / cover` }}>
                <span className="text">Навчай українською</span>
                <span className="content">Ініціатива</span>
            </div>
            <p/><p/>
            <div className="social-info">
                <div className="social-media">
                    <span className="text">Ми у соц. мережах</span>
                    <div className="links">
                        <a target="_blank" href=""></a>
                        <a target="_blank" href="https://www.facebook.com/teach.in.ukrainian"><FacebookOutlined className="icon"/></a>
                        <a target="_blank" href="https://www.youtube.com/channel/UCP38C0jxC8aNbW34eBoQKJw"><YoutubeOutlined className="icon"/></a>
                        <a target="_blank" href="https://www.instagram.com/teach.in.ukrainian/"><InstagramOutlined className="icon"/></a>
                    </div>
                </div>
                <div className="help-button">
                    <a target="blank" href="#"><Button className="flooded-button donate-button">Допомогти
                        проєкту</Button> </a>
                </div>
            </div>
            <div className="content">
                <div className="about-info">
                    <div className="title-content">
                        Про ініціативу
                    </div>
                    <div className="content-text">
                        Ініціатива “Навчай українською” - це небайдужі громадяни, які об'єдналися, щоб популяризувати українську мову у сфері освіти. Ви можете про нас більше дізнатися з нашої Facebook-сторінки.
                    </div>
                </div>
                <section className="organaizer" >
                    <div className="row">
                        <div className="col">
                            <img src={`${process.env.PUBLIC_URL}/static/images/service/profile_2.jpg`}></img>
                        </div>
                        <div className="col info">
                            <div className="text">
                                <span >
                                    Активна учасниця групи захисту мовного закону і права україномовних на послуги українською мовою в Україні. Ініціювала розпорядження департаменту культури КМДА про викладання у мистецьких школах Києва українською мовою. Експертка з комунікацій та менеджерка соціальних, освітніх та культурних проєктів. Конкретніше: консультантка з розробки та створенню телевізійного шоу про нові об’єднані територіальні громади, головний редактор програми журналістських розслідувань «Брат за брата», редактор розважальних програм Новий канал, впродовж десяти років журналістка та ведуча програми новин «Репортер» Новий канал. Хочу дізнатись, що зміниться, якщо в Україні всі розмовлятимуть українською? Чи змінить це ставлення громадян до своєї країни? Чи стане молодь більше поважати свій край?
                            </span>
                            </div>
                            <div className="name">
                                <span>Наталка Федечко</span>
                            </div>
                            <div className="position">
                                <span >Співзасновниця та координаторка Ініціативи “Навчай українською”</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col info">
                            <div className="text">
                                <span>
                                    Комунікаційна менеджерка Ініціативи "Навчай українською". Редакторка волонтерського проєкту Портал мовної політики. Учасниця спільноти "Мова об'єднує", яка займається адвокацією закону "Про забезпечення функціонування української мови як державної". Мріє, щоб ті, хто говорить українською, не почували себе дискримінованими.
                                </span>
                            </div>
                            <div className="name">
                                <span >Іванна Кобєлєва</span>
                            </div>
                            <div className="position">
                                <span>Засновниця проєкту</span>
                            </div>
                        </div>
                        <div className="col">
                            <img src={`${process.env.PUBLIC_URL}/static/images/service/profile_1.jpg`}></img>
                        </div>
                    </div>
                </section>
                <section className="sport-clubs">
                    <div className="title-content sport">
                        Ініціатива "Навчай українською" закликає викладачів спортивних секцій, тренерів навчати дітей українською мовою.
                    </div>
                    <div className="content-text sport desc">
                        Із 16 січня 2021 набуває чинності стаття 30 закону “Про забезпечення функціонування української мови як державної” про державну мову у сфері обслуговування споживачів. З 16 січня всі надавачі послуг, незалежно від форми власності, зобов’язані обслуговувати споживачів і надавати інформацію про товари і послуги державною мовою. Громадяни мають право отримати освітній послуги українською мовою у закладах позашкільної освіти.
                    </div>
                    <div className="video">
                        <iframe width="100%" height="378" style={{ borderRadius: '16px' }} src="https://www.youtube.com/embed/i3umBFqDznQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </section>
                {/*<ClubCarousel clubs={clubs} />*/}
                {/*<section className="addit-information">*/}
                {/*    <div className="title-content ">*/}
                {/*        Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum*/}
                {/*    </div>*/}
                {/*    <div className="content-text">*/}
                {/*        Витяг. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porta lorem mollis aliquam ut porttitor leo a diam sollicitudin. Ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet. Amet aliquam id diam maecenas.*/}
                {/*    </div>*/}
                {/*    <div class="image">*/}
                {/*        <img src={`${process.env.PUBLIC_URL}/static/images/service/about_img.jpg`}></img>*/}
                {/*    </div>*/}
                {/*    <div className="title-content ">*/}
                {/*        Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum*/}
                {/*    </div>*/}
                {/*    <div className="content-text">*/}
                {/*        Витяг. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porta lorem mollis aliquam ut porttitor leo a diam sollicitudin. Ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet. Amet aliquam id diam maecenas.*/}
                {/*    </div>*/}
                {/*    <div className="title-content ">*/}
                {/*        Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum*/}
                {/*    </div>*/}
                {/*    <div className="content-text">*/}
                {/*        Витяг. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porta lorem mollis aliquam ut porttitor leo a diam sollicitudin. Ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet. Amet aliquam id diam maecenas.*/}
                {/*    </div>*/}
                {/*</section>*/}
            </div>
        </Layout >
    )
}
export default AboutProject;