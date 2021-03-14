import {Layout, Pagination, Space} from "antd";
import React, {useEffect, useState} from "react";
import {getClubsByUserId} from "../../../service/ClubService";
import Loader from "../../Loader";
import {withRouter} from "react-router";
import UserClubCardItem from "./UserClubCardItem";
import './css/UserClub.less';
import EmptySearch from "../../EmptySearch";


const UserClubList = ({load, setLoad, match}) => {
    const [clubs, setClubs] = useState({
        content: [],
        pageable: {},
        size: 0,
        totalElements: 0
    });

    const [page, setPage] = useState(0);

    const getData = () => {

        setLoad(true);
        let userId = match.params.id;

        getClubsByUserId(userId, page).then(response => {
            console.log(response)
            setClubs(response);
            setLoad(false)
        });
    };


    useEffect(() => {
            getData()
        }, []
    )

    const onPageChange = (page) => {
        setPage(page - 1)
        getData();
    };

    return load ? <Loader/> : clubs.content.length === 0 ? <EmptySearch/> : (
        <div className="test">
            <Layout className="user-clubs">
                <Space wrap className="cards" size={[0, 0]}>
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

