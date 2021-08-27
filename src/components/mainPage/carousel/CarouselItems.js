import { Button } from "antd";
import '../css/CarouselItems.css';
import React from "react";
import { Link } from "react-router-dom";

export const items = (uri) => [
    {
        imageURL: `${uri}/static/images/about/slider/aboutClubs.jpg`,
        body: (
            <div className="carousel-item-1">
                <h2 className="label">Про гуртки українською</h2>
                <span className="description">
                    На нашому сайті ви можете обрати для
                    вашої дитини гурток, де навчають українською мовою.
                        </span>
                <Link to="/clubs"><Button className="details-button">Детальніше</Button></Link>
            </div>)
    },
    {
        imageURL: `${uri}/static/images/about/slider/maraton.jpg`,
        body: (
            <div className="carousel-item-1">
                <h2 className="label">Мовомаратон до 30-ї річниці <span></span>
               Незалежності України</h2>
                <span className="description description-2">
                За 30 днів перейти на українську? Так, легко, комфортно, разом із однодумцями. 
                Зроби Україні подарунок на день Незалежності - розмовляй українською!
                </span>
                <Link to="/marathon"><Button className="details-button">Детальніше</Button></Link>
            </div>)
    },
    {
        imageURL: `${uri}/static/images/about/slider/aboutUs.jpg`,
        body: (
            <div className="carousel-item-1">
                <h2 className="label">Про нас</h2>
                <span className="description">
                    Ініціатива "Навчай українською" - це небайдужі громадяни, які об'єдналися,
                    щоб популяризувати українську мову у сфері освіти.
                </span>
                <Link to="/about"><Button className="details-button">Детальніше</Button></Link>
            </div>)
    }
];