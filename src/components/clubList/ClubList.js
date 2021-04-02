import {Form, Layout, Pagination} from "antd";
import {SearchContext, searchParameters} from "../../context/SearchContext";
import React, {useContext, useEffect, useState} from "react";
import ClubListItem from "./ClubListItem";
import {getClubsByAdvancedSearch, getClubsByParameters} from "../../service/ClubService";
import EmptySearch from "../EmptySearch";
import PropTypes from "prop-types";
import "./css/ClubList.less";
import ClubListSider from "./ClubListSider";
import ClubListControl from "./ClubListControl";
import ClubListRectangleItem from "./ClubListRectangleItem";
import ClubListItemInfo from "./ClubListItemInfo";
import ClubListEmptySearch from "./ClubListEmptySearch";

const {Content} = Layout;

const ClubList = ({loading, load, advancedSearch, defaultSortBy, defaultSortDir, defaultSortView}) => {
    const [searchForm] = Form.useForm();
    const {clubs, setClubs} = useContext(SearchContext);
    const [currentPage, setCurrentPage] = useState(0);
    const [clubInfoVisible, setClubInfoVisible] = useState(false);
    const [clickedClub, setClickedClub] = useState(null);
    const [sortBy, setSortBy] = useState(defaultSortBy);
    const [sortDirection, setSortDirection] = useState(defaultSortDir);
    const [view, setView] = useState(defaultSortView);

    const getData = (page) => {
        const checkUndefPage = page === undefined ? 0 : page;
        const params = searchForm.getFieldsValue();

        load(true);
        if (!advancedSearch) {
            getClubsByParameters(searchParameters, checkUndefPage).then(response => {
                setClubs(response);
                load(false);
            });
        } else {
            getClubsByAdvancedSearch(params, checkUndefPage, sortBy, sortDirection).then(response => {
                setClubs(response);
                load(false);
            });
        }
    };

    useEffect(() => {
        getData();
    }, [advancedSearch, sortBy, sortDirection]);

    const onPageChange = (page) => {
        setCurrentPage(page - 1);

        getData(page - 1);
    };

    const onClubClick = (club) => {
        setClickedClub(club);
        setClubInfoVisible(true);
    };

    return (
        <Layout className="club-list">
            {advancedSearch &&
            <ClubListSider setCurrentPage={setCurrentPage}
                           form={searchForm}
                           getAdvancedData={getData}
            />}
            <Content className="club-list-content"
                     style={{
                         maxWidth: advancedSearch ? '944px' : '1264px',
                     }}>

                {advancedSearch &&
                <ClubListControl setSortBy={setSortBy}
                                 setSortDirection={setSortDirection}
                                 sortBy={sortBy}
                                 view={view}
                                 sortDirection={sortDirection}
                                 setView={setView}/>}

                {!loading && clubs.content.length === 0 ? <ClubListEmptySearch/> :
                    <div>
                        {
                            !advancedSearch ?
                                <div className="content-clubs-list content-clubs-block">
                                    {clubs.content.map((club, index) =>
                                        <ClubListItem club={club} key={index} onClubClick={onClubClick}/>)}
                                </div>
                                : <div className={`content-clubs-list ${view === 'BLOCK' && "content-clubs-block"}`}>
                                    {clubs.content.map((club, index) =>
                                        view === 'BLOCK' ?
                                            <ClubListItem club={club} key={index} onClubClick={onClubClick}/> :
                                            <ClubListRectangleItem club={club} key={index} onClubClick={onClubClick}/>)}
                                </div>
                        }

                        {clickedClub &&
                        <ClubListItemInfo visible={clubInfoVisible} setVisible={setClubInfoVisible}
                                          club={clickedClub}/>}

                        <Pagination className="pagination"
                                    hideOnSinglePage
                                    showSizeChanger={false}
                                    onChange={onPageChange}
                                    current={currentPage + 1}
                                    pageSize={clubs.size}
                                    total={clubs.totalElements}/>
                    </div>
                }
            </Content>
        </Layout>
    )
};

ClubList.propTypes = {
    defaultSortBy: PropTypes.string.isRequired,
    defaultSortDir: PropTypes.string.isRequired,
    defaultSortView: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    load: PropTypes.func.isRequired,
};

export default ClubList;

