import React, {useEffect, useState} from "react";
import './css/PageSider.css';
import Sider from "antd/es/layout/Sider";
import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";
import {getSimilarClubsByCategoryName} from "../../../service/ClubService";
import SocialMedia from "./SocialMedia";
import SimilarClubs from "./SimilarClubs";
import {searchParameters} from "../../../context/SearchContext";


const PageSider = ({club}) => {
    const [similarClubs, setSimilarClubs] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);

        getSimilarClubsByCategoryName(club.id, club.categories[0].name, searchParameters.cityName).then(response => {
            setSimilarClubs(response);
        });
    }, [club]);

    return (
        <Sider className="page-sider" width={364}>
            <div className="address">
                <EnvironmentFilled
                    className="address-icon"/>
                <p className="text"> {club.address}</p>
            </div>
            <div className="map">
                <img src="/static/map.png" alt="Map"/>
            </div>
            <SocialMedia/>
            <SimilarClubs similarClubs={similarClubs}/>
        </Sider>
    )
};

export default PageSider;