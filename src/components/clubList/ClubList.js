import {Form, Layout} from "antd";
import {clearSearchParameters, mapSearchParameters, SearchContext, searchParameters} from "../../context/SearchContext";
import React, {useContext, useEffect, useState} from "react";
import {getClubsByAdvancedSearch, getClubsByParameters,} from "../../service/ClubService";
import PropTypes from "prop-types";
import "./css/ClubList.less";
import "../centerList/css/CenterList.less";
import ClubListSider from "./ClubListSider";
import {getCentersByAdvancedSearch} from "../../service/CenterService";
import CenterListDisplayContent from "../centerList/CenterListDisplayContent";
import ClubsListDisplayContent from "./ClubsListDisplayContent";
import {useLocation} from "react-router-dom";

import {PageContext} from "../../context/PageContext";

const {Content} = Layout;

const ClubList = ({
                      loading,
                      load,
                      advancedSearch,
                      showHideMenu,
                      setShowHideMenu,
                      defaultSortBy,
                      defaultSortDir,
                      defaultSortView,
                  }) => {
    const [searchForm] = Form.useForm();
    const {clubs, setClubs} = useContext(SearchContext);
    const {currentPage, setCurrentPage} = useContext(PageContext);
    const [clubInfoVisible, setClubInfoVisible] = useState(false);
    const [clickedClub, setClickedClub] = useState(null);
    const [sortBy, setSortBy] = useState(defaultSortBy);
    const [sortDirection, setSortDirection] = useState(defaultSortDir);
    const [view, setView] = useState(defaultSortView);
    const [isCenterChecked, setIsCenterChecked] = useState(false);
    const [centers, setCenters] = useState({
        content: [],
        pageable: {},
        size: 0,
        totalElements: 0,
    });
    const [centerInfoVisible, setCenterInfoVisible] = useState(false);
    const [clickedCenter, setClickedCenter] = useState(null);

    const [activeCategory, setActiveCategory] = useState();
    const location = useLocation();
    const [params, setParams] = useState(mapSearchParameters);
    const [searchParams, setSearchParams] = useState(searchParameters);

    const getData = (page) => {
        let checkUndefPage = page === undefined ? 0 : page;

        if(advancedSearch && showHideMenu){
            setParams(searchForm.getFieldsValue());
            if (isCenterChecked) {
                getCentersByAdvancedSearch(params, page).then((response) => {
                    setCenters(response);
                });
            } else {
                getClubsByAdvancedSearch(
                    params,
                    checkUndefPage,
                    sortBy,
                    sortDirection
                ).then((response) => {
                    setClubs(response);
                });
            }
        } else if (!advancedSearch){
            console.log(searchParameters);
            setSearchParams(searchParameters);
            getClubsByParameters(
                searchParams,
                checkUndefPage,
                sortBy,
                sortDirection
            ).then((response) => {
                setClubs(response);
            });
        }

        if (advancedSearch && !showHideMenu) {
            if (isCenterChecked) {
                getCentersByAdvancedSearch(params, page).then((response) => {
                    setCenters(response);
                });
            } else {
                getClubsByAdvancedSearch(
                    params,
                    checkUndefPage,
                    sortBy,
                    sortDirection
                ).then((response) => {
                    setClubs(response);
                });
            }
        }

        load(false);
    };

    useEffect(() => {
        getData(currentPage);
    }, [advancedSearch, sortBy, sortDirection, isCenterChecked, view]);

    const onPageChange = (page) => {
        setCurrentPage(page - 1);
        getData(page - 1);
    };

    const onClubClick = (club) => {
        setClickedClub(club);
        setClubInfoVisible(true);
    };
    const onCenterClick = (center) => {
        setClickedCenter(center);
        setCenterInfoVisible(true);
    };
    return (
        <Layout className="club-list">
            {advancedSearch && showHideMenu && (
                <ClubListSider
                    setCurrentPage={setCurrentPage}
                    form={searchForm}
                    getAdvancedData={getData}
                    setShowHideMenu={setShowHideMenu}
                    isCenterChecked={isCenterChecked}
                    setIsCenterChecked={setIsCenterChecked}
                    activeCategory={activeCategory}
                />
            )}

            {isCenterChecked ? (
                <CenterListDisplayContent
                    view={view}
                    centers={centers}
                    setView={setView}
                    advancedSearch={advancedSearch}
                    loading={loading}
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                    setSortBy={setSortBy}
                    setSortDirection={setSortDirection}
                    sortBy={sortBy}
                    sortDirection={sortDirection}
                />
            ) : (
                <ClubsListDisplayContent
                    clubs={clubs}
                    view={view}
                    setView={setView}
                    advancedSearch={advancedSearch}
                    loading={loading}
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                    setSortBy={setSortBy}
                    setSortDirection={setSortDirection}
                    sortBy={sortBy}
                    sortDirection={sortDirection}
                />
             )}

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
