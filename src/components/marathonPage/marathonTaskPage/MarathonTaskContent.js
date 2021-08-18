import React, {useRef} from "react";
import PropTypes from 'prop-types';
import {Content} from "antd/es/layout/layout";
import {Button, Form} from "antd";
import marathonDay from "../marathonDayData/DataObjects";
import './../css/MarathonTaskPage.css';
import './../marathonDayData/DataObjects'

const MarathonTaskContent = () => {

    const path = window.location.pathname.split("/")[window.location.pathname.split("/").length-1];
    const data = marathonDay.marathonDay.find(value => value.pathUrl === path);
    const dataText = data.text;
    const dataText2 = data.text2;
    return (
        <Content className="page-task-content">
            <img className="task-image"
                 src={`${process.env.PUBLIC_URL}/static/images/marathon/marathon_log.png`}
            ></img>
            <div className="header-content">
            <div className="task-header">
                {data.name}
            </div>

            <div className="task-subheader">
                {data.subheader}
            </div>
            <div className="task-text ">
                <div dangerouslySetInnerHTML={{__html: `${dataText}`}} />
            </div>
            </div>

            <div className="task-content">
                <div className="task-text ">
                    <div dangerouslySetInnerHTML={{__html: `${dataText2}`}} />
                </div>
            <div className="task-task-header">
                {data.taskTitle}
            </div>

            <div className="task-info">
                {data.task}
            </div>

            </div>

            <div className="full-width button-box">
            </div>
        </Content>


    )
};

MarathonTaskContent.propTypes = {
    task: PropTypes.object.isRequired
};


export default MarathonTaskContent;