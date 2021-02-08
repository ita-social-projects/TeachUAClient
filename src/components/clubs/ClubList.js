import {Layout, Pagination, Space} from "antd";
import {clearSearchParameters, searchParameters} from "../../context/SearchContext";
import React, {useCallback, useEffect} from "react";
import ClubItem from "./ClubItem";
import {getClubsByParameters} from "../../service/ClubService";
import EmptySearch from "./EmptySearch";
import Loader from "../Loader";

const ClubList = ({loading, load, clubs, setClubs}) => {

    useEffect(() => {
        clearSearchParameters();

        load(true);
        getClubsByParameters(searchParameters).then(response => {
            setClubs(response);
            load(false)
        });
    }, []);

    const onPageChange = useCallback((page) => {
        searchParameters.page = page - 1;

        load(true);
        getClubsByParameters(searchParameters).then(response => {
            setClubs(response);
            load(false);
        });
    }, []);

    return loading ? <Loader/> : clubs.content.length === 0 ? <EmptySearch/> : (
        <Layout className="clubs">
            <Space wrap className="cards" size={[0, 0]} style={{paddingTop: 20}}>
                {clubs.content.map((club, index) => <ClubItem club={club} key={index}/>)}
            </Space>

            <Pagination className="pagination"
                        hideOnSinglePage
                        showSizeChanger={false}
                        onChange={onPageChange}
                        current={searchParameters.page + 1}
                        pageSize={clubs.size + 1}
                        total={clubs.totalElements}/>

        </Layout>)
};

export default ClubList;