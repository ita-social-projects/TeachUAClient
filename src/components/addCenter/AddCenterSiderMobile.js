import {Steps} from "antd";
import React, {useEffect, useState} from "react";
import "./css/AddCenter.css";

const {Step} = Steps;

const AddCenterSiderMobile = ({step}) => {
    return (
        <div
            className="side-mobile">
            <Steps
                direction="horizontal"
                current={step}>
                {step == 0 &&
                <Step title="Основна інформація"></Step>
                }
                {(step == 0 || step == 1 || step == 2) &&
                <Step title="Контакти"></Step>
                }
                {(step == 1 || step == 2 || step == 3) &&
                <Step title="Опис"></Step>
                }
                {step == 3 &&
                <Step  title="Гуртки"></Step>
                }
            </Steps>
        </div>
    )

};

export default AddCenterSiderMobile;