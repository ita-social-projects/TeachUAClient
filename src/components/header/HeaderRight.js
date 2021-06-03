import React, {useContext, useState} from "react";
import {SearchContext} from "../../context/SearchContext";
import Cities from "./Cities";
import {useLocation} from 'react-router-dom'
import AuthMenu from "./AuthMenu";
import AddClubModal from "../addClub/AddClubModal";
import Login from "../login/Login";
import {getToken} from "../../service/StorageService";
import Layout from "antd/lib/layout/layout";


const HeaderRight = () => {
    const {setClubs} = useContext(SearchContext);
    const location = useLocation();


    return (
        <div className="right-side-menu">
            <Cities setClubs={setClubs}/>
            {location.pathname === "/" &&
            <AddClubModal button/>}
            {/*// getToken() ? <AddClubModal button/> :*/}
            {/*//     <Layout className="aboutProject global-padding">*/}
            {/*//     <div className="login-div">*/}
            {/*//         <button className="flooded-button donate-button">*/}
            {/*//             <Login/>*/}
            {/*//         </button>*/}
            {/*//     </div>*/}
            {/*//     </Layout>}*/}

            <AuthMenu/>
        </div>
    )
};

export default HeaderRight;