import { Layout, Result} from "antd";
import React, {useEffect, useState} from "react";
import {useParams} from 'react-router';
import CenterPageHeader from "./header/CenterPageHeader";
import CenterPageSider from "./sider/CenterPageSider";
import {searchParameters} from "../../context/SearchContext";
import {getCenterById} from "../../service/CenterService";
import CenterPageContent from "./content/CenterPageContent";
import Loader from "../Loader";
import ClubsOfCenter from "./clubsOfCenter/ClubsOfCenter";
import ClubListItemInfo from "../clubList/ClubListItemInfo";
import './css/CenterPage.css';

const CenterPage = () => {

    const [cityName, setCityName] = useState(searchParameters.cityName);
    const [centerNotFound, setCenterNotFound] = useState(false);
    const [loading, setLoading] = useState(true);
    const [center, setCenter] = useState({});
    const [club, setClickedClub]  = useState(false);
    const [clubInfoVisible, setClubInfoVisible] = useState(false);

    const centerId  = useParams();

    const getData = () => {
            console.log("props.match.params.id : "+centerId);
            console.log("getCenterById start====>")
            getCenterById(centerId.id).then(response => {
                console.log(response);

                setCenter(response);
            }).catch(response => {
                if(response.status === 404){
                    setCenterNotFound(true);
                }
            });
        setLoading(false);
    };

    useEffect(() =>  {
        console.log("======= CenterPage starts rendering ======");
        console.log("==== loading : "+loading);
        getData();
    },[]);

        return (
            !center.clubs ? <Loader/> :
                (
                <Layout className="global-padding">

                    <CenterPageHeader center={center}/>
                    <Layout
                        className="center-page"
                        style={{padding: 40, background: "white"}}
                    >
                        <CenterPageContent center={center} loading={loading}/>

                        <CenterPageSider cityName={cityName} center={center}/>

                    </Layout>
                    <Layout className="clubs-of-center">

                        <ClubsOfCenter clubs={center.clubs}
                                       setClickedClub={setClickedClub}
                                       setClubInfoVisible={setClubInfoVisible} />

                    </Layout>
                </Layout>
            )
        );
}

export default CenterPage;