import './css/AboutChallenge.css';
import React from "react";
import { Link } from "react-router-dom";
import {Button} from "antd";

const MainChallenge = ({label, text, imageUrl, buttonLabel}) => {
    return (
        <div className="about-challenge">
            <div className="challenge-description">
                <h2 className="label">{label}</h2>
                <span className="text">{text}</span>
                <Link to="/challenge"><Button className="flooded-button materials-button">{buttonLabel}</Button></Link>
            </div>
            <div className="image">
            <img src={imageUrl}/>
            </div>
        </div>
    );
};

export default MainChallenge;