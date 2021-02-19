import {Button} from "antd";
import './css/CarouselItems.css';
import React from "react";

export const items = [
    {
        imageURL: "/static/images/about/slider/1.png",
        body: (
            <div className="carousel-item-1">
                <h2 className="label">Про гуртки українською</h2>
                <span className="description">
                            На нашому сайті ви можете обрати для
                            вашої дитини гурток, де навчають українською мовою.
                        </span>
                <Button className="details-button">Детальніше</Button>
            </div>)
    },
    {
        imageURL: "/static/images/about/slider/1.png",
        body: (
            <div className="carousel-item-1">
                <h2 className="label">Про гуртки українською 2 </h2>
                <span className="description">
                            На нашому сайті ви можете обрати для
                            вашої дитини гурток, де навчають українською мовою.
                        </span>
                <Button className="details-button">Детальніше</Button>
            </div>)
    },
    {
        imageURL: "/static/images/about/slider/1.png",
        body: (
            <div className="carousel-item-1">
                <h2 className="label">Про гуртки українською 3</h2>
                <span className="description">
                            На нашому сайті ви можете обрати для
                            вашої дитини гурток, де навчають українською мовою.
                        </span>
                <Button className="details-button">Детальніше</Button>
            </div>)
    }
];