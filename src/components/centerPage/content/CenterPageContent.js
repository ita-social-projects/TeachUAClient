import {React, useState} from "react";
import PropTypes from 'prop-types';
import {Content} from "antd/es/layout/layout";
import './css/PageContentCenter.css';
import {Button} from "antd";
import {convertToHtml} from "../../editor/EditorConverter";
import {getClubReport} from "../../../service/ClubService";
import {FilePdfOutlined} from "@ant-design/icons";
import {getCenterReport, getAllCenterClubsByCenterId} from "../../../service/CenterService";
import { centerFeedback } from "../../../util/CenterUtil";
import PageRatingCenter from "./PageRatingCenter";

const CenterPageContent = ({ center, loading }) => {

    const [rate, setRate] = useState(0);
    const [feedbackCount, setFeedbackCount] = useState(0);

    const feedback = getAllCenterClubsByCenterId(center.id);

    feedback.then((value) => {
        var count = 0;
        for (let i = 0; i < value.length; i++) {
            count += value[i].feedbackCount;
        }
        setRate(centerFeedback(value));
        setFeedbackCount(count);
    })

    return (
        <Content className="page-content">
            <PageRatingCenter rating={rate} count={feedbackCount}/>
            {!center ?
                <div className="content">У цього центру опису немає...</div>
                :
                loading ? <div className="empty-block"/> :
                    <div className="content" >
                        {center.description}
                    </div>}
            <div className="full-width button-box">
                <Button onClick={() => getCenterReport(center.id, center.name)} className="outlined-button details-button">
                    Завантажити
                    <FilePdfOutlined/>
                </Button>
            </div>
        </Content>

    )
};

CenterPageContent.propTypes = {
  //center: PropTypes.object.isRequired
};

export default CenterPageContent;
