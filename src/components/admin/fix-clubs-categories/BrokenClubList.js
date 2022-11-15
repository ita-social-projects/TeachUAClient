import {Layout, Pagination, Space} from "antd";
import React, {useEffect, useState} from "react";
import {getBrokenClubs} from "../../../service/ClubService";
import Loader from "../../Loader";
import {withRouter} from "react-router-dom";
import UserClubCardItem from "../../userPage/content/UserClubCardItem";
import './css/UserClub.less';


const UserClubList = ({load, setLoad, match}) => {
    const [clubs, setClubs] = useState({
        content: [],
        pageable: {},
        size: 0,
        totalElements: 0
    });

    const [page, setPage] = useState(0);

    const getData = (currPage) => {
        setLoad(true);

        getBrokenClubs(currPage).then(response => {
            setClubs(response);
            setLoad(false)
        });
    };


    useEffect(() => {
            getData(page)
        }, []
    )

    const onPageChange = (currPage) => {
        setPage(currPage - 1)
        getData(currPage - 1);
    };


    return load ? <Loader/> : (
        <div className="test">
            <Layout className="user-clubs">
                <Space wrap className="cards" size="middle">
                    {clubs.content.map((club, index) => <UserClubCardItem club={club} key={index}/>)}
                </Space>
                <Pagination className="user-clubs-pagination"
                            hideOnSinglePage
                            showSizeChanger={false}
                            onChange={onPageChange}
                            current={page + 1}
                            pageSize={clubs.size}
                            total={clubs.totalElements}/>
            </Layout>
        </div>
    )

}


export default withRouter(UserClubList);

