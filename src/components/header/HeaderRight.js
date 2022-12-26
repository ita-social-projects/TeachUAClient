import React, {useContext, useState, useEffect} from "react";
import {SearchContext} from "../../context/SearchContext";
import Cities from "./Cities";
import {useLocation} from 'react-router-dom'
import AuthMenu from "./AuthMenu";
import AddClubModal from "../addClub/AddClubModal";
import { Button } from "antd";

const HeaderRight = () => {
    const {setClubs} = useContext(SearchContext);
    const location = useLocation();
    const [showModal, setShowModal] = useState(false);

    // const location = useLocation();

    useEffect(() => {
      console.log('Location changed');
    }, [location]);

    return (
      
        <div className="right-side-menu">
            <AddClubModal isShowing={showModal} setShowing={setShowModal}/>
            <Cities setClubs={setClubs}/>
            {location.pathname === "/" &&
              <Button onClick={() => setShowModal(true)}
              className="add-club-button">Додати гурток</Button>
            }
            <AuthMenu/>
        </div>
    )
};

export default HeaderRight;