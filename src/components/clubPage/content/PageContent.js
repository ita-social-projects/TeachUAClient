import React from "react";
import {Content} from "antd/es/layout/layout";
import './css/PageContent.css';
import {Button} from "antd";

const PageContent = ({club}) => {
    return (
        <Content className="page-content">
            <div className="upper">
                <div class="title">
                    {club.name}
                </div>
                <div className="description">
                    {club.description}
                </div>
            </div>
            <div className="lower">
                <div className="title">
                    {club.name}
                </div>
                <div className="description">
                    {club.description}
                </div>
            </div>
            <div className="full-width button-box">
                <Button className="flooded-button apply-button">Записатись на гурток</Button>
            </div>
        </Content>
    )
};

export default PageContent;