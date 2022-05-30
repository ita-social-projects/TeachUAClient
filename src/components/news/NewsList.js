import React, {useEffect, useState} from "react";
import {getNewsList} from "../../service/NewsService";
import NewsItem from "./NewsItem";
import EmptySearch from "../EmptySearch";
import {Pagination} from "antd";
import "./css/NewsList.css";

const NewsList = () => {
    const [currentPage, setCurrentPage] = useState(0);

    const [newsList, setNewsList] = useState([]);


    useEffect(() => {
        getData(currentPage);
    }, []);

    const getData = (page) =>{
        getNewsList(page).then(response => {
            console.log(response);
            setNewsList(response);
        })
    }

    const onPageChange = (page) => {
        setCurrentPage(page - 1);
        getData(page - 1);
        window.scrollTo(0, 0);
    };

    return newsList.length === 0 ? <EmptySearch/> : (
        <div className="global-padding">
            {newsList.content.map((news, index) => <NewsItem key={index} news={news}/>)}
            <Pagination className="pagination"
                        hideOnSinglePage
                        showSizeChanger={false}
                        onChange={onPageChange}
                        current={currentPage + 1}
                        pageSize={newsList.size}
                        total={newsList.totalElements}/>
        </div>
    )

};

export default NewsList;