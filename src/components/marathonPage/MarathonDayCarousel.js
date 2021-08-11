
import React, { useState, useEffect, useRef } from "react";

import PrimitiveCard from "../PrimitiveCard";
import "./css/DayCarousel.css";
import CategoryLogo from "../CategoryLogo";
import { Button, Carousel } from "antd";
import   marathonDay from "./marathonDayData/DataObjects"
import ArrowLeftOutlined from "@ant-design/icons/lib/icons/ArrowLeftOutlined";
import ArrowRightOutlined from "@ant-design/icons/lib/icons/ArrowRightOutlined";
import {Link} from "react-router-dom";

const MarathonDayCarousel = () => {
    const data =  marathonDay.marathonDay;
 

    const checkDate = () =>{
        const date = new Date();
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();

        if (day < 19 && month === 8){
         data.length = 0;
        }else{
            if (day >= 19 && month === 8){
            data.length = day-19;
            }else{
                if (month === 9){
                    data.length = day+13;
            }
        }
    }
}
    


useEffect(() => {
  

});

   
    const carousel = useRef(null);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
    
        slidesToShow: data.length > 4 ? 4 : data.length,
        slidesToScroll: data.length > 4 ? 4 : data.length,
        responsive: [
            {
                breakpoint: 1920,
                settings: {
                    slidesToShow: data.length > 3 ? 3: data.length,
                    slidesToScroll: data.length > 3 ? 3 : data.length,
                },
            },
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: data.length > 2 ? 2: data.length,
                    slidesToScroll: data.length > 2 ? 2: data.length,
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 667,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
      
        <div className="challenge-day-carousel">
           {checkDate()}
            <div className="challenge-day-header">
                <h2 className="label">Завдання челенджу</h2>
            </div>
            <div className="challenge-day-block">
                <ArrowLeftOutlined
                    className="arrows-prev"
                    onClick={() => carousel.current.prev()}
                />
                <ArrowRightOutlined
                    className="arrows-next"
                    onClick={() => carousel.current.next()}
                />
                <div className="challenge-day-cards">
                    <Carousel
                        {...settings}
                        ref={(node) => (carousel.current = node)}
                        className="about-carousel">
                        {data.map((day) => (
                            <PrimitiveCard
                                key={day.id}
                                header={
                                    <div className="title">
                                        <div className="day-image-box" style={{backgroundColor: "#FFFFFF"}}>
                    <img className="day-image"
                         src={process.env.PUBLIC_URL + "/static/images/marathon/marathon.PNG"} />
                </div>
                                        <div className="name">
                                            {day.name}
                                        </div>
                                    </div>
                                }

                                link={{
                                    pathname: "/marathon/task/"+day.id,
                                  
                                }}
                                buttonText="Переглянути"

                            />


                        ))}
                    </Carousel>
                </div>
            </div>
           
        </div>
    );
};

export default MarathonDayCarousel;