import {Checkbox, Form, Input, InputNumber, Steps} from "antd";
import React from "react";
import Sider from "antd/es/layout/Sider";
import "./css/AddClubSider.css";
import {onHidden} from "web-vitals/dist/lib/onHidden";

const {Step} = Steps;

const AddClubSiderMobile = ({step}) => {

    return (
        <Steps className="add-club-sider-mobile"
               style={{background: "#FAFAFA"}}
               current={step}>
            {step == 0 &&
                <Step title="Основна інформація"/>
            }
            {step == 1 &&
                <Step title="Контакти"/>
            }
            {step == 2 &&
                <Step title="Опис"/>
            }
        </Steps>
    )
};

export default AddClubSiderMobile;