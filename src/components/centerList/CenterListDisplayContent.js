import PropTypes from "prop-types";
import ClubListEmptySearch from "../clubList/ClubListEmptySearch";
import ClubListItemInfo from "../clubList/ClubListItemInfo";
import { Layout, Pagination } from "antd";
import React, {useEffect, useState} from "react";
import CenterListItem from "./CenterListItem";
import CenterListRectangleItem from "./CenterListRectangleItem";


const CenterListDisplayContent = ({centers,loading, view, advancedSearch, currentPage, onPageChange }) => {

    const [centerInfoVisible, setCenterInfoVisible] = useState(false);
    const [clickedCenter, setClickedCenter] = useState(null);

    useEffect(() => {
        console.log("centers in centerList : "+centers);
    },[]);

    const onCenterClick = (center) =>{
        console.log(center);
        setClickedCenter(center);
        setCenterInfoVisible(true);
    }

    return (

        <Layout className="center-list-content"
                     style={{
                         maxWidth: advancedSearch ? '944px' : '1264px',
                     }}>


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
                    <ClubListItemInfo visible={centerInfoVisible} setVisible={setCenterInfoVisible}
                                      center={clickedCenter} />}

                    <Pagination className="pagination"
                                hideOnSinglePage
                                showSizeChanger={false}
                                onChange={onPageChange}
                                current={currentPage + 1}
                                pageSize={centers.content.size}
                                total={centers.totalElements} />
                </div>
            }

        </Layout>

    );
};

CenterListDisplayContent.propTypes = {
    //centers: PropTypes.object.isRequired,
    // view: PropTypes.string.isRequired,
    // advancedSearch: PropTypes.bool.isRequired,
    // loading: PropTypes.bool.isRequired,

};

export default CenterListDisplayContent;