import React, {useContext} from "react";
import {SearchContext} from "../../context/SearchContext";
import Cities from "./Cities";
import {useLocation} from 'react-router-dom'
import AuthMenu from "./AuthMenu";
import {Button} from "antd";
import AddClubModal from "../addClub/AddClubModal";

const HeaderRight = () => {
    const {setClubs} = useContext(SearchContext);
    const location = useLocation();

    return (
        <div className="right-side-menu">
            <Cities setClubs={setClubs}/>
            {location.pathname === "/" &&
            <AddClubModal button/>}
            <AuthMenu/>
        </div>
    )
};

export default HeaderRight;