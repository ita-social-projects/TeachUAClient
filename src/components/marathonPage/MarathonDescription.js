import React from 'react'
import { Link } from "react-router-dom";
import { Button } from "antd";

const MarathonDescription = () => {
    return (
        <div className="marathon-description">
            <div className="title">Мовомаратон «30 років - 30 кроків»</div>
            <div className="subtitle">30 днів української до 30-ї річниці Незалежності України.</div>
            <div className="text">
                Мовомаратон, який допоможе перейти на українську мову, стартує 19 серпня і триватиме до 19 вересня. Учасники
                отримуватимуть завдання та короткі навчальні матеріали, щоб покращити свої знання та навички спілкування українською
                мовою, та матимуть можливість взяти участь у щонайменше 4-х вебінарах і отримати підтримку однодумців.
                <br /><br />
                Організатори - Ініціатива "Навчай українською" за підтримки Міністерства молоді та спорту України
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
             
                <Link to="/marathon/registration"><Button className="details-button">Зареєструватись</Button></Link>
            </div>

        </div>
    )
}

export default MarathonDescription;
