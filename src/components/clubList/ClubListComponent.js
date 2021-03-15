import React, {useContext, useState} from 'react';
import {Layout} from 'antd';
import {SearchContext} from "../../context/SearchContext";
import ClubList from "./ClubList";
import '../map/css/MapModal.css'
import MapComponent from "../map/MapComponent";
import ClubListHeader from "./ClubListHeader";
import { getClubsByCategoryAndCity } from '../../service/ClubService';


const ClubListComponent = () => {
    const [loading, setLoading] = useState(false);
    const [mapVisible, setMapVisible] = useState(false);
    const [advancedSearch, setAdvancedSearch] = useState(false);

    return (
        <Layout>
            <ClubListHeader setAdvancedSearch={setAdvancedSearch} advancedSearch={advancedSearch}/>
            <ClubList loading={loading} load={setLoading} advancedSearch={advancedSearch}/>
            <MapComponent visible={mapVisible} setVisible={setMapVisible}/>
        </Layout>)
};

export default ClubListComponent;