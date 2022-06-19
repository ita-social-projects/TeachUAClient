import React, {useState} from "react";
import {Layout} from "antd";
import NewsList from "./NewsList";
import NewsHeader from "./NewsHeader";
import ClubSider from "./ClubSider";
import "./css/NewsList.css"
import Loader from "../Loader";

const NewsListComponent = () => {
    const [load, setLoad] = useState(false);
    return load ? <Loader/>: (
        <Layout>
            <NewsHeader/>
            <div className="global-padding news-content">
                <NewsList className="newslist" load={load} setLoad={setLoad} />
                <ClubSider className="clubsider" load={load} setLoad={setLoad} />
            </div>
        </Layout>
    );
};

export default NewsListComponent;