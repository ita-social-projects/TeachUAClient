import { Form, Layout, Pagination } from "antd";
import { SearchContext, searchParameters } from "../../context/SearchContext";
import React, { useContext, useEffect, useState } from "react";
import ClubListItem from "./ClubListItem";
import { getClubsByAdvancedSearch, getClubsByParameters } from "../../service/ClubService";
import EmptySearch from "../EmptySearch";
import PropTypes from "prop-types";
import "./css/ClubList.less";
import ClubListSider from "./ClubListSider";
import ClubListControl from "./ClubListControl";
import ClubListRectangleItem from "./ClubListRectangleItem";
import ClubListItemInfo from "./ClubListItemInfo";
import ClubListEmptySearch from "./ClubListEmptySearch";
import {getCentersByAdvancedSearch} from "../../service/CenterService";
import CenterListDisplayContent from "../centerList/CenterListDisplayContent";
import ClubsListDisplayContent from "./ClubsListDisplayContent";
import CenterListItem from "../centerList/CenterListItem";
import CenterListRectangleItem from "../centerList/CenterListRectangleItem";
import CenterListItemInfo from "../centerList/CenterListItemInfo";

const { Content } = Layout;

const ClubList = ({ loading, load, advancedSearch, defaultSortBy, defaultSortDir, defaultSortView }) => {
    const [searchForm] = Form.useForm();
    const { clubs, setClubs } = useContext(SearchContext);
    const [currentPage, setCurrentPage] = useState(0);
    const [clubInfoVisible, setClubInfoVisible] = useState(false);
    const [clickedClub, setClickedClub] = useState(null);
    const [sortBy, setSortBy] = useState(defaultSortBy);
    const [sortDirection, setSortDirection] = useState(defaultSortDir);
    const [view, setView] = useState(defaultSortView);
    const [isCenterChecked, setIsCenterChecked] = useState(false);
    const [centers, setCenters] = useState({});
    const [centerInfoVisible, setCenterInfoVisible] = useState(false);
    const [clickedCenter, setClickedCenter] = useState(null);


    const getData = (page) => {
        console.log("ClubList => getData method ");
        const checkUndefPage = page === undefined ? 0 : page;
        const params = searchForm.getFieldsValue();

        console.log("isCenter : "+params.isCenter);

        load(true);
        if (!advancedSearch) {
            getClubsByParameters(searchParameters, checkUndefPage).then(response => {
                console.log("getData, loading === response: " + response);
                setClubs(response);
                load(false);
                console.log("getData, loading === " + loading);
            });
        } else {
            if(params.isCenter){
                getCentersByAdvancedSearch(params,page).then(response =>{
                    console.log(response);
                    setCenters(response);
                    setIsCenterChecked(true);
                });
                //setClubs([]);
                console.log("getCentersByAdvancedSearch method done");
                console.log(centers);
                load(false);
            }else {
                setIsCenterChecked(false);
                getClubsByAdvancedSearch(params, checkUndefPage, sortBy, sortDirection).then(response => {
                    console.log("getData, loading === clubs in response: " + response);
                    setClubs(response);
                    load(false);
                    console.log("getData, loading === " + loading);
                });
            }

        }
        console.log(centers);
        console.log("=== getData method ends, loading === " + loading);
    };

    useEffect(() => {
        console.log("useEffect method starts");
        getData();
        console.log("useEffect method ends ");
    }, [advancedSearch, sortBy, sortDirection]);

    const onPageChange = (page) => {
        setCurrentPage(page - 1);
        console.log("=== onPageChange method starts ");
        getData(page - 1);
        console.log("=== onPageChange method ends ");
    };

    const onClubClick = (club) => {
        console.log(club);
        setClickedClub(club);
        setClubInfoVisible(true);
    };

    const onCenterClick = (center) =>{
        console.log(center);
        setClickedCenter(center);
        setCenterInfoVisible(true);
    }

    return (
        <Layout className="club-list">
            {advancedSearch &&
                <ClubListSider  setCurrentPage={setCurrentPage}
                                form={searchForm}
                                getAdvancedData={getData}
                                isCenterChecked={isCenterChecked}
                />}

            { isCenterChecked ?
                 // <CenterListDisplayContent view={view}
                 //                           centers={centers}
                 //                           advancedSearch={advancedSearch}
                 //                           loading={loading}
                 //                           currentPage={currentPage}
                 //                           onPageChange={onPageChange}
                 //
                 // />

                <Content className = "club-list-content"
                         style={{
                             maxWidth: advancedSearch ? '944px' : '1264px',
                         }}>

                    {advancedSearch &&
                    <ClubListControl setSortBy={setSortBy}
                                     setSortDirection={setSortDirection}
                                     sortBy={sortBy}
                                     view={view}
                                     sortDirection={sortDirection}
                                     setView={setView} />}


                    {!loading && centers.content.length === 0 ? <ClubListEmptySearch /> :
                        <div>
                            {
                                <div className={`content-clubs-list ${view === 'BLOCK' && "content-clubs-block"}`}>
                                    {centers.content.map((center) =>
                                        view === 'BLOCK' ?
                                            <CenterListItem center={center} key={center.id} onCenterClick={onCenterClick} />
                                            :
                                            <CenterListRectangleItem center={center} key={center.id} onCenterClick={onCenterClick} />)}
                                </div>
                            }

                            {clickedCenter &&
                            <CenterListItemInfo visible={centerInfoVisible} setVisible={setCenterInfoVisible}
                                              center={clickedCenter} />}

                            <Pagination className="pagination"
                                        hideOnSinglePage
                                        showSizeChanger={false}
                                        onChange={onPageChange}
                                        current={currentPage + 1}
                                        pageSize={centers.size}
                                        total={centers.totalElements} />
                        </div>
                    }
                </Content>

                     :

                <Content className = "club-list-content"
                         style={{
                             maxWidth: advancedSearch ? '944px' : '1264px',
                         }}>

                    {advancedSearch &&
                    <ClubListControl setSortBy={setSortBy}
                                     setSortDirection={setSortDirection}
                                     sortBy={sortBy}
                                     view={view}
                                     sortDirection={sortDirection}
                                     setView={setView} />}

                    {!loading && clubs.content.length === 0 ? <ClubListEmptySearch /> :
                        <div>
                            {
                                !advancedSearch ?
                                    <div className="content-clubs-list content-clubs-block">
                                        {clubs.content.map((club, index) =>
                                            <ClubListItem club={club} key={index} onClubClick={onClubClick} />)}
                                    </div> :
                                    <div className={`content-clubs-list ${view === 'BLOCK' && "content-clubs-block"}`}>
                                        {clubs.content.map((club, index) =>
                                            view === 'BLOCK' ?
                                                <ClubListItem club={club} key={index} onClubClick={onClubClick} /> :
                                                <ClubListRectangleItem club={club} key={index} onClubClick={onClubClick} />)}
                                    </div>
                            }

                            {clickedClub &&
                            <ClubListItemInfo visible={clubInfoVisible} setVisible={setClubInfoVisible}
                                              club={clickedClub} />}

                            <Pagination className="pagination"
                                        hideOnSinglePage
                                        showSizeChanger={false}
                                        onChange={onPageChange}
                                        current={currentPage + 1}
                                        pageSize={clubs.size}
                                        total={clubs.totalElements} />
                        </div>
                    }
                </Content>
            }

        </Layout>
    );
};

ClubList.propTypes = {
    defaultSortBy: PropTypes.string.isRequired,
    defaultSortDir: PropTypes.string.isRequired,
    defaultSortView: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    load: PropTypes.func.isRequired,
};

export default ClubList;

