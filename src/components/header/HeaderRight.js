import React, {useContext, useState} from "react";
import {SearchContext} from "../../context/SearchContext";
import Cities from "./Cities";
import {useLocation} from 'react-router-dom'
import AuthMenu from "./AuthMenu";
import AddClubModal from "../addClub/AddClubModal";
import Login from "../login/Login";
import {getToken} from "../../service/StorageService";
import Layout from "antd/lib/layout/layout";
import { Button } from "antd";

const HeaderRight = () => {
    const {setClubs} = useContext(SearchContext);
    const location = useLocation();
    const [showModal, setShowModal] = useState(false);


    return (
        <div className="right-side-menu">
              <AddClubModal isShowing = {showModal} setShowing = {setShowModal}/>
            <Cities setClubs={setClubs}/>
            {location.pathname === "/" &&
            <Button onClick={() => setShowModal(true)}
            className="add-club-button">Додати гурток</Button>
    }   
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