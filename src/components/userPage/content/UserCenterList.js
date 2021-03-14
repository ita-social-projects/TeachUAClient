import React, {useEffect, useState} from "react";
import {withRouter} from "react-router";
import {getCentersByUserId} from "../../../service/CenterService";
import Loader from "../../Loader";
import {Layout, Pagination, Space} from "antd";
import UserCenterCardItem from "./UserCenterCardItem";
import './css/UserCenter.less';
import EmptySearch from "../../EmptySearch";

const UserCenterList = ({load, setLoad, match}) => {
    const [centers, setCenters] = useState({
        content: [],
        pageable: {},
        size: 0,
        totalElements: 0
    });

    const [page, setPage] = useState(0);

    const getData = () => {

        setLoad(true);
        let userId = match.params.id;

        getCentersByUserId(userId).then(response => {
            console.log(response)
            setCenters(response);
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


    return load ? <Loader/> : centers.content.length === 0 ? <EmptySearch/> : (
        <Layout className="user-centers">
            <Space wrap className="centers-cards" size={[0, 0]}>
                {centers.content.map((center, index) => <UserCenterCardItem center={center} key={index}/>)}
            </Space>
            <Pagination className="user-clubs-pagination"
                        hideOnSinglePage
                        showSizeChanger={false}
                        onChange={onPageChange}
                        current={page + 1}
                        pageSize={centers.size}
                        total={centers.totalElements}/>
        </Layout>
    )
}


export default withRouter(UserCenterList);
