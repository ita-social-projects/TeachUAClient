import {Card, Pagination, Space} from "antd";
import {searchParameters} from "../../context/SearchContext";
import React, {useCallback, useEffect} from "react";
import ClubItem from "./ClubItem";
import {getClubsByParameters} from "../../service/ClubService";

const ClubList = ({load, clubs, setClubs}) => {
    useEffect(() => {
        load(true);
        getClubsByParameters(searchParameters).then(response => {
            setClubs(response);
            load(false);
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

    return (
        <div>
            <Space wrap className="cards" size={[0, 16]} style={{paddingTop: 20}}>
                {
                    clubs.content.map((club, index) => <ClubItem club={club} key={index}/>)
                }

                <Card className="card empty"/>
                <Card className="card empty"/>
            </Space>
            {
                !clubs.size ? <div/> :
                    <Pagination className="pagination"
                                hideOnSinglePage
                                showSizeChanger={false}
                                onChange={onPageChange}
                                current={searchParameters.page + 1}
                                pageSize={clubs.size}
                                total={clubs.totalElements}/>
            }
        </div>
    )
};

export default ClubList;