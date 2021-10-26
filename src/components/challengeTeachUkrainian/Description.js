import React from 'react'
import { Link } from "react-router-dom";
import { Button } from "antd";
import FacebookOutlined from "@ant-design/icons/lib/icons/FacebookOutlined";
import YoutubeOutlined from "@ant-design/icons/lib/icons/YoutubeOutlined";
import InstagramOutlined from "@ant-design/icons/lib/icons/InstagramOutlined";
import MailOutlined from "@ant-design/icons/lib/icons/MailOutlined";

const Description = () => {
    return (
 <div>
            <div className="social-info">
                <div className="social-media">
                    <span className="text">Наші контакти</span>
                    <div className="links">
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

            <div className="marathon-description">
                <div className="title">Челендж "Навчай українською"</div>
                <div className="subtitle">21 день української мови для тренерів спортивних секцій та викладачів гуртків.</div>
                <div className="text">
                    Челендж «Навчай українською» розпочнеться 5 листопада 2021 року.
                    Під час цього безкоштовного онлайн-курсу учасники отримають необхідні знання та навички для того,
                    щоб впевнено викладати заняття українською мовою.
                    <br /><br />
                    Зареєструватись можна до 3 листопада. Кількість місць обмежена.
                    <br /><br />
                    Організатори: Ініціатива "Навчай українською", Українська гуманітарна платформа за підтримки Міністерства молоді та спорту України.
                    <br /><br />
                    <a style={{color: '#58a6ff' }} href="https://speak-ukrainian.org.ua/">  https://speak-ukrainian.org.ua/ </a>
                    <br />
                    <a style={{color: '#58a6ff' }} href="https://www.facebook.com/teach.in.ukrainian">  https://www.facebook.com/teach.in.ukrainian </a>
                    <br />
                    <a style={{color: '#58a6ff' }} href="mailto:teach.in.ukrainian@gmail.com"> teach.in.ukrainian@gmail.com </a>
                    <br />
                    Українська гуманітарна платформа
                    <br />
                    <br />
                     <div className = "button-div"> 
                    <Link to="/challengeUA/registration"><Button className="details-button">Зареєструватись</Button></Link>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default Description;
