import React from "react";
import {Layout} from "antd";
import NewsList from "./NewsList";
import NewsHeader from "./NewsHeader";

const NewsListComponent = () => {

    return (
        <Layout>
            <NewsHeader/>
            <NewsList/>
        </Layout>
    );
};

export default NewsListComponent;