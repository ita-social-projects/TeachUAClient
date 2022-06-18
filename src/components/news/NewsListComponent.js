import React from "react";
import {Layout} from "antd";
import NewsList from "./NewsList";
import NewsHeader from "./NewsHeader";
import ClubSider from "./ClubSider";
import "./css/NewsList.css"


const NewsListComponent = () => {

    return  (
        <Layout>
            <NewsHeader/>
            <div className="global-padding news-content">
                <NewsList className="newslist" />
                <ClubSider className="clubsider" />
            </div>
        </Layout>
    );
};

export default NewsListComponent;