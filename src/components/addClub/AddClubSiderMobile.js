import {Checkbox, Form, Input, InputNumber, Steps} from "antd";
import React from "react";
import Sider from "antd/es/layout/Sider";
import "./css/AddClubSider.css";

const { Step } = Steps;

const AddClubSiderMobile = ({step}) => {
    return (
            <Steps className="add-club-sider-mobile"
                   style={{background: "#FAFAFA"}}
                   current={step}
                   size={"small"} >
                <Step title="Основна інформація" />
                <Step title="Контакти"/>
                <Step title="Опис"/>
            </Steps>
    )
};

export default AddClubSiderMobile;