import React, {useEffect, useState} from "react";
import {getAllItems} from "../../service/AboutUsService";
import Loader from "../Loader";
import {Button, Layout} from "antd";
import CenterPageHeader from "../centerPage/header/CenterPageHeader";
import CenterPageContent from "../centerPage/content/CenterPageContent";
import CenterPageSider from "../centerPage/sider/CenterPageSider";
import ClubsOfCenter from "../centerPage/clubsOfCenter/ClubsOfCenter";
import CenterPage from "../centerPage/CenterPage";
import Search from "../Search";
import "./css/aboutProject.css";
import FacebookOutlined from "@ant-design/icons/lib/icons/FacebookOutlined";
import YoutubeOutlined from "@ant-design/icons/lib/icons/YoutubeOutlined";
import InstagramOutlined from "@ant-design/icons/lib/icons/InstagramOutlined";
import MailOutlined from "@ant-design/icons/lib/icons/MailOutlined";
import ClubListEmptySearch from "../clubList/ClubListEmptySearch";
import CenterListItem from "../centerList/CenterListItem";
import CenterListRectangleItem from "../centerList/CenterListRectangleItem";


const AboutProject = () => {
    const [items, setItems] = useState([]);
    const parse = require("html-react-parser");
    const getData = () => {
        console.log("ABOUT US TEST");
        getAllItems().then(response => {
            setItems(response);
        });
    }

    useEffect(() =>  {
        getData();
    },[]);

    return (
        <Layout className="aboutProject global-padding">
            <div className="lower-header-box about-header">
                <div className="city-name-box">
                    <h2 className="city-name">
                        Ініціатива “Навчай українською”
                    </h2>
                </div>
                <Search redirect/>
            </div>
            <div className="title"
                 style={{background: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)),
                                      url(${process.env.PUBLIC_URL}/static/images/service/banerAboutUs.jpg) no-repeat 50% 25% / cover`}}>
                <span className="text">Навчай українською</span>
                <span className="content">Ініціатива</span>
            </div>
            <p/>
            <p/>
            <div className="social-info">
                <div className="social-media">
                    <span className="text">Наші контакти</span>
                    <div className="links">
                        <a target="_blank" href=""></a>
                        <a target="_blank" href="https://www.facebook.com/teach.in.ukrainian"><FacebookOutlined
                            className="icon"/></a>
                        <a target="_blank"
                           href="https://www.youtube.com/channel/UCP38C0jxC8aNbW34eBoQKJw"><YoutubeOutlined
                            className="icon"/></a>
                        <a target="_blank" href="https://www.instagram.com/teach.in.ukrainian/"><InstagramOutlined
                            className="icon"/></a>
                        <a target="_blank" href="mailto:teach.in.ukrainian@gmail.com"><MailOutlined className="icon"/></a>
                    </div>
                </div>
                <div className="help-button">
                    <a target="blank"
                       href="https://secure.wayforpay.com/payment/s0f2891d77061">
                        <Button className="flooded-button donate-button">
                            Допомогти проєкту
                        </Button>
                    </a>
                </div>
            </div>

            <div className='content'>
                {items.map(item => {
                    switch (item.type) {
                        case 1:
                            return <div className="row" dangerouslySetInnerHTML={{__html: `${item.text}`}}/>;
                        case 2:
                            return <div className="row">
                                <div class="col" dangerouslySetInnerHTML={{__html: `${item.text}`}}/>
                            </div>;
                        case 3:
                            console.log(`${process.env.PUBLIC_URL}${item.picture}`);
                            return <div class="row">
                                    <img class="image"
                                         src={`${process.env.PUBLIC_URL}${item.picture}`}
                                    ></img>
                                    <div class="content-text" dangerouslySetInnerHTML={{__html: `${item.text}`}}/>
                                </div>
                        case 4:
                            return <div className="row">
                                <div className="content-text" dangerouslySetInnerHTML={{__html: `${item.text}`}}/>
                                <img className="image"
                                     src={`${process.env.PUBLIC_URL}${item.picture}`}
                                ></img>
                            </div>
                        case 5:
                            return <div className="row">
                                <div className="col">
                                    <div className="video">
                                        <iframe width="100%" height="378" style={{borderRadius: '16px'}}
                                                src={item.video} frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen></iframe>
                                    </div>
                                </div>
                            </div>
                    }
                })}

            </div>

        </Layout>
    );

};

export default AboutProject;