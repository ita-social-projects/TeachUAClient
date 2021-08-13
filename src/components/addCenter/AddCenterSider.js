import { Steps } from "antd";
import React, {useEffect, useState} from "react";
import "./css/AddCenter.css";

const { Step } = Steps;

const AddCenterSider = ({step}) => {
    const [isMobile, setIsMobile] = useState(false);

    const handleResize = () => {
        if (window.innerWidth < 577) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize)
    }, []);

    return (
        <div
            className="side">
            {isMobile
                ? <Steps
                    direction="horizontal"
                    current={step}>
                    {step == 0  &&
                    <Step title="Основна інформація"></Step>
                    }
                    {(step == 0 || step == 1 || step == 2) &&
                    <Step title="Контакти"></Step>
                    }
                    {(step == 1 || step == 2 || step == 3 )&&
                    <Step title="Опис"></Step>
                    }
                    {step == 3 &&
                    <Step title="Гуртки"></Step>
                    }
                </Steps>
                : <Steps
                    direction="vertical"
                    current={step}>
                    <Step title="Основна інформація"></Step>
                    <Step title="Контакти"></Step>
                    <Step title="Опис"></Step>
                    <Step title="Гуртки"></Step>
                </Steps>

            }
        </div>
    )

};

export default AddCenterSider;