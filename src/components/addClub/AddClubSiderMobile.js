import {Checkbox, Form, Input, InputNumber, Steps} from "antd";
import React from "react";
import "./css/AddClubSider.css";

const {Step} = Steps;

const AddClubSiderMobile = ({step}) => {

    return (
        <Steps className="add-club-sider-mobile"
               style={{background: "#FAFAFA"}}
               current={step}>
            {(step == 0 || step == 1) &&
                <Step title="Основна інформація"/>
            }
            {(step == 0 || step == 1 || step == 2) &&
                <Step title="Контакти"/>
            }
            { step == 2 &&
                <Step title="Опис"/>
            }
        </Steps>
    )
};

export default AddClubSiderMobile;