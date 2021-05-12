import { Form, Layout, Pagination } from "antd";
import { SearchContext, searchParameters } from "../../context/SearchContext";
import React, { useContext, useEffect, useState } from "react";
import ClubListItem from "./ClubListItem";
import { getClubsByAdvancedSearch, getClubsByParameters } from "../../service/ClubService";
import EmptySearch from "../EmptySearch";
import PropTypes from "prop-types";
import "./css/ClubList.less";
import "../centerList/css/CenterList.less"
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
import Loader from "../Loader";

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
    const [centers, setCenters] = useState({
        content: [],
        pageable: {},
        size: 0,
        totalElements: 0
    });
    const [centerInfoVisible, setCenterInfoVisible] = useState(false);
    const [clickedCenter, setClickedCenter] = useState(null);


    const getData = (page) => {
        console.log("loading = "+ loading);
            console.log("ClubList => getData method ");
            const checkUndefPage = page === undefined ? 0 : page;
            const params = searchForm.getFieldsValue();

            console.log("isCenter : "+params.isCenter);

            if (!advancedSearch) {
                setIsCenterChecked(false);
                if(centers.length>0){
                    setCenters([]);
                }
                console.log("advancedSearch is false");
                getClubsByParameters(searchParameters, checkUndefPage).then(response => {
                    console.log("getData, loading === response: " + response);
                    setClubs(response);
                    console.log("getData, loading === " + loading);
                });
            } else {
                if(isCenterChecked){
                    getCentersByAdvancedSearch(params,page).then(response =>{
                        console.log(response);
                        setCenters(response);
                    });
                    console.log("getCentersByAdvancedSearch method done");
                    console.log(centers);
                }else {
                    console.log("isCenterChecked");
                    console.log(isCenterChecked);
                    getClubsByAdvancedSearch(params, checkUndefPage, sortBy, sortDirection).then(response => {
                        console.log("getData, loading === clubs in response: " + response);
                        setClubs(response);
                        console.log("getData, loading === " + loading);
                    });
                };

            };
            console.log(centers);
            load(false);
            console.log("=== getData method ends, loading === " + loading);
    };

    useEffect(() => {
        console.log("useEffect method starts");
        console.log(loading );
        getData();
        console.log("useEffect method ends ");
    }, [advancedSearch, sortBy, sortDirection,isCenterChecked,view]);


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
                                    setIsCenterChecked = {setIsCenterChecked}
                    />
                }

                { isCenterChecked  ?
                    <CenterListDisplayContent   view={view}
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
                     :
                    <ClubsListDisplayContent clubs={clubs}
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
