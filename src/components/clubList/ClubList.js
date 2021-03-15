import {Form, Layout, Pagination, Space} from "antd";
import {SearchContext, searchParameters} from "../../context/SearchContext";
import React, {useContext, useEffect, useState} from "react";
import ClubListItem from "./ClubListItem";
import {getClubsByAdvancedSearch, getClubsByParameters} from "../../service/ClubService";
import EmptySearch from "../EmptySearch";
import PropTypes from "prop-types";
import "./css/ClubList.less";
import ClubListSider from "./ClubListSider";

const {Content} = Layout;

const ClubList = ({loading, load, advancedSearch}) => {
    const [searchForm] = Form.useForm();
    const {clubs, setClubs} = useContext(SearchContext);
    const [currentPage, setCurrentPage] = useState(0);

    const getData = (page) => {
        const checkUndefPage = page === undefined ? 0 : page;
        const params = searchForm.getFieldsValue();

        if (!advancedSearch) {
            getClubsByParameters(searchParameters, checkUndefPage).then(response => {
                setClubs(response);
            });
        } else {
            getClubsByAdvancedSearch(params, checkUndefPage).then(response => {
                setClubs(response);
            });
        }
    };

    useEffect(() => {
        getData();
    }, [advancedSearch]);

    const onPageChange = (page) => {
        setCurrentPage(page - 1);

        getData(page - 1);
    };

    return (
        <Layout className="club-list">
            {advancedSearch &&
            <ClubListSider setCurrentPage={setCurrentPage}
                           form={searchForm}
                           getAdvancedData={getData}
            />}
            {!loading && clubs.content.length === 0 ? <EmptySearch/> : (
                <Content className="club-list-content">
                    <Space wrap className="content-clubs" size={[0, 0]}>
                        {clubs.content.map((club, index) => <ClubListItem club={club} key={index}/>)}
                    </Space>

                    <Pagination className="pagination"
                                hideOnSinglePage
                                showSizeChanger={false}
                                onChange={onPageChange}
                                current={currentPage + 1}
                                pageSize={clubs.size}
                                total={clubs.totalElements}/>
                </Content>
            )}
        </Layout>
    )
};

ClubList.propTypes = {
    clubs: PropTypes.object.isRequired,
    setClubs: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    load: PropTypes.func.isRequired,
};

export default ClubList;

