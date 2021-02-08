import {Layout} from "antd";
import React, {useEffect, useState} from "react";
import PageHeader from "./header/PageHeader";
import PageContent from "./content/PageContent";
import PageSider from "./sider/PageSider";
import {getClubById} from "../../service/ClubService";
import Loader from "../Loader";
import './css/ClubPage.css';

const ClubPage = ({id}) => {
    const [club, setClub] = useState({});

    useEffect(() => {
        getClubById(id).then(response => {
            setClub(response);
        });
    }, [id]);

    return !club.categories ? <Loader/> : (
        <Layout>
            <PageHeader club={club}/>
            <Layout className="club-page" style={{padding: 40, background: 'white'}}>
                <PageContent club={club}/>
                <PageSider club={club}/>
            </Layout>
        </Layout>)
};

export default ClubPage;