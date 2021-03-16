import React, {useState} from 'react';
import {Layout} from 'antd';
import ClubList from "./ClubList";
import '../map/css/MapModal.css'
import MapComponent from "../map/MapComponent";
import ClubListHeader from "./ClubListHeader";


const ClubListComponent = () => {
    const DEFAULT_SORT_BY = 'name';
    const DEFAULT_SORT_DIRECTION = 'asc';
    const DEFAULT_SORT_VIEW = 'BLOCK';

    const [loading, setLoading] = useState(false);
    const [mapVisible, setMapVisible] = useState(false);
    const [advancedSearch, setAdvancedSearch] = useState(false);

    return (
        <Layout>
            <ClubListHeader setAdvancedSearch={setAdvancedSearch} advancedSearch={advancedSearch}/>
            <ClubList loading={loading}
                      load={setLoading}
                      advancedSearch={advancedSearch}
                      defaultSortBy={DEFAULT_SORT_BY}
                      defaultSortDir={DEFAULT_SORT_DIRECTION}
                      defaultSortView={DEFAULT_SORT_VIEW}/>
            <MapComponent visible={mapVisible} setVisible={setMapVisible}/>
        </Layout>)
};

export default ClubListComponent;