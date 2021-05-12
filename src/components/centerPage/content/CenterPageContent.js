import React from "react";
import PropTypes from 'prop-types';
import {Content} from "antd/es/layout/layout";
import './css/PageContent.css';
import {convertToHtml} from "../../editor/EditorConverter";

const CenterPageContent = ({description}) => {

    return (
        <Content className="page-content">
            {/*<PageRating rating={center.rating} count={feedbackCount}/>*/}
            {!description ?
                <div className="content">У цього центру опису немає...</div> :
                <div className="content" dangerouslySetInnerHTML={{ __html: convertToHtml(description) }} />}
        </Content>
    )
};

CenterPageContent.propTypes = {
  //center: PropTypes.object.isRequired
};

export default CenterPageContent;